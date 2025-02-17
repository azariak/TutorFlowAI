// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import INSTRUCTIONS from '../components/chat/systemPrompt.txt?raw';

export async function generateResponse(prompt, imageData = null, apiKey) {
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  // Get saved preferences
  const verbosity = localStorage.getItem('VERBOSITY') || '50';
  const styleComments = localStorage.getItem('STYLE_COMMENTS') || '';

  // Build system instructions with preferences
  let systemInstructions = INSTRUCTIONS;
  if (verbosity !== '50') {
    systemInstructions += `\n\nPlease adjust your response verbosity to ${verbosity}% of normal length.`;
  }
  if (styleComments) {
    systemInstructions += `\n\nAdditional style preferences: ${styleComments}`;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: systemInstructions
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