// iOS Safari only lets an <audio> element play after it has been started inside
// a tap. The PS3 menu plays its sound after React re-renders, a moment too late
// for the first tap, so the first sound used to be swallowed. On the first
// interaction we "unlock" the element with a silent play; any sound requested
// while that's in flight plays as soon as it finishes.

const SRC = "/sounds/hover.mp3";
const STALE_MS = 1000;

let audio: HTMLAudioElement | null = null;
let unlocked = false;
let unlocking = false;
let pendingAt = 0;

function getAudio() {
    if (!audio) {
        audio = new Audio(SRC);
        audio.preload = "auto";
    }
    return audio;
}

function playNow() {
    const a = getAudio();
    a.currentTime = 0;
    a.play().catch(() => {});
}

function unlock() {
    if (unlocked || unlocking) return;
    unlocking = true;
    const a = getAudio();
    a.muted = true;
    a.play()
        .then(() => {
            a.pause();
            a.currentTime = 0;
            a.muted = false;
            unlocked = true;
            if (pendingAt && Date.now() - pendingAt < STALE_MS) playNow();
            pendingAt = 0;
        })
        .catch(() => {
            a.muted = false;
            unlocking = false; // try again on the next tap
        });
}

/** Call once from a component; returns a cleanup function. */
export function installSoundUnlock() {
    const events = ["touchend", "pointerup", "click", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, unlock, true));
    return () => events.forEach((e) => window.removeEventListener(e, unlock, true));
}

export function playHover() {
    if (unlocked) playNow();
    else pendingAt = Date.now();
}

export function stopHover() {
    audio?.pause();
}

/** Unlock right now — call this from inside a tap handler (e.g. the TV power button). */
export function unlockSoundsNow() {
    unlock();
}
