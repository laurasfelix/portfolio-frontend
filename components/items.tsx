import { View, StyleSheet, Text, Dimensions, Pressable} from "react-native";
import itemInfo from "@/utils/itemInfo";
import {useState, useEffect} from 'react';

const iconWidth =  Dimensions.get("window").width*0.075;
const notChosenWidth =  Dimensions.get("window").width*0.055;

const Items = ({chosen, src}: {chosen:string, src:string}) => {

    const info = itemInfo[chosen];
    const [chosenIcon, setChosenIcon] = useState(0);

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
        <View style={[styles.container, {display: chosen===src ? "flex": "none"}]}>
           {info.map((item, index) => (
            <Pressable key={index} style={[styles.item,{padding: index===chosenIcon ? 8 : 4} ]}
             onPressIn={() => setChosenIcon(index)}
             onHoverIn={() => setChosenIcon(index)}
            >
            {index >= chosenIcon &&
              <View>

         
                <View style={styles.imgContainer}>
                    <img src={`/images/${item.icon}.svg`} style={{opacity: index===chosenIcon ? 0.95 : 0.8, width: index===chosenIcon ? iconWidth : notChosenWidth, height: index===chosenIcon ? iconWidth : notChosenWidth, alignSelf:"center"}}/>
                </View>
            </View>
            //     {/* <Text style={styles.iconText}> {item.title} </Text>
            //  */}
            //     {/* {item.text.map((line, idx) =>(
            //         <Text key={idx} style={styles.innerText}> {line} </Text>
            //     ))} */}
                }
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
    },
    imgContainer:{
        justifyContent:"center",
        alignItems:"center",
        filter: "drop-shadow(2px 5px 1px rgb(0 0 0 / 0.3))",
    }
   
  

})

export default Items;
