import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import styles from './chat.module.css';

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
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
    
        const userMessage = {
            id: messages.length + 1,
            text: prompt,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
            })
        };
    
        setMessages(prev => [...prev, userMessage]);
        setPrompt("");
        setIsLoading(true);
    
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt,
                    messages: messages.slice(0, -1)
                }),
            });
    
            const textResponse = await response.text();
            
            try {
                const data = JSON.parse(textResponse);
                if (!data.success) {
                    throw new Error(data.error || data.message || 'Failed to generate response');
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
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.log('Raw response:', textResponse);
                throw new Error('Failed to parse response from server');
            }
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
                                message.text
                            )}
                        </div>
                        <div className={styles.timestamp}>
                            {message.timestamp}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

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
                    className={styles.button}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Thinking...' : '→'}
                </button>
            </div>
        </div>
    );
}