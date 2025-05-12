import { useState, useEffect } from 'react';

export default function ChatBubble({ sender, message }) {
  const isUser = sender === 'user';
  const [showCursor, setShowCursor] = useState(!isUser);
  const [isTyping, setIsTyping] = useState(!isUser);
  
  // For bot messages, simulate typing and then remove the cursor
  useEffect(() => {
    if (!isUser) {
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
      
      return () => {
        clearTimeout(typingTimer);
        clearTimeout(cursorTimer);
      };
    }
  }, [isUser]);
  
  // Format code-like sections in messages (text between backticks)
  const formatMessage = (text) => {
    if (!text) return '';
    
    // Split by backticks and wrap code sections in code-text class
    const parts = text.split('`');
    return parts.map((part, index) => {
      // Every odd index is code
      if (index % 2 === 1) {
        return <span key={index} className="code-text">{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };
  
  return (
    <div className={`my-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Timestamp and sender indicator */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full max-w-md`}>
        <div className="text-xs text-gray-500 mb-1 flex items-center">
          <span className={`inline-block h-2 w-2 rounded-full mr-2 ${isUser ? 'bg-blue-500' : 'bg-green-500'}`}></span>
          {isUser ? 'USER' : 'JASON'} | {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
        
        {/* Message bubble with tech styling */}
        <div 
          className={`p-3 w-full rounded-md border ${
            isUser 
              ? 'bg-gray-800 border-blue-700 text-blue-300' 
              : 'bg-gray-900 border-green-700 text-green-400'
          }`}
        >
          {/* Command prompt style header */}
          <div className="text-xs text-gray-500 mb-2 border-b border-gray-700 pb-1">
            {isUser ? 'user@kitgpt:~$' : 'jason@kitgpt:~#'}
          </div>
          
          {/* Message content with typing animation for bot */}
          <div className={`flex ${!isUser && isTyping ? 'typing-animation' : ''}`}>
            <span className={`mr-2 ${isUser ? 'text-blue-500' : 'text-green-500'}`}>
              {isUser ? '>' : '#'}
            </span>
            <div className={`whitespace-pre-wrap ${showCursor ? 'terminal-cursor' : ''}`}>
              {formatMessage(message)}
            </div>
          </div>
          
          {/* System info for bot messages */}
          {!isUser && (
            <div className="mt-2 text-xs text-gray-500 border-t border-gray-700 pt-1">
              <span className="text-green-600">SYSTEM:</span> Response generated in 0.{Math.floor(Math.random() * 900) + 100}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
}