import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findOne } from '../models/User.js';

const router = Router();
const { compare } = bcrypt;
const { sign } = jwt;

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Check the password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    // Create a JWT token
    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
