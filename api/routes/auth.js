import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findOne , createUser} from '../models/User.js';  
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const { compare } = bcrypt;
const { sign } = jwt;



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    const token = sign({ userId: user._id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9s', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received data:', { username, password });

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, password: hashedPassword });

    const token = sign({ userId: newUser._id },'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9s', { expiresIn: '1h' });

    res.status(201).json({ token, userId: newUser._id, username: newUser.username });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});







export default router;

