import { Router } from 'express';
import Message from '../models/Message.js';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// Get messages for a specific chat room
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  const { text, sender, roomId } = req.body;

  try {
    const newMessage = new Message({ text, sender, roomId, timestamp: new Date() });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
