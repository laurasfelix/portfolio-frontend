import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import { useRouter, Route } from 'expo-router';
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const margin = Dimensions.get('window').width*0.2;
const menu = screenHeight*0.1;

export default function Index() {
  const imgSrc = "/images/logo.svg";
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
        <Text style={styles.welcomeText}> welcome to laura's porfolios.</Text>
        <img src={imgSrc} className="img" alt="logo" />
        <Pressable style={[styles.buttonContainer, {backgroundColor: isHovered ? "gray" : "gainsboro"}]} onPress={() => handlePowerPress()}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}>
          <Text style={styles.buttonText}> start your experience </Text>
        </Pressable> 
      </View>
  
    </View>
  );
}


const styles = StyleSheet.create({
    
    main:
    {
     width: screenWidth,
     height: screenHeight,
     alignItems:"flex-end",
     justifyContent:"center",
     
    }, 
    container:{
      flex: 1,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      height:"100%",
      width:"100%",
    },
    buttonContainer:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height:"100%",
      width:"100%",
      padding:15,
      borderRadius: 10,
    },
    welcome:
    { 
      marginRight: margin, 
      alignItems:"center", 

    },
    welcomeText:
    {
      fontSize: 28,
      color: "white",
      fontWeight: "200",
    },
    menu:{
      width:"100%",
      height:"100%",
    },
    img:{
      width: menu,
      height: menu,
    },
    start:{
      flexDirection:"column",
      gap: menu,
    },
    buttonText:{
      fontSize: 18,
      color: "black",
      fontWeight: "400",
    }
});