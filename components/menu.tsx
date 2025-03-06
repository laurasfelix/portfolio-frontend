import {View, StyleSheet, Dimensions} from "react-native";
import Icon from "@/components/icon";
import { useState } from "react";
import Items from "@/components/items";

const screenWidth = Dimensions.get('window').width;
const upHeight = Dimensions.get('window').height * 0.2;

const Menu = () =>
{
    
    const listInfo = [{icon:"about", text:"about"}, {icon:"exp", text:"experience"}, {icon:"www", text:"projects"}, {icon:"games", text:"hobbies"}, {icon:"contact", text:"contact"}];
    const [chosen, setChosen] =  useState(0);
    const [chosenIcon, setChosenIcon] = useState([0,0,0,0,0])

    
    return (
        <View style={styles.menuContainer}>
            {listInfo.map((info, idx) =>
            {
                return (
                    <View key={idx} style={styles.scene}
                    >
                        <View style={[{height:upHeight}, styles.up]}>
                            <Items chosen={chosen} src={idx} chosenIcon={chosenIcon} setChosenIcon={setChosenIcon} up={true}/>
                        </View>

                        <View style={styles.icon}>
                            <Icon src={idx} text={info.text} chosen={chosen} setChosen={setChosen} />
                            <View >
                                <Items chosen={chosen} src={idx} chosenIcon={chosenIcon} setChosenIcon={setChosenIcon} up={false}/>
                            </View>
                        </View> 
                     
                       
                        
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
        paddingTop: 0,
        paddingRight: screenWidth * 0.05,
        paddingBottom: 0,
        paddingLeft: screenWidth * 0.05,
    
    },
    scene:{
        flex:1,
        width:"100%",
        flexDirection: "column",
        gap:1,
    },
    icon:{
       flex:10, 
    },
    
    up:{
        flex:4,
    },
})

export default Menu;