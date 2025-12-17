import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import useChatbot from './useChatbot';

interface ChatWindowProps {
  onClose: () => void;
  onNewMessage?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  onClose,
  onNewMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, isLoading, error } = useChatbot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const selectedText = window.getSelection()?.toString().trim();
    await sendMessage(inputValue, selectedText);
    setInputValue('');

    onNewMessage?.();
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border w-80 h-[28rem] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 flex justify-between items-center rounded-t-xl">
        <h3 className="font-semibold text-sm">AI Assistant</h3>
        <button onClick={onClose} className="hover:opacity-80">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            message={m.content}
            isUser={m.role === 'user'}
          />
        ))}

        {isLoading && <MessageBubble isLoading message="" isUser={false} />}
        {error && <MessageBubble isError message={error} isUser={false} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
        />
        <button
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
