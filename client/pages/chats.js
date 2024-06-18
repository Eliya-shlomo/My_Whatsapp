import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chats');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error.response.data.message);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (id) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat._id} onClick={() => handleChatClick(chat._id)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
