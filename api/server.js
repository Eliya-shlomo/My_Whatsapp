import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import userRoutes from './routes/users.js';
import configureSocket from './socket.js';

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Configure Socket.IO
configureSocket(server);

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/whatsapp';

// Log the MONGO_URI to verify it's being read correctly
console.log('MONGO_URI:', mongoURI);

connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
