// api/server.js
import express, { json } from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
import { connect } from 'mongoose';
import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';
import userRoutes from './routes/users';

const app = express();
const server = createServer(app);
const io = socketIo(server);

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

// MongoDB Connection
connect('mongodb://mongo-service:27017/whatsapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
