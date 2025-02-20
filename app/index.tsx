import { Text, View, StyleSheet, Dimensions} from "react-native";
import { VideoView, useVideoPlayer} from 'expo-video';
import { useEffect, useState } from "react";
import Animated, { FadeIn, FadeOut, ReduceMotion } from 'react-native-reanimated';
import Menu from "../components/menu";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const margin = Dimensions.get('window').width*0.2;


export default function Index() {

  const videoSource = require("../assets/videos/boot.mp4");
  const [isBoot, setIsBoot] = useState(true);

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.volume = 0;
  
  });

  useEffect(() => {
    if (player) {
      console.log("Playing video...");
      player.play();
    }
  }, [player]);

  useEffect(()=>{
    const timeout = setTimeout(() => {
      setIsBoot(false);
    }, 8000);

    return () => { 
      clearTimeout(timeout);
    };
 },[]);

  return (
    <View style={styles.container}>
    
      <Animated.View
        
        entering={FadeIn.duration(8000).reduceMotion(ReduceMotion.Never)}
        style={styles.main}
      >
          <VideoView style={styles.video} player={player} allowsFullscreen nativeControls={false} allowsPictureInPicture contentFit="cover" /> 

        {isBoot && <Animated.View style={styles.welcome} entering={FadeIn.duration(2000).reduceMotion(ReduceMotion.Never)} exiting={FadeOut.duration(1000).reduceMotion(ReduceMotion.Never)}>

          <Text style={styles.welcomeHeader}>Portfolio by Laura</Text>   
          <Text style={styles.welcomeText}>(sony don't sue me pls)</Text>      

        </Animated.View>}

        {!isBoot &&

        <Animated.View style={styles.menu} entering={FadeIn.duration(1000).reduceMotion(ReduceMotion.Never)} exiting={FadeOut.duration(1000).reduceMotion(ReduceMotion.Never)}>

          <Menu />
           
        </Animated.View>

        }
      </Animated.View>
  
    </View>
  );
}


const styles = StyleSheet.create({
    video:{
      width: "100%",
      height:"100%",
      position:"absolute",
      
    
    },
    main:
    {
   
     width: screenWidth,
     height: screenHeight,
     alignItems:"flex-end",
     justifyContent:"center",
    }, 
    container:{
      backgroundColor: "black",
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
      fontWeight: 200,
    }, 
    welcomeHeader:
    {
      fontSize: 48,
      color: "white",
      fontWeight: 200,
    },
    menu:{
      width:"100%",
      alignItems:"center",
      justifyContent:"center",
    }
});