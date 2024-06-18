import nextConnect from 'next-connect';
import dotenv from 'dotenv';

dotenv.config();

const handler = nextConnect();

const chats = [
  { _id: 1, name: 'Chat 1' },
  { _id: 2, name: 'Chat 2' },
  // Add more chat objects as needed
];

handler.get((req, res) => {
  try {
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default handler;
