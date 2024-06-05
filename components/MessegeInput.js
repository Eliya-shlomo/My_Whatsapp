// components/MessageInput.js
import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, sendMessage }) => {
  return (
    <div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
