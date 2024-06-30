import axios from 'axios';

async function testFetchRoomMessages() {
  try {
    const response = await axios.get('http://localhost:3001/api/messages/roomMessages', {
      params: { roomid: "667d9bc41d197d7557aafec3" },
      headers: { "Content-Type": "application/json" }
    });
    console.log('Fetch messages successful!');
    console.log('Messages:', response.data);
  } catch (error) {
    console.error('Error fetching messages:', error.response ? error.response.data : error.message);
  }
}

// Call the function to test fetching messages from the room
testFetchRoomMessages();
