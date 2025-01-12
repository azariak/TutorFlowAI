// pages/api/generate.js
import { generateResponse } from '@/services/geminiService';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, hasWhiteboard, image, clientApiKey } = req.body;
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;
    
    const response = await generateResponse(prompt, hasWhiteboard ? image : null, apiKey);
    
    return res.status(200).json({
      success: true,
      text: response
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