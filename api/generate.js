import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { prompt, messages, hasWhiteboard } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision",
    });

    const history = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000,
      }
    });

    const messageParts = [{ text: prompt }];

    if (hasWhiteboard) {
      const imageData = await fetch(req.body.image).then(r => r.arrayBuffer());
      messageParts.push({
        inlineData: {
          data: Buffer.from(imageData).toString('base64'),
          mimeType: 'image/png'
        }
      });
    }

    const result = await chat.sendMessage(messageParts);
    const textResult = await result.response.text();

    return res.status(200).json({
      success: true,
      text: textResult
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Generation failed',
      message: error.message || 'Unknown error occurred'
    });
  }
}