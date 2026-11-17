import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { askFurbotron, primeSpeech, speak } from "@/lib/furbotronClient";

const placeholderMessages = [
    "ask him about laura…",
    "he is listening.",
    "where did she grow up?",
    "what does she build?",
    "careful what you ask.",
];

interface InputBoxProp {
    isThinking: boolean;
    setIsThinking: Dispatch<SetStateAction<boolean>>;
    setInteract: Dispatch<SetStateAction<boolean>>;
    setIsTalking: Dispatch<SetStateAction<boolean>>;
    onReply: (reply: string) => void;
}

const InputBox = ({ isThinking, setInteract, setIsThinking, setIsTalking, onReply }: InputBoxProp) => {
    const [text, onChangeText] = useState("");
    const [placeholder, setPlaceholder] = useState(placeholderMessages[0]);
    const indexRef = useRef(0);

    useEffect(() => {
        if (isThinking) return;
        const id = setInterval(() => {
            indexRef.current = (indexRef.current + 1) % placeholderMessages.length;
            setPlaceholder(placeholderMessages[indexRef.current]);
        }, 4000);
        return () => clearInterval(id);
    }, [isThinking]);

    const handleSubmit = async () => {
        const prompt = text.trim();
        if (!prompt || isThinking) return;
        primeSpeech(); // must happen inside the tap for iOS
        setInteract(false);
        setIsThinking(true);
        onReply("");

        let reply: string;
        try {
            reply = await askFurbotron(prompt);
        } catch (error) {
            console.error("Error communicating with Furbotron:", error);
            // He reads his own error messages aloud — stays in character.
            reply = error instanceof Error ? error.message : "...the connection is severed.";
        }

        setIsThinking(false);
        onChangeText("");
        onReply(reply);
        speak(reply, () => setIsTalking(true), () => setIsTalking(false));
    };

    return (
        <form
            className="flex w-full items-end gap-3 border-b border-[#d9c9b0]/30 focus-within:border-[#b3121b] transition-colors pb-1"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <input
                className="flex-1 min-w-0 bg-transparent text-lg md:text-xl italic text-[#e8d8bd] placeholder:text-[#d9c9b0]/35 focus:outline-none py-2 disabled:opacity-40"
                onChange={(e) => {
                    onChangeText(e.target.value);
                    setInteract(true);
                }}
                value={text}
                maxLength={500}
                placeholder={isThinking ? "" : placeholder}
                enterKeyHint="send"
                aria-label="ask Furbotron a question about Laura"
                disabled={isThinking}
            />
            <button
                type="submit"
                disabled={isThinking || !text.trim()}
                className="shrink-0 pb-2 uppercase tracking-widest text-sm text-[#b3121b] disabled:text-[#d9c9b0]/20 transition-colors"
            >
                ask
            </button>
        </form>
    );
};

export default InputBox;
