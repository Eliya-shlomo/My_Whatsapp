import express from 'express';
import Message from '../../server/models/Message.js';
import Room from '../../server/models/room.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Route to send a message
router.post('/send', async (req, res) => {
  const { text, sender, roomid } = req.body;

  console.log('sendMessage request body:', req.body);

  try {
    if (!roomid) {
      return res.status(400).json({ message: 'Room ID is required' });
    }

    const newMessage = new Message({ text, sender, roomid, timestamp: new Date() });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get messages for a room
router.get('/roomMessages', async (req, res) => {
  console.log('getRoomMessages query:', req.query);
  const { roomid } = req.query;

  try {
    if (!roomid) {
      return res.status(400).json({ message: 'Room ID is required' });
    }

    const room = await Room.findOne({ _id: roomid });

    if (!room) {
      return res.status(400).json({ message: 'Chat room does not exist, room ID not found' });
    }

    const messages = await Message.find({ roomid }).populate('sender');

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
