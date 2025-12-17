import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setHasUnread(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <ChatWindow
          onClose={toggleChat}
          onNewMessage={() => setHasUnread(true)}
        />
      ) : (
        <button
          onClick={toggleChat}
          aria-label="Open AI Chat"
          className="
            relative w-14 h-14 rounded-full
            bg-gradient-to-br from-indigo-600 to-purple-600
            shadow-2xl
            flex items-center justify-center
            transition-all duration-300
            hover:scale-105
            focus:outline-none
          "
        >
          {/* Glow effect */}
          <span className="absolute inset-0 rounded-full blur-xl bg-indigo-500/40 animate-pulse"></span>

          {/* Chat Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          {/* Unread dot */}
          {hasUnread && (
            <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
          )}
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
