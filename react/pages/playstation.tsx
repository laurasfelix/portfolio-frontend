import { useEffect, useState, useRef } from "react";
import Menu from "@/components/playstation/Menu";
import Time from "@/components/playstation/Time";
import { useRouter } from 'next/router';

export default function Playstation() {
  const router = useRouter();
  const videoSource = "/videos/boot.mp4";
  const [isBoot, setIsBoot] = useState(() => {
    return typeof window !== "undefined"
      ? sessionStorage.getItem("playstationBooted") !== "true"
      : true;
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    let bootTimer: NodeJS.Timeout;

    const alreadyBooted = sessionStorage.getItem("playstationBooted");

    const loadSound = async () => {
      const audio = new Audio("/sounds/startup.mp3");
      audio.preload = "auto";
      soundRef.current = audio;
    };

    const handlePowerPress = async () => {
      if (!videoRef.current || !soundRef.current) return;
      try {
        await soundRef.current.play();
      } catch (_err) {
        // Ignore audio play errors as they are expected in some browsers
        console.debug('Audio playback failed:', _err);
      }
      bootTimer = setTimeout(() => {
        setIsBoot(false);
        sessionStorage.setItem("playstationBooted", "true");
      }, 10000);
    };

    if (!alreadyBooted) {
      loadSound().then(handlePowerPress);
    } else {
      setIsBoot(false);
    }

    const fadeTimer = setTimeout(() => setFadeIn(true), 100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(bootTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      // Reset any global or module-level state here
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-black">
      <button
        className="fixed top-6 left-6 z-50 bg-black/80 text-white border-2 border-white rounded-xl px-4 py-2 font-mono hover:bg-white hover:text-black transition"
        onClick={() => router.push('/')}
      >
        ← back
      </button>
      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoSource}
        autoPlay
        loop
        muted
        controls // TEMP: show controls for debugging
        poster="/images/ps3.png" // TEMP: fallback poster image
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        onError={() => setVideoError(true)}
      />
      {/* Fallback if video fails */}
      {videoError && (
        <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center z-0">
          <span className="text-white text-2xl">Video failed to load</span>
        </div>
      )}
      {/* Boot Screen Message */}
      {isBoot && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-opacity duration-[2000ms] ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-6xl md:text-8xl text-white/80 font-extralight">Portfolio by Laura</h1>
          <p className="text-xl md:text-2xl text-white/80 font-extralight">(sony don&apos;t sue me pls)</p>
        </div>
      )}
      {/* Main Menu */}
      {!isBoot && !videoError && (
        <div className="absolute inset-0 w-full h-full transition-opacity duration-[1000ms] overflow-hidden flex flex-col">
          <Time />
          <Menu />
        </div>
      )}
    </div>
  );
}
