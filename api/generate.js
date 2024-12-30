import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  // Enable streaming for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { prompt, messages, hasWhiteboard } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision",
    });

    // Initialize chat history
    const history = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Start chat with history
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000,
      }
    });

    // Prepare message parts
    const messageParts = [];
    messageParts.push({ text: prompt });

    // Add image if present
    if (hasWhiteboard) {
      // Convert base64 image to Uint8Array if needed
      const imageData = await fetch(req.body.image).then(r => r.arrayBuffer());
      messageParts.push({
        inlineData: {
          data: Buffer.from(imageData).toString('base64'),
          mimeType: 'image/png'
        }
      });
    }

    // Send message and get streaming response
    const result = await chat.sendMessageStream(messageParts);

    // Stream the response
    for await (const chunk of result.stream) {
      const text = chunk.text();
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('API Error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
}