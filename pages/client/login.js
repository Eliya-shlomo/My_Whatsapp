import Login from './components/Login';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  const handleLogin = (token) => {
    setToken(token);
    router.push('/chat');
  };

  return (
    <div>
      <h1>Login</h1>
      <Login onLogin={handleLogin} />
    </div>
  );
}
