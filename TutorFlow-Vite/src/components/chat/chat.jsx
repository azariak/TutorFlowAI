import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";


export default function App() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: "bot", timestamp: new Date().toLocaleTimeString() }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const LAYOUT = {
        chatWidth: 35,
        marginLeft: 2,
        chatHeight: 77,
        marginTop: 15,
    };

    const COLORS = {
        primary: '#FFECD1',
        secondary: '#78290F',
        accent: '#001524',
        border: '#E5D5B8',
        text: '#FFECD1',
        white: '#FFECD1',
        black: 'black'
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: "user",
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        try {
            console.log(process.env)
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
            const genAI = new GoogleGenerativeAI({ apiKey: apiKey });
            const model = genAI.getGenerativeModel({ model: "learnlm-1.5-pro-experimental" });
            const response = await model.generateContent(inputText);
            const botResponse = response.response.text();

            const botMessage = {
                id: messages.length + 2,
                text: botResponse,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                id: messages.length + 2,
                text: "Sorry, I encountered an error. Please try again.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const styles = {
        container: {
            position: 'fixed',
            inset: 0,
            width: `${LAYOUT.chatWidth}vw`,
            height: `${LAYOUT.chatHeight}vh`,
            marginLeft: `${LAYOUT.marginLeft}vw`,
            marginTop: `${LAYOUT.marginTop}vh`,
            backgroundColor: COLORS.primary,
            borderRadius: '25px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        header: {
            padding: '1rem',
            borderBottom: `1px solid ${COLORS.border}`,
            backgroundColor: COLORS.white,
        },
        messagesContainer: {
            flex: 1,
            overflow: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        messageWrapper: (sender) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
            width: '100%'
        }),
        message: (sender) => ({
            backgroundColor: sender === 'user' ? COLORS.accent : COLORS.secondary,
            padding: '0.75rem',
            borderRadius: '15px',
            maxWidth: '80%',
            color: sender === 'user' ? COLORS.white : COLORS.text
        }),
        timestamp: {
            fontSize: '0.75rem',
            color: COLORS.black,
            opacity: 0.7,
            marginTop: '0.25rem'
        },
        inputArea: {
            padding: '1rem',
            borderTop: `5px solid ${COLORS.border}`,
            backgroundColor: COLORS.white,
            display: 'flex',
            gap: '0.5rem'
        },
        input: {
            flex: 1,
            padding: '0.75rem',
            borderRadius: '15px',
            border: `2px solid ${COLORS.border}`,
            outline: 'none',
            backgroundColor: COLORS.white
        },
        sendButton: {
            padding: '0.75rem 1.5rem',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: COLORS.accent,
            color: COLORS.white,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            opacity: isLoading ? 0.7 : 1,
            pointerEvents: isLoading ? 'none' : 'auto'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h4 style={{ margin: 0, color: COLORS.accent }}>Ask TutorFlow</h4>
            </div>

            <div style={styles.messagesContainer}>
                {messages.map((message) => (
                    <div key={message.id} style={styles.messageWrapper(message.sender)}>
                        <div style={styles.message(message.sender)}>
                            {message.text}
                        </div>
                        <div style={styles.timestamp}>
                            {message.timestamp}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    style={styles.input}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                    style={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
}