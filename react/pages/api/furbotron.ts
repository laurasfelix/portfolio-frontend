import type { NextApiRequest, NextApiResponse } from "next";
import { FURBOTRON_SYSTEM_PROMPT } from "@/lib/furbotronContext";

// Groq exposes an OpenAI-compatible API with a free tier (no card required).
// Set GROQ_API_KEY in Vercel (NOT prefixed with NEXT_PUBLIC_, so it never reaches the browser).
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const MAX_PROMPT_CHARS = 500;

// Best-effort per-IP limit. Serverless instances don't share memory, so this only
// slows down casual abuse; Groq's own free-tier cap is the hard ceiling on cost (which is $0).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();
    return recent.length > MAX_PER_WINDOW;
}

type Data = { reply: string } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Furbotron is unplugged (missing GROQ_API_KEY)." });
    }

    const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
    if (!prompt) return res.status(400).json({ error: "Ask me something, human." });
    if (prompt.length > MAX_PROMPT_CHARS) {
        return res.status(400).json({ error: `Too many words. Max ${MAX_PROMPT_CHARS} characters.` });
    }

    const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown").split(",")[0].trim();
    if (rateLimited(ip)) {
        return res.status(429).json({ error: "Furbotron needs to cool his circuits. Try again in a minute." });
    }

    try {
        const groqRes = await fetch(GROQ_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: FURBOTRON_SYSTEM_PROMPT },
                    { role: "user", content: prompt },
                ],
                temperature: 0.9,
                max_tokens: 400,
            }),
        });

        if (groqRes.status === 429) {
            return res.status(429).json({ error: "Furbotron has answered too many questions today. Come back later." });
        }
        if (!groqRes.ok) {
            console.error("Groq error", groqRes.status, await groqRes.text());
            return res.status(502).json({ error: "Furbotron malfunctioned. Beep." });
        }

        const data = await groqRes.json();
        const reply: string = data?.choices?.[0]?.message?.content?.trim() || "...beep. No data.";
        return res.status(200).json({ reply });
    } catch (err) {
        console.error("Furbotron request failed", err);
        return res.status(502).json({ error: "Furbotron malfunctioned. Beep." });
    }
}
