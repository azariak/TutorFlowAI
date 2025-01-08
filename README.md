# TutorFlowAI
## A project by [Azaria Kelman]((mailto:azaria.kelman@mail.utoronto.ca))
Integrates real-time audio, a Large Language Model (LLM), a chatbot interface, and a digital whiteboard to provide an interactive and personalized tutoring experience.

![Demo GIF](src\assets\Demos\TutorFlow-Demo.gif)

#### Table of Contents
1. [Introduction](#TutorFlowAI)
2. [Installation](#installation)
3. [TODO](#todo)
4. [Color Scheme](#color-Scheme)
5. [Contributing](#contributing)

#### Screenshot:
![Screenshot](src/assets/brand/screenshot.png)

#### Installation
1. Clone the repository: `git clone https://github.com/azariak/TutorFlowAI.git`

2. Install dependencies: `npm install`

3. Run the project: `npm run dev`

4. Input your Gemini API Key in settings


#### Dependencies
See `package.json` for complete, updated list.
- "@google/generative-ai": "^0.21.0",
- "dotenv": "^16.4.7",
- "license-report": "^6.7.1",
- "react": "^18.3.1",
- "react-dom": "^18.3.1",
- "react-markdown": "^9.0.1",
- "reactjs-popup": "^2.0.6",
- "tldraw": "^3.6.1"

#### TODO: 
- Bug: Autoscroll in chat does not work for tall whiteboard images
- api to work on vercel and cloudfare and npm run dev
- fallback to server when user api key fails
- refactor react-markdown to LLM-UI, add streaming
- consider making PWA
- Resize tool for mobile?
- realtime mic. support within chat window
- light/dark mode
- deselect chat when switching to whiteboard so keyboard does not popup
- Add analytics tag to track specific user actions
- Use speed tests to optimize load speed
- Fix mobile auto scroll bug
- Fix ability to scroll on whiteboard (or provide alternative up/chat button or smtg similar)
- Verify installation guide
- Refactor such that chat.jsx relies on generate.js to follow SRP
- Merge popup css from header/footer css
- refactor code, improve readme


#### Color Scheme
- Off-white: #FFECD1
- Background: #001524
- Bot message: #78290F
- Pop-up background: #000000d9

#### ⭐ Support the Project
- If you find this project helpful or interesting, please consider giving it a star on GitHub! 
- Feel free to [create issues](https://github.com/azariak/TutorFlowAI/issues/new/choose) or [pull requests](https://github.com/azariak/TutorFlowAI/pulls) to contribute to the source code
