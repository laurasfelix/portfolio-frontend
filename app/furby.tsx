import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import Body from "@/components/body";
import InputBox from "@/components/inputBox";

export default function Furby() {

    return (
        <View style={styles.container}>
            <View style={styles.sideColumn}>

            </View>
            <View style={styles.mainColumn}>

                <Body />

                <View style={styles.inputBox}>
                    <InputBox />
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