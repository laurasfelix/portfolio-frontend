import {View, StyleSheet, Dimensions, Text} from "react-native";
import colors from "@/utils/colors";
import {CardProps} from "@/utils/card";

const SmallCard = ({color, role, company, text, icon}: CardProps) => {

    return (
        <View>
            <Text style={styles.title}>
                Hey
            </Text>
        </View>
    );

};

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight: 200,
        color: 'white'
    }

});

export default SmallCard;