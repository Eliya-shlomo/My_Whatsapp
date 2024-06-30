import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/messages/roomMessages?roomid=${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);
      }
    };
    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:3001/api/messages/send', {
        text,
        sender: 'YOUR_USER_ID', // Replace with the actual user ID
        roomid: roomId,
      });
      setText('');
      // Refresh messages
      const response = await axios.get(`http://localhost:3001/api/messages/roomMessages?roomid=${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.sender.username}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
