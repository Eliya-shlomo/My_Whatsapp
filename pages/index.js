// pages/index.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please login</p>
          <button onClick={() => login({ username: 'example_user' })}>Login</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
