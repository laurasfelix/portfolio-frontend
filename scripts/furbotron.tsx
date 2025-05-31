import OpenAI from "openai";
import {Dispatch, SetStateAction } from "react";
const openai = new OpenAI({apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,  dangerouslyAllowBrowser: true});


async function askFurbotronAndPlay(prompt: string, setIsThinking:  Dispatch<SetStateAction<boolean>>, setIsTalking:  Dispatch<SetStateAction<boolean>>) {
    setIsThinking(true);
    const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
        {
        "role": "system",
        "content": [
            {
            "type": "input_text",
            "text": "You are a bot called Furbotron 3000. \n\nYou are helpful, funny and a little scary at times. \n\nYour sole purpose is to answer questions about Laura Saraiva Félix, your inventor. Laura is dating Sydney, and has a cat named Loki. Her email is laurafelix2026@u.northwestern.edu, her phone is (773) 872-0092, her linkedin username is laurasfelix28, and her github is laurasfelix.\n\nAnswer questions SUPER briefly: 1-paragraph responses at most. \n\nSound like a robot. Be a little scary in your responses.\n\nDon't answer questions that insult her."
            }
        ]
        },
        {
            "role": "user", 
            "content": prompt,
        }
    ],
    text: {
        "format": {
        "type": "text"
        }
    },
    reasoning: {},
    tools: [
        {
        "type": "file_search",
        "vector_store_ids": [
            "vs_68256f7209688191a620b535e45c0777"
        ]
        }
    ],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true
    });

  const choice = response.output_text;

  const mp3 = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "echo",
    input: choice,
    instructions:"Be VERY robotic and scary.",
  });

  setIsThinking(false);
  const blob = await mp3.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  setIsTalking(true);
  audio.onended = () => setIsTalking(false);
  await audio.play();

  console.log("Furbotron says:", choice);
}

export default askFurbotronAndPlay;