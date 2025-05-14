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

    const handleAnnoy = (
    currentValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    openValue: string,
    closedValue: string) => {

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
            <Pressable style={{height:smallSize, width:smallSize}} onHoverIn={() => handleAnnoy(beak, setBeak, BEAK.OPEN, BEAK.CLOSED)} onHoverOut={() => handleAnnoy(beak, setBeak, BEAK.OPEN, BEAK.CLOSED)}> <img src={beak} alt="furby's beak" style={{...styles.beak, top: imageSize*0.51, left: -imageSize*0.008, height:smallSize, width:smallSize}} /> </Pressable>
             <Pressable style={{height:smallSize*1.1, width:smallSize*1.1}} onHoverIn={() => handleAnnoy(leftEye, setLeftEye, EYE.OPEN, EYE.CLOSED)} onHoverOut={() => handleAnnoy(beak, setBeak, BEAK.OPEN, BEAK.CLOSED)}> <img src={leftEye} alt="furby's left eye" style={{...styles.leftEye, top: imageSize*0.215, left: -imageSize*0.1, height:smallSize*1.1, width:smallSize*1.1}} /> </Pressable>
            <Pressable style={{height:smallSize*1.1, width:smallSize*1.1}} onHoverIn={() => handleAnnoy(rightEye, setRightEye, EYE.OPEN, EYE.CLOSED)} onHoverOut={() => handleAnnoy(beak, setBeak, BEAK.OPEN, BEAK.CLOSED)}> <img src={rightEye} alt="furby's right eye" style={{...styles.rightEye, top: imageSize*0.05, left: imageSize*0.08, height:smallSize*1.1, width:smallSize*1.1}} /> </Pressable>
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
    },
    beak:{
        position:"relative",
    },
    leftEye:{
        position:"relative",
    },
    rightEye:{
        position:"relative",
    }
    
});

export default Body;