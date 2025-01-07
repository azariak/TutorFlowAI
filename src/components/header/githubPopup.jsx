// May fail to display iframe due to github content security policy

import React from 'react';
import Popup from 'reactjs-popup';
import { useHeaderStyles } from './styles';

const Iframe = ({ src, height, width }) => {
  return (
    <div>
      <iframe src={src} height={height} width={width}/>
    </div>
  );
};

export function GitHubPopup({ isOpen, onClose }) {
  const styles = useHeaderStyles();
  const repoUrl = "https://github.com/azariaK/TutorFlowAI";

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
          <Iframe 
            src={repoUrl} 
            height="100%" 
            width="100%"
          />
        </div>
      </div>
    </Popup>
  );
}