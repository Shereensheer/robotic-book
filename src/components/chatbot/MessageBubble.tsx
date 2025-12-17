import React from 'react';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  isLoading = false,
  isError = false
}) => {
  const baseClasses = `px-4 py-2 max-w-[75%] break-words rounded-2xl shadow-lg`;
  const bubbleClasses = isUser
    ? `bg-gradient-to-r from-green-400 to-green-600 text-white ml-auto`
    : isError
    ? `bg-gradient-to-r from-red-400 to-red-600 text-white mr-auto`
    : `bg-gradient-to-r from-purple-500 to-indigo-500 text-white mr-auto`;

  const alignmentClass = isUser ? 'flex justify-end' : 'flex justify-start';

  return (
    <div className={`${alignmentClass}`}>
      <div className={`${baseClasses} ${bubbleClasses}`}>
        {isLoading ? (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></span>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
