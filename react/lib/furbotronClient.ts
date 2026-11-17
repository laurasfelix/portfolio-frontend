// Browser-side helpers: ask the server route, then speak the answer with the
// browser's built-in (free) speech synthesis.

export async function askFurbotron(prompt: string): Promise<string> {
    const res = await fetch("/api/furbotron", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "Furbotron malfunctioned. Beep.");
    return data.reply as string;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
    const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
    // Prefer voices that tend to sound more robotic; fall back to any English voice.
    const preferred = ["Fred", "Zarvox", "Trinoids", "Ralph", "Google UK English Male", "Daniel"];
    return preferred.map((name) => voices.find((v) => v.name.includes(name))).find(Boolean) ?? voices[0];
}

export function speak(text: string, onStart: () => void, onEnd: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        onEnd();
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.pitch = 0.3; // low and robotic
    utterance.rate = 0.95;
    utterance.onstart = onStart;
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
    window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}
