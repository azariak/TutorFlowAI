import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styles from './header.module.css';

export function SettingsPopup({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [verbosity, setVerbosity] = useState(50);
  const [styleComments, setStyleComments] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('GEMINI_API_KEY');
    const savedVerbosity = localStorage.getItem('VERBOSITY') || '50';
    const savedStyleComments = localStorage.getItem('STYLE_COMMENTS') || '';
    
    if (savedApiKey) setApiKey(savedApiKey);
    setVerbosity(parseInt(savedVerbosity));
    setStyleComments(savedStyleComments);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    localStorage.setItem('VERBOSITY', verbosity.toString());
    localStorage.setItem('STYLE_COMMENTS', styleComments);
    onClose();
  };

  const handleReset = () => {
    setVerbosity(50);
    setStyleComments('');
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
            <div className={styles.sliderContainer}>
              <label htmlFor="verbosity"> Verbosity  {verbosity}%</label>
              <div className={styles.sliderControls}>
                <input
                  type="range"
                  id="verbosity"
                  min="0"
                  max="100"
                  value={verbosity}
                  onChange={(e) => setVerbosity(parseInt(e.target.value))}
                  className={styles.slider}
                />
                <button 
                  type="button" 
                  onClick={handleReset}
                  className={styles.resetButton}
                >
                  Reset
                </button>
              </div>
            </div>

            <label htmlFor="styleComments">Style Preferences</label>
            <textarea
              id="styleComments"
              value={styleComments}
              maxLength={1000}
              onChange={(e) => setStyleComments(e.target.value)}
              className={styles.input}
              placeholder="Enter you preferences for the AI response (max 1000 characters)"
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          <label htmlFor="apiKey">Gemini API Key</label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              maxLength={50}
              onChange={(e) => setApiKey(e.target.value)}
              className={styles.input}
            />
            <p style={{
              fontSize: '0.8rem',
              color: '#666',
              marginTop: '-0.75rem',
              marginBottom: '2rem'
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