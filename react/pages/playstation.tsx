import { useEffect, useState, useRef } from "react";
import Menu from "@/components/playstation/Menu";
import Time from "@/components/playstation/Time";

export default function Playstation() {
    const videoSource = "/videos/boot.mp4";
    const [isBoot, setIsBoot] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const soundRef = useRef<HTMLAudioElement | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    // Handle video playback and boot sequence
    useEffect(() => {
      // Check if already booted in this session
      const alreadyBooted = typeof window !== 'undefined' ? 
        sessionStorage.getItem("playstationBooted") : null;
      
      // Set up fade-in animations
      setTimeout(() => {
        setFadeIn(true);
      }, 100);

      if (!alreadyBooted) {
        // Load and play sound
        async function loadSound() {
          console.log("Loading Sound");
          const audio = new Audio("/sounds/startup.mp3");
          audio.preload = "auto";
          soundRef.current = audio;
          
          // Play audio when video is ready
          if (videoRef.current) {
            videoRef.current.oncanplay = async () => {
              try {
                await audio.play();
              } catch (error) {
                console.error("Audio play failed:", error);
              }
            };
          }
        }

        loadSound();
        
        // Set a timeout to end boot screen
        setTimeout(() => {
          setIsBoot(false);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem("playstationBooted", "true");
          }
        }, 10000);
      } else {
        setIsBoot(false); // skip boot screen
      }
    }, []);

    return (
      <div className="bg-black w-screen h-screen flex items-center justify-center">
        {/* Main container with conditional classes for animations */}
        <div 
          className={`w-full h-full flex ${isBoot ? 'justify-center' : 'justify-start'} items-end
                     ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[8000ms]`}
        >
          {/* Background video */}
          <video 
            ref={videoRef}
            src={videoSource} 
            autoPlay 
            loop 
            muted 
            className="absolute top-0 left-0 w-full h-full object-cover -z-10" 
          />

          {/* Boot screen welcome message */}
          {isBoot && (
            <div className={`mr-[20%] flex flex-col items-center 
                          ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[2000ms]`}>
              <h1 className="text-4xl text-white font-extralight">Portfolio by Laura</h1>   
              <p className="text-2xl text-white font-extralight">(sony don't sue me pls)</p>      
            </div>
          )}

          {/* Main menu after boot */}
          {!isBoot && (
            <div className="w-full h-full transition-opacity duration-[1000ms]">
              <Time />
              <Menu />
            </div>
          )}
        </div>
      </div>
    );
}
