import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';  

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

connectDB();

app.use(express.json());

const importRoute = async (routePath) => {
  const { default: route } = await import(routePath);
  return route;
};

app.use('/api/auth', async (req, res, next) => (await importRoute('../pages/api/routes/auth.js'))(req, res, next));
app.use('/api/chats', async (req, res, next) => (await importRoute('../pages/api/routes/chats.js'))(req, res, next));
app.use('/api/messages', async (req, res, next) => (await importRoute('../pages/api/routes/messages.js'))(req, res, next));
app.use('/api/rooms', async (req, res, next) => (await importRoute('../pages/api/routes/rooms.js'))(req, res, next));
app.use('/api/users', async (req, res, next) => (await importRoute('../pages/api/routes/users.js'))(req, res, next));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('sendMessage', async ({ roomId, message }) => {
    const newMessage = new Message({
      text: message.text,
      sender: message.sender,
      roomid: roomId,
      timestamp: new Date(),
    });

    try {
      await newMessage.save();

      io.to(roomId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('Error saving message to database:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
