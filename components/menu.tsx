import {View, StyleSheet, Dimensions} from "react-native";
import Icon from "../components/icon";
import { useState } from "react";

const screenWidth = Dimensions.get('window').width;

const Menu = () =>
{
    
    const listInfo = [{icon:"about", text:"about"}, {icon:"exp", text:"experience"}, {icon:"www", text:"projects"}, {icon:"games", text:"hobbies"}, {icon:"contact", text:"contact"}];
    const [chosen, setChosen] =  useState("about");

    
    return (
        <View style={styles.menuContainer}>
            {listInfo.map((info, idx) =>
            {
                return (
                    <View key={idx} style={styles.icon}
                    >
                        <Icon src={info.icon} text={info.text} chosen={chosen} setChosen={setChosen} />
                    </View>
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
        // transform:"translateX(33%)",
      
    }
})

export default Menu;