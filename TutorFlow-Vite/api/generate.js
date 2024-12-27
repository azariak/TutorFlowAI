// pages/api/generate.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  console.log('API route hit:', req.method, req.body);
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false,
        error: 'Prompt is required' 
      });
    }

    // const apiKey = process.env.GEMINI_API_KEY;
    const apiKey = AIzaSyAJ-wKmXr9racsYYYWdmNq5D4D5qcEP6wA;

    if (!apiKey) {
      return res.status(500).json({ 
        success: false,
        error: 'API key not configured' 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const result = await model.generateContent(prompt);
    let textResult = await result.response.text();

    // Safely encode any special characters that might break JSON
    textResult = textResult
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\\/g, '\\\\')
      .replace(/\"/g, '\\"');

    // Send response with properly escaped markdown
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