import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import itemInfo from "@/utils/itemInfo";
import { Image } from "expo-image";
import { useEffect, Dispatch, SetStateAction } from 'react';

const iconWidth = Dimensions.get("window").width * 0.065;
const notChosenWidth = Dimensions.get("window").width * 0.05;

interface ItemsProp {
  chosen: number;
  src: number;
  chosenIcon: number[];
  setChosenIcon: Dispatch<SetStateAction<number[]>>;
  setSelectedText: Dispatch<SetStateAction<string>>;
  up: boolean;
}

const Items = ({ chosen, src, chosenIcon, setChosenIcon, setSelectedText, up }: ItemsProp) => {
  const info = itemInfo[chosen];

  useEffect(() => {
    let soundObject: HTMLAudioElement;

    async function playSound() {
      console.log("Loading Sound");
      soundObject = new window.Audio("/sounds/hover.mp3");
      console.log("Playing Sound");
      await soundObject.play();
    }

    playSound();

    return () => {
      if (soundObject) {
        console.log("Unloading Sound");
        soundObject.pause();
        soundObject.src = "";
      }
    };
  }, [chosenIcon]);

  return (
    <View
      style={[
        styles.container,
        { display: chosen === src ? "flex" : "none" },
        { overflow: "hidden" },
        { justifyContent: up ? "flex-end" : undefined }
      ]}
    >
      {info.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              styles.item,
              { padding: up ? (index < chosenIcon[chosen] ? 4 : 0) : (index < chosenIcon[chosen] ? 0 : 4) }
            ]}
          >
            <Pressable
              style={[
                {
                  display: up
                    ? index < chosenIcon[chosen]
                      ? "flex"
                      : "none"
                    : !up
                    ? index >= chosenIcon[chosen]
                      ? "flex"
                      : "none"
                    : undefined
                }
              ]}
              onHoverIn={() => {
                setTimeout(() => {
                  setChosenIcon(prev => {
                    const arr = [...prev];
                    arr[chosen] = index;
                    return arr;
                  });
                }, 200);
              }}
              onPressIn={() => setSelectedText(item.title)}
            >
              <View style={styles.imgContainer}>
                <img
                  src={item.icon}
                  style={{
                    opacity: index === chosenIcon[chosen] ? 0.95 : 0.8,
                    width: index === chosenIcon[chosen] ? iconWidth : notChosenWidth,
                    height: index === chosenIcon[chosen] ? iconWidth : notChosenWidth,
                    alignSelf: "center"
                  }}
                />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    gap: 4
  },
  iconText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    flex: 1
  },
  innerText: {
    color: "white"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    filter: "drop-shadow(2px 5px 1px rgb(0 0 0 / 0.3))"
  }
});

export default Items;
