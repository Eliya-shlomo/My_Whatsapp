import { Router } from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();


const router = Router();

// Get user information
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
