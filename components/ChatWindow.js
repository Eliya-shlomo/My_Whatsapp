// components/ChatWindow.js
import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatWindow = ({ messages, socket }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    socket.emit('message', { text: newMessage });
    setNewMessage('');
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatWindow;
