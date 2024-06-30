import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';  // Import useRouter

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();  // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password,
      });
      alert('Registration successful!');
      setUsername('');
      setPassword('');
      router.push('/login');  // Navigate to the login page
    } catch (error) {
      const errorMessage = error.response && error.response.data && typeof error.response.data === 'string'
        ? error.response.data
        : 'An error occurred';
      setError(errorMessage);
      console.error('Error registering:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
