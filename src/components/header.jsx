import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import downloadIcon from "../assets/icons/download-icon.png";
import settingsIcon from "../assets/icons/settings-icon.png";
import helpIcon from "../assets/icons/help-icon.png";
import demoVideo from "../assets/Demos/TutorFlow-FastDemo.mp4";


// Styles object
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "3vw",
    marginRight: "5vw",
    marginTop: "3vh",
    fontSize: "22px",
  },
  logo: {
    margin: 0,
  },
  logoLink: {
    textDecoration: "none",
    color: "inherit",
  },
  tagline: {
    fontSize: "22px",
  },
  icon: {
    width: "2vw",
    height: "2vw",
    marginLeft: "0.5vw",
    verticalAlign: "text-top",
    cursor: "pointer",
  },
  firstIcon: {
    marginLeft: "1vw",
  },
  popup: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "600px",
    maxHeight: "600px", 
    overflowY: "auto", 
    scrollbarWidth: "thin",
    position: "relative",
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    right: "20px",
    top: "20px",
    cursor: "pointer",
    fontSize: "24px",
    color: "#888",
    background: "none",
    border: "none",
    padding: "0"
  },
  title: {
    fontSize: "20px",
    marginBottom: "25px"
  },
  content: {
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "30px",
    textAlign: "left"
  },
  section: {
    marginBottom: "20px"
  }
};

// Help Content Component
const HelpContent = () => (
    <div style={styles.content}>
  
      <div style={styles.section}>

      <video 
        width="600" 
        height="338" 
        controls 
        autoPlay 
        muted 
        playsInline
      >        <source src={demoVideo} type="video/mp4" />
     </video>


        <h4>Key Features</h4>
        <ul>
          <li><strong>Whiteboard:</strong> Draw, write, and solve problems in real-time</li>
          <li><strong>Voice Chat:</strong> Speak naturally with your AI tutor for a more personal experience</li>
          <li><strong>AI Tutor:</strong> Receive instant feedback and personalized guidance based on your whiteboard activity and questions</li>
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
  

// Help Popup Component
const HelpPopup = ({ onClose }) => (
  <div style={styles.popup}>
    <button 
      style={styles.closeButton} 
      onClick={onClose}
    >
      ×
    </button>
    <h2 style={styles.title}>How to Use TutorFlowAI</h2>
    <HelpContent />
  </div>
);

// Main Header Component
export default function Header() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const overlayStyle = { background: 'rgba(0, 0, 0, 0.85)' };
  const contentStyle = { 
    background: 'none', 
    border: 'none', 
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <header>
      <div style={styles.header}>
        <h1 style={styles.logo}>
          <a href="https://tutorflowai.com" style={styles.logoLink}>
            TutorFlowAI{" "}
          </a>
        </h1>
        <span style={styles.tagline}>
          Interactive Learning Made Simple.
          {/* <img
            src={downloadIcon}
            alt="Download"
            style={{...styles.icon, ...styles.firstIcon}}
          /> */}
          <img
            src={helpIcon}
            alt="Help"
            style={styles.icon}
            onClick={() => setIsHelpOpen(true)}
          />
          <img
            src={settingsIcon}
            alt="Settings"
            style={styles.icon}
          />
        </span>

        <Popup 
          open={isHelpOpen} 
          onClose={() => setIsHelpOpen(false)}
          modal
          overlayStyle={overlayStyle}
          contentStyle={contentStyle}
        >
          <HelpPopup onClose={() => setIsHelpOpen(false)} />
        </Popup>
      </div>
    </header>
  );
}