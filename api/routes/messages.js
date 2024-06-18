import { Router } from 'express';
import Message from '../models/Message.js';
import dotenv from 'dotenv';
import Room from '../models/room.js';
dotenv.config();

const router = Router();

// Route to send a message
router.post('/send', async (req, res) => {
  const { text, sender, roomid } = req.body;

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
    res.status(500).json({ message: 'Server errorrrrr', error });
  }
});

export default router;
