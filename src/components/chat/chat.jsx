import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateResponse } from '../../services/geminiService';
import styles from './chat.module.css';
import SuggestedQuestions from './SuggestedQuestions';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const MAX_CHARS = 40000;

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
    sender: "bot"
  }]);
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callInterval, setCallInterval] = useState(null);

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
          setShowSuggestions(false);
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

      if (!response.ok) {
        throw new Error(
          "Please add your API key in settings to continue using TutorFlow.\n\n" +
          "You can find instructions for getting an API key in the help menu."
        );
      }

      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.text;

    } catch (error) {
      if (error.message.includes('429') || error.message.includes('quota')) {
        throw new Error(
          "Please add your API key in settings to continue using TutorFlow.\n\n" +
          "You can find instructions for getting an API key in the help menu."
        );
      }
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim() && !imageFile) return;
  
    // Truncate prompt if it exceeds MAX_CHARS
    const truncatedPrompt = prompt.slice(0, MAX_CHARS);
  
    const userMessage = {
      id: messages.length + 1,
      text: truncatedPrompt,
      sender: "user",
      image: imageFile
    };
  
    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setImageFile(null);
    setIsLoading(true);
  
    try {
      const processedImage = imageFile ? await blobUrlToBase64(imageFile) : null;
      const fullPrompt = formatChatHistory(messages, truncatedPrompt);
      const response = await handleGenerateResponse(fullPrompt, processedImage);
  
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: response,
        sender: "bot"
      }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `${error.message}`,
        sender: "bot",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = async (text) => {
    setShowSuggestions(false);
    
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user"
    };
  
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
  
    try {
      const fullPrompt = formatChatHistory(messages, text);
      const response = await handleGenerateResponse(fullPrompt, null);
  
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: response,
        sender: "bot"
      }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `${error.message}`,
        sender: "bot",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add effect to listen for popup events
  useEffect(() => {
    const handlePopupOpen = () => setShowSuggestions(false);
    const handlePopupClose = () => {
      // Only show suggestions if we're at the initial message
      if (messages.length === 1) {
        setShowSuggestions(true);
      }
    };
    
    // Create a MutationObserver to watch for popup elements
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Check for removed nodes (popup closing)
        for (const node of mutation.removedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const isPopup = 
              node.hasAttribute('role') && node.getAttribute('role') === 'dialog' ||
              node.classList.contains('popup') ||
              Array.from(node.classList).some(cls => cls.includes('popup'));
            
            if (isPopup) {
              handlePopupClose();
              break;
            }
          }
        }
        
        // Check for added nodes (popup opening)
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const isPopup = 
              node.hasAttribute('role') && node.getAttribute('role') === 'dialog' ||
              node.classList.contains('popup') ||
              Array.from(node.classList).some(cls => cls.includes('popup'));
            
            if (isPopup) {
              handlePopupOpen();
              break;
            }
          }
        }
      }
    });

    // Start observing the document body for added/removed nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, [messages]); // Added messages as dependency

  const handleCallToggle = () => {
    if (isInCall) {
      clearInterval(callInterval);
      setCallInterval(null);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `Call ended after ${formatDuration(callDuration)} minutes`,
        sender: "bot"
      }]);
      setCallDuration(0);
    } else {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setCallInterval(interval);
    }
    setIsInCall(!isInCall);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (callInterval) {
        clearInterval(callInterval);
      }
    };
  }, [callInterval]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Ask TutorFlow</h4>
        <button
          onClick={handleCallToggle}
          className={`${styles.whiteboardButton} ${isInCall ? styles.active : ''}`}
          title={isInCall ? "End call" : "Start call with TutorFlow"}
        >
          {isInCall ? '📞' : '📞'}
        </button>
      </div>
      
      {isInCall && (
        <div className={styles.callBar}>
          <div className={styles.callInfo}>
            <span className={styles.callStatus}>In call (coming soon)</span>
            <span className={styles.callTimer}>{formatDuration(callDuration)}</span>
          </div>
          <button
            onClick={handleCallToggle}
            className={styles.hangupButton}
            title="End call"
          >
            End
          </button>
        </div>
      )}

      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {messages.map(message => (
          <div key={message.id} className={`${styles.messageWrapper} ${styles[message.sender]}`}>
            <div className={`${styles.message} ${styles[message.sender]}`}>
              {message.sender === 'bot' ? (
                <div className={styles.markdownContainer}>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {message.text}
                  </ReactMarkdown>
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
        
        <div className={styles.promptArea} style={{ position: 'relative' }}>
          {showSuggestions && messages.length === 1 && (
            <SuggestedQuestions
              onSelect={handleSuggestionSelect}
              onClose={() => setShowSuggestions(false)}
            />
          )}
          <textarea
            placeholder="Ask anything..."
            className={styles.textArea}
            value={prompt}
            onChange={e => {
              const newText = e.target.value;
              if (newText.length <= MAX_CHARS) {
                setPrompt(newText);
              }
            }}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
            maxLength={MAX_CHARS}
          />
          <button 
            onClick={handleWhiteboardCapture}
            className={styles.whiteboardButton}
            title={imageFile ? "Remove whiteboard" : "Add whiteboard"}
          >
            🖼️
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