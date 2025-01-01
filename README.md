# TutorFlowAI
## A project by [Azaria Kelman]((mailto:azaria.kelman@mail.utoronto.ca))
Integrates real-time audio, a Large Language Model (LLM), a chatbot interface, and a digital whiteboard to provide an interactive and personalized tutoring experience.

![Demo GIF](src\assets\Demos\TutorFlow-Demo.gif)

#### Table of Contents
1. [Introduction](#TutorFlowAI)
2. [Installation](#installation)
3. [Color Scheme](#color-Scheme)
4. [Contributing](#contributing)

#### Rough sketch:
![Figma](Figma.png)

#### Installation
- Double check on new device:
1. Clone the repository: `git clone https://github.com/azariak/TutorFlowAI.git`

2. Install dependencies: `npm install`

3. Run the project: `npm run dev`

#### Dependencies
- TLDRaw
- Vite with React
- Gemini API
- Python: os, dotenv, google.generativeai
- JS: @google/generative-ai, sharp, dotenv
- See package.json

#### TODO: 
- auto select draw tool on page load
- refactor code, improve readme
- api to work on vercel and cloudfare and npm run dev
- user able to add API in case rate limits hit
- refactor react-markdown to LLM-UI, add streaming
- optimize header for mobile
- consider making PWA
- Adjust size of whiteboard & chat by dragging with reset to default
- realtime mic. support within chat window
- light/dark mode
- deselect chat when switching to whiteboard so keyboard does not popup
- open source, which license???

#### Color Scheme
- Off-white: #FFECD1
- Background: #001524
- Bot message: #78290F
- Pop-up background: #000000d9

#### ⭐ Support the Project
- If you find this project helpful or interesting, please consider giving it a star on GitHub! 
- Feel free to create issues or forks to contribute code
