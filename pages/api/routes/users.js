const nextConnect = require('next-connect');
const dotenv = require('dotenv');
const User = require('../../../server/models/User.js');

dotenv.config();

const handler = nextConnect();

handler.get('/:username', async (req, res) => {
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
});

module.exports = handler;
