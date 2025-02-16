import React, { useMemo } from 'react';
import styles from './SuggestedQuestions.module.css';

const SuggestedQuestions = ({ onSelect, onClose }) => {
  const allSuggestions = [
    {
      icon: '🔢',
      text: 'Explain determinants and how to compute them'
    },
    {
      icon: '∫',
      text: 'Help me understand integration by substitution'
    },
    {
      icon: '⚡',
      text: "What's the difference between voltage and current?"
    },
    {
      icon: '🧬',
      text: 'Explain how DNA transcription works'
    },
    {
      icon: '⚛️',
      text: 'What are quantum superposition and entanglement?'
    },
    {
      icon: '💻',
      text: 'Explain Big O notation and time complexity'
    },
    {
      icon: '🔋',
      text: 'How do lithium-ion batteries work?'
    },
    {
      icon: '🤖',
      text: 'What are neural networks in machine learning?'
    }
  ];

  const selectedSuggestions = useMemo(() => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  return (
    <div className={styles.suggestionsContainer}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <div className={styles.suggestions}>
        {selectedSuggestions.map((suggestion, index) => (
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