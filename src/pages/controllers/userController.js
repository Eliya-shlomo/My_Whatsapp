import express from 'express';
import User from '../../server/models/User.js';

const router = express.Router();

export const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

router.get('/:username', getUser);

export default router;
