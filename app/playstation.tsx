import { Text, View, StyleSheet, Dimensions, Pressable} from "react-native";
import { useVideoPlayer} from 'expo-video';
import { useEffect, useState, useRef } from "react";
import Animated, { FadeIn, FadeOut, ReduceMotion } from 'react-native-reanimated';
import Menu from "@/components/playstation/Menu";
import Time from "@/components/playstation/Time";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const margin = Dimensions.get('window').width*0.2;
const menu = screenHeight*0.1;

export default function Playstation() {

    const videoSource = "/videos/boot.mp4";
    const shouldBoot = sessionStorage.getItem("playstationBooted") !== "true";
    const [isBoot, setIsBoot] = useState(shouldBoot);
    const soundRef = useRef<HTMLAudioElement | null>(null);

    const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.volume = 0;
  
  });

  const handlePowerPress = async () => {
      if (player) {
        console.log("Playing Video and Audio...");
  
        if (soundRef.current) {
          await soundRef.current.play();
        }
  
        player.play();
  
        setTimeout(() => {
          setIsBoot(false);
        }, 10000);
      }
  
    };

  useEffect(() => {
  const alreadyBooted = sessionStorage.getItem("playstationBooted");

  if (!alreadyBooted) {
    async function loadSound() {
      console.log("Loading Sound");
      const audio = new Audio(require("@/public/sounds/startup.mp3"));
      audio.preload = "auto";
      soundRef.current = audio;
    }

    loadSound();
    handlePowerPress();

    sessionStorage.setItem("playstationBooted", "true");
  } else {
    setIsBoot(false); // skip boot screen
  }
}, []);

    
return (
    <View style={styles.container}>
    
        <Animated.View
        
        entering={isBoot ? FadeIn.duration(8000).reduceMotion(ReduceMotion.Never) : FadeIn.duration(100) }
        style={[styles.main, {justifyContent: isBoot ? "center" : "flex-start"}]}
      >
          <video 
          src={videoSource} 
          autoPlay 
          loop 
          muted 
          style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            width: screenWidth,
            height: screenHeight,
            objectFit: "cover",
            zIndex: -1
          }} 

        />

        {isBoot && <Animated.View style={styles.welcome} entering={FadeIn.duration(2000).reduceMotion(ReduceMotion.Never)} exiting={FadeOut.duration(1000).reduceMotion(ReduceMotion.Never)}>

          <Text style={styles.welcomeHeader}>Portfolio by Laura</Text>   
          <Text style={styles.welcomeText}>(sony don't sue me pls)</Text>      

        </Animated.View>}

        {!isBoot &&

        <Animated.View style={styles.menu} entering={FadeIn.duration(1000).reduceMotion(ReduceMotion.Never)} exiting={FadeOut.duration(1000).reduceMotion(ReduceMotion.Never)}>
          
          <Time />
          <Menu />
           
        </Animated.View>

        }
      </Animated.View>

      </View> );
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
    welcomeHeader:
    {
      fontSize: 48,
      color: "white",
      fontWeight: "200",
    },
    menu:{
      width:"100%",
      height:"100%",
    },
});