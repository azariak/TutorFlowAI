import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const INSTRUCTIONS = fs.readFileSync(
  path.join(process.cwd(), 'src/components/chat/systemPrompt.txt'),
  'utf-8'
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, messages, hasWhiteboard, image, clientApiKey } = req.body;

    // Use client API key if provided in request, otherwise use server env
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'API key not configured in request or environment variables'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: INSTRUCTIONS
    });

    let result;
    if (hasWhiteboard && image) {
      result = await model.generateContent([
        { text: prompt },
        {
          inlineData: {
            data: image.split(',')[1],
            mimeType: 'image/png'
          }
        }
      ]);
    } else {
      result = await model.generateContent([{ text: prompt }]);
    }

    const responseText = await result.response.text();

    return res.status(200).json({
      success: true,
      text: responseText
    });
  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Generation failed',
      details: error.message
    });
  }
}