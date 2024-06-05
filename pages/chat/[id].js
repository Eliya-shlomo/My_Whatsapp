// pages/chat/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch chat history and listen for new messages
      socket.emit('joinRoom', id);
      socket.on('message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }

    return () => {
      socket.emit('leaveRoom', id);
    };
  }, [id]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg.text}</div>
      ))}
    </div>
  );
}
