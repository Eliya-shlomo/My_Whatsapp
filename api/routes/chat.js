// Import necessary modules
import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();

// Sample data representing chat list
const chats = [
  { _id: 1, name: 'Chat 1' },
  { _id: 2, name: 'Chat 2' },
  // Add more chat objects as needed
];

// Route handler for GET /api/chats
router.get('/', (req, res) => {
  try {
    // Return the list of chats as JSON response
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
