import { View, StyleSheet, Text, Dimensions } from "react-native";
import itemInfo from "@/utils/itemInfo"

const iconWidth =  Dimensions.get("window").width*0.075;
const notChosenWidth =  Dimensions.get("window").width*0.065;

const Items = ({chosen, src}: {chosen:string, src:string}) => {

    const info = itemInfo[chosen];

    return (
        <View style={[styles.container, {visibility: chosen===src ? "visible": "hidden"}]}>
           {info.map((item, index) => (
            <View key={index} style={styles.item}>
              
                <View style={styles.imgContainer}>
                    <img src={`/images/${item.icon}.svg`} style={{width: iconWidth, height: iconWidth, alignSelf:"center"}}/>
                </View>
                <Text style={styles.iconText}> {item.title} </Text>
            
                {/* {item.text.map((line, idx) =>(
                    <Text key={idx} style={styles.innerText}> {line} </Text>
                ))} */}
            
            </View>
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
    },
    innerText:{
        color:"white",
    },
    item:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        // transform:"translateX(25%)"
    },
    imgContainer:{
        justifyContent:"flex-start",
        alignItems:"center",
    }
  

})

export default Items;
