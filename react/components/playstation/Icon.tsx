import { useEffect, Dispatch, SetStateAction } from "react";

interface IconProps {
    src: number;
    text: string;
    chosen: number;
    setChosen: Dispatch<SetStateAction<number>>;
}

const imageMapping: Record<number, string> = [
    "/images/about.svg",
    "/images/exp.svg",
    "/images/www.svg",
    "/images/games.svg",
    "/images/contact.svg",
];

const Icon = ({ src, text, chosen, setChosen }: IconProps) => {
    // Play sound effect when icon is chosen
    useEffect(() => {
        let soundObject: HTMLAudioElement;
    
        async function playSound() {
            console.log("Loading Sound");
            soundObject = new Audio("/sounds/hover.mp3");
            
            try {
                await soundObject.play();
            } catch (error) {
                console.error("Audio play failed:", error);
            }
        }
    
        playSound();
    
        return () => {
            if (soundObject) {
                console.log("Unloading Sound");
                soundObject.pause();
                soundObject.src = "";
            }
        };
    }, [chosen]);

    // Calculate icon sizes based on selection state
    const iconWidth = chosen === src ? "6.5vw" : "5.5vw";

    return (
        <div className="flex flex-col items-center py-4">
            <button 
                className="flex flex-col items-center focus:outline-none"
                style={{ minWidth: "6.5vw", minHeight: "6.5vw" }}
                onClick={() => setChosen(src)} 
                onMouseEnter={() => setChosen(src)}
            >
                <img 
                    src={imageMapping[src]} 
                    alt={text}
                    className="object-contain transition-all duration-150" 
                    style={{
                        opacity: chosen === src ? 1 : 0.8,
                        width: iconWidth,
                        height: iconWidth
                    }} 
                />
                <p 
                    className="text-center text-xl text-white mt-1"
                    style={{ visibility: chosen === src ? "visible" : "hidden" }}
                >
                    {text}
                </p>
            </button>
        </div>
    );
};

export default Icon;
