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

    // Fixed icon sizes to prevent layout shifts
    const getIconSize = (index: number) => {
        return index === chosenIcon[chosen] ? 48 : 40; // Fixed pixel sizes
    };

    if (chosen !== src) {
        return <div className="w-full flex-1"></div>; // Maintain layout space
    }

    return (
        <div className={`w-full flex-1 flex flex-col gap-2 ${up ? 'justify-end' : 'justify-start'} overflow-hidden`}>
            {info.map((item, index) => {
                const isVisible = up ? (index < chosenIcon[chosen]) : (index >= chosenIcon[chosen]);
                const isSelected = index === chosenIcon[chosen];
                
                return (
                    <div 
                        key={index} 
                        className={`flex flex-col items-center justify-center w-full transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        style={{ 
                            height: "60px", // Fixed height to prevent layout shifts
                            display: isVisible ? 'flex' : 'none'
                        }}
                    >
                        <div 
                            className="flex items-center justify-center cursor-pointer transition-opacity duration-150 w-16 h-16"
                            onMouseEnter={() => {
                                setTimeout(() => {
                                    setChosenIcon((prev) => {
                                        const newChosenIcon = [...prev];
                                        newChosenIcon[chosen] = index;
                                        return newChosenIcon;
                                    });
                                }, 100);
                            }}
                        >
                            <img 
                                src={item.icon} 
                                alt={`item-${index}`}
                                className="transition-opacity duration-150 filter drop-shadow-md"
                                style={{
                                    opacity: isSelected ? 0.95 : 0.8,
                                    width: `${getIconSize(index)}px`,
                                    height: `${getIconSize(index)}px`
                                }}
                            />
                        </div>
                    </div>
                );
            })}
            
            {/* Text display panel - positioned absolutely to not affect layout */}
            {!up && chosenIcon[chosen] !== undefined && info[chosenIcon[chosen]] && (
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 rounded-lg text-white backdrop-blur-sm border border-white/20 z-10">
                    <h3 className="text-lg font-bold mb-2 text-blue-300">{info[chosenIcon[chosen]].title}</h3>
                    {info[chosenIcon[chosen]].company && (
                        <p className="text-base text-gray-300 mb-2">{info[chosenIcon[chosen]].company}</p>
                    )}
                    <div className="text-sm text-gray-200 max-h-32 overflow-y-auto custom-scrollbar">
                        {info[chosenIcon[chosen]].text.slice(0, 1).map((paragraph, pIndex) => (
                            <div key={pIndex}>
                                {paragraph.slice(0, 1).map((line, lIndex) => (
                                    <p key={lIndex} className="leading-relaxed">
                                        {line.length > 120 ? `${line.substring(0, 120)}...` : line}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Items;
