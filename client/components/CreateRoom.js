import React, { useState } from 'react';
import axios from 'axios';

const CreateRoom = () => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/rooms/group', {
        name,
        participants: participants.split(',').map((id) => id.trim()),
      });
      alert('Room created successfully!');
      setName('');
      setParticipants('');
    } catch (error) {
      console.error('Error creating room:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Participants (comma separated IDs):</label>
          <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} />
        </div>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoom;
