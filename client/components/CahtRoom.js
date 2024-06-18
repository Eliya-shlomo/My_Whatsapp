import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchMessages, sendMessage } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await fetchMessages(roomId);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error.response?.data?.message);
      }
    };

    getMessages();

    socket.emit('joinRoom', { roomId });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [roomId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = { text, sender: 'user-id', roomid: roomId };
    try {
      await sendMessage(message);
      setText('');
    } catch (error) {
      console.error('Error sending message:', error.response?.data?.message);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
