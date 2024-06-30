import { useState } from 'react';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelectChat = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div>
      <h1>Chat</h1>
      {selectedRoom ? (
        <ChatRoom roomId={selectedRoom} />
      ) : (
        <ChatList onSelectChat={handleSelectChat} />
      )}
    </div>
  );
}
