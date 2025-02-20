import { Text, View, StyleSheet, Dimensions} from "react-native";

interface IconProps{
    src: string,
}

const Icon = ({src}: IconProps) => {


    return (
        <View>
            <Text style={styles.innerText}>
                {src}
            </Text>
        </View>
    );

};

const styles = StyleSheet.create({
    innerText:{
        textAlign:"center",
        fontSize: 24,
        color: "white",
    },
});

export default Icon;