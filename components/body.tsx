import { Text, View, StyleSheet, useWindowDimensions, Pressable} from "react-native";
import { useEffect, useState, useRef } from "react";

const EYE = {
    CLOSED: "/images/fit_eye_closed.png",
    OPEN: "/images/fit_eye.png",
    DEMON:  "/images/fit_eyemon.png",
    INVERTED: "/images/fit_eyeverted.png"
}

const BEAK = { 
    CLOSED: "/images/fit_beak_closed.png",
    OPEN: "/images/fit_beak_open.png"
}

const Body = () => {
    const { width, height } = useWindowDimensions();
    const imageSize = width < 800 ? width * 0.9 : width * 0.35;
    const smallSize = imageSize * 0.5;
    const [isTalking, setIsTalking] = useState(false);
    const [leftEye, setLeftEye] = useState(EYE.CLOSED);
    const [rightEye, setRightEye] = useState(EYE.CLOSED);
    const [beak, setBeak] = useState(BEAK.CLOSED);
    const furby = "/images/furby_empty.png";

    return (
        <View style={styles.container}>
            <img src={furby} alt="furby" style={{...styles.furby, height: imageSize, width:imageSize}}/>
            <img src={beak} alt="furby's beak" style={{...styles.beak, top: imageSize*0.33, left: -imageSize*0.008, height:smallSize, width:smallSize}} />
            <img src={leftEye} alt="furby's left eye" style={{...styles.leftEye, top: -imageSize*0.33, left: -imageSize*0.1, height:smallSize*1.1, width:smallSize*1.1}} />
            <img src={rightEye} alt="furby's right eye" style={{...styles.rightEye, top: -imageSize*0.88, left: imageSize*0.08, height:smallSize*1.1, width:smallSize*1.1}} />
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