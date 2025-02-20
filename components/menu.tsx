import { Text, View, StyleSheet, Dimensions} from "react-native";
import { useEffect, useState } from "react";
import Icon from "../components/icon";

const screenWidth = Dimensions.get('window').width;

const Menu = () =>
{
    const [chosen, setChosen] = useState(false);
    const listIcons = ["about", "exp", "www", "games", "contact"];

    return (
        <View style={styles.menuContainer}>
            {listIcons.map((icon, idx) =>
            {
                return (
                    <View key={idx} style={styles.icon}>
                        <Icon src={icon}/>
                    </View>
                );
            }
        )

            }
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer:{
        flex:1,
        flexDirection: "row",
        width: "100%",
        padding: screenWidth*0.05,
    },
    icon:{
        flex:1,
      
    }
})

export default Menu;