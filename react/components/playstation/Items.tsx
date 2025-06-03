import { useEffect, Dispatch, SetStateAction } from 'react';
import itemInfo from "@/utils/itemInfo";

interface ItemsProp {
    chosen: number;
    src: number; 
    chosenIcon: number[];
    setChosenIcon: Dispatch<SetStateAction<number[]>>;
    up: boolean;
}

const Items = ({ chosen, src, chosenIcon, setChosenIcon, up }: ItemsProp) => {
    const info = itemInfo[chosen];

    // Play sound effect when item is chosen
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
    }, [chosenIcon]);

    // Calculate icon sizes based on selection state
    const iconWidth = (index: number) => index === chosenIcon[chosen] ? "6.5vw" : "5vw";

    if (chosen !== src) {
        return null;
    }

    return (
        <div className={`w-full flex-1 flex flex-col gap-1 ${up ? 'justify-end' : ''} overflow-hidden`}>
            {info.map((item, index) => (
                <div 
                    key={index} 
                    className="flex flex-row items-center justify-center w-full"
                    style={{ padding: up ? (index < chosenIcon[chosen] ? 4 : 0) : (index >= chosenIcon[chosen] ? 4 : 0) }}
                >
                    <div 
                        className="flex items-center justify-center"
                        style={{
                            display: up ? 
                                (index < chosenIcon[chosen] ? "flex" : "none") : 
                                (index >= chosenIcon[chosen] ? "flex" : "none")
                        }}
                        onMouseEnter={() => {
                            setTimeout(() => {
                                setChosenIcon((prev) => ({
                                    ...prev,
                                    [chosen]: index,
                                }));
                            }, 200);
                        }}
                    >
                        <div className="flex justify-center items-center filter drop-shadow-lg">
                            <img 
                                src={item.icon} 
                                alt={`item-${index}`}
                                style={{
                                    opacity: index === chosenIcon[chosen] ? 0.95 : 0.8,
                                    width: iconWidth(index),
                                    height: iconWidth(index),
                                    alignSelf: "center"
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Items;
