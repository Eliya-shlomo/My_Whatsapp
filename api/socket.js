// socket.js
import { Server } from "socket.io";

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // Listen for joinRoom event
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Listen for leaveRoom event
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    // Listen for new message
    socket.on('message', (msg) => {
      const { roomId, message } = msg;
      console.log(`Message received: ${message} in room ${roomId}`);
      io.to(roomId).emit('message', { message, sender: socket.id });
    });

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });
  });
};

export default configureSocket;
