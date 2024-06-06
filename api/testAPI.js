import axios from 'axios';

async function sendLoginRequest() {
  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      username: 'testuser',
      password: 'password1234'
    }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log('Login successful!');
    console.log('Token:', response.data.token);
    console.log('User ID:', response.data.userId);
    console.log('Username:', response.data.username);
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
  }
}

// Call the function to send the login request
sendLoginRequest();
