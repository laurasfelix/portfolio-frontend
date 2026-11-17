import { useEffect, useRef } from "react";
import { itemProp } from "@/utils/itemInfo";

interface GameReaderProps {
    item: itemProp;
    onClose: () => void;
}

/**
 * Opening an item "launches" it like a game: the XMB fades to black and the
 * item takes over the whole PS3 screen as something you can scroll and read.
 * Sizes use container queries, so text stays readable inside the small phone TV
 * (@3xl = the full-screen desktop PS3).
 */
const GameReader = ({ item, onClose }: GameReaderProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key === "Backspace") onClose();
        };
        window.addEventListener("keydown", onKey);
        scrollRef.current?.focus();
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const paragraphs = item.text.filter((group) => group.some((line) => line.trim() !== ""));

    return (
        <div className="absolute inset-0 z-[60] bg-black ps3-launch" role="dialog" aria-label={item.title}>
            {/* soft PS3-style backdrop */}
            <div aria-hidden className="absolute inset-0 ps3-reader-bg" />

            <div className="relative h-full flex flex-col ps3-launch-content">
                <header className="shrink-0 flex items-center gap-4 @3xl:gap-6 px-8 @3xl:px-16 pt-8 @3xl:pt-12 pb-4 border-b border-white/10">
                    <img src={item.icon} alt="" className="w-16 h-16 @3xl:w-20 @3xl:h-20 object-contain drop-shadow-lg" />
                    <div className="min-w-0">
                        <h2 className="text-[40px] @3xl:text-4xl leading-tight text-white font-light">{item.title}</h2>
                        {item.company && <p className="text-[28px] @3xl:text-xl text-white/60">{item.company}</p>}
                    </div>
                </header>

                <div
                    ref={scrollRef}
                    tabIndex={-1}
                    className="flex-1 overflow-y-auto overscroll-contain px-8 @3xl:px-16 py-6 @3xl:py-10 focus:outline-none custom-scrollbar"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <div className="max-w-none @3xl:max-w-3xl space-y-6 @3xl:space-y-5">
                        {paragraphs.length === 0 && (
                            <p className="text-[30px] @3xl:text-lg text-white/50 italic">nothing here yet…</p>
                        )}
                        {paragraphs.map((group, gi) => (
                            <section key={gi} className="space-y-4 @3xl:space-y-3">
                                {group.map((line, li) => (
                                    <p
                                        key={li}
                                        className="text-[30px] @3xl:text-lg leading-snug @3xl:leading-relaxed text-white/90 whitespace-pre-line"
                                    >
                                        {line.trim()}
                                    </p>
                                ))}
                                {item.pictures?.[gi] && (
                                    <img
                                        src={item.pictures[gi]}
                                        alt=""
                                        className="rounded-lg w-full @3xl:w-2/3 border border-white/10"
                                    />
                                )}
                            </section>
                        ))}
                    </div>
                </div>

                <footer className="shrink-0 flex justify-end items-center gap-6 px-8 @3xl:px-16 py-4 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-[28px] @3xl:text-lg text-white/80 hover:text-white"
                    >
                        <span className="inline-flex items-center justify-center w-9 h-9 @3xl:w-7 @3xl:h-7 rounded-full border-2 border-[#ff6b6b] text-[#ff6b6b] text-base">
                            ○
                        </span>
                        back
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default GameReader;
