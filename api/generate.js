import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, messages, hasWhiteboard, image } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: hasWhiteboard ? "gemini-pro-vision" : "gemini-pro"
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