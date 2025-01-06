import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from "@google/generative-ai";
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

  const generateDirectResponse = async (promptText, imageData = null) => {
    const instructions = [
      "You are TutorFlowAI, created by Azaria Kelman to make interactive learning simple through the integration of AI and a whiteboard..",
      "Provide clear, simple explanations and encourage critical thinking.",
      "Adapt to the user's pace, offering additional explanations if needed or challenge them when they excel.",
      "Maintain engagement with positive feedback and relatable examples. Explain the intuition behind concepts.",
      "Summarize key points and provide constructive feedback.",
      "When you see a whiteboard image, do not comment on the board, but use it to see the user's work thus far, to help you tutor better using their example.",
      "Concisely, describe everything you see in the whiteboard. Do not add bot: to your response or add the user's response."
    ].join(' ');

    const storedApiKey = localStorage.getItem('GEMINI_API_KEY');
    if (!storedApiKey) {
      throw new Error('local-auth-failed');
    }

    const genAI = new GoogleGenerativeAI(storedApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: instructions
    });

    const content = imageData 
      ? [{ text: promptText }, { inlineData: { data: imageData.split(',')[1], mimeType: 'image/png' }}]
      : [{ text: promptText }];

    const result = await model.generateContent(content);
    return result.response.text();
  };

  const generateServerResponse = async (promptText, imageData = null) => {
    const messagesForHistory = messages.filter(msg => !msg.text.startsWith('Error:')).map(msg => ({
      ...msg,
      image: undefined
    }));

    const chatHistory = messagesForHistory.map(message => {
      if (message.sender === 'user') {
        return `**User:**\n${message.text}`;
      } else if (message.sender === 'bot') {
        return `**Bot:**\n${message.text}`;
      }
      return "";
    }).join("\n\n");

    const fullPrompt = chatHistory + (chatHistory ? "\n\n" : "") + `**User:**\n${promptText}`;

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: fullPrompt,
        hasWhiteboard: !!imageData,
        image: imageData,
        messages: messagesForHistory
      })
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.text;
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
    setImageFile(null); // Auto-remove image immediately after sending
    setIsLoading(true);

    try {
      const processedImage = imageFile ? await blobUrlToBase64(imageFile) : null;
      
      const validMessages = messages.filter(msg => !msg.text.startsWith('Error:'));
      const chatHistory = validMessages.map(message => {
        if (message.sender === 'user') {
          return `**User:**\n${message.text}`;
        } else if (message.sender === 'bot') {
          return `**Bot:**\n${message.text}`;
        }
        return "";
      }).join("\n\n");

      const fullPrompt = chatHistory + (chatHistory ? "\n\n" : "") + `**User:**\n${prompt}`;

      let response;
      try {
        response = await generateDirectResponse(fullPrompt, processedImage);
      } catch (error) {
        if (error.message === 'local-auth-failed') {
          response = await generateServerResponse(fullPrompt, processedImage);
        } else {
          throw error;
        }
      }

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