import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { IM_Fell_English } from "next/font/google";
import Body from "@/components/furby/Body";
import InputBox from "@/components/furby/InputBox";
import { stopSpeaking as stopVoice } from "@/lib/furbotronClient";

const fell = IM_Fell_English({ weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export default function Furby() {
    const [inputInteract, setInputInteract] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [demonEyes, setDemonEyes] = useState(false);
    const [caption, setCaption] = useState("");

    const silenceHim = () => {
        stopVoice();
        setIsTalking(false);
        setCaption("you should not have done that.");
        setDemonEyes(true);
        setTimeout(() => setDemonEyes(false), 2000);
    };

    // Stop talking if the visitor leaves mid-sentence
    useEffect(() => () => stopVoice(), []);

    return (
        <div className={`${fell.className} relative min-h-dvh w-full overflow-hidden bg-black text-[#d9c9b0]`}>
            <Head>
                <title>furbotron 3000</title>
            </Head>

            {/* candlelight behind him, breathing */}
            <div
                aria-hidden
                className={`pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[70vw] md:h-[70vw] rounded-full furby-glow ${
                    isTalking || demonEyes ? "furby-glow-hot" : ""
                }`}
            />
            {/* vignette + grain */}
            <div aria-hidden className="pointer-events-none absolute inset-0 furby-vignette" />
            <div aria-hidden className="pointer-events-none absolute inset-0 furby-grain" />

            <Link
                href="/#extras"
                className="fixed top-5 left-5 z-50 italic text-lg text-[#d9c9b0]/60 hover:text-[#d9c9b0] transition-colors"
            >
                ← leave
            </Link>

            <main className="relative z-10 flex min-h-dvh flex-col items-center px-5 pt-16 pb-10 md:pt-10">
                <header className="text-center mb-2 md:mb-4">
                    <h1 className="furby-flicker text-3xl md:text-5xl tracking-[0.35em] text-[#b3121b] uppercase">
                        Furbotron
                    </h1>
                    <p className="italic text-base md:text-lg text-[#d9c9b0]/50 mt-1">
                        built by laura, the creator. he remembers everything about laura.
                    </p>
                </header>

                <Body
                    isTalking={isTalking}
                    isThinking={isThinking}
                    interact={inputInteract}
                    demonEyes={demonEyes}
                />

                {/* what he says, like subtitles in an old film */}
                <div className="min-h-[4.5rem] max-w-xl text-center mt-2 px-2" aria-live="polite">
                    {isThinking ? (
                        <p className="italic text-lg text-[#d9c9b0]/60 furby-flicker">he is remembering…</p>
                    ) : caption ? (
                        <p className="text-lg md:text-xl leading-snug text-[#e8d8bd]">“{caption}”</p>
                    ) : null}
                </div>

                {isTalking && (
                    <button
                        onClick={silenceHim}
                        className="mt-1 italic text-[#b3121b] tracking-widest uppercase text-sm hover:text-red-500 transition-colors"
                    >
                        silence him
                    </button>
                )}

                <div className="w-full max-w-xl mt-4">
                    <InputBox
                        setIsTalking={setIsTalking}
                        isThinking={isThinking}
                        setIsThinking={setIsThinking}
                        setInteract={setInputInteract}
                        onReply={setCaption}
                    />
                </div>

                <ol className="mt-8 space-y-1 text-center text-sm md:text-base italic text-[#d9c9b0]/40">
                    <li>i. ask him about laura.</li>
                    <li>ii. wait while he remembers.</li>
                    <li>iii. do not interrupt him.</li>
                </ol>
            </main>
        </div>
    );
}
