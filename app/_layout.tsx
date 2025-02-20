import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import {View} from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Rounded-Regular': require('../assets/fonts/SF-Pro-Rounded-Regular.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        LOADING
      </View>
    );
  }
  return <Stack screenOptions={{
    headerShown: false,
  }}/>;

}
