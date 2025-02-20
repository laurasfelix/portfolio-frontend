import { Text, View, StyleSheet, Dimensions} from "react-native";
import { VideoView, useVideoPlayer} from 'expo-video';
import { useEffect } from "react";
import Animated, { FadeIn, ReduceMotion } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function Index() {


  const videoSource = require("../assets/videos/boot.mp4");

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

  return (
    <View style={styles.container}>
    
      <Animated.View
        
        entering={FadeIn.duration(8000).reduceMotion(ReduceMotion.Never)}
        style={styles.main}
      >
          <VideoView style={styles.video} player={player} allowsFullscreen nativeControls={false} allowsPictureInPicture contentFit="cover" /> 
          {/* <Text>laura's profile</Text> */}
        
      
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
    video:{
      width: "100%",
      height:"100%",
    
    },
    main:
    {
   
     width: screenWidth,
     height: screenHeight,
    }, 
    container:{
      backgroundColor: "black",
    }
});