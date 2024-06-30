import { useState } from 'react';
import Link from 'next/link';
import Login from './components/Login';
import Register from './components/Register';

export default function Home() {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div>
      <h1>Welcome to My WhatsApp</h1>
      {token ? (
        <p>You are logged in. Proceed to <Link href="/chat">Chat</Link>.</p>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <p>Don't have an account? <Link href="/register">Register</Link></p>
        </div>
      )}
    </div>
  );
}
