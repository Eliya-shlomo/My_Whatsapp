import React, { useState } from 'react';
import { createRoom } from '../services/api';

const CreateRoom = () => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const participantsArray = participants.split(',').map((participant) => participant.trim());
    try {
      const data = await createRoom({ name, participants: participantsArray });
      console.log('Room created:', data);
    } catch (error) {
      console.error('Error creating room:', error.response?.data?.message);
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
