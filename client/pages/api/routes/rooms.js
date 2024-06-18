import nextConnect from 'next-connect';
import Room from '../../../server/models/Room';
import User from '../../../server/models/User';
import dotenv from 'dotenv';

dotenv.config();

const handler = nextConnect();

handler.post('/private', async (req, res) => {
  const { user1, user2 } = req.body;

  try {
    let room = await Room.findOne({ 
      participants: { $all: [user1, user2] }, 
      isPrivate: true 
    });

    if (!room) {
      room = new Room({ participants: [user1, user2] });
      await room.save();
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error creating/getting private room:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

handler.post('/group', async (req, res) => {
  const { name, participants } = req.body;

  try {
    const room = new Room({ name, participants, isPrivate: false });
    await room.save();

    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating group room:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

handler.post('/group/:roomId/add', async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  try {
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);

    if (!room || room.isPrivate) {
      return res.status(404).json({ message: 'Group not found or it is a private room' });
    }

    if (room.participants.includes(userId)) {
      return res.status(400).json({ message: 'User already in the group' });
    }

    if (!user) {
      return res.status(403).json({ message: 'User is not found in the database!' });
    }

    room.participants.push(userId);
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    console.error('Error adding user to group room:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

export default handler;
