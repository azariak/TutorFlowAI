import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateResponse } from '../../services/geminiService';
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

export default function Chat() {
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
  const messagesContainerRef = useRef(null);

 // ...previous imports and ImagePreview component remain the same...

 const scrollToMessage = (isUserMessage = false, hasImage = false) => {
  if (!messagesContainerRef.current) return;

  const container = messagesContainerRef.current;
  
  if (isUserMessage) {
    // For all user messages (text or image), use smooth scrolling
    container.scrollTo({
      top: container.scrollHeight,
      behavior: hasImage ? "smooth" : "auto"
    });
    return;
  }

  const messages = container.getElementsByClassName(styles.messageWrapper);
  const lastBotMessage = Array.from(messages).findLast(el => 
    el.classList.contains(styles.bot)
  );

  if (lastBotMessage) {
    const containerTop = container.getBoundingClientRect().top;
    const messageTop = lastBotMessage.getBoundingClientRect().top;
    const scrollAdjustment = messageTop - containerTop;
    
    container.scrollBy({
      top: scrollAdjustment,
      behavior: "smooth"
    });
  }
};

useEffect(() => {
  if (messages.length === 0) return;
  
  const lastMessage = messages[messages.length - 1];
  const hasImage = !!lastMessage.image;
  
  // Add a small delay to ensure the DOM has updated, longer delay for images
  setTimeout(() => {
    scrollToMessage(lastMessage.sender === 'user', hasImage);
  }, hasImage ? 0 : 100);
}, [messages]);

  const handleWhiteboardCapture = async () => {
    try {
      if (imageFile) {
        setImageFile(null);
        return;
      }

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

  const formatChatHistory = (messagesList, currentPrompt) => {
    const validMessages = messagesList.filter(msg => !msg.text.startsWith('Error:')).map(msg => ({
      ...msg,
      image: undefined
    }));

    const chatHistory = validMessages.map(message => {
      if (message.sender === 'user') {
        return `**User:**\n${message.text}`;
      } else if (message.sender === 'bot') {
        return `**Bot:**\n${message.text}`;
      }
      return "";
    }).join("\n\n");

    return chatHistory + (chatHistory ? "\n\n" : "") + `**User:**\n${currentPrompt}`;
  };

  const handleGenerateResponse = async (promptText, imageData) => {
    try {
      // Try with local API key first
      const localApiKey = localStorage.getItem('GEMINI_API_KEY');
      if (localApiKey) {
        try {
          return await generateResponse(promptText, imageData, localApiKey);
        } catch (error) {
          // If local key fails, clear it and continue to server attempt
          if (error.message.includes('Invalid API key')) {
            localStorage.removeItem('GEMINI_API_KEY');
          }
        }
      }
  
      // Fall back to server API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          hasWhiteboard: !!imageData,
          image: imageData
        })
      });
  
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.text;
  
    } catch (error) {
      if (error.message.includes('429') || error.message.includes('quota')) {
        throw new Error(
          "API quota exceeded. Please either:\n\n" +
          "1. Follow the API key setup instructions at the bottom of the help menu\n" +
          "2. Wait a few minutes and try again"
        );
      }
      throw error;
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
      const processedImage = imageFile ? await blobUrlToBase64(imageFile) : null;
      const fullPrompt = formatChatHistory(messages, prompt);
      const response = await handleGenerateResponse(fullPrompt, processedImage);
  
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
      }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `${error.message}`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
        isError: true
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

      <div className={styles.messagesContainer} ref={messagesContainerRef}>
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
            className={styles.whiteboardButton}
            title={imageFile ? "Remove whiteboard" : "Add whiteboard"}
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