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
          <li><strong>Spacebar:</strong> Toggle voice input (coming soon)</li>
          <li><strong>C:</strong> Toggle chat input (coming soon)</li>
          <li><strong>?:</strong> Help menu (coming soon)</li>
          <li><strong>Esc:</strong> Clear selection</li>
        </ul>
      </div>
    </div>
  );
}