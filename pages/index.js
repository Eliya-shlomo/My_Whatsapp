// pages/index.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const socket = io();

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <ChatList setCurrentChat={setCurrentChat} />
      {currentChat && <ChatWindow messages={messages} socket={socket} />}
    </div>
  );
}
