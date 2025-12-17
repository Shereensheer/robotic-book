import React from 'react';

const MessageBubble = ({
  message,
  isUser,
  isLoading = false,
  isError = false,
}) => {
  const base =
    'relative px-5 py-3 max-w-[80%] text-sm leading-relaxed rounded-xl backdrop-blur-md border shadow-md transition-all duration-300';

  const userStyle =
    'ml-auto bg-gradient-to-br from-fuchsia-600/80 to-indigo-600/80 text-white border-white/20';

  const botStyle =
    'mr-auto bg-white/70 text-gray-900 border-gray-200 dark:bg-gray-900/60 dark:text-gray-100 dark:border-gray-700';

  const errorStyle =
    'mr-auto bg-red-500/90 text-white border-red-400';

  const bubbleClass = isUser
    ? userStyle
    : isError
    ? errorStyle
    : botStyle;

  return (
    <div className={`flex mb-5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${base} ${bubbleClass}`}>
        {/* Tail bubble */}
        <span
          className={`absolute top-3 w-3 h-3 rotate-45 ${
            isUser
              ? '-right-1 bg-indigo-600'
              : isError
              ? '-left-1 bg-red-500'
              : '-left-1 bg-white dark:bg-gray-900'
          }`}
        />

        {isLoading ? (
          <div className="flex gap-1 items-center">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-current animate-pulse delay-200" />
            <span className="w-2 h-2 rounded-full bg-current animate-pulse delay-400" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;


