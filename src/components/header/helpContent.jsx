import React from 'react';
import demoVideo from '../../assets/Demos/TutorFlow-FastDemo.mp4';
import styles from './header.module.css';

export function HelpContent() { 
  return (    
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.videoContainer}>
          <video 
            style={styles.video}
            controls 
            autoPlay 
            muted 
            playsInline
          >
            <source src={demoVideo} type="video/mp4" />
          </video>
        </div>

        <h4>Key Features</h4>
        <ul>
          <li><strong>Whiteboard:</strong> Draw, write, and solve problems in real-time</li>
          <li><strong>Voice Chat:</strong> Speak naturally with your AI tutor</li>
          <li><strong>AI Tutor:</strong> Receive instant feedback and guidance</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h4>Tips for Best Results</h4>
        <ul>
          <li>Write clearly and legibly on the whiteboard for accurate recognition</li>
          <li>Ask specific questions to get focused, relevant answers</li>
          <li>Ensure your prompt includes all necessary details</li>
          <li>Adjust your response preferences in settings</li>
          <li>Drag to resize the whiteboard and chat</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h4>Keyboard Shortcuts</h4>
        <ul>
          <li><strong>Ctrl + Z:</strong> Undo</li>
          <li><strong>Ctrl + Shift + Z:</strong> Redo</li>
          <li><strong>Esc:</strong> Clear selection</li>
          <li><strong>C:</strong> Toggle chat input (coming soon)</li>
          {/* <li><strong>?:</strong> Toggle help menu</li>
          <li><strong>S:</strong> Toggle settings menu</li> */}
          <li><strong>Spacebar:</strong> Toggle voice input (coming soon)</li>
        </ul>
      </div>

      <div className={styles.section}>
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
