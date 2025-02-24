import { View, StyleSheet } from "react-native";
const Clock = ({hour, minute}:{hour: number, minute: number}) =>
{
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    const minuteAngle = minute * 6;
    return (
        <View style={styles.clock}>
            <View style={[styles.hour, styles.hand,{ transform: [{ rotate: `${hourAngle}deg` }]}]} ></View>
            <View style={[ styles.minute, styles.hand, { transform: [{ rotate: `${minuteAngle}deg` }] }]}></View>
        </View>
    );

};

const styles = StyleSheet.create({
    clock:{
        borderRadius: 10,
        width: 20,
        height: 20,
        backgroundColor:"rgba(57, 57, 57, 0.64)",
        borderColor: "white",
        borderWidth:1,
        boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        justifyContent: "center",
        alignItems: "center",
  
        },
    hour:{
        height: 5,

    }, 
    minute:{
        height: 7,

    },

    hand:{
        position: "absolute",
        bottom: "50%", 
        width: 1.5,
        borderRadius: 1,
        backgroundColor: "white",
        zIndex: 50,
        transformOrigin: "bottom center",
    }
  


})

export default Clock;