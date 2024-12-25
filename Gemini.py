"""
This document interacts with Gemini API to generate multimodal outputs.
"""

import google.generativeai as genai
from dotenv import load_dotenv
import os
from PIL import Image

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

image_path = "figma.png"
image = Image.open(image_path)

experimental_LearnLM = "learnlm-1.5-pro-experimental"

def geminiAI(text: str, image = None) -> str:
    genai.configure()
    model = genai.GenerativeModel(experimental_LearnLM)
    if image:
        response = model.generate_content([text, image])
    else: 
        response = model.generate_content(text)

    return response.text

if __name__ == "__main__":
    print(geminiAI("Whats in the picture? Also, tell me a joke about React.", image))
