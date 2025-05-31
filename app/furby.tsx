import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import Body from "@/components/furby/Body";
import InputBox from "@/components/furby/InputBox";
import { useState } from "react";

export default function Furby() {

    const [inputInteract, setInputInteract] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.sideColumn}>

            </View>
            <View style={styles.mainColumn}>

                <Body isTalking={isTalking} isThinking={isThinking} interact={inputInteract}/>

                <View style={styles.inputBox}>
                    <InputBox setIsTalking={setIsTalking} isThinking={isThinking} setIsThinking={setIsThinking} setInteract={setInputInteract} />
                </View>

            </View>
            <View style={styles.sideColumn}>
                
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        flexDirection:"row",
        padding: 20,
        backgroundColor:"black"
    },
    mainColumn:{

        flex:3,
        flexDirection:"column",

    }, 

    sideColumn:{
        
        flex:1,

    },

    inputBox:{
        width: "100%",
        marginTop: 24, // Add spacing from Furby body if needed
        alignItems: "center",
    },
    
});