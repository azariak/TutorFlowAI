import React, { useState, useEffect, useRef } from 'react';
import { throttleBasic, useLLMOutput, LLMOutput } from "@llm-ui/react";

const throttle = throttleBasic({
  readAheadChars: 10,
  targetBufferChars: 7,
  adjustPercentage: 0.35,
  frameLookBackMs: 10000,
  windowLookBackMs: 2000,
});

const MessageContent = ({ message }) => (
  <LLMOutput output={message} />
);

export default function App() {
    const [output, setOutput] = useState("");
    const [isStreamFinished, setIsStreamFinished] = useState(false);
  
    const { blockMatches } = useLLMOutput({
      llmOutput: output,
      blocks: [],
      fallbackBlock: { match: () => true },
      isStreamFinished,
      throttle,
    });
    
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I assist you today?", sender: "bot", timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }) }
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

    const handleSubmit = async () => {
        setIsStreamFinished(false);

        if (!prompt.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: prompt,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
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
                body: JSON.stringify({ prompt }),
            });

            let data;
            const textResponse = await response.text();
            
            try {
                data = JSON.parse(textResponse);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.log('Raw response:', textResponse);
                throw new Error('Failed to parse response from server');
            }

            if (!data.success) {
                throw new Error(data.error || data.message || 'Failed to generate response');
            }

            const botMessage = {
                id: messages.length + 2,
                text: data.text || '',
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            
            const errorMessage = {
                id: messages.length + 2,
                text: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setIsStreamFinished(true);
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
            gap: '1rem',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none'
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
            color: sender === 'user' ? COLORS.white : COLORS.text,
            wordBreak: 'break-word'
        }),
        markdownContainer: {
            '& code': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                padding: '2px 4px',
                borderRadius: '4px',
                fontFamily: 'monospace'
            },
            '& pre': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                padding: '8px',
                borderRadius: '4px',
                overflow: 'auto'
            },
            '& ul, & ol': {
                paddingLeft: '20px',
                margin: '8px 0'
            },
            '& p': {
                margin: '8px 0'
            },
            '& a': {
                color: COLORS.text,
                textDecoration: 'underline'
            }
        },
        timestamp: {
            fontSize: '0.75rem',
            color: COLORS.black,
            opacity: 0.7,
            marginTop: '0.25rem'
        },
        promptArea: {
            padding: '1rem',
            borderTop: `5px solid ${COLORS.border}`,
            backgroundColor: COLORS.white,
            display: 'flex',
            gap: '0.5rem'
        },
        textArea: {
            flex: 1,
            padding: '0.75rem',
            borderRadius: '15px',
            border: `2px solid ${COLORS.border}`,
            outline: 'none',
            backgroundColor: COLORS.white,
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            scrollbarWidth: 'None'
        },
        button: {
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
                            {message.sender === 'bot' ? (
                                <MessageContent message={blockMatches[0]?.output || message.text} />
                            ) : (
                                message.text
                            )}
                        </div>
                        <div style={styles.timestamp}>
                            {message.timestamp}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Rest of the UI components */}
        </div>
    );
}