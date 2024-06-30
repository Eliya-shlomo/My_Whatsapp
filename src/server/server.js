import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.config.js';
import authRoutes from '../pages/controllers/authController.js';
import chatRoutes from '../pages/controllers/chatController.js';
import messageRoutes from '../pages/controllers/messageController.js';
import roomRoutes from '../pages/controllers/roomController.js';
import userRoutes from '../pages/controllers/userController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Specify your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

// Connect to database
connectDB().then(() => {
  console.log('Connected to the database');
}).catch(error => {
  console.error('Database connection error:', error);
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.IO Connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('sendMessage', async ({ roomId, message }) => {
    try {
      const Message = (await import('./models/Message.cjs')).default;
      const newMessage = new Message({
        text: message.text,
        sender: message.sender,
        roomId: roomId,
        timestamp: new Date(),
      });

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

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
