import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import { useEffect, Dispatch, SetStateAction } from "react";

interface IconProps{
    src: number,
    text: string,
    chosen: number, 
    setChosen: Dispatch<SetStateAction<number>>,
}
const imageMapping:Record<string, any> = [
    "/images/about.svg",
    "/images/exp.svg",
     "/images/www.svg",
     "/images/games.svg",
   "/images/contact.svg",
];

const iconWidth =  Dimensions.get("window").width*0.065;
const notChosenWidth =  Dimensions.get("window").width*0.055;

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
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        // transform:"translateX(25%)",
    },
    iconContainer:{
        alignItems:"center"
    }
});

export default Icon;