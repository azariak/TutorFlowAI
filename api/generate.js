// pages/api/generate.js
import { generateResponse } from '@/services/geminiService';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, hasWhiteboard, image } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "API quota exceeded. Please either:\n\n" +
              "1. Follow the API key setup instructions at the bottom of the help menu\n" +
              "2. Wait a few minutes and try again"
      });
    }

    const response = await generateResponse(prompt, hasWhiteboard ? image : null, apiKey);
    
    return res.status(200).json({
      success: true,
      text: response
    });
  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Generation failed'
    });
  }
}