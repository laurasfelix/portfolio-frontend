import { Text, View, StyleSheet, Dimensions} from "react-native";
import { Image } from "expo-image";

interface IconProps{
    src: string,
    text: string,
}
const imageMapping:Record<string, any> = {
    "www": require("../assets/images/www.svg"),
    "about": require("../assets/images/about.svg"),
    "games": require("../assets/images/games.svg"),
    "contact": require("../assets/images/contact.svg"),
    "exp": require("../assets/images/exp.svg"),

};

const iconWidth =  Dimensions.get("window").width*0.075;

const Icon = ({src, text}: IconProps) => {


    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={imageMapping[src]} contentFit="contain" />
            <Text style={styles.innerText}>
                {text}
            </Text>
        </View>
    );

};

const styles = StyleSheet.create({
    innerText:{
        textAlign:"center",
        fontSize: 24,
        color: "white",
    },
    icon:{
        width: iconWidth,
        height: iconWidth,
    },
    container:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },
});

export default Icon;