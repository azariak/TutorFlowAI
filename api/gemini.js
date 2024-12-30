import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import sharp from "sharp";

// Load environment variables
dotenv.config();

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI("process.env.GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "learnlm-1.5-pro-experimental" });

async function geminiAI(text, image = null) {
  try {
    if (image) {
      // Convert image to buffer and encode as base64
      const imageBuffer = await sharp(image).toBuffer();
      const mimeType = "image/png";

      // Generate content with text and image
      const response = await model.generateContent([
        text,
        {
          inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType,
          },
        },
      ]);

      return response.responses?.[0]?.text || "No response text received.";
    } else {
      // Generate content with only text
      const response = await model.generateContent(text);
      return response.responses?.[0]?.text || "No response text received.";
    }
  } catch (error) {
    console.error("Error in geminiAI function:", error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const result = await geminiAI(
      "What's in the picture? Also, tell me a joke about React.",
      "figma.png"
    );
    console.log("Generated content:", result);
  } catch (error) {
    console.error("Error during execution:", error);
  }
})();
