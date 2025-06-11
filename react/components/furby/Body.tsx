import { useEffect, useState, useRef } from "react";
import Image from 'next/image';

const EYE = {
    CLOSED: '/images/fit_eye_closed.svg',
    OPEN: '/images/fit_eye.svg',
    DEMON: '/images/fit_eyemon.svg',
    INVERTED: '/images/fit_eyeverted.svg'
};

const BEAK = {
    CLOSED: '/images/fit_beak_closed.svg',
    OPEN: '/images/fit_beak_open.svg'
};

interface BodyProps {
    isThinking: boolean;
    interact: boolean;
    isTalking: boolean;
    demonEyes?: boolean;
}

const Body = ({ isThinking, isTalking, interact, demonEyes = false }: BodyProps) => {
    // Responsive sizes
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateDimensions = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            };
            
            updateDimensions();
            window.addEventListener('resize', updateDimensions);
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, []);
    
    const imageSize = dimensions.width < 800 ? dimensions.width * 0.9 : dimensions.width * 0.35;
    const smallSize = imageSize * 0.15;
    
    // State for different parts of furby
    const [leftEye, setLeftEye] = useState(EYE.CLOSED);
    const [rightEye, setRightEye] = useState(EYE.CLOSED);
    const [beak, setBeak] = useState(BEAK.CLOSED);
    const furby = '/images/furby_empty.png';
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Refs to track current state for callbacks
    const leftEyeRef = useRef(leftEye);
    useEffect(() => { leftEyeRef.current = leftEye; }, [leftEye]);

    const rightEyeRef = useRef(rightEye);
    useEffect(() => { rightEyeRef.current = rightEye; }, [rightEye]);

    const beakRef = useRef(beak);
    useEffect(() => { beakRef.current = beak; }, [beak]);

    // Handle thinking state
    useEffect(() => {
        if (isThinking && !isTalking) {
            setRightEye(EYE.CLOSED);
            setLeftEye(EYE.CLOSED);
            setBeak(BEAK.CLOSED);
        }
    }, [isThinking, isTalking]);

    // Handle talking state with blinking
    useEffect(() => {
        const isTalkingRef = { current: isTalking };
        isTalkingRef.current = isTalking;

        const blink = () => {
            timeoutRef.current = setTimeout(() => {
                if (!isTalkingRef.current) {
                    return;
                }

                setTimeout(() => {
                    if (!isTalkingRef.current) return;
                    setRightEye(EYE.OPEN);
                    setLeftEye(EYE.OPEN);
                }, 300);

                setRightEye(EYE.CLOSED);
                setLeftEye(EYE.CLOSED);

                blink();
            }, 3000);
        };

        if (isTalking && !isThinking) {
            setBeak(BEAK.OPEN);
            blink();
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isTalking, isThinking]);

    // Handle interaction when hovering over parts
    const handleAnnoy = (
        getValue: () => string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        openValue: string,
        closedValue: string
    ) => {
        if (!interact) return; // Only allow interaction if interact prop is true
        
        const currentValue = getValue();

        if (currentValue === openValue) {
            setValue(closedValue);
        } else {
            setValue(openValue);
        }
    };

    // Handle demon eyes
    useEffect(() => {
        if (demonEyes) {
            setLeftEye(EYE.DEMON);
            setRightEye(EYE.DEMON);
        }
    }, [demonEyes]);

    return (
        <div className="w-full flex flex-col items-center justify-between text-center">
            <div className="flex flex-col items-center justify-start relative" style={{ width: imageSize, height: imageSize }}>
                <Image 
                    src={furby} 
                    alt="furby" 
                    width={imageSize} 
                    height={imageSize} 
                    className="w-full h-full object-contain z-10" 
                    priority
                />
                
                <Image 
                    src={beak} 
                    alt="furby's beak" 
                    width={smallSize} 
                    height={smallSize}
                    className="absolute z-0" 
                    style={{ 
                        top: imageSize * 0.51, 
                        left: imageSize * 0.49 - smallSize / 2
                    }} 
                    priority
                />
                <div
                    className="absolute z-20 cursor-pointer" 
                    style={{ 
                        top: imageSize * 0.51, 
                        left: imageSize * 0.49 - smallSize / 2, 
                        height: smallSize, 
                        width: smallSize 
                    }}
                    onMouseEnter={() => handleAnnoy(() => beakRef.current, setBeak, BEAK.OPEN, BEAK.CLOSED)}
                    onMouseLeave={() => handleAnnoy(() => beakRef.current, setBeak, BEAK.OPEN, BEAK.CLOSED)}
                />
                
                <Image 
                    src={leftEye} 
                    alt="furby's left eye" 
                    width={smallSize * 1.1} 
                    height={smallSize * 1.1}
                    className="absolute z-0" 
                    style={{ 
                        top: imageSize * 0.37, 
                        left: imageSize * 0.32
                    }} 
                    priority
                />
                <div
                    className="absolute z-20 cursor-pointer" 
                    style={{ 
                        top: imageSize * 0.37, 
                        left: imageSize * 0.32, 
                        height: smallSize * 1.1, 
                        width: smallSize * 1.1 
                    }}
                    onMouseEnter={() => handleAnnoy(() => leftEyeRef.current, setLeftEye, EYE.OPEN, EYE.CLOSED)}
                    onMouseLeave={() => handleAnnoy(() => leftEyeRef.current, setLeftEye, EYE.OPEN, EYE.CLOSED)}
                />
                
                <Image 
                    src={rightEye} 
                    alt="furby's right eye" 
                    width={smallSize * 1.1} 
                    height={smallSize * 1.1}
                    className="absolute z-0" 
                    style={{ 
                        top: imageSize * 0.37, 
                        left: imageSize * 0.5
                    }} 
                    priority
                />
                <div
                    className="absolute z-20 cursor-pointer" 
                    style={{ 
                        top: imageSize * 0.37, 
                        left: imageSize * 0.5, 
                        height: smallSize * 1.1, 
                        width: smallSize * 1.1 
                    }}
                    onMouseEnter={() => handleAnnoy(() => rightEyeRef.current, setRightEye, EYE.OPEN, EYE.CLOSED)}
                    onMouseLeave={() => handleAnnoy(() => rightEyeRef.current, setRightEye, EYE.OPEN, EYE.CLOSED)}
                />
            </div>
        </div>
    );
};

export default Body;
