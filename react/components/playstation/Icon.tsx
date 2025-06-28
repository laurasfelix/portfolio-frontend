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
    // const iconWidth = chosen === src ? "6.5vw" : "5.5vw";

    return (
        <div className="flex flex-col items-center py-4 w-full">
            <div className="flex flex-col items-center justify-center w-20 h-20 relative">
                <button 
                    className="flex flex-col items-center focus:outline-none transition-opacity duration-150"
                    onClick={() => setChosen(src)} 
                    onMouseEnter={() => setChosen(src)}
                >
                    <img 
                        src={imageMapping[src]} 
                        alt={text}
                        className="object-contain transition-opacity duration-150 filter drop-shadow-lg" 
                        style={{
                            opacity: chosen === src ? 1 : 0.8,
                            width: "64px",
                            height: "64px"
                        }} 
                    />
                </button>
            </div>
            <p 
                className={`text-center text-xl text-white mt-2 transition-opacity duration-150 ${
                    chosen === src ? 'opacity-100 font-semibold' : 'opacity-0'
                }`}
                style={{ minHeight: "28px" }}
            >
                {chosen === src ? text : ""}
            </p>
        </div>
    );
};

export default Icon;
