import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState} from "react";
import Clock from "@/components/clock";

const Time = () => {

    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [hour, setHour] = useState(new Date().getHours());
    const [minutes, setMinutes] = useState(new Date().getMinutes());

    useEffect(()=> {

        const updateTime = () =>{

        const date = new Date();
        setDay(date.getDate());
        setMonth(date.getMonth()+1);
        setHour(date.getHours());
        setMinutes(date.getMinutes());

        }

        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);

    }, [])



    return (
        <View style={styles.time}>

            <Text style={styles.innerText}>
                {month}/{day} {hour}:{minutes < 10 ? "0"+minutes: minutes}
            </Text>

            <Clock hour={hour} minute={minutes} />

            
            
        </View>
    );

};

const styles = StyleSheet.create({
    time:{
        position:"absolute",
        zIndex: 50,
        top: "10%",
        flex: 1,
        width: "25%",
        height:"4%",
        alignItems: "center",
        justifyContent:"center",
        transform: "translateX(300%)",
        backgroundColor: "rgba(87, 87, 87, 0.3)",
        borderColor: "rgba(249, 248, 248, 0.51)",
        borderWidth: 1,
        flexDirection:"row",
        gap:10,
    
    },
    innerText:{
        color: "white",
        fontSize:20,
        fontWeight:"400",
        textShadowColor:"rgba(53, 53, 53, 0.81)",
        textShadowRadius: 2,
    }

})

export default Time;