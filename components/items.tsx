import { View, StyleSheet, Text, Dimensions, Pressable} from "react-native";
import itemInfo from "@/utils/itemInfo";
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

const iconWidth =  Dimensions.get("window").width*0.065;
const notChosenWidth =  Dimensions.get("window").width*0.050;

interface ItemsProp{
    chosen: number, 
    src: number, 
    chosenIcon: number[], 
    setChosenIcon: Dispatch<SetStateAction<number[]>>,
    up: boolean,
};

const Items = ({chosen,src, chosenIcon, setChosenIcon, up}: ItemsProp) => {

    const info = itemInfo[chosen];

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
                
            }, [chosenIcon]);

    return (
        <View style={[styles.container, {display: chosen===src ? "flex": "none"},{overflow: "hidden"},{justifyContent: up ? "flex-end" : undefined}]}>
           {info.map((item, index) => (
            <Pressable key={index} style={[styles.item,{padding: index===chosenIcon[chosen] && up? ? 16 : 4} ]}
             onPressIn={() => setChosenIcon(prev=> ({
                ...prev,
                [chosen]: index,
             }))}
             onHoverIn={() => setChosenIcon(prev => ({
                ...prev,
                [chosen]: index,
             }))}
            >
            
              <View style={[,

                {display: up ? (index < chosenIcon[chosen] ? "flex" : "none") : (!up ? (index >= chosenIcon[chosen] ? "flex" : "none") : undefined)},
              ]}>

                <View style={styles.imgContainer}>
                    <img src={`/images/${item.icon}.svg`} style={{opacity: index===chosenIcon[chosen] ? 0.95 : 0.8, width: index===chosenIcon[chosen] ? iconWidth : notChosenWidth, height: index===chosenIcon[chosen] ? iconWidth : notChosenWidth, alignSelf:"center"}}/>
                </View>
            </View>
          
            </Pressable>
           ))}
        </View>
    );

};

const styles = StyleSheet.create({

    container:{
        width:"100%",
        flex:1,
        flexDirection:"column",
        gap:4,
        padding:2,

    },
    iconText:{
        color: "white",
        textAlign:"center",
        fontSize:20,
        flex:1,
    },
    innerText:{
        color:"white",
    
    },
    item:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
    },
    imgContainer:{
        justifyContent:"center",
        alignItems:"center",
        filter: "drop-shadow(2px 5px 1px rgb(0 0 0 / 0.3))",
    },
  

})

export default Items;
