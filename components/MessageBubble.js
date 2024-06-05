// components/MessageBubble.js
import React from 'react';

const MessageBubble = ({ message }) => {
  return (
    <div className="message-bubble">
      <p>{message.text}</p>
    </div>
  );
};

export default MessageBubble;
