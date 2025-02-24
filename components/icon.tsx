import { Text, View, StyleSheet, Dimensions} from "react-native";
import { Image } from "expo-image";

interface IconProps{
    src: string,
    text: string,
    chosen: string,
}
const imageMapping:Record<string, any> = {
    "www": "/images/www.svg",
    "about": "/images/about.svg",
    "games": "/images/games.svg",
    "contact": "/images/contact.svg",
    "exp": "/images/exp.svg",

};

const iconWidth =  Dimensions.get("window").width*0.075;
const notChosenWidth =  Dimensions.get("window").width*0.065;

const Icon = ({src, text, chosen}: IconProps) => {


    return (
        <View style={styles.container}>
            <img style={{opacity: chosen===src ? 1 : 0.8, width: chosen===src ? iconWidth : notChosenWidth, height: chosen===src ? iconWidth : notChosenWidth}} src={imageMapping[src]} />
            <Text style={[styles.innerText,{visibility: chosen===src ? "visible": "hidden"}]}>
                {text}
            </Text>
        </View>
    );

};

const styles = StyleSheet.create({
    innerText:{
        textAlign:"center",
        fontSize: 20,
        color: "white",
    },
    container:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },
});

export default Icon;