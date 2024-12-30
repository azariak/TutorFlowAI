import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const ImagePreview = ({ image, onRemove }) => (
  <div className="p-4 bg-gray-100 rounded-lg inline-block relative">
    <img src={image} alt="Preview" className="rounded-lg max-h-24 object-cover"/>
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
  const [whiteboardImage, setWhiteboardImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setWhiteboardImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim() && !whiteboardImage) return;

    const userMessage = {
      id: messages.length + 1,
      text: prompt,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }),
      image: whiteboardImage
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setWhiteboardImage(null);
    setIsTyping(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          hasWhiteboard: !!whiteboardImage,
          image: whiteboardImage,
          messages
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
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `Error: ${error.message}`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
      }]);
    } finally {
      setIsTyping(false);
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
              {message.image && (
                <img src={message.image} alt="Whiteboard" className="mt-2 rounded-lg max-w-full" />
              )}
            </div>
            <span className="text-xs text-black opacity-70 mt-1">{message.timestamp}</span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#E5D5B8]">
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        {whiteboardImage && (
          <ImagePreview 
            image={whiteboardImage} 
            onRemove={() => setWhiteboardImage(null)} 
          />
        )}
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
            onClick={() => fileInputRef.current?.click()}
            disabled={!!whiteboardImage}
            className="p-3 rounded-2xl border-2 border-[#E5D5B8] bg-[#FFECD1]"
            title="Add whiteboard"
          >
            📋
          </button>
          <button
            onClick={handleSubmit}
            disabled={isTyping}
            className="px-6 py-3 rounded-2xl bg-[#001524] text-[#FFECD1] border-none"
          >
            {isTyping ? '...' : '→'}
          </button>
        </div>
      </div>
    </div>
  );
}