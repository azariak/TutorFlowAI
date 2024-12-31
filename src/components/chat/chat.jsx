import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './chat.module.css';

const ImagePreview = ({ image, onRemove }) => (
  <div className={styles.previewContainer}>
    <div className={styles.previewWrapper}>
      <img 
        src={image}
        alt="Whiteboard preview" 
        className={styles.previewImage}
      />
      <button 
        onClick={onRemove}
        className={styles.removePreviewButton}
        aria-label="Remove preview"
      >
        ×
      </button>
      <span className={styles.previewLabel}>Current whiteboard state will be shared</span>
    </div>
  </div>
);

export default function App() {
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Hello! How can I assist you today?",
    sender: "bot",
    timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
  }]);
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleWhiteboardCapture = async () => {
    try {
      if (window.captureWhiteboardImage) {
        const imageData = await window.captureWhiteboardImage();
        if (imageData) {
          setImageFile(imageData);
        }
      }
    } catch (error) {
      console.error('Error capturing whiteboard:', error);
    }
  };

  const blobUrlToBase64 = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting blob URL to base64:', error);
      return null;
    }
  };
  
  const handleSubmit = async () => {
      if (!prompt.trim() && !imageFile) return;
    
      const userMessage = {
        id: messages.length + 1,
        text: prompt,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
        image: imageFile
      };
    
      setMessages(prev => [...prev, userMessage]);
      setPrompt("");
      setImageFile(null);
      setIsLoading(true);
    
      try {
        // Convert blob URL to base64 if it exists
        const processedImage = imageFile ? await blobUrlToBase64(imageFile) : null;
        
        const chatHistory = messages.map(message => {
          if (message.sender === 'user') {
            return `**User:**\n${message.text}`;
          } else if (message.sender === 'bot') {
            return `**Bot:**\n${message.text}`;
          }
          return "";
        }).join("\n\n");
    
        const fullPrompt = chatHistory + (chatHistory ? "\n\n" : "") + `**User:**\n${prompt}`;
    
        // Remove images from message history
        const messagesWithoutImages = messages.map(msg => ({
          ...msg,
          image: undefined
        }));
    
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: fullPrompt,
            hasWhiteboard: !!processedImage,
            image: processedImage,
            messages: messagesWithoutImages
          })
        });
    
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
    
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: data.text,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
        }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: `Error: ${error.message}`,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
        }]);
      } finally {
        setIsLoading(false);
      }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Ask TutorFlow</h4>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map(message => (
          <div key={message.id} className={`${styles.messageWrapper} ${styles[message.sender]}`}>
            <div className={`${styles.message} ${styles[message.sender]}`}>
              {message.sender === 'bot' ? (
                <div className={styles.markdownContainer}>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              ) : (
                <>
                  <div>{message.text}</div>
                  {message.image && (
                    <img src={message.image} alt="Whiteboard" className={styles.messageImage} />
                  )}
                </>
              )}
            </div>
            <div className={styles.timestamp}>{message.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        {imageFile && (
          <ImagePreview 
            image={imageFile}
            onRemove={() => setImageFile(null)}
          />
        )}
        
        <div className={styles.promptArea}>
          <textarea
            placeholder="Ask anything..."
            className={styles.textArea}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
          />
          <button 
            onClick={handleWhiteboardCapture}
            disabled={!!imageFile}
            className={styles.whiteboardButton}
            title="Add whiteboard"
          >
            📋
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={styles.button}
          >
            {isLoading ? 'Thinking...' : '→'}
          </button>
        </div>
      </div>
    </div>
  );
}