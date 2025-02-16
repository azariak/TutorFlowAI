import React from 'react';
import styles from './SuggestedQuestions.module.css';

const SuggestedQuestions = ({ onSelect, onClose }) => {
  const suggestions = [
    {
      icon: '🔢',
      text: 'Explain determinants and how to compute them'
    },
    {
      icon: '∫',
      text: 'Help me understand integration by substitution'
    },
    {
      icon: '📐',
      text: 'Teach me about trigonometric identities'
    }
  ];

  return (
    <div className={styles.suggestionsContainer}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className={styles.suggestionButton}
            onClick={() => onSelect(suggestion.text)}
          >
            <span className={styles.icon}>{suggestion.icon}</span>
            <span className={styles.text}>{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions; 