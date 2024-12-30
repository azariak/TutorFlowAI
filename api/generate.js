import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, messages, hasWhiteboard } = req.body;
    if (!prompt && !hasWhiteboard) {
      return res.status(400).json({ success: false, error: 'Prompt or image required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: hasWhiteboard ? "gemini-2.0-flash-exp" : "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    let result;
    if (hasWhiteboard) {
      const imageData = req.body.image;
      if (!imageData) {
        throw new Error('Image data missing');
      }
      
      result = await model.generateContent([
        { text: prompt },
        {
          inlineData: {
            data: imageData.replace(/^data:image\/\w+;base64,/, ''),
            mimeType: 'image/png'
          }
        }
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    if (!result.response) {
      throw new Error('No response generated');
    }

    return res.status(200).json({
      success: true,
      text: result.response.text()
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