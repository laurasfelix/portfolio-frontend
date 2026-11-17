import { Dispatch, SetStateAction } from 'react';
import itemInfo from "@/utils/itemInfo";

interface ItemsProp {
    chosen: number;
    src: number;
    chosenIcon: number[];
    setChosenIcon: Dispatch<SetStateAction<number[]>>;
    up: boolean;
}

const SNIPPET_CHARS = 110;

const snippet = (text: string[][]) => {
    const first = (text[0]?.[0] ?? "").replace(/\s+/g, " ").trim();
    return first.length > SNIPPET_CHARS ? `${first.slice(0, SNIPPET_CHARS)}…` : first;
};

/**
 * One column's item list, laid out like the PS3 XMB: icons stacked vertically,
 * each item's title (and, for the selected one, its description) to the RIGHT
 * of its icon, spilling over the empty space of the neighbouring columns.
 */
const Items = ({ chosen, src, chosenIcon, setChosenIcon, up }: ItemsProp) => {
    const info = itemInfo[chosen];

    if (chosen !== src) {
        return <div className="w-full flex-1"></div>; // Maintain layout space
    }

    const select = (index: number) => {
        setChosenIcon((prev) => {
            if (prev[chosen] === index) return prev;
            const next = [...prev];
            next[chosen] = index;
            return next;
        });
    };

    return (
        // clip vertically, but let the text run sideways past the column
        <div className={`relative z-30 w-full flex-1 flex flex-col gap-2 ${up ? 'justify-end' : 'justify-start'} overflow-x-visible overflow-y-clip`}>
            {info.map((item, index) => {
                const isVisible = up ? index < chosenIcon[chosen] : index >= chosenIcon[chosen];
                if (!isVisible) return null;

                const isSelected = index === chosenIcon[chosen];
                const iconSize = isSelected ? 48 : 40;
                const description = isSelected && !up ? snippet(item.text) : "";

                return (
                    <div
                        key={index}
                        className="relative flex items-start justify-center w-full shrink-0 cursor-pointer"
                        style={{ minHeight: description ? 104 : 60 }}
                        onMouseEnter={() => select(index)}
                        onClick={() => select(index)}
                    >
                        <div className="flex items-center justify-center w-16 h-[60px] shrink-0">
                            <img
                                src={item.icon}
                                alt=""
                                className="transition-all duration-150 filter drop-shadow-md"
                                style={{
                                    opacity: isSelected ? 1 : 0.75,
                                    objectFit: "contain",
                                    width: `${iconSize}px`,
                                    height: `${iconSize}px`,
                                }}
                            />
                        </div>

                        {/* text sits to the right of the icon, like the real XMB */}
                        <div
                            className="absolute top-0 left-[calc(50%+2.25rem)] h-[60px] flex flex-col justify-center text-left w-max max-w-[22rem]"
                        >
                            <p
                                className={`leading-tight whitespace-nowrap transition-all duration-150 ${
                                    isSelected ? "text-xl text-white" : "text-base text-white/60"
                                }`}
                                style={isSelected ? { textShadow: "0 0 10px rgba(255,255,255,0.45)" } : undefined}
                            >
                                {item.title}
                            </p>
                            {item.company && (
                                <p className={`leading-tight whitespace-nowrap ${isSelected ? "text-sm text-white/75" : "text-xs text-white/45"}`}>
                                    {item.company}
                                </p>
                            )}
                        </div>
                        {description && (
                            <p className="absolute top-[60px] left-[calc(50%+2.25rem)] w-[22rem] max-w-[60vw] @3xl:max-w-[22rem] text-sm leading-snug text-white/70 text-left">
                                {description}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Items;
