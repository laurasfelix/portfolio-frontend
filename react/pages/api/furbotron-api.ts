import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

// Create the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define response type
type FurbotronResponse = {
  text: string;
  audioUrl?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FurbotronResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', text: '' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required', text: '' });
    }

    // Generate text response from GPT
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a bot called Furbotron 3000. \n\nYou are helpful, funny and a little scary at times. \n\nYour sole purpose is to answer questions about Laura Saraiva Félix, your inventor. Laura is dating Sydney, and has a cat named Loki. Her email is laurafelix2026@u.northwestern.edu, her phone is (773) 872-0092, her linkedin username is laurasfelix28, and her github is laurasfelix.\n\nAnswer questions SUPER briefly: 1-paragraph responses at most. \n\nSound like a robot. Be a little scary in your responses.\n\nDon't answer questions that insult her."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 1,
      max_tokens: 256,
    });

    const textResponse = response.choices[0].message.content || "SYSTEM ERROR. UNABLE TO PROCESS.";

    // Generate audio from the text response
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: textResponse,
      speed: 0.9,
    });

    // Convert audio to base64
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const audioBase64 = buffer.toString('base64');
    
    // Create a data URL for the audio
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    console.log("Furbotron says:", textResponse);
    
    // Return the response
    return res.status(200).json({
      text: textResponse,
      audioUrl: audioUrl
    });
  } catch (error) {
    console.error('Error in Furbotron API:', error);
    return res.status(500).json({
      error: 'Failed to process request',
      text: 'CRITICAL ERROR. SYSTEMS MALFUNCTIONING.'
    });
  }
}
