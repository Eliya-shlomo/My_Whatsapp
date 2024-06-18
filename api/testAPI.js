import axios from 'axios';

async function sendLoginRequest() {
  try {
    const response = await axios.get('http://localhost:3001/api/messages/exsit', {
      
      roomid:"666b421345948535d4a7d406"
    
    },
    {
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
