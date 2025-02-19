// pages/ChatPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import Picker from "emoji-picker-react";
import Clip from "../assets/clip.png";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when a new message is added
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { type: "text", content: input, isBot: false },
      ]);
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
        { type: fileType, content: fileURL, isBot: false },
      ]);
    }
  };

  const handleEmojiSelect = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/20 text-white p-4">
      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 p-2"
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} isBot={msg.isBot} />
        ))}
      </div>

      {/* Input Section */}
      <div className="relative flex items-center gap-2 bg-gray-800/50 p-3 rounded-lg">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-300 hover:text-white cursor-pointer"
        >
          😊
        </button>

        {/* Emoji Picker (Appears when toggled) */}
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-4 bg-gray-800 rounded-lg shadow-lg">
            <Picker onEmojiClick={handleEmojiSelect} />
          </div>
        )}

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 bg-gray-700/40 text-white rounded-lg outline-none w-32 sm:w-full"
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
          className="p-2 text-gray-300 hover:text-white"
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
          className="p-2 bg-[#62767c] rounded-lg hover:bg-[#90a9b1] w-8 sm:w-16 text-xs sm:text-xl "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
