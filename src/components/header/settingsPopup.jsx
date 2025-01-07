import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styles from './header.module.css';

export function SettingsPopup({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');

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
      nested
      className={styles.popupOverlay}
      contentStyle={{ 
        background: 'none', 
        border: 'none', 
        padding: 0,
        width: '30%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className={styles.popup} style={{ height: 'auto', maxHeight: '80vh' }}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup} style={{ padding: '20px' }}>
            <label htmlFor="apiKey">Gemini API Key:</label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={styles.input}
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
          <button type="submit" className={styles.submitButton}>
            Save
          </button>
        </form>
      </div>
    </Popup>
  );
}