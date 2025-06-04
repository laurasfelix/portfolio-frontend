import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import askFurbotronAndPlay from "@/pages/api/furbotron";

const placeholderMessages = [
    "this is Furbotron.",
    "ask him anything about laura",
    "make your request to Master Furbotron 3000",
    "be careful what you wish for...",
];

interface InputBoxProp {
    isThinking: boolean;
    setIsThinking: Dispatch<SetStateAction<boolean>>;
    setInteract: Dispatch<SetStateAction<boolean>>;
    setIsTalking: Dispatch<SetStateAction<boolean>>;
    startProgress: () => void;
    stopProgress: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
}

const InputBox = ({ isThinking, setInteract, setIsThinking, setIsTalking, startProgress, stopProgress, audioRef }: InputBoxProp) => {
    const [text, onChangeText] = useState("");
    const [placeholder, setPlaceholder] = useState(placeholderMessages[0]);
    const indexRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const cycleMessages = () => {
            timeoutRef.current = setTimeout(() => {
                if (isThinking) return;
            
                indexRef.current = (indexRef.current + 1) % placeholderMessages.length;
                setPlaceholder(placeholderMessages[indexRef.current]);

                cycleMessages(); 
            }, 4000); 
        };

        if (isThinking) {
            setPlaceholder("furbotron is thinking...");
        } else {
            cycleMessages();
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isThinking]);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setInteract(false);
        setIsThinking(true);
        startProgress();
        try {
            await askFurbotronAndPlay(
                text,
                setIsThinking,
                setIsTalking,
                audioRef,
                stopProgress
            );
        } catch (error) {
            console.error('Error communicating with Furbotron:', error);
            setIsThinking(false);
            stopProgress();
        }
        onChangeText("");
    };

    return (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-2.5 min-w-[60%] text-center flex flex-col items-center">
            <input 
                className="text-lg text-white font-light text-center w-full bg-transparent focus:outline-none placeholder-white/60"
                onChange={(e) => {
                    onChangeText(e.target.value);  
                    setInteract(true);
                }}
                value={text}
                placeholder={placeholder}
                style={{ color: text ? '#fff' : 'rgba(255,255,255,0.7)' }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
                disabled={isThinking}
            />
            {isThinking && (
                <div className="flex flex-col items-center mt-4 w-full animate-pulse">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 bg-white/80 rounded-full animate-bounce" />
                        <span className="w-3 h-3 bg-white/60 rounded-full animate-bounce delay-150" />
                        <span className="w-3 h-3 bg-white/40 rounded-full animate-bounce delay-300" />
                        <span className="text-white/80 font-semibold ml-2">Furbotron is thinking...</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden shadow-inner border border-white/20">
                        <div
                            className="h-full bg-gradient-to-r from-white/60 to-white/30 transition-all duration-75 rounded-full"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputBox;