import { Text,TextInput, View, StyleSheet, useWindowDimensions, Pressable} from "react-native";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

const placeholderMessages = [
    "this is Furbotron.",
    "ask him anything about laura",
    "make your request to Master Furbotron 3000",
    "be careful what you wish for...",
    ];

interface InputBoxProp{
    isThinking: boolean,
    setIsThinking:  Dispatch<SetStateAction<boolean>>,
    setInteract: Dispatch<SetStateAction<boolean>>,
};

const InputBox = ({isThinking, setInteract}: InputBoxProp
    
) => {
    const [text, onChangeText] = useState("");
    const [placeholder, setPlaceholder] = useState(placeholderMessages[0]);
    const indexRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() =>
    {
        const cycleMessages = () => {
            timeoutRef.current = setTimeout(() => {
            
                indexRef.current = (indexRef.current + 1) % placeholderMessages.length;
                setPlaceholder(placeholderMessages[indexRef.current]);

                cycleMessages(); 
            }, 4000); 
        };

        cycleMessages();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
  }, []);

    return (
        <View style={styles.popUp}>
            <TextInput 
            style={styles.popUpText}
            onChangeText={(newText) => {
                onChangeText(newText);  
                setInteract(true);
            }}
            value={text}
            placeholder={placeholder}
            placeholderTextColor="gray"
            onSubmitEditing={() => {setInteract(false);}}
            />
        </View>
    )

};

const styles = StyleSheet.create({
    popUp:{
        backgroundColor: "lightgrey", 
        // position:"fixed", 
        zIndex:3,
        padding:10,
        borderRadius: 10,
        minWidth:"60%",
        textAlign: "center",

    },
    popUpText:{
      fontSize: 18,
      color: "black",
      fontWeight: "300",
      textAlign: "center",

    },
});

export default InputBox;