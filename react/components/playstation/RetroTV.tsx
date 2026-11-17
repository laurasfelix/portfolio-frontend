import { useEffect, useRef, useState } from "react";
import PS3Console from "@/components/playstation/PS3Console";
import { unlockSoundsNow } from "@/lib/uiSound";

// The PS3 renders at 640x480 (the tube's own 4:3 shape, like a real SD TV) and
// is scaled to fit, so phones see the full XMB at a readable size.
const STAGE_W = 640;
const STAGE_H = 480;

/** TV static: random grey pixels redrawn every frame at low resolution. */
const Static = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const img = ctx.createImageData(canvas.width, canvas.height);
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let frame = 0;

        const draw = () => {
            const d = img.data;
            for (let i = 0; i < d.length; i += 4) {
                const v = (Math.random() * 255) | 0;
                d[i] = d[i + 1] = d[i + 2] = v;
                d[i + 3] = 255;
            }
            ctx.putImageData(img, 0, 0);
            if (!reduceMotion) frame = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={160} height={120} className="absolute inset-0 w-full h-full" aria-hidden />
            <div aria-hidden className="absolute inset-0 tv-roll-bar" />
        </>
    );
};

const Knob = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center gap-1">
        <div
            className="relative w-9 h-9 rounded-full shadow-[inset_0_-3px_4px_rgba(0,0,0,0.45),0_2px_3px_rgba(0,0,0,0.4)]"
            style={{ background: "radial-gradient(circle at 35% 30%, #6b6660, #2c2a27)" }}
        >
            <div className="absolute left-1/2 top-1 -translate-x-1/2 w-[3px] h-3 rounded bg-[#d8d2c4]" />
        </div>
        <span className="text-[9px] tracking-widest text-[#4a463f] uppercase">{label}</span>
    </div>
);

interface RetroTVProps {
    onBack: () => void;
}

const RetroTV = ({ onBack }: RetroTVProps) => {
    const [poweredOn, setPoweredOn] = useState(false);
    const [scale, setScale] = useState(0.35);
    const screenRef = useRef<HTMLDivElement>(null);
    const startupRef = useRef<HTMLAudioElement | null>(null);

    // Fit the 960x540 PS3 into the screen width (16:9 inside a 4:3 tube = letterbox, like the real thing)
    useEffect(() => {
        const el = screenRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_W));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => () => startupRef.current?.pause(), []);

    const togglePower = () => {
        if (poweredOn) {
            startupRef.current?.pause();
            setPoweredOn(false);
            return;
        }
        // Started inside the tap, so iOS lets both sounds play.
        unlockSoundsNow();
        const chime = new Audio("/sounds/startup.mp3");
        startupRef.current = chime;
        chime.play().catch(() => {});
        setPoweredOn(true);
    };

    return (
        <div className="relative min-h-dvh w-full overflow-hidden flex flex-col items-center justify-center px-2 py-14 tv-room">
            <button
                onClick={onBack}
                className="fixed top-5 left-5 z-50 bg-black/70 text-white border-2 border-white rounded-xl px-4 py-2"
            >
                ← back
            </button>

            <div className="relative w-full max-w-[560px]">
                {/* rabbit-ear antenna */}
                <div aria-hidden className="relative h-14 flex justify-center">
                    <div className="absolute bottom-3 left-1/2 w-[2px] h-20 bg-gradient-to-t from-[#8a8a8a] to-[#e5e5e5] origin-bottom -rotate-[32deg]" />
                    <div className="absolute bottom-3 left-1/2 w-[2px] h-24 bg-gradient-to-t from-[#8a8a8a] to-[#e5e5e5] origin-bottom rotate-[26deg]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-6 rounded-t-full bg-[#2c2a27] shadow-md" />
                </div>

                {/* cabinet */}
                <div
                    className="relative rounded-[22px] p-2 pb-2 shadow-[0_25px_50px_rgba(0,0,0,0.6),inset_0_2px_0_rgba(255,255,255,0.5),inset_0_-6px_10px_rgba(0,0,0,0.25)]"
                    style={{ background: "linear-gradient(180deg, #d9d2c3 0%, #c4bcab 55%, #aaa291 100%)" }}
                >
                    {/* bezel */}
                    <div className="rounded-[18px] p-1.5 bg-[#1d1c1a] shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)]">
                        {/* the tube */}
                        <div
                            ref={screenRef}
                            className="relative w-full aspect-[4/3] overflow-hidden bg-black"
                            style={{ borderRadius: "6% / 8%" }}
                        >
                            {poweredOn ? (
                                <div className="absolute inset-0 tv-power-on">
                                    <div
                                        className="absolute left-0 origin-top-left"
                                        style={{
                                            width: STAGE_W,
                                            height: STAGE_H,
                                            top: `calc(50% - ${(STAGE_H * scale) / 2}px)`,
                                            transform: `scale(${scale})`,
                                        }}
                                    >
                                        <PS3Console skipBootIfSeen={false} playStartup={false} />
                                    </div>
                                </div>
                            ) : (
                                <Static />
                            )}

                            {/* glass: scanlines, curvature vignette, glare */}
                            <div aria-hidden className="pointer-events-none absolute inset-0 tv-scanlines" />
                            <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_18px_4px_rgba(0,0,0,0.7)]" style={{ borderRadius: "6% / 8%" }} />
                            <div aria-hidden className="pointer-events-none absolute inset-0 tv-glare" />
                        </div>
                    </div>

                    {/* control panel */}
                    <div className="mt-2 flex items-center justify-between px-2">
                        <div aria-hidden className="w-24 h-10 rounded-md tv-grille" />
                        <span className="text-[10px] font-bold tracking-[0.3em] text-[#5b564d] select-none">LAURAVISION</span>
                        <div className="flex items-end gap-3">
                            <Knob label="ch" />
                            <Knob label="vol" />
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    onClick={togglePower}
                                    aria-label={poweredOn ? "turn the PS3 off" : "turn the PS3 on"}
                                    aria-pressed={poweredOn}
                                    className="relative w-11 h-11 rounded-full active:translate-y-[1px] shadow-[inset_0_-3px_4px_rgba(0,0,0,0.45),0_3px_4px_rgba(0,0,0,0.45)]"
                                    style={{ background: "radial-gradient(circle at 35% 30%, #4b4743, #1b1a18)" }}
                                >
                                    <span className="text-[#d8d2c4] text-lg leading-none">⏻</span>
                                    <span
                                        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                                            poweredOn ? "bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.8)]" : "bg-red-600 shadow-[0_0_6px_1px_rgba(220,38,38,0.7)]"
                                        }`}
                                    />
                                </button>
                                <span className="text-[9px] tracking-widest text-[#4a463f] uppercase">power</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* feet */}
                <div aria-hidden className="flex justify-between px-10">
                    <div className="w-14 h-3 rounded-b-lg bg-[#2c2a27]" />
                    <div className="w-14 h-3 rounded-b-lg bg-[#2c2a27]" />
                </div>
            </div>

            <p className={`mt-8 text-white/70 text-lg tracking-wide transition-opacity ${poweredOn ? "opacity-0" : "tv-hint"}`}>
                press power to start
            </p>
        </div>
    );
};

export default RetroTV;
