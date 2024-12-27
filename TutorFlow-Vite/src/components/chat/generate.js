import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt); // Debug log
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API key missing'); // Debug log
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }); 

    // Generate content
    console.log('Generating content...'); // Debug log
    const result = await model.generateContent(prompt);
    console.log('Generation completed'); // Debug log
    
    // Get the response
    const textResult = await result.response.text();
    console.log('Response processed:', textResult.substring(0, 100) + '...'); // Debug log

    return res.status(200).json({
      success: true,
      data: textResult
    });

  } catch (error) {
    console.error('Detailed error:', error); // Debug log
    return res.status(500).json({
      error: 'Generation failed',
      details: error.message
    });
  }
}