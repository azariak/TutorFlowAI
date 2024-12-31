import React from 'react';
import Popup from 'reactjs-popup';
import { HelpContent } from './helpContent';
import { useHeaderStyles } from './styles';
import "reactjs-popup/dist/index.css";

export function HelpPopup({ isOpen, onClose }) {
  const styles = useHeaderStyles();
  
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
    <Popup 
      open={isOpen}
      onClose={onClose}
      modal
      overlayStyle={overlayStyle}
      contentStyle={contentStyle}
    >
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={styles.title}>How to Use TutorFlowAI</h2>
        <HelpContent />
      </div>
    </Popup>
  );
}