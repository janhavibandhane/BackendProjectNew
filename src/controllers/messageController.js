import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


export const sendMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'Failed to generate response' });
  }
};

