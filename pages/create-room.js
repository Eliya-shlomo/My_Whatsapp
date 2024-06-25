import React, { useState } from 'react';
import axios from 'axios';

const CreateRoom = () => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const participantsArray = participants.split(',').map((participant) => participant.trim());
    try {
      const response = await axios.post('/api/rooms/group', { name, participants: participantsArray });
      console.log('Room created:', response.data);
    } catch (error) {
      console.error('Error creating room:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleCreateRoom}>
      <input
        type="text"
        placeholder="Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Participants (comma separated)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoom;
