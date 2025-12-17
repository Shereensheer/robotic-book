import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import useChatbot from './useChatbot';

const ChatWindow = ({ onClose, onNewMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const { messages, sendMessage, isLoading, error } = useChatbot();

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const selectedText = window.getSelection()?.toString().trim();
    await sendMessage(inputValue, selectedText);

    setInputValue('');
    onNewMessage?.();
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[95vw] h-[520px] flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div>
          <h3 className="font-semibold text-sm">AI Textbook Assistant</h3>
          <p className="text-xs opacity-80">Ask anything from the book</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 transition"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 bg-gradient-to-b from-white/60 to-white/20 dark:from-gray-900/60 dark:to-gray-900/20">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.content}
            isUser={msg.role === 'user'}
          />
        ))}

        {isLoading && (
          <MessageBubble
            message="Thinking…"
            isUser={false}
            isLoading
          />
        )}

        {error && (
          <MessageBubble
            message={error}
            isUser={false}
            isError
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white/70 dark:bg-gray-900/70 border-t border-white/20"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the textbook..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
          >
            ➤
          </button>
        </div>

        <p className="text-[10px] text-gray-500 mt-1">
          Selected text is used as extra context
        </p>
      </form>
    </div>
  );
};

export default ChatWindow;
