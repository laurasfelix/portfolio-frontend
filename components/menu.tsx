import { Pressable, View, StyleSheet, Dimensions} from "react-native";
import { useEffect, useState } from "react";
import Icon from "../components/icon";
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

const Menu = () =>
{
    const [chosen, setChosen] = useState("about");
    const listInfo = [{icon:"about", text:"about"}, {icon:"exp", text:"experience"}, {icon:"www", text:"projects"}, {icon:"games", text:"hobbies"}, {icon:"contact", text:"contact"}];


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
        <View style={styles.menuContainer}>
            {listInfo.map((info, idx) =>
            {
                return (
                    <Pressable key={idx} style={styles.icon}
                    onPressIn={() => setChosen(info.icon)} onHoverIn={() => setChosen(info.icon)}
                    >
                        <Icon src={info.icon} text={info.text} chosen={chosen}/>
                    </Pressable>
                );
            }
        )

            }
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer:{
        flex:1,
        flexDirection: "row",
        width: "100%",
        padding: screenWidth*0.05,
    },
    icon:{
        flex:1,
        transform:"translateX(33%)",
      
    }
})

export default Menu;