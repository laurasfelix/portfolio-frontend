import { Stack } from "expo-router";
import Head from "expo-router/head";
import { useFonts } from 'expo-font';
import {View} from "react-native";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'SF-Pro-Rounded-Regular': require('../assets/fonts/SF-Pro-Rounded-Regular.otf'),
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
        input:focus, textarea:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        LOADING
      </View>
    );
  }
  return <>
      <Head>
        <style>{`body{margin:0;background:black}`}</style>
      </Head>
      <Stack screenOptions={{ headerShown: false }} />
    </>;

}
