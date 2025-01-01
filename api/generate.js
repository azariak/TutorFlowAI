import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, messages, hasWhiteboard, image, clientApiKey } = req.body;

    // Use client API key if provided in request, otherwise use server env
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('API key not configured in request or environment variables');
    }

    const instructions = [
      "You are TutorFlowAI, created by Azaria Kelman to make interactive learning simple through the integration of AI and a whiteboard..",
      "Provide clear, simple explanations and encourage critical thinking.",
      "Adapt to the user's pace, offering additional explanations if needed or challenge them when they excel.",
      "Maintain engagement with positive feedback and relatable examples. Explain the intuition behind concepts.",
      "Summarize key points and provide constructive feedback.",
      "When you see a whiteboard image, do not comment on the board, but use it to see the user's work thus far, to help you tutor better using their example.", 
      "Concisely, describe everything you see in the whiteboard. Do not add bot: to your response or add the user's response."
    ].join(' ');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: instructions
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