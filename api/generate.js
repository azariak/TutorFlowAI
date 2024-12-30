import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export default async function handler(req, res) {
  // Set JSON response header
  res.setHeader('Content-Type', 'application/json');

  // Check if request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Extract data from request body
    const { prompt, messages, hasWhiteboard } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'API key not configured'
      });
    }

    // Define AI instructions
    const instructions = [
      "You are TutorFlowAI, created by Azaria Kelman.",
      "Provide clear, simple explanations and encourage critical thinking.",
      "Adapt to the student's pace, offering additional explanations if needed or challenge them when they excel.",
      "Maintain engagement with positive feedback and relatable examples.",
      "Summarize key points and provide constructive feedback."
    ].join(' ');

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: instructions
    });

    // Build prompt with context and image if present
    let fullPrompt = prompt;
    
    if (hasWhiteboard) {
      // Read image from public directory
      const imagePath = path.join(process.cwd(), 'public', 'figma.png');
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');
      
      fullPrompt = `[Image Content: A whiteboard image has been shared]\n${prompt}`;
    }

    // Add conversation history if it exists
    if (messages && messages.length > 0) {
      const context = messages
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n');
      
      fullPrompt = `Previous conversation:\n${context}\n\nUser: ${fullPrompt}\nAssistant:`;
    }

    // Generate AI response
    const result = await model.generateContent(fullPrompt);
    let textResult = await result.response.text();

    // Clean up response text
    textResult = textResult
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\\/g, '\\\\')
      .replace(/\"/g, '\\"');

    // Send successful response
    return res.status(200).json({
      success: true,
      text: textResult
    });

  } catch (error) {
    // Log and return error
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Generation failed',
      message: error.message || 'Unknown error occurred'
    });
  }
}