import { Text, View, StyleSheet, useWindowDimensions, Pressable} from "react-native";
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

const Body = () => {
    const { width, height } = useWindowDimensions();
    const imageSize = width < 800 ? width * 0.9 : width * 0.35;
    const smallSize = imageSize * 0.15;
    const [isTalking, setIsTalking] = useState(false);
    const [leftEye, setLeftEye] = useState(EYE.CLOSED);
    const [rightEye, setRightEye] = useState(EYE.CLOSED);
    const [beak, setBeak] = useState(BEAK.CLOSED);
    const furby = "/images/furby_empty.png";

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
        <View style={styles.container}>
            <img src={furby} alt="furby" style={{...styles.furby, height: imageSize, width:imageSize}}/>
            <img src={beak} alt="furby's beak" style={{...styles.beak, top: imageSize*0.51, left: -imageSize*0.008, height:smallSize, width:smallSize, pointerEvents: "none"}} />
            <Pressable style={{...styles.hover, height:smallSize, width:smallSize, marginTop: +smallSize*2.4}} onHoverIn={() => handleAnnoy(() => beakRef.current, setBeak, BEAK.OPEN, BEAK.CLOSED)} onHoverOut={() => handleAnnoy(() => beakRef.current, setBeak, BEAK.OPEN, BEAK.CLOSED)}>  </Pressable>
            <img src={leftEye} alt="furby's left eye" style={{...styles.leftEye, top: -imageSize*0.29, left: -imageSize*0.1, height:smallSize*1.1, width:smallSize*1.1, pointerEvents: "none"}} />
            <Pressable style={{...styles.hover,height:smallSize*1.1, width:smallSize*1.1, marginLeft: -smallSize*1.3, marginTop: -smallSize*3,  }} onHoverIn={() => handleAnnoy(() => leftEyeRef.current, setLeftEye, EYE.OPEN, EYE.CLOSED)} onHoverOut={() => handleAnnoy(() => leftEyeRef.current, setLeftEye, EYE.OPEN, EYE.CLOSED)}> </Pressable>
            <img src={rightEye} alt="furby's right eye" style={{...styles.rightEye, top: -imageSize*0.17, left: imageSize*0.08, height:smallSize*1.1, width:smallSize*1.1, pointerEvents: "none"}} />
            <Pressable style={{...styles.hover,height:smallSize*1.1, width:smallSize*1.1, marginRight: -smallSize*1.1, marginTop: -smallSize*2.2, }} onHoverIn={() => handleAnnoy(() => rightEyeRef.current, setRightEye, EYE.OPEN, EYE.CLOSED)} onHoverOut={() => handleAnnoy(() => rightEyeRef.current, setRightEye, EYE.OPEN, EYE.CLOSED)}>  </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        justifyContent: "flex-start",
        alignItems:"center",
    },
    furby:{
        position:"absolute",
        zIndex:1,
    },
    beak:{
        position:"relative",
    },
    leftEye:{
        position:"relative",
        zIndex: -1, 
    },
    rightEye:{
        position:"relative",
        zIndex: -1, 
    },
    hover:{
        zIndex:2,
    }
    
});

export default Body;