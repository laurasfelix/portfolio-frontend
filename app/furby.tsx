import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import Body from "@/components/body";

export default function Furby() {

    return (
        <View style={styles.container}>
            <Body/>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
    }
    
});