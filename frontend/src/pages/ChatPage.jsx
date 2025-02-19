// pages/ChatPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ChatMessage from '../components/ChatMessage';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { content: input, isBot: false }]);
      // Add chatbot response logic here
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={{ type: 'text', content: msg.content }}
            isBot={msg.isBot}
          />
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 border border-[#62767c] rounded-lg text-gray-400"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-[#62767c] text-white rounded-lg hover:bg-[#90a9b1]"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
