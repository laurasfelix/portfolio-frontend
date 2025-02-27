import { View, StyleSheet, Text, Dimensions } from "react-native";
import itemInfo from "@/utils/itemInfo"

const iconWidth =  Dimensions.get("window").width*0.075;
const notChosenWidth =  Dimensions.get("window").width*0.065;

const Items = ({chosen, src}: {chosen:string, src:string}) => {

    const info = itemInfo[chosen];

    return (
        <View style={[styles.container, {visibility: chosen===src ? "visible": "hidden"}]}>
           {info.map((item, index) => (
            <View key={index}>
                <Text style={styles.iconText}> {item.title} </Text>
                <img src={`/images/${item.icon}.svg`} style={{width: iconWidth, height: iconWidth}}/>

                {item.text.map((line, idx) =>(
                    <Text key={idx} style={styles.innerText}> {line} </Text>
                ))}
            
            </View>
           ))}
        </View>
    );

};

const styles = StyleSheet.create({

    container:{
        flex:1,

    },
    iconText:{
        color: "white",
        textAlign:"center",
    },
    innerText:{
        color:"white",
    }

})

export default Items;
