// pages/ChatPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import Picker from "emoji-picker-react";
import Clip from "../assets/clip.png";
import { format } from 'date-fns';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const formatTimestamp = (isoString) => {
    return format(new Date(isoString), 'HH:mm');
  };

  useEffect(() => {
    // Auto-scroll to bottom when a new message is added
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error(error);
      return "Sorry, I couldn't process your request.";
    }
  };


  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = {
        type: "text",
        content: input,
        isBot: false,
        timestamp: new Date().toISOString(),
        status: 'sent' // 'sent' -> 'delivered' when bot responds
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);

      // Get and add bot response
      const botResponse = await getBotResponse(userMessage.content);
      
      setMessages((prev) => {
        // Update user message status to delivered
        const updatedMessages = prev.map(msg => {
          if (msg.timestamp === userMessage.timestamp) {
            return { ...msg, status: 'delivered' };
          }
          return msg;
        });
        
        // Add bot response with its own timestamp
        return [
          ...updatedMessages,
          {
            type: "text",
            content: botResponse,
            isBot: true,
            timestamp: new Date().toISOString()
          }
        ];
      });

      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.startsWith("image") ? "image" : "video";
      const fileURL = URL.createObjectURL(file);
      setMessages([
        ...messages,
        { 
          type: fileType, 
          content: fileURL, 
          isBot: false, 
          timestamp: new Date().toISOString(),
          status: 'sent'
        },
      ]);
    }
  };

  const handleEmojiSelect = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-full  flex flex-col bg-gray-900/20 text-white p-4 ">
      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className=" flex-1 max-h-[500px] overflow-y-auto space-y-4 p-2"
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} isBot={msg.isBot} />
        ))}
      </div>

      {/* Input Section */}
      <div className="sticky bottom-8 flex items-center gap-4 sm:gap-2 bg-gray-800/50 p-3 rounded-lg">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-0 sm:p-2 text-gray-300 hover:text-white cursor-pointer w-3 sm:w-8"
        >
          😊
        </button>

        {/* Emoji Picker (Appears when toggled) */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 sm:bottom-14 left-0 sm:left-4 bg-gray-800 rounded-lg shadow-lg">
            <Picker onEmojiClick={handleEmojiSelect} />
          </div>
        )}

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 bg-gray-700/40 text-white rounded-lg outline-none w-28 sm:w-full"
          placeholder="Type a message..."
        />

        {/* Upload Button */}
        <input
          type="file"
          ref={fileInputRef}
          hidden
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className=" p-0 sm:p-2 text-gray-300 hover:text-white w-3 sm:w-8"
        >
          <img
            src={Clip}
            alt="attach"
            className="filter invert-100 -rotate-3  w-3 h-3 sm:w-6 sm:h-6  cursor cursor-pointer"
          />
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-0 sm:p-2 bg-[#62767c] rounded-lg hover:bg-[#90a9b1] w-12 sm:w-16 text-s sm:text-xl "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
