// pages/ChatPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
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
          className="flex-1 p-3 border rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;