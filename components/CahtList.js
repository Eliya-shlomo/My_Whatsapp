// components/ChatList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatList = ({ setCurrentChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chats');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id} onClick={() => setCurrentChat(chat)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
