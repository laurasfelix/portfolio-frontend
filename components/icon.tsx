import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import { Image } from "expo-image";
import { useEffect, Dispatch, SetStateAction } from "react";

import Items from "@/components/items";

interface IconProps{
    src: string,
    text: string,
    chosen: string, 
    setChosen: Dispatch<SetStateAction<string>>,
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

const Icon = ({src, text, chosen, setChosen}: IconProps) => {

    useEffect(() => {

        let soundObject: HTMLAudioElement;
    
        async function playSound() {
            console.log("Loading Sound"); 
    
            soundObject = new window.Audio("/sounds/hover.mp3");
    
            console.log("Playing Sound");
            await soundObject.play();
        }
    
        playSound();
    
        return () => {
            if (soundObject) {
            console.log("Unloading Sound");
            soundObject.pause();
            soundObject.src = "";
            }
      };
            
        }, [chosen]);
    


    return (
        <View style={styles.container}>
            <Pressable style={styles.iconContainer} 
            onPressIn={() => setChosen(src)} onHoverIn={() => setChosen(src)}>
                <img style={{opacity: chosen===src ? 1 : 0.8, width: chosen===src ? iconWidth : notChosenWidth, height: chosen===src ? iconWidth : notChosenWidth}} src={imageMapping[src]} />
                <Text style={[styles.innerText,{visibility: chosen===src ? "visible": "hidden"}]}>
                    {text}
                </Text>

            </Pressable>
           
            <Items chosen={chosen} src={src} />
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
        height:"100%",
        // transform:"translateX(25%)",
    },
    iconContainer:{
        alignItems:"center"
    }
});

export default Icon;