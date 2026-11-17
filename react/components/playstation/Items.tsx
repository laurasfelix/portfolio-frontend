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
const COLUMNS = 5;
const COL_CQW = 18; // each column is 20% of the 90%-wide menu = 18% of the console width
/** The menu slides left so the selected column sits at most this many columns in (see Menu). */
export const MAX_SELECTED_POSITION = 2;

const snippet = (text: string[][]) => {
    const first = (text[0]?.[0] ?? "").replace(/\s+/g, " ").trim();
    return first.length > SNIPPET_CHARS ? `${first.slice(0, SNIPPET_CHARS)}…` : first;
};

/**
 * One column's item list, laid out like the PS3 XMB: icons stacked vertically
 * with each item's title (and the selected item's description) beside the icon.
 * Text is in normal flow so rows push each other down instead of overlapping.
 */
const Items = ({ chosen, src, chosenIcon, setChosenIcon, up }: ItemsProp) => {
    const info = itemInfo[chosen];

    if (chosen !== src) {
        return <div className="w-full flex-1"></div>; // Maintain layout space
    }

    // after the menu slides, this column sits at `position`; the text gets the room to its right
    const position = Math.min(src, MAX_SELECTED_POSITION);
    const columnsOfRoom = COLUMNS - position - 0.5;
    const textMaxWidth = `min(22rem, calc(${columnsOfRoom * COL_CQW}cqw - 2.75rem))`;

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
        <div className={`relative z-30 w-full flex-1 flex flex-col gap-1 ${up ? 'justify-end' : 'justify-start'} overflow-x-visible overflow-y-clip`}>
            {info.map((item, index) => {
                const isVisible = up ? index < chosenIcon[chosen] : index >= chosenIcon[chosen];
                if (!isVisible) return null;

                const isSelected = index === chosenIcon[chosen];
                const iconSize = isSelected ? 48 : 40;
                const description = isSelected && !up ? snippet(item.text) : "";

                return (
                    <div
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={item.company ? `${item.title}, ${item.company}` : item.title}
                        className="flex flex-row w-full shrink-0 cursor-pointer select-none pl-[calc(50%-2rem)]"
                        // desktop: hover selects; touch: only a real tap selects (iOS hover emulation is unreliable)
                        onPointerEnter={(e) => e.pointerType === "mouse" && select(index)}
                        onClick={() => select(index)}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && select(index)}
                    >
                        <div className="flex items-center justify-center w-16 h-[56px] shrink-0">
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

                        <div
                            className="shrink-0 w-max flex flex-col items-start text-left pt-2 pb-1 pl-1"
                            style={{ maxWidth: textMaxWidth }}
                        >
                            <p
                                className={`leading-tight transition-colors duration-150 ${
                                    isSelected ? "text-xl text-white" : "text-base text-white/60"
                                }`}
                                style={isSelected ? { textShadow: "0 0 10px rgba(255,255,255,0.45)" } : undefined}
                            >
                                {item.title}
                            </p>
                            {item.company && (
                                <p className={`leading-tight ${isSelected ? "text-sm text-white/75" : "text-xs text-white/45"}`}>
                                    {item.company}
                                </p>
                            )}
                            {description && (
                                <p className="mt-1 text-sm leading-snug text-white/70">{description}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Items;
