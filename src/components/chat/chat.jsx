import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './chat.module.css';

const ImagePreview = ({ onRemove }) => {
    return (
        <div className={styles.previewContainer}>
            <div className={styles.previewWrapper}>
                <img 
                    src="Figma.png"
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
};

export default function App() {
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            text: "Hello! How can I assist you today?", 
            sender: "bot", 
            timestamp: new Date().toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
            })
        }
    ]);
    const [prompt, setPrompt] = useState("");
    const [hasWhiteboardPreview, setHasWhiteboardPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAddWhiteboard = () => {
        setHasWhiteboardPreview(true);
    };

    const handleSubmit = async () => {
        if (!prompt.trim() && !hasWhiteboardPreview) return;
    
        const userMessage = {
            id: messages.length + 1,
            text: prompt,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
            }),
            image: hasWhiteboardPreview ? 'figma.png' : null
        };
    
        setMessages(prev => [...prev, userMessage]);
        setPrompt("");
        setHasWhiteboardPreview(false);
        setIsLoading(true);
    
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    hasWhiteboard: hasWhiteboardPreview,
                    messages: messages
                }),
            });
    
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || 'Failed to generate response');
            }
    
            const botMessage = {
                id: messages.length + 2,
                text: data.text || '',
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric',
                })
            };
    
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                id: messages.length + 2,
                text: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric',
                })
            };
            setMessages(prev => [...prev, errorMessage]);
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
                {messages.map((message) => (
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
                                        <img 
                                            src={message.image} 
                                            alt="Whiteboard" 
                                            className={styles.messageImage}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <div className={styles.timestamp}>
                            {message.timestamp}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
                {hasWhiteboardPreview && (
                    <ImagePreview onRemove={() => setHasWhiteboardPreview(false)} />
                )}
                <div className={styles.promptArea}>
                    <textarea
                        placeholder="Ask anything..."
                        className={styles.textArea}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        rows={1}
                    />
                    <button 
                        className={styles.whiteboardButton}
                        onClick={handleAddWhiteboard}
                        disabled={hasWhiteboardPreview}
                        title="Add whiteboard"
                    >
                        📋
                    </button>
                    <button 
                        className={styles.button}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Thinking...' : '→'}
                    </button>
                </div>
            </div>
        </div>
    );
}