import React, { useState, useEffect, useRef } from 'react';

// Chatbot component
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="chatbot-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {isOpen ? (
        <div
          style={{
            width: '380px',
            height: '500px',
            backgroundColor: '#111', // dark black
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid  #540e75', // gold border
          }}
        >
          <div
            style={{
              backgroundColor: '#540e75', // gold header
              color: '#111',
              padding: '16px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>AI Textbook Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#111',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <div
            ref={messagesEndRef}
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundColor: '#1a1a1a', // dark grey chat background
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  marginBottom: '8px',
                  backgroundColor: msg.role === 'user' ? ' #540e75' : '#222', // gold for user, dark for AI
                  color: msg.role === 'user' ? '#111' : '#fff',
                  fontSize: '14px',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginLeft: msg.role === 'user' ? 'auto' : '0',
                }}
              >
                <strong>{msg.role === 'user' ? 'You:' : 'AI Assistant:'}</strong> {msg.content}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  marginBottom: '8px',
                  backgroundColor: '#222',
                  color: '#fff',
                  fontSize: '14px',
                  alignSelf: 'flex-start',
                }}
              >
                <strong>AI Assistant:</strong> Thinking...
              </div>
            )}
          </div>

          <div
            style={{
              padding: '12px',
              borderTop: '1px solid #540e75',
              backgroundColor: '#111',
              display: 'flex',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the textbook..."
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid  #540e75)',
                borderRadius: '6px',
                marginRight: '8px',
                fontSize: '14px',
                backgroundColor: '#222',
                color: '#fff',
              }}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: '10px 16px',
                backgroundColor: '#540e75', // gold
                color: '#111',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#540e75', // gold floating button
            color: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontSize: '24px',
            border: 'none',
            outline: 'none',
          }}
          title="AI Textbook Assistant"
        >
          🤖
        </button>
      )}
    </div>
  );
}
