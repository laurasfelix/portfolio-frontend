import { useEffect, useRef } from "react";
import { itemProp } from "@/utils/itemInfo";

/** The PS3 on-screen "circle" prompt: a dark glossy button with a red-pink ring. */
const CircleButton = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
        <defs>
            <radialGradient id="ps3-btn-face" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="60%" stopColor="#1c1c1c" />
                <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
            <linearGradient id="ps3-btn-rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8a8a8a" />
                <stop offset="100%" stopColor="#2a2a2a" />
            </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#ps3-btn-face)" stroke="url(#ps3-btn-rim)" strokeWidth="1.5" />
        <ellipse cx="20" cy="11" rx="11" ry="5" fill="#fff" opacity="0.12" />
        <circle cx="20" cy="20" r="8.5" fill="none" stroke="#ff6b6b" strokeWidth="3" />
    </svg>
);

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
                        <CircleButton className="w-11 h-11 @3xl:w-8 @3xl:h-8" />
                        back
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default GameReader;
