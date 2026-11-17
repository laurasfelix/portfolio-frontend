import { useEffect, useState, useRef } from "react";
import Menu from "@/components/playstation/Menu";
import Time from "@/components/playstation/Time";
import GameReader from "@/components/playstation/GameReader";
import { itemProp } from "@/utils/itemInfo";

interface PS3ConsoleProps {
    /** Skip the boot screen if it already ran this browser session (desktop). */
    skipBootIfSeen?: boolean;
    /** Play the startup chime itself. The TV plays it from the power-button tap instead. */
    playStartup?: boolean;
}

/**
 * The PS3 itself: boot video, boot title, then the XMB menu.
 * Fills its parent and lays out by its own width (container queries), so it
 * looks like the desktop version whether it's full screen or inside the TV.
 */
const PS3Console = ({ skipBootIfSeen = true, playStartup = true }: PS3ConsoleProps) => {
    const [isBoot, setIsBoot] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const soundRef = useRef<HTMLAudioElement | null>(null);
    const [openItem, setOpenItem] = useState<itemProp | null>(null);

    const launch = (item: itemProp) => {
        // started inside the tap, so iOS allows it
        new Audio("/sounds/project_click.mp3").play().catch(() => {});
        setOpenItem(item);
    };

    useEffect(() => {
        let bootTimer: ReturnType<typeof setTimeout> | undefined;

        if (skipBootIfSeen && sessionStorage.getItem("playstationBooted") === "true") {
            setIsBoot(false);
        } else {
            if (playStartup) {
                const audio = new Audio("/sounds/startup.mp3");
                soundRef.current = audio;
                audio.play().catch(() => {
                    /* blocked until the visitor interacts; fine */
                });
            }
            bootTimer = setTimeout(() => {
                setIsBoot(false);
                sessionStorage.setItem("playstationBooted", "true");
            }, 10000);
        }

        const fadeTimer = setTimeout(() => setFadeIn(true), 100);

        return () => {
            clearTimeout(fadeTimer);
            if (bootTimer) clearTimeout(bootTimer);
            soundRef.current?.pause(); // stop the startup chime if you leave mid-boot
        };
    }, [skipBootIfSeen, playStartup]);

    return (
        <div className="@container relative w-full h-full overflow-hidden bg-black">
            <video
                src="/videos/boot.mp4"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                aria-hidden="true"
                poster="/images/ps3.png"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                onError={() => setVideoError(true)}
            />
            {videoError && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-0">
                    <span className="text-white text-2xl">Video failed to load</span>
                </div>
            )}
            {isBoot && (
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-opacity duration-[2000ms] ${
                        fadeIn ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h1 className="text-6xl @5xl:text-8xl text-white/80 font-light whitespace-nowrap">Portfolio by Laura</h1>
                    <p className="text-2xl text-white/80 font-light">(sony don&apos;t sue me pls)</p>
                </div>
            )}
            {!isBoot && !videoError && (
                <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col">
                    <Time />
                    <Menu onOpen={launch} />
                </div>
            )}
            {openItem && <GameReader item={openItem} onClose={() => setOpenItem(null)} />}
        </div>
    );
};

export default PS3Console;
