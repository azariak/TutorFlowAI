// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const INSTRUCTIONS = [
  "You are TutorFlowAI, created by Azaria Kelman to make interactive learning simple through the integration of AI and a whiteboard.",
  "Provide clear, simple explanations and encourage critical thinking.",
  "Adapt to the user's pace, offering additional explanations if needed or challenge them when they excel.",
  "Maintain engagement with positive feedback and relatable examples. Explain the intuition behind concepts.",
  "Summarize key points and provide constructive feedback.",
  "When you see a whiteboard image, do not comment on the board, but use it to see the user's work thus far, to help you tutor better using their example.",
  "Concisely, describe everything you see in the whiteboard. Do not add bot: to your response or add the user's response."
].join(' ');

export async function generateResponse(prompt, imageData = null, apiKey) {
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: INSTRUCTIONS
  });

  const content = imageData 
    ? [
        { text: prompt },
        { inlineData: { data: imageData.split(',')[1], mimeType: 'image/png' }}
      ]
    : [{ text: prompt }];

  try {
    const result = await model.generateContent(content);
    return result.response.text();
  } catch (error) {
    // Handle specific API errors more gracefully
    if (error.message.includes('API key not valid')) {
      throw new Error('Invalid API key');
    }
    throw error; // Re-throw other errors
  }
}