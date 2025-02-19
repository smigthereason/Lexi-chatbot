// import PropTypes from 'prop-types';
// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { format } from 'date-fns';

// function ChatMessage({ message, isBot }) {
//   return (
//     <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 `}>
//       <div className={`max-w-3xl p-4 rounded-lg ${isBot ? 'bg-red-500 shadow-md' : 'bg-[#62767c] text-white'}`}>
//         {message.type === 'text' && <p>{message.content}</p>}
//         {message.type === 'image' && (
//           <img src={message.content} alt="Chat content" className="rounded-lg max-w-xs" />
//         )}
//         {message.type === 'video' && (
//           <video controls className="rounded-lg max-w-xs">
//             <source src={message.content} />
//           </video>
//         )}
//         {message.quickReplies && (
//           <div className="mt-2 flex flex-wrap gap-2">
//             {message.quickReplies.map((reply, index) => (
//               <button
//                 key={index}
//                 className="px-3 py-1 bg-red-500 text-[#62767c] rounded-full text-sm"
//               >
//                 {reply}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ChatMessage.propTypes = {
//   isBot: PropTypes.bool.isRequired,
//   message: PropTypes.shape({
//     type: PropTypes.oneOf(['text', 'image', 'video']).isRequired,
//     content: PropTypes.string.isRequired,
//     quickReplies: PropTypes.arrayOf(PropTypes.string)
//   }).isRequired
// };

// export default ChatMessage;

import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { format } from 'date-fns';

function ChatMessage({ message, isBot }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-3xl p-4 rounded-lg ${
          isBot ? 'bg-red-500 shadow-md' : 'bg-[#62767c] text-white'
        }`}
      >
        {/* Message content */}
        {message.type === 'text' && <p>{message.content}</p>}
        {message.type === 'image' && (
          <img src={message.content} alt="Chat content" className="rounded-lg max-w-xs" />
        )}
        {message.type === 'video' && (
          <video controls className="rounded-lg max-w-xs">
            <source src={message.content} />
          </video>
        )}

        {/* Timestamp and status */}
        <div className="flex items-center justify-end gap-2 mt-1">
          <span className="text-xs text-gray-300">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
          {!isBot && (
            <span className="text-xs">
              {message.status === 'delivered' ? (
                <span className="text-blue-300">✓✓</span>
              ) : (
                <span className="text-gray-400">✓</span>
              )}
            </span>
          )}
        </div>

        {/* Quick Replies */}
        {message.quickReplies && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.quickReplies.map((reply, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-red-500 text-[#62767c] rounded-full text-sm"
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
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'image', 'video']).isRequired,
    timestamp: PropTypes.string,
    status: PropTypes.oneOf(['sent', 'delivered']),
    quickReplies: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  isBot: PropTypes.bool.isRequired
};

export default ChatMessage;