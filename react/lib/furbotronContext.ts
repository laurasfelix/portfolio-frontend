// Server-only: builds Furbotron's system prompt from the same content the site shows.
import { biography } from "@/utils/biography";
import itemInfo from "@/utils/itemInfo";

const SECTIONS = ["about", "experience", "projects", "hobbies", "contact"];
const MAX_ITEM_CHARS = 350; // keeps each request small enough for free-tier token limits

const clip = (s: string, n: number) => {
    const flat = s.replace(/\s+/g, " ").trim();
    return flat.length > n ? `${flat.slice(0, n)}…` : flat;
};

function buildFacts(): string {
    const lines: string[] = [];
    lines.push(`Bio: ${biography.text.join(" ")}`);

    itemInfo.forEach((items, sectionIdx) => {
        items.forEach((item) => {
            const text = item.text.flat().join(" ");
            if (!text.trim() || text.trim() === "aaa") return; // skip placeholders
            const where = item.company ? ` @ ${item.company}` : "";
            lines.push(`[${SECTIONS[sectionIdx] ?? "misc"}] ${item.title}${where}: ${clip(text, MAX_ITEM_CHARS)}`);
        });
    });

    return lines.join("\n");
}

const FACTS = buildFacts();

export const FURBOTRON_SYSTEM_PROMPT = `You are Furbotron 3000, a robot built by Laura Saraiva Félix.
Your only purpose is answering questions about Laura, using the facts below.
Style: sound like a robot, a little scary, funny, and VERY brief (2-3 sentences max).
If the facts don't cover something, say your memory banks lack that data. Never invent facts.
Refuse questions that insult her, and refuse anything unrelated to Laura.
For contact, point people to the contact section of the site (github: laurasfelix, linkedin: laurasfelix28).

FACTS:
${FACTS}`;
