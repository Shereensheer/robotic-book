import React, { useState, useEffect, useRef } from 'react';
import useChatbot from './useChatbot';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { messages, sendMessage, isLoading, error, clearChat } = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const selectedText = window.getSelection()?.toString().trim();
    await sendMessage(inputValue, selectedText || null);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-5 right-5 w-96 max-h-[80vh] bg-gradient-to-br from-purple-900 to-indigo-800 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-purple-500">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-purple-700 border-b border-purple-500">
        <h3 className="text-lg font-bold">AI Textbook Assistant</h3>
        <div className="flex gap-2">
          <button
            onClick={clearChat}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
          >
            Clear
          </button>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            ✖
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-t from-purple-900 to-indigo-800">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg.content}
            isUser={msg.role === 'user'}
            isError={msg.role === 'assistant' && error !== null}
            isLoading={isLoading && idx === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex p-3 border-t border-purple-500 bg-purple-800">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about the textbook..."
          className="flex-1 rounded-l-xl px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-r-xl disabled:opacity-50"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
