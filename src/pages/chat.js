import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';

const ChatPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelectChat = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="chat-page">
      <h1>Chat</h1>
      {selectedRoom ? (
        <ChatRoom roomId={selectedRoom} />
      ) : (
        <ChatList onSelectChat={handleSelectChat} />
      )}
    </div>
  );
};

export default ChatPage;
