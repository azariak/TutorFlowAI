import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import sharp from "sharp";

require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "learnlm-1.5-pro-experimental" });

async function geminiAI(text, image = null) {
 if (image) {
   const imageBuffer = await sharp(image).toBuffer();
   const mimeType = "image/png";
   
   const response = await model.generateContent([
     text,
     {
       inlineData: {
         data: imageBuffer.toString("base64"),
         mimeType
       }
     }
   ]);
   
   return response.response.text();
 } else {
   const response = await model.generateContent(text);
   return response.response.text();
 }
}
(async () => {
 try {
   const result = await geminiAI(
     "What's in the picture? Also, tell me a joke about React.",
     "figma.png"
   );
   console.log(result);
 } catch (error) {
   console.error("Error:", error);
 }
})();