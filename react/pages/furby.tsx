import { useState, useRef } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Body from "@/components/furby/Body";
import InputBox from "@/components/furby/InputBox";

export default function Furby() {
    const router = useRouter();
    const [inputInteract, setInputInteract] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [progress, setProgress] = useState(0); // For progress bar
    const [showProgress, setShowProgress] = useState(false);
    const [demonEyes, setDemonEyes] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null!) as React.RefObject<HTMLAudioElement>;
    const progressInterval = useRef<NodeJS.Timeout | null>(null);
    const THINKING_TIME = 4000; // ms, adjust as needed

    // Progress bar logic
    const startProgress = () => {
        setShowProgress(true);
        setProgress(0);
        let elapsed = 0;
        const interval = 50;
        progressInterval.current = setInterval(() => {
            elapsed += interval;
            setProgress(Math.min(100, (elapsed / THINKING_TIME) * 100));
            if (elapsed >= THINKING_TIME) {
                clearInterval(progressInterval.current!);
                setShowProgress(false);
            }
        }, interval);
    };
    const stopProgress = () => {
        setShowProgress(false);
        setProgress(0);
        if (progressInterval.current) clearInterval(progressInterval.current);
    };

    // Stop button logic
    const stopSpeaking = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsTalking(false);
        setDemonEyes(true);
        setTimeout(() => setDemonEyes(false), 2000); // Demon eyes for 2 seconds
    };

    // Pass progress logic to InputBox
    return (
        <div className="relative w-full h-full">
            <button
                className="fixed top-6 left-6 z-50 bg-black/80 text-white border-2 border-white rounded-xl px-4 py-2 font-mono hover:bg-white hover:text-black transition"
                onClick={() => router.push('/')}
            >
                ← back
            </button>

            <div className="w-full h-screen flex flex-row p-5 bg-black">
                {/* Left column: User Guide */}
                <div className="flex-1 flex flex-col items-end justify-center pr-6">
                    <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl px-6 py-6 text-white text-left max-w-xs shadow-2xl animate-fade-in">
                        <div className="flex items-center mb-2">
                            <Image src="/images/furbotron.svg" alt="Furbotron icon" width={32} height={32} className="mr-2" />
                            <span className="font-extrabold text-lg text-white/80">Furbotron 3000 Guide</span>
                        </div>
                        <ol className="list-decimal list-inside text-base space-y-1">
                            <li>type your question about Laura.</li>
                            <li>wait for the animation while Furbotron thinks.</li>
                            <li>press <span className="font-bold text-red-400">Stop</span> to interrupt him at any time, at your own risk.</li>
                        </ol>
                        <div className="italic text-white/60 mt-2 text-sm">He is brief, robotic, and a little scary!</div>
                    </div>
                </div>
                {/* Main column: Furby and Input */}
                <div className="flex-3 flex flex-col items-center">
                    <Body 
                        isTalking={isTalking} 
                        isThinking={isThinking} 
                        interact={inputInteract}
                        demonEyes={demonEyes}
                    />
                    {/* Stop Button */}
                    {isTalking && (
                        <div className="w-full flex justify-center mt-2">
                            <button
                                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 hover:from-red-700 hover:to-pink-800 transition-all duration-200 border-2 border-white"
                                onClick={stopSpeaking}
                            >
                                <span className="mr-2">🛑</span> Stop
                            </button>
                        </div>
                    )}
                    {/* Progress Bar */}
                    {showProgress && (
                        <div className="w-48 h-2 bg-gray-200 rounded-full mt-4">
                            <div 
                                className="h-full bg-blue-500 rounded-full transition-all duration-50" 
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                    {/* Input box */}
                    <div className="w-full mt-6 flex items-center justify-center">
                        <InputBox 
                            setIsTalking={setIsTalking} 
                            isThinking={isThinking} 
                            setIsThinking={setIsThinking} 
                            setInteract={setInputInteract} 
                            startProgress={startProgress}
                            stopProgress={stopProgress}
                            audioRef={audioRef}
                        />
                    </div>
                </div>
                {/* Right column */}
                <div className="flex-1" />
            </div>
        </div>
    );
}
