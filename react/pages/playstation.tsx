import { useEffect, useState, useRef } from "react";
import Menu from "@/components/playstation/Menu";
import Time from "@/components/playstation/Time";

export default function Playstation() {
  const videoSource = "/videos/boot.mp4";
  const [isBoot, setIsBoot] = useState(() => {
    return typeof window !== "undefined"
      ? sessionStorage.getItem("playstationBooted") !== "true"
      : true;
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    let bootTimer: NodeJS.Timeout;

    const alreadyBooted = sessionStorage.getItem("playstationBooted");

    const loadSound = async () => {
      console.log("Loading Sound");
      const audio = new Audio("/sounds/startup.mp3");
      audio.preload = "auto";
      soundRef.current = audio;
    };

    const handlePowerPress = async () => {
      if (!videoRef.current || !soundRef.current) return;

      console.log("Playing Video and Audio...");
      try {
        await soundRef.current.play();
      } catch (err) {
        console.error("Audio play error:", err);
      }

      // Auto-transition after 10s
      bootTimer = setTimeout(() => {
        setIsBoot(false);
        sessionStorage.setItem("playstationBooted", "true");
      }, 10000);
    };

    // Start boot sequence
    if (!alreadyBooted) {
      loadSound().then(handlePowerPress);
    } else {
      setIsBoot(false); // skip boot screen
    }

    // Fade in UI
    const fadeTimer = setTimeout(() => setFadeIn(true), 100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(bootTimer);
    };
  }, []);

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center overflow-hidden">
      <div
        className={`w-full h-full flex items-end ${
          isBoot ? "justify-center" : "justify-start"
        } transition-opacity duration-[8000ms] ${fadeIn ? "opacity-100" : "opacity-0"}`}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src={videoSource}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />

        {/* Boot Screen Message */}
        {isBoot && (
          <div
            className={`ml-[30%] mb-[20%] flex flex-col items-center transition-opacity duration-[2000ms] ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-8xl text-white/80 font-extralight">Portfolio by Laura</h1>
            <p className="text-xl md:text-2xl text-white/80 font-extralight">(sony don&apos;t sue me pls)</p>
          </div>
        )}

        {/* Main Menu */}
        {!isBoot && (
          <div className="w-full h-full transition-opacity duration-[1000ms] overflow-hidden">
            <Time />
            <Menu />
          </div>
        )}
      </div>
    </div>
  );
}
