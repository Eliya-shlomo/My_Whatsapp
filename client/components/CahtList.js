import React, { useState, useEffect } from 'react';
import { fetchChats } from '../services/api.js';

const ChatList = ({ setRoomId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error.response?.data?.message);
      }
    };

    getChats();
  }, []);

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat._id} onClick={() => setRoomId(chat._id)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
