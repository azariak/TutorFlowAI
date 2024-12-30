import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './chat.module.css';
import image from "../../assets/logo.png"; 


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
    const fileInputRef = useRef(null);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const handleImageUpload = async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImageFile(reader.result);
        reader.readAsDataURL(file);
      }
    };
  
    // Rest of the component remains the same until the return statement
  
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
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
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
              onClick={() => fileInputRef.current?.click()}
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