import { useEffect, useRef, useState } from "react";
import PS3Console from "@/components/playstation/PS3Console";
import Jumpscare, { nextJumpscareIndex, playScareNoise } from "@/components/playstation/Jumpscare";
import { unlockSoundsNow } from "@/lib/uiSound";
import { Caveat } from "next/font/google";

const handwriting = Caveat({ weight: ["500", "700"], subsets: ["latin"] });

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
            <canvas ref={canvasRef} width={160} height={120} className="absolute inset-0 w-full h-full opacity-80" aria-hidden />
            {/* the tube's green-grey tint shows through the noise */}
            <div aria-hidden className="absolute inset-0 bg-[#2f3b37] mix-blend-color" />
            <div aria-hidden className="absolute inset-0 tv-roll-bar" />
        </>
    );
};

interface RetroTVProps {
    onBack: () => void;
}

const RetroTV = ({ onBack }: RetroTVProps) => {
    const [poweredOn, setPoweredOn] = useState(false);
    const [scareIndex, setScareIndex] = useState<number | null>(null);
    const scareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [scale, setScale] = useState(0.5);
    const screenRef = useRef<HTMLDivElement>(null);
    const startupRef = useRef<HTMLAudioElement | null>(null);

    // Fit the 640x480 PS3 into the tube
    useEffect(() => {
        const el = screenRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_W));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(
        () => () => {
            startupRef.current?.pause();
            if (scareTimer.current) clearTimeout(scareTimer.current);
        },
        []
    );

    const togglePower = () => {
        if (poweredOn) {
            startupRef.current?.pause();
            if (scareTimer.current) clearTimeout(scareTimer.current);
            setScareIndex(null);
            setPoweredOn(false);
            return;
        }
        // Everything audio starts inside the tap so iOS allows it.
        unlockSoundsNow();
        playScareNoise();
        // The chime starts muted now and is unmuted once the scare is over.
        const chime = new Audio("/sounds/startup.mp3");
        chime.muted = true;
        startupRef.current = chime;
        chime.play().catch(() => {});

        setScareIndex(nextJumpscareIndex());
        setPoweredOn(true);
        scareTimer.current = setTimeout(() => {
            setScareIndex(null);
            chime.currentTime = 0;
            chime.muted = false;
        }, 750);
    };

    return (
        <div className="relative min-h-dvh w-full overflow-hidden flex flex-col items-center justify-center px-2 pt-16 pb-10 tv-wallpaper">
            <button
                onClick={onBack}
                className="fixed top-5 left-5 z-50 bg-black/70 text-white border-2 border-white rounded-xl px-4 py-2"
            >
                ← back
            </button>

            <div className="relative w-full max-w-[560px] flex flex-col items-center">
                {/* cabinet: matte black plastic */}
                <div className={`relative w-full rounded-[10px] px-[4%] pt-[3.5%] pb-0 tv-cabinet ${scareIndex !== null ? "tv-shake" : ""}`}>
                    <span className="absolute top-[1.2%] left-[4.5%] text-[7px] tracking-wider text-white/35 select-none">
                        flat display
                    </span>

                    {/* the tube */}
                    <div className="rounded-[6px] p-[3px] bg-[#0b0b0b] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.06)]">
                        <div
                            ref={screenRef}
                            className="relative w-full aspect-[4/3] overflow-hidden bg-[#26302d]"
                            style={{ borderRadius: "3% / 4%" }}
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
                            {scareIndex !== null && <Jumpscare index={scareIndex} />}

                            {/* glass: faint aperture-grille lines, edge shadow, soft reflection */}
                            <div aria-hidden className="pointer-events-none absolute inset-0 tv-grille-lines" />
                            <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_16px_3px_rgba(0,0,0,0.65)]" style={{ borderRadius: "3% / 4%" }} />
                            <div aria-hidden className="pointer-events-none absolute inset-0 tv-glare" />
                        </div>
                    </div>

                    {/* badge */}
                    <div className="py-[2.2%] text-center select-none">
                        <span className="text-[11px] font-bold tracking-[0.35em] text-[#cfcfcf]">LAURAVISION</span>
                    </div>

                    {/* speaker strip with the recessed control panel */}
                    <div className="relative -mx-[4.6%] h-9 rounded-b-[10px] tv-speaker flex items-center justify-center">
                        <div className="flex items-center gap-2 h-6 px-2 rounded-[3px] bg-[#141414] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)]">
                            <div aria-hidden className="w-24 h-3.5 rounded-[2px] bg-[#1d1d1d] shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]" />
                            <span
                                aria-hidden
                                className={`w-1.5 h-1.5 rounded-full ${
                                    poweredOn ? "bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.8)]" : "bg-red-600 shadow-[0_0_5px_1px_rgba(220,38,38,0.7)]"
                                }`}
                            />
                            <button
                                onClick={togglePower}
                                aria-label={poweredOn ? "turn the PS3 off" : "turn the PS3 on"}
                                aria-pressed={poweredOn}
                                className="w-4 h-4 rounded-full bg-[#2b2b2b] border border-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_1px_rgba(0,0,0,0.6)] active:translate-y-[0.5px] relative"
                            >
                                {/* bigger invisible tap target */}
                                <span className="absolute -inset-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* wooden stand */}
                <div aria-hidden className="w-[108%] h-4 rounded-[3px] tv-wood-top" />
                <div aria-hidden className="w-[104%] h-10 tv-wood-front" />
            </div>

            {/* a note taped to the wall, because the wallpaper eats plain text */}
            <div className={`${handwriting.className} relative mt-7 -rotate-3`}>
                <div aria-hidden className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rotate-2 bg-[#f3e9c6]/80 shadow-sm" />
                <div className="tv-note px-6 pt-4 pb-3 shadow-[2px_6px_12px_rgba(60,35,15,0.35)]">
                    <p className="text-[22px] font-bold leading-none text-[#2b2b6b] underline decoration-2 underline-offset-4">manual for tv:</p>
                    <p className="mt-2 text-[26px] font-medium leading-none text-[#2b2b6b]">turn it on, dummy</p>
                </div>
            </div>
        </div>
    );
};

export default RetroTV;
