import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';
import CreateRoom from './components/CreateRoom';

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleSelectChat = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/create-room">
            <CreateRoom />
          </Route>
          <Route path="/chat-room">
            {selectedRoom ? <ChatRoom roomId={selectedRoom} /> : <ChatList onSelectChat={handleSelectChat} />}
          </Route>
          <Route path="/">
            {token ? <ChatList onSelectChat={handleSelectChat} /> : <Login onLogin={handleLogin} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
