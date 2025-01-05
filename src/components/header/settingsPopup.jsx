import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useHeaderStyles } from './styles';

export function SettingsPopup({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const styles = useHeaderStyles();
  
  useEffect(() => {
    const savedApiKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    onClose();
  };

  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      modal
      overlayStyle={styles.popupOverlay}
      contentStyle={styles.popupContent}
    >
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={styles.title}>Settings</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="apiKey">Gemini API Key:</label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={styles.input}
            />
            <p style={{
              fontSize: '0.8rem',
              color: '#666',
              marginTop: '0.5rem',
              marginBottom: 0
            }}>
              Your API key will be securely saved in your browser and persist across sessions.
            </p>
          </div>
          <button type="submit" style={styles.submitButton}>
            Save
          </button>
        </form>
      </div>
    </Popup>
  );
}