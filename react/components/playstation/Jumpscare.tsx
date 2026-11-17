import React from "react";

// Jumpscare frames: some drawn in code, some pictures Laura added.
// One is picked per power-on, rotating so it's different every time.

/** Shared photo look: film grain + dark vignette over any frame. */
const FilmGrain = ({ id }: { id: string }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" aria-hidden>
        <defs>
            <filter id={`${id}-grain`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <radialGradient id={`${id}-vig`} cx="50%" cy="50%" r="70%">
                <stop offset="45%" stopColor="#000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${id}-grain)`} opacity="0.22" style={{ mixBlendMode: "overlay" }} />
        <rect width="100%" height="100%" fill={`url(#${id}-vig)`} />
    </svg>
);

/** A gaunt, too-wide grin under flickering light: blotchy skin, sunken bloodshot eyes, rotten teeth. */
const PaleFace = () => (
    <div className="relative w-full h-full bg-black overflow-hidden">
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
                <radialGradient id="pf-skin" cx="48%" cy="38%" r="62%">
                    <stop offset="0%" stopColor="#e9e6dc" />
                    <stop offset="45%" stopColor="#c9c4b4" />
                    <stop offset="75%" stopColor="#8d8a7b" />
                    <stop offset="100%" stopColor="#1f1e1a" />
                </radialGradient>
                {/* blotchy, uneven skin */}
                <filter id="pf-texture" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="3" result="blotch" />
                    <feColorMatrix in="blotch" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.38  0 0 0 0 0.3  0 0 0 0.55 0" result="tint" />
                    <feComposite in="tint" in2="SourceGraphic" operator="in" result="stain" />
                    <feTurbulence type="turbulence" baseFrequency="0.012" numOctaves="2" seed="9" result="warp" />
                    <feDisplacementMap in="SourceGraphic" in2="warp" scale="9" result="warped" />
                    <feMerge>
                        <feMergeNode in="warped" />
                        <feMergeNode in="stain" />
                    </feMerge>
                </filter>
                <radialGradient id="pf-socket" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0d0b09" />
                    <stop offset="60%" stopColor="#2a2520" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#5a5448" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="pf-eyeball" cx="45%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#f4efe2" />
                    <stop offset="70%" stopColor="#d9cfbd" />
                    <stop offset="100%" stopColor="#a06a5e" />
                </radialGradient>
                <linearGradient id="pf-mouth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a0505" />
                    <stop offset="100%" stopColor="#000" />
                </linearGradient>
                <linearGradient id="pf-tooth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#efe6c8" />
                    <stop offset="70%" stopColor="#c9b77e" />
                    <stop offset="100%" stopColor="#6e5a2c" />
                </linearGradient>
                <filter id="pf-soft"><feGaussianBlur stdDeviation="1.2" /></filter>
                <filter id="pf-photo"><feGaussianBlur stdDeviation="0.7" /></filter>
                {/* harsh light from the left: the right half of the face falls into shadow */}
                <linearGradient id="pf-side" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#000" stopOpacity="0" />
                    <stop offset="42%" stopColor="#000" stopOpacity="0.05" />
                    <stop offset="62%" stopColor="#000" stopOpacity="0.55" />
                    <stop offset="82%" stopColor="#000" stopOpacity="0.88" />
                </linearGradient>
                <radialGradient id="pf-hollow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3a362c" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3a362c" stopOpacity="0" />
                </radialGradient>
                <filter id="pf-blur3"><feGaussianBlur stdDeviation="3" /></filter>
            </defs>

            <rect width="400" height="300" fill="#060606" />
            <g filter="url(#pf-photo)">
            {/* a sliver of light from above, like a bare bulb */}
            <ellipse cx="200" cy="40" rx="180" ry="90" fill="#2a2a24" opacity="0.5" filter="url(#pf-blur3)" />

            {/* lank, wet hair framing the face */}
            <g stroke="#1b1a18" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.95">
                <path d="M95 60 Q70 160 82 300" />
                <path d="M110 40 Q80 150 98 300" />
                <path d="M305 60 Q332 160 318 300" />
                <path d="M292 42 Q325 150 304 300" />
                <path d="M130 22 Q100 120 118 230" />
                <path d="M272 24 Q300 120 284 230" />
            </g>

            {/* head, slightly lopsided */}
            <path
                d="M200 -5 C285 -5 318 70 314 150 C310 235 262 320 200 322 C134 320 88 236 86 150 C84 66 118 -5 200 -5 Z"
                fill="url(#pf-skin)"
                filter="url(#pf-texture)"
            />
            {/* hair over the forehead */}
            <path d="M100 70 Q130 10 200 2 Q270 10 300 70 Q270 40 200 36 Q130 40 100 70 Z" fill="#0d0c0b" filter="url(#pf-soft)" />
            {/* hollow cheeks and temples */}
            <ellipse cx="128" cy="195" rx="30" ry="42" fill="url(#pf-hollow)" />
            <ellipse cx="276" cy="190" rx="30" ry="42" fill="url(#pf-hollow)" />
            <ellipse cx="108" cy="110" rx="16" ry="34" fill="url(#pf-hollow)" />
            <ellipse cx="294" cy="106" rx="16" ry="34" fill="url(#pf-hollow)" />

            {/* sunken sockets */}
            <ellipse cx="150" cy="128" rx="50" ry="44" fill="url(#pf-socket)" />
            <ellipse cx="252" cy="124" rx="50" ry="44" fill="url(#pf-socket)" />
            {/* wide, bloodshot eyes */}
            <ellipse cx="150" cy="130" rx="21" ry="16" fill="url(#pf-eyeball)" />
            <ellipse cx="252" cy="126" rx="21" ry="16" fill="url(#pf-eyeball)" />
            <g stroke="#a51e1e" strokeWidth="0.45" fill="none" opacity="0.9">
                <path d="M124 126 Q130 124 134 127 L137 124 M134 127 L138 129" />
                <path d="M125 134 L131 133 L134 136 M131 133 L133 130" />
                <path d="M176 125 L170 126 L167 123 M170 126 L166 129" />
                <path d="M226 122 L232 121 L235 124 M232 121 L234 118" />
                <path d="M278 130 L272 131 L269 128 M272 131 L268 134" />
                <path d="M228 138 L234 137 L238 140" />
            </g>
            <g stroke="#9b1b1b" strokeWidth="0.6" fill="none" opacity="0.7">
                <path d="M124 130 Q132 126 136 131 Q140 128 143 133" />
                <path d="M126 138 Q133 141 139 137" />
                <path d="M176 128 Q168 124 163 129 Q160 125 157 130" />
                <path d="M174 137 Q166 141 160 136" />
                <path d="M226 126 Q234 121 238 127 Q242 123 245 129" />
                <path d="M228 134 Q235 138 241 133" />
                <path d="M278 124 Q270 120 265 125" />
                <path d="M277 133 Q269 137 263 132 Q260 136 256 133" />
            </g>
            {/* pinprick pupils, slightly off — not quite looking at you */}
            <circle cx="153" cy="131" r="5" fill="#2b2016" />
            <circle cx="153" cy="131" r="2.2" fill="#000" />
            <circle cx="249" cy="127" r="5" fill="#2b2016" />
            <circle cx="249" cy="127" r="2.2" fill="#000" />
            <circle cx="155" cy="128" r="1.1" fill="#fff" />
            <circle cx="251" cy="124" r="1.1" fill="#fff" />
            <path d="M128 128 Q150 108 172 128 Q150 116 128 128 Z" fill="#2b2620" />
            <path d="M230 124 Q252 104 274 124 Q252 112 230 124 Z" fill="#2b2620" />
            {/* heavy lower lids */}
            <path d="M122 140 Q150 160 178 138" stroke="#5c4a3e" strokeWidth="3" fill="none" filter="url(#pf-soft)" />
            <path d="M224 136 Q252 156 280 134" stroke="#5c4a3e" strokeWidth="3" fill="none" filter="url(#pf-soft)" />

            {/* nose: shadow, not lines */}
            <path d="M196 140 Q190 175 182 192 Q200 200 218 192 Q210 175 206 140" fill="#6f6a5c" opacity="0.45" filter="url(#pf-soft)" />
            <path d="M199 145 Q197 170 196 186" stroke="#efeadf" strokeWidth="3" opacity="0.35" fill="none" filter="url(#pf-soft)" />
            <path d="M180 196 Q200 206 222 196" stroke="#2a2620" strokeWidth="5" opacity="0.5" fill="none" filter="url(#pf-blur3)" />
            <ellipse cx="190" cy="194" rx="6" ry="3.5" fill="#1b1612" />
            <ellipse cx="211" cy="194" rx="6" ry="3.5" fill="#1b1612" />

            {/* the grin: far too wide */}
            <path d="M98 214 Q200 236 304 210 Q290 268 200 276 Q112 270 98 214 Z" fill="url(#pf-mouth)" />
            {/* gums */}
            <path d="M104 216 Q200 238 298 213 Q292 226 200 236 Q112 230 104 216 Z" fill="#6d1d22" />
            {/* rotten, uneven teeth */}
            <g fill="url(#pf-tooth)" stroke="#2a2010" strokeWidth="0.8">
                <path d="M112 220 L124 222 L122 240 L114 236 Z" />
                <path d="M125 223 L139 225 L137 248 L127 245 Z" />
                <path d="M140 226 L155 228 L153 252 L142 250 Z" />
                <path d="M156 228 L171 229 L170 256 L158 254 Z" />
                <path d="M172 230 L187 231 L186 258 L174 257 Z" />
                <path d="M188 231 L203 231 L202 260 L190 259 Z" />
                <path d="M204 231 L219 230 L219 258 L206 260 Z" />
                <path d="M220 230 L235 229 L235 255 L222 257 Z" />
                <path d="M236 228 L250 226 L249 251 L237 254 Z" />
                <path d="M251 226 L265 224 L263 246 L252 250 Z" />
                <path d="M266 223 L279 221 L277 240 L266 245 Z" />
                <path d="M280 220 L291 217 L289 234 L280 238 Z" />
            </g>
            {/* stains and a chipped tooth */}
            <path d="M188 231 L203 231 L198 244 L192 240 Z" fill="#3b2a12" opacity="0.7" />
            <path d="M236 228 L250 226 L247 236 Z" fill="#000" />
            {/* cracked, dry lips */}
            <path d="M96 213 Q200 240 306 208" stroke="#5a3230" strokeWidth="3" fill="none" opacity="0.85" />
            <g stroke="#3a1515" strokeWidth="0.8">
                <path d="M140 222 l2 6" /><path d="M175 229 l1 5" /><path d="M230 228 l-1 6" /><path d="M268 220 l-2 5" />
            </g>
            {/* something dark dripping from the corner of the mouth */}
            <path d="M286 230 Q290 250 287 268 Q284 276 289 282" stroke="#2a0606" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="289" cy="284" r="3.5" fill="#2a0606" />
            </g>
            <rect width="400" height="300" fill="url(#pf-side)" />
        </svg>
        <FilmGrain id="pf" />
    </div>
);

/** Something tall at the end of a dark hallway, eyes catching the light, one hand on the door frame. */
const RedEyes = () => (
    <div className="relative w-full h-full bg-black overflow-hidden">
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs>
                <linearGradient id="re-wall" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#141210" />
                    <stop offset="100%" stopColor="#060505" />
                </linearGradient>
                <linearGradient id="re-wall-r" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#141210" />
                    <stop offset="100%" stopColor="#060505" />
                </linearGradient>
                <radialGradient id="re-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff4e0" />
                    <stop offset="18%" stopColor="#ff3b2f" />
                    <stop offset="55%" stopColor="#8a0000" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#300000" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="re-facelight" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#5a1a14" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="re-fog" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#1b1b1e" stopOpacity="0.7" />
                </linearGradient>
                <filter id="re-blur"><feGaussianBlur stdDeviation="2" /></filter>
                <filter id="re-bloom"><feGaussianBlur stdDeviation="6" /></filter>
                <filter id="re-rough">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="12" />
                    <feDisplacementMap in="SourceGraphic" scale="6" />
                </filter>
            </defs>

            <rect width="400" height="300" fill="#030303" />
            {/* a weak bulb behind the camera, just enough to see the walls */}
            <radialGradient id="re-bulb" cx="50%" cy="0%" r="90%">
                <stop offset="0%" stopColor="#3b3630" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            {/* hallway in perspective */}
            <path d="M0 0 L150 95 L150 235 L0 300 Z" fill="url(#re-wall)" />
            <path d="M400 0 L250 95 L250 235 L400 300 Z" fill="url(#re-wall-r)" />
            <path d="M0 300 L150 235 L250 235 L400 300 Z" fill="#0b0a09" />
            <path d="M0 0 L150 95 L250 95 L400 0 Z" fill="#070606" />
            {/* floorboards */}
            <g stroke="#151311" strokeWidth="1">
                <path d="M60 300 L170 235" /><path d="M130 300 L190 235" /><path d="M200 300 L200 235" />
                <path d="M270 300 L210 235" /><path d="M340 300 L230 235" />
            </g>
            {/* peeling wallpaper strip and a dead picture frame */}
            <path d="M40 60 L60 72 L58 200 L38 214 Z" fill="#191612" />
            <rect x="80" y="110" width="34" height="44" fill="none" stroke="#1e1b17" strokeWidth="3" transform="skewY(14)" />

            {/* the far doorway */}
            <rect x="162" y="96" width="76" height="139" fill="#000" />
            <rect x="162" y="96" width="76" height="139" fill="none" stroke="#2a2520" strokeWidth="4" />

            {/* the figure: taller than the doorway, head bent under the frame, arms hanging to the floor */}
            <g filter="url(#re-rough)">
                {/* long neck and narrow, sloped shoulders */}
                <path d="M196 96 L204 96 L206 132 C222 136 230 146 232 166 L234 235 L166 235 L168 166 C170 146 178 136 194 132 Z" fill="#0b0a0a" />
                {/* arms: too long, hanging past the knees, fingers almost touching the floor */}
                <path d="M172 150 C164 170 160 200 158 232 L163 233 C166 204 170 176 177 158 Z" fill="#0c0b0b" />
                <path d="M228 150 C236 170 240 200 242 232 L237 233 C234 204 230 176 223 158 Z" fill="#0c0b0b" />
                <g stroke="#100e0e" strokeWidth="1.6" strokeLinecap="round" fill="none">
                    <path d="M158 232 L154 240" /><path d="M160 233 L158 242" /><path d="M162 233 L162 241" />
                    <path d="M242 232 L246 240" /><path d="M240 233 L242 242" /><path d="M238 233 L238 241" />
                </g>
                {/* head bent forward, crown pressed against the top of the frame */}
                <path d="M186 102 C186 92 192 86 200 86 C208 86 214 92 214 102 C214 116 208 128 200 130 C192 128 186 116 186 102 Z" fill="#0e0c0c" />
            </g>
            {/* skull-like face, lit only from its eyes: brow, cheekbones, no mouth to speak of */}
            <ellipse cx="200" cy="108" rx="12" ry="16" fill="url(#re-facelight)" />
            <path d="M190 104 Q195 101 199 104 M201 104 Q205 101 210 104" stroke="#4a120d" strokeWidth="1" fill="none" />
            <path d="M191 116 Q194 121 197 117 M203 117 Q206 121 209 116" stroke="#2e0a08" strokeWidth="0.9" fill="none" />
            {/* eyes: small, close together, with bloom */}
            <circle cx="195" cy="107" r="9" fill="url(#re-glow)" filter="url(#re-bloom)" />
            <circle cx="205" cy="107" r="9" fill="url(#re-glow)" filter="url(#re-bloom)" />
            <circle cx="195" cy="107" r="2.6" fill="url(#re-glow)" />
            <circle cx="205" cy="107" r="2.6" fill="url(#re-glow)" />
            <ellipse cx="195" cy="107" rx="0.6" ry="1.6" fill="#120000" />
            <ellipse cx="205" cy="107" rx="0.6" ry="1.6" fill="#120000" />
            {/* red spill on the frame and floor */}
            <ellipse cx="200" cy="232" rx="60" ry="6" fill="#3a0606" opacity="0.5" filter="url(#re-blur)" />

            {/* low fog */}
            <rect x="0" y="180" width="400" height="120" fill="url(#re-fog)" />
            <rect width="400" height="300" fill="url(#re-bulb)" />
        </svg>
        <FilmGrain id="re" />
    </div>
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
        {/* lit from below by a red light */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(150,0,0,0.55),transparent_70%)]" />
        <div className="relative h-[135%] aspect-square">
            <img src="/images/furby_empty.png" alt="" className="absolute inset-0 w-full h-full object-contain [filter:grayscale(1)_sepia(1)_hue-rotate(-50deg)_saturate(4)_contrast(1.7)_brightness(0.55)]" />
            {/* shadows pooling under the brow and around the beak */}
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_18%,rgba(0,0,0,0.75)_55%)]" />
            <img src="/images/fit_eyemon.svg" alt="" className="absolute w-[17%] top-[37%] left-[32%] [filter:drop-shadow(0_0_6px_#ff1a1a)_drop-shadow(0_0_16px_#ff0000)]" />
            <img src="/images/fit_eyemon.svg" alt="" className="absolute w-[17%] top-[37%] left-[50%] [filter:drop-shadow(0_0_6px_#ff1a1a)_drop-shadow(0_0_16px_#ff0000)]" />
        </div>
        <FilmGrain id="df" />
    </div>
);

// Pictures Laura added (public/images/scares). `zoom` crops in on small subjects.
const PHOTO_SCARES: { src: string; zoom?: number }[] = [
    { src: "/images/scares/jeff.jpg" },
    { src: "/images/scares/herobrine.jpg", zoom: 1.8 },
    { src: "/images/scares/figure.jpg", zoom: 1.3 },
    { src: "/images/scares/smile.jpg" },
    { src: "/images/scares/face.jpg" },
];

const PhotoScare = ({ src, zoom = 1 }: { src: string; zoom?: number }) => (
    <div className="w-full h-full bg-black overflow-hidden">
        <img src={src} alt="" className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} />
    </div>
);

/** Load every picture ahead of time — a 0.1s blip has no time to download one. */
export function preloadJumpscares() {
    PHOTO_SCARES.forEach(({ src }) => {
        const img = new Image();
        img.src = src;
    });
}

type Frame = { drawn: () => React.JSX.Element } | { photo: { src: string; zoom?: number } };

// Drawn frames and photos alternate so it's never predictable.
export const JUMPSCARES: Frame[] = [
    { photo: PHOTO_SCARES[0] },
    { drawn: PaleFace },
    { photo: PHOTO_SCARES[1] },
    { drawn: RedEyes },
    { photo: PHOTO_SCARES[2] },
    { drawn: DemonFurby },
    { photo: PHOTO_SCARES[3] },
    { drawn: ISeeYou },
    { photo: PHOTO_SCARES[4] },
];

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
    const frame = JUMPSCARES[index % JUMPSCARES.length];
    const Drawn = "drawn" in frame ? frame.drawn : null;
    return (
        <div className="@container absolute inset-0 z-40 jumpscare-blip">
            {Drawn ? <Drawn /> : "photo" in frame ? <PhotoScare {...frame.photo} /> : null}
        </div>
    );
};

export default Jumpscare;
