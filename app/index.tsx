import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import { useRouter, Route } from 'expo-router';
import { Image } from "expo-image";
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const margin = Dimensions.get('window').width*0.2;
const menu = screenHeight*0.3;

export default function Index() {
  // Use a string path for web compatibility
  const imgSrc = '/images/logo.svg';
  const [isHovered, setIsHovered] = useState(false);
  const pages = ["playstation", "furby"];
  const router = useRouter();

  const RandomPage = () => {
        const min = 0;
        const max = pages.length;
        const randomNumber =
            Math.floor(Math.random() * (max - min));
        return randomNumber;
    };
  
  const handlePowerPress = () => { 
      let page = RandomPage();
      router.navigate(("/" + pages[page]) as Route)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.start}>
        <View style={styles.topSection}>
          <Text style={[styles.welcomeText]}> welcome to laura's porfolios.</Text>
        </View>
        <View style={styles.middleSection}>
          {/* Use string path for web */}
          <Image source={{ uri: imgSrc }} alt="logo" style={[styles.img]} />
        </View>
        <View style={styles.bottomSection}>
          <Pressable style={[styles.buttonContainer, {backgroundColor: isHovered ? "gray" : "gainsboro"}]}
            onPress={handlePowerPress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}>
            <Text style={styles.buttonText}> start your experience </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: screenHeight,
    padding: 0,
  },
  start: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: screenHeight,
    padding: 0,
  },
  topSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingBottom: 24,
  },
  middleSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: 24,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    minWidth: 220,
  },
  welcomeText: {
    fontSize: 28,
    color: "white",
    fontWeight: "200",
  },
  img: {
    width: menu,
    height: menu,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
});