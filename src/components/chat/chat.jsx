import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const ImagePreview = ({ onRemove }) => (
  <div className="p-4 bg-gray-100 rounded-lg inline-block relative">
    <img src="/api/placeholder/300/100" alt="Preview" className="rounded-lg max-h-24 object-cover"/>
    <button onClick={onRemove} className="absolute top-2 right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">×</button>
    <span className="text-xs text-gray-600 mt-2 block">Current whiteboard state will be shared</span>
  </div>
);

export default function ChatApp() {
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Hello! How can I assist you today?",
    sender: "bot",
    timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
  }]);
  const [prompt, setPrompt] = useState("");
  const [hasWhiteboardPreview, setHasWhiteboardPreview] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentResponse]);

  const handleSubmit = async () => {
    if (!prompt.trim() && !hasWhiteboardPreview) return;

    const userMessage = {
      id: messages.length + 1,
      text: prompt,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setHasWhiteboardPreview(false);
    setIsTyping(true);
    setCurrentResponse("");

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, hasWhiteboard: hasWhiteboardPreview, messages })
      });

      const data = await response.json();
      
      if (!data.success) throw new Error(data.error);

      // Simulate typing effect
      const text = data.text;
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setCurrentResponse(text.slice(0, index));
          index += 3; // Adjust speed by changing increment
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: text,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
          }]);
          setCurrentResponse("");
        }
      }, 10);

    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `Error: ${error.message}`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
      }]);
    }
  };

  return (
    <div className="fixed inset-0 w-1/3 h-4/5 mt-[15vh] ml-8 bg-[#FFECD1] rounded-3xl flex flex-col overflow-hidden shadow-md">
      <div className="p-4 border-b border-[#E5D5B8]">
        <h4 className="m-0 text-[#001524]">Ask TutorFlow</h4>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[80%] break-words ${message.sender === 'user' ? 'bg-[#001524] text-[#FFECD1]' : 'bg-[#78290F] text-[#FFECD1]'}`}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
            <span className="text-xs text-black opacity-70 mt-1">{message.timestamp}</span>
          </div>
        ))}
        {isTyping && currentResponse && (
          <div className="flex flex-col items-start">
            <div className="p-3 rounded-2xl max-w-[80%] break-words bg-[#78290F] text-[#FFECD1]">
              <ReactMarkdown>{currentResponse}</ReactMarkdown>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#E5D5B8]">
        {hasWhiteboardPreview && <ImagePreview onRemove={() => setHasWhiteboardPreview(false)} />}
        <div className="flex gap-2 mt-2">
          <textarea
            placeholder="Ask anything..."
            className="flex-1 p-3 rounded-2xl border-2 border-[#E5D5B8] bg-[#FFECD1] resize-none"
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
            className="p-3 rounded-2xl border-2 border-[#E5D5B8] bg-[#FFECD1]"
            onClick={() => setHasWhiteboardPreview(true)}
            disabled={hasWhiteboardPreview}
            title="Add whiteboard"
          >
            📋
          </button>
          <button
            className="px-6 py-3 rounded-2xl bg-[#001524] text-[#FFECD1] border-none"
            onClick={handleSubmit}
            disabled={isTyping}
          >
            {isTyping ? '...' : '→'}
          </button>
        </div>
      </div>
    </div>
  );
}