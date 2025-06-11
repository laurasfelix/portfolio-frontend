import { Text, View, StyleSheet, Dimensions, ScrollView, Pressable} from "react-native";
import { useRouter, Route } from 'expo-router';
import { useEffect, useState } from "react";
import LargeCard from "@/components/landing/LargeCard";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const margin = Dimensions.get('window').width*0.2;
const menu = screenHeight*0.3;

export default function Index() {
  const imgSrc = '/images/logo.svg';
  const [isHovered, setIsHovered] = useState(false);
  const pages = ["playstation", "furby"];
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
    <ScrollView style={styles.container} contentContainerStyle={{ 
      alignItems: "center", 
      justifyContent: "center",
      
    }} 
      snapToInterval={200}
      snapToAlignment="center"
      decelerationRate="fast">
      <View style={styles.start}>
        <View style={styles.topSection}>
          <Text style={[styles.welcomeText]}> laura saraiva feeeélix</Text>
        </View>
        <View style={styles.middleSection}>
          {mounted && <img src={imgSrc } alt="logo" style={styles.img} />}
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.landingTitle}> developer, gamer, reader, lego-er </Text>
          <View> 
            <LargeCard color={"green"} role={"Software Engineering"} company="Duolingo" text={["baa"]} icon=""/>
          </View>
        </View>
        {/* <View style={styles.bottomSection}>
          <Pressable style={[styles.buttonContainer, {backgroundColor: isHovered ? "gray" : "gainsboro"}]}
            onPress={handlePowerPress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}>
            <Text style={styles.buttonText}> start your experience </Text>
          </Pressable>
        </View> */}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: "100%",
    flex:1,
    padding: 10,
    
  },
  start: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flex:1, 
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
  landingTitle: {

    fontSize: 20,
    color: "white",
    fontWeight: "200",

  },
  img: {
    width: menu,
    height: menu,
    objectFit: "contain",

  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
});