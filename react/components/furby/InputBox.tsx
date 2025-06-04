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
}

const InputBox = ({ isThinking, setInteract, setIsThinking, setIsTalking }: InputBoxProp) => {
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
        
        try {
            await askFurbotronAndPlay(text, setIsThinking, setIsTalking);
        } catch (error) {
            console.error('Error communicating with Furbotron:', error);
            setIsThinking(false);
        }
        
        onChangeText("");
    };

    return (
        <div className="bg-gray-300 z-30 p-2.5 rounded-lg min-w-[60%] text-center">
            <input 
                className="text-lg text-black font-light text-center w-full bg-transparent focus:outline-none"
                onChange={(e) => {
                    onChangeText(e.target.value);  
                    setInteract(true);
                }}
                value={text}
                placeholder={placeholder}
                style={{ color: text ? 'black' : 'gray' }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
                disabled={isThinking}
            />
        </div>
    );
};

export default InputBox;