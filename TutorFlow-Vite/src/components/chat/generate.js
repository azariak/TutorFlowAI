import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Log incoming request
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  
  // Validate request method
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Log request body
  console.log('Request body:', req.body);
  
  try {
    const { prompt } = req.body;
    
    // Validate prompt
    if (!prompt) {
      console.log('Missing prompt in request');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Log API key status (not the actual key)
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API key present:', !!apiKey);
    
    if (!apiKey) {
      console.log('API key missing');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Initialize Gemini with basic error handling
    let genAI;
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (initError) {
      console.error('Gemini initialization error:', initError);
      return res.status(500).json({ error: 'Failed to initialize AI model' });
    }

    // Get model with error handling
    let model;
    try {
      model = genAI.getGenerativeModel({ model: "gemini-pro" });
    } catch (modelError) {
      console.error('Model creation error:', modelError);
      return res.status(500).json({ error: 'Failed to create AI model' });
    }

    // Generate content with error handling
    console.log('Generating content for prompt:', prompt);
    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      console.error('Invalid response from Gemini');
      return res.status(500).json({ error: 'Invalid response from AI model' });
    }

    const textResult = await result.response.text();
    console.log('Generated response:', textResult.substring(0, 100) + '...');

    // Send successful response
    return res.status(200).json({ 
      success: true,
      text: textResult 
    });

  } catch (error) {
    // Log the full error
    console.error('Full error object:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Send error response
    return res.status(500).json({ 
      error: 'Generation failed',
      message: error.message,
      details: error.toString()
    });
  }
}