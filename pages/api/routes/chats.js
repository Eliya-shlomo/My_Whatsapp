const nextConnect = require('next-connect');
const dotenv = require('dotenv');

dotenv.config();

const handler = nextConnect();

const chats = [
  { _id: 1, name: 'Chat 1' },
  { _id: 2, name: 'Chat 2' },
];

handler.get((req, res) => {
  try {
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = handler;
