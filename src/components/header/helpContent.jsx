import React from 'react';
import demoVideo from '../../assets/Demos/TutorFlow-FastDemo.mp4';
import { useHeaderStyles } from './styles';

export function HelpContent() { 
  const styles = useHeaderStyles();

  return (
    <div style={styles.content}>
      <div style={styles.section}>
        <video width="600" height="338" controls autoPlay muted playsInline>
          <source src={demoVideo} type="video/mp4" />
        </video>

        <h4>Key Features</h4>
        <ul>
          <li><strong>Whiteboard:</strong> Draw, write, and solve problems in real-time</li>
          <li><strong>Voice Chat:</strong> Speak naturally with your AI tutor</li>
          <li><strong>AI Tutor:</strong> Receive instant feedback and guidance</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h4>Tips for Best Results</h4>
        <ul>
          <li>Write clearly and legibly on the whiteboard for accurate recognition</li>
          <li>Ask specific questions to get focused, relevant answers</li>
          <li>Ensure your prompt includes all necessary details</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h4>Keyboard Shortcuts</h4>
        <ul>
          <li><strong>Ctrl + Z:</strong> Undo</li>
          <li><strong>Ctrl + Shift + Z:</strong> Redo</li>
          <li><strong>Esc:</strong> Clear selection</li>
          <li><strong>C:</strong> Toggle chat input (coming soon)</li>
          <li><strong>?:</strong> Toggle help menu</li>
          <li><strong>S:</strong> Toggle settings menu</li>
          <li><strong>Spacebar:</strong> Toggle voice input (coming soon)</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h4>How to Generate a Gemini API Key</h4>
        <ol>
          <li>Visit <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">aistudio.google.com</a>.</li>
          <li>Log in with your Google account.</li>
          <li>Navigate to "Get API Key."</li>
          <li>Click on "Create API Key."</li>
          <li>Copy the API key and store it securely. Avoid sharing it publicly.</li>
          <li>Paste the API key into the TutorFlowAI settings menu to receive free usage subject to generous rate limits.</li>
        </ol>
      </div>
    </div>
  );
}
