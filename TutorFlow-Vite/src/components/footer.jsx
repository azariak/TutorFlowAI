import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const styles = {
  footer: {
    position: "absolute",
    bottom: "0",
    marginLeft: "40.5vw",
    fontSize: "11px"
  },
  trigger: {
    cursor: "pointer",
    textDecoration: "none", // Default state
    transition: "text-decoration 0.2s ease" // Smooth transition
  },
  popup: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "600px",
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
    marginBottom: "30px"
  },
  licenseTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px"
  },
  copyright: {
    marginBottom: "20px"
  },
  attribution: {
    fontSize: "13px",
    color: "#888",
    marginTop: "25px"
  },
  link: {
    color: "#888",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <footer>
      <div style={styles.footer}>
        <h1
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)} // Add hover effect
          onMouseLeave={() => setIsHovered(false)} // Remove hover effect
          style={{
            ...styles.trigger,
            textDecoration: isHovered ? "underline" : "none" // Dynamic underline
          }}
        >
          A project by Azaria Kelman
        </h1>
        
        <Popup 
          open={isOpen} 
          onClose={() => setIsOpen(false)}
          modal
          overlayStyle={overlayStyle}
          contentStyle={contentStyle}
        >
          <div style={styles.popup}>
            <button 
              style={styles.closeButton} 
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 style={styles.title}>About TutorFlowAI</h2>
            <div style={styles.content}>
              <p>
                TutorFlowAI is an interactive learning platform designed to make 
                education more accessible and engaging through AI-powered tutoring.
                Users can interact with our AI tutor through text or voice chat,
                while the AI can see their work on the whiteboard in
                real-time.
              </p>
            </div>
            <h3 style={styles.licenseTitle}>Licensing</h3>
            <p style={styles.copyright}>
              © 2024 Azaria Kelman. All rights reserved.
            </p>
            <div style={styles.attribution}>
              Built with:
              <p style={{ marginTop: "5px" }}>
              <a 
                  href="https://github.com/facebook/react" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  React (MIT License)
                </a> <br/>
                <a 
                  href="https://github.com/remarkjs/react-markdown" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  React-Markdown (MIT License)
                </a> <br/>
                <a 
                  href="https://github.com/yjose/reactjs-popup" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  reactjs-popup (MIT License)
                </a> <br/>
                <a 
                    href="https://github.com/motdotla/dotenv" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                    >
                    dotenv (BSD-2-Clause)
                    </a> <br />
                    <a 
                      href="https://github.com/vitejs/vite" 
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      Vite (MIT)
                  </a>
              </p>
            </div>
          </div>
        </Popup>
      </div>
    </footer>
  );
}
