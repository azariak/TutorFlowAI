// Abandoned for now, see https://stackoverflow.com/questions/28338017/is-there-a-way-to-embed-github-code-into-an-iframe

import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useHeaderStyles } from './styles';

const Iframe = ({ content }) => {
  return (
    <div>
      <iframe 
        srcDoc={content}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: '#fff'
        }}
      />
    </div>
  );
};

export function GitHubPopup({ isOpen, onClose }) {
  const styles = useHeaderStyles();
  const repoUrl = "https://github.com/azariaK/TutorFlowAI";
  const [content, setContent] = useState('Loading...');

  useEffect(() => {
    if (isOpen) {
      fetch('https://api.github.com/repos/azariaK/TutorFlowAI/contents/src/app.jsx')
        .then(response => response.json())
        .then(data => {
          const decodedContent = atob(data.content);
          setContent(`
            <html>
              <head>
                <style>
                  body {
                    padding: 20px;
                    font-family: monospace;
                    white-space: pre;
                    background: #1a1a1a;
                    color: #ffffff;
                  }
                </style>
              </head>
              <body>${decodedContent}</body>
            </html>
          `);
        })
        .catch(error => {
          setContent('Error loading content. Please use the link above to view on GitHub.');
        });
    }
  }, [isOpen]);

  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      modal
      overlayStyle={styles.popupOverlay}
      contentStyle={styles.popupContent}
    >
      <div style={{
        ...styles.popup,
        padding: '20px',
        width: '90vw',
        height: '80vh',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a'
      }}>
        <div style={{ 
          width: '100%',
          display: 'flex', 
          justifyContent: 'center',
          position: 'relative',
          marginBottom: '10px'
        }}>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            Open in new tab ↗
          </a>
          <button 
            style={{
              ...styles.closeButton,
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            }} 
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div style={{
          flex: 1,
          marginTop: '10px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px'
        }}>
          <Iframe content={content} />
        </div>
      </div>
    </Popup>
  );
}