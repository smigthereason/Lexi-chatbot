import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';

function ChatMessage({ message, isBot }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-3xl p-4 rounded-lg ${isBot ? 'bg-white shadow-md' : 'bg-purple-600 text-white'}`}>
        {message.type === 'text' && <p>{message.content}</p>}
        {message.type === 'image' && (
          <img src={message.content} alt="Chat content" className="rounded-lg max-w-xs" />
        )}
        {message.type === 'video' && (
          <video controls className="rounded-lg max-w-xs">
            <source src={message.content} />
          </video>
        )}
        {message.quickReplies && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.quickReplies.map((reply, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  isBot: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    type: PropTypes.oneOf(['text', 'image', 'video']).isRequired,
    content: PropTypes.string.isRequired,
    quickReplies: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ChatMessage;