import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';
import CreateRoom from './components/CreateRoom';
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleSelectChat = (roomId) => {
    setSelectedRoom(roomId);
  };

  if (!isClient) {
    return <div className="loading">Loading...</div>; // Loading spinner or message
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/chat-room" element={selectedRoom ? <ChatRoom roomId={selectedRoom} /> : <ChatList onSelectChat={handleSelectChat} />} />
          <Route path="/" element={token ? <ChatList onSelectChat={handleSelectChat} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
