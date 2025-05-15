import { View, StyleSheet, useWindowDimensions, Pressable } from "react-native";
import { useEffect, useState, useRef } from "react";


const EYE = {
    CLOSED: "/images/fit_eye_closed.svg",
    OPEN: "/images/fit_eye.svg",
    DEMON:  "/images/fit_eyemon.svg",
    INVERTED: "/images/fit_eyeverted.svg"
}

const BEAK = { 
    CLOSED: "/images/fit_beak_closed.svg",
    OPEN: "/images/fit_beak_open.svg"
}

interface BodyProps{
    isThinking: boolean,
    interact: boolean,
    isTalking: boolean, 
}

const Body = ({isThinking, interact, isTalking}:BodyProps) => {
    const { width, height } = useWindowDimensions();
    const imageSize = width < 800 ? width * 0.9 : width * 0.35;
    const smallSize = imageSize * 0.15;
    const [leftEye, setLeftEye] = useState(EYE.CLOSED);
    const [rightEye, setRightEye] = useState(EYE.CLOSED);
    const [beak, setBeak] = useState(BEAK.CLOSED);
    const furby = "/images/furby_empty.png";
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const leftEyeRef = useRef(leftEye);

    useEffect(() => {
    leftEyeRef.current = leftEye;
    }, [leftEye]);

    const rightEyeRef = useRef(rightEye);

    useEffect(() => {
    rightEyeRef.current = rightEye;
    }, [rightEye]);

    const beakRef = useRef(beak);
    
    useEffect(() => {
    beakRef.current = beak;
    }, [beak]);

    useEffect(() =>{

        if (isThinking && !isTalking){

            setRightEye(EYE.CLOSED);
            setLeftEye(EYE.CLOSED);
            setBeak(BEAK.CLOSED);
        }

    }, [isThinking]);

    useEffect(() =>{

        const isTalkingRef = { current: isTalking };

        isTalkingRef.current = isTalking; 

        const blink = () => {
            timeoutRef.current = setTimeout(() => {
                if (!isTalkingRef.current){
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

    const handleAnnoy = (
    getValue: () => string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    openValue: string,
    closedValue: string) => {
        const currentValue = getValue();

        if (currentValue === openValue){
            setValue(closedValue);
        }
        else{
            setValue(openValue);
        }
    };

    return (
        <View style={[styles.container, styles.mainContainer]}>

            <View style={[styles.furbyContainer, styles.container, {position: "relative", width: imageSize, height: imageSize}]}> 
                <img src={furby} alt="furby" style={{...styles.furby, width: "100%", height: "100%"}} />
                <img src={beak} alt="furby's beak" style={{...styles.beak, position: "absolute", top: imageSize*0.51, left: imageSize*0.49 - smallSize/2, height: smallSize, width: smallSize}} />
                <Pressable style={[styles.hover, {position: "absolute", top: imageSize*0.51, left: imageSize*0.49 - smallSize/2, height: smallSize, width: smallSize}]} onHoverIn={() => handleAnnoy(() => beakRef.current, setBeak, BEAK.OPEN, BEAK.CLOSED)} onHoverOut={() => handleAnnoy(() => beakRef.current, setBeak, BEAK.OPEN, BEAK.CLOSED)} />
                <img src={leftEye} alt="furby's left eye" style={{...styles.leftEye, position: "absolute", top: imageSize*0.37, left: imageSize*0.32, height: smallSize*1.1, width: smallSize*1.1}} />
                <Pressable style={[styles.hover, {position: "absolute", top: imageSize*0.37, left: imageSize*0.32, height: smallSize*1.1, width: smallSize*1.1}]} onHoverIn={() => handleAnnoy(() => leftEyeRef.current, setLeftEye, EYE.OPEN, EYE.CLOSED)} onHoverOut={() => handleAnnoy(() => leftEyeRef.current, setLeftEye, EYE.OPEN, EYE.CLOSED)} />
                <img src={rightEye} alt="furby's right eye" style={{...styles.rightEye, position: "absolute", top: imageSize*0.37, left: imageSize*0.5, height: smallSize*1.1, width: smallSize*1.1}} />
                <Pressable style={[styles.hover, {position: "absolute", top: imageSize*0.37, left: imageSize*0.5, height: smallSize*1.1, width: smallSize*1.1}]} onHoverIn={() => handleAnnoy(() => rightEyeRef.current, setRightEye, EYE.OPEN, EYE.CLOSED)} onHoverOut={() => handleAnnoy(() => rightEyeRef.current, setRightEye, EYE.OPEN, EYE.CLOSED)} />
            </View>

        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        width: "100%",
        alignItems:"center",
    },
    mainContainer:{
        justifyContent:"space-between",
        // backgroundColor:"pink",
        textAlign:"center"
    },
    furbyContainer:{
        flexDirection:"column",
        justifyContent: "flex-start",
        alignItems:"center"
    },
    furby: {
        zIndex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    beak: {
        // positioning handled inline
    },
    leftEye: {
        // positioning handled inline
        zIndex: -1,
    },
    rightEye: {
        // positioning handled inline
        zIndex: -1,
    },
    hover: {
        zIndex: 2,
    },
    
});

export default Body;