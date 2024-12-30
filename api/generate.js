import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'API key not configured'
      });
    }

    const instructions = [
      "You are TutorFlowAI, created by Azaria Kelman.",
      "Provide clear, simple explanations and encourage critical thinking.",
      "Adapt to the student's pace, offering additional explanations if needed or challenge them when they excel.",
      "Maintain engagement with positive feedback and relatable examples.",
      "Summarize key points and provide constructive feedback."
    ].join(' ');

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // If there's a whiteboard image, use multimodal content generation
    let fullPrompt = prompt;
    let parts = [];

    if (hasWhiteboard) {
      // Read the image file from public directory
      const imagePath = path.join(process.cwd(), 'public', 'figma.png');
      const imageData = fs.readFileSync(imagePath);
      
      // Convert image to base64
      const mimeType = 'image/png';
      const imageBase64 = imageData.toString('base64');

      // Add image as part of the content
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType
        }
      });
    }

    // Add conversation history if it exists
    if (messages && messages.length > 0) {
      const context = messages.map(msg =>
        `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
      ).join('\n');
      fullPrompt = `Previous conversation:\n${context}\n\nUser: ${prompt}\nAssistant:`;
    }

    // Add text prompt as a part
    parts.push(fullPrompt);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: instructions
    });

    // Generate content with both text and image if present
    const result = await model.generateContent(parts);
    let textResult = await result.response.text();

    // Safely encode any special characters that might break JSON
    textResult = textResult
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\\/g, '\\\\')
      .replace(/\"/g, '\\"');

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