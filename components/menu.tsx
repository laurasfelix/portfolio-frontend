import {View, StyleSheet, Dimensions, Text} from "react-native";
import Icon from "@/components/icon";
import { useState } from "react";
import Items from "@/components/items";

const screenWidth = Dimensions.get('window').width;
const upHeight = Dimensions.get('window').height * 0.2;

const Menu = () => {

    const listInfo = [
        {icon:"about", text:"about"},
        {icon:"exp", text:"experience"},
        {icon:"www", text:"projects"},
        {icon:"games", text:"hobbies"},
        {icon:"contact", text:"contact"}
    ];
    const [chosen, setChosen] =  useState(0);
    const [chosenIcon, setChosenIcon] = useState([0,0,0,0,0]);
    const [selectedText, setSelectedText] = useState("");

    return (
        <View style={styles.menuContainer}>
            {listInfo.map((info, idx) => (
                <View key={idx} style={styles.scene}>
                    <View style={[{height:upHeight}, styles.up]}>
                        <Items
                            chosen={chosen}
                            src={idx}
                            chosenIcon={chosenIcon}
                            setChosenIcon={setChosenIcon}
                            setSelectedText={setSelectedText}
                            up={true}
                        />
                    </View>

                    <View style={styles.icon}>
                        <Icon src={idx} text={info.text} chosen={chosen} setChosen={setChosen} />
                        <View>
                            <Items
                                chosen={chosen}
                                src={idx}
                                chosenIcon={chosenIcon}
                                setChosenIcon={setChosenIcon}
                                setSelectedText={setSelectedText}
                                up={false}
                            />
                        </View>
                    </View>
                </View>
            ))}
            {selectedText !== "" && (
                <View style={styles.textBox}>
                    <Text style={styles.text}>{selectedText}</Text>
                </View>
            )}
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
    textBox:{
        position:'absolute',
        bottom:20,
        left:0,
        right:0,
        alignItems:'center',
        padding:8,
        backgroundColor:'rgba(0,0,0,0.6)',
    },
    text:{
        color:'white',
        fontSize:18,
    },
})

export default Menu;