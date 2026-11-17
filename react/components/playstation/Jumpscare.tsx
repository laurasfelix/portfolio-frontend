// Original jumpscare frames, drawn in code (no stock or copyrighted images).
// One is picked per power-on, rotating so it's different every time.

const PaleFace = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
            <radialGradient id="pf-skin" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f2efe6" />
                <stop offset="70%" stopColor="#bdb8aa" />
                <stop offset="100%" stopColor="#2a2824" />
            </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#050505" />
        <ellipse cx="200" cy="160" rx="120" ry="165" fill="url(#pf-skin)" />
        <ellipse cx="150" cy="130" rx="34" ry="44" fill="#000" />
        <ellipse cx="250" cy="130" rx="34" ry="44" fill="#000" />
        <circle cx="154" cy="136" r="4" fill="#fff" />
        <circle cx="246" cy="136" r="4" fill="#fff" />
        <path d="M110 215 Q200 300 290 215 Q200 255 110 215 Z" fill="#000" />
        <path d="M120 220 L132 238 L144 224 L156 244 L170 228 L184 248 L200 230 L216 248 L230 228 L244 244 L256 224 L268 238 L280 220" stroke="#e8e2d4" strokeWidth="5" fill="none" strokeLinejoin="bevel" />
    </svg>
);

const RedEyes = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
            <radialGradient id="re-glow">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="25%" stopColor="#ff2a2a" />
                <stop offset="100%" stopColor="#ff000000" />
            </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#000" />
        <path d="M70 300 Q90 120 200 95 Q310 120 330 300 Z" fill="#0d0d0d" />
        <circle cx="160" cy="165" r="38" fill="url(#re-glow)" />
        <circle cx="240" cy="165" r="38" fill="url(#re-glow)" />
        <ellipse cx="160" cy="165" rx="7" ry="11" fill="#000" />
        <ellipse cx="240" cy="165" rx="7" ry="11" fill="#000" />
    </svg>
);

const ISeeYou = () => (
    <div className="w-full h-full bg-black flex items-center justify-center">
        <p className="text-white/90 font-normal" style={{ fontSize: "7cqw" }}>
            I see you.
        </p>
    </div>
);

const DemonFurby = () => (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative h-[130%] aspect-square">
            <img src="/images/furby_empty.png" alt="" className="absolute inset-0 w-full h-full object-contain [filter:sepia(1)_hue-rotate(-50deg)_saturate(5)_contrast(1.4)]" />
            <img src="/images/fit_eyemon.svg" alt="" className="absolute w-[17%] top-[37%] left-[32%]" />
            <img src="/images/fit_eyemon.svg" alt="" className="absolute w-[17%] top-[37%] left-[50%]" />
        </div>
    </div>
);

export const JUMPSCARES = [PaleFace, RedEyes, DemonFurby, ISeeYou];

/** Next frame in the rotation (remembered across visits). */
export function nextJumpscareIndex(): number {
    let i = 0;
    try {
        i = (Number(localStorage.getItem("ps3Jumpscare") ?? -1) + 1) % JUMPSCARES.length;
        localStorage.setItem("ps3Jumpscare", String(i));
    } catch {
        i = Math.floor(Math.random() * JUMPSCARES.length);
    }
    return i;
}

const Jumpscare = ({ index }: { index: number }) => {
    const Frame = JUMPSCARES[index % JUMPSCARES.length];
    return (
        <div className="@container absolute inset-0 z-40 jumpscare-blip">
            <Frame />
        </div>
    );
};

export default Jumpscare;
