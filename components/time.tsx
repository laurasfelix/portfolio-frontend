import { View, Text, StyleSheet } from "react-native";

const Time = () => {



    return (
        <View style={styles.time}>

            <Text style={styles.innerText}>
                7/28 17:27
            </Text>

            
            
        </View>
    );

};

const styles = StyleSheet.create({
    time:{
        flex: 1,
        width: "25%",
        maxHeight: "10%",
        alignItems: "center",
        justifyContent:"center",
        transform: "translateX(300%)",
        backgroundColor: "rgba(87, 87, 87, 0.3)",
        borderColor: "white",
    
    },
    innerText:{
        color: "white",
        fontSize:20,
    }

})

export default Time;