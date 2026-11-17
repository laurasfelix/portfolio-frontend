import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Jura } from "next/font/google";
import PS3Console from "@/components/playstation/PS3Console";
import RetroTV from "@/components/playstation/RetroTV";

// The real XMB font (SCE-PS3 Rodin) isn't licensable; Jura is a free, close lookalike.
const xmbFont = Jura({ weight: ["300", "400", "500"], subsets: ["latin"] });

export default function Playstation() {
  const router = useRouter();
  const goBack = () => router.push("/#extras");

  // Decide after mount so phones never start the full-screen PS3 (and its sounds) by accident.
  const [mode, setMode] = useState<"tv" | "full" | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMode(mq.matches ? "tv" : "full");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className={`${xmbFont.className} relative w-full min-h-dvh bg-black`}>
      {mode === "tv" && <RetroTV onBack={goBack} />}
      {mode === "full" && (
        <>
          <button
            className="fixed top-6 left-6 z-50 bg-black/80 text-white border-2 border-white rounded-xl px-4 py-2 hover:bg-white hover:text-black transition"
            onClick={goBack}
          >
            ← back
          </button>
          <div className="w-full h-dvh">
            <PS3Console />
          </div>
        </>
      )}
    </div>
  );
}
