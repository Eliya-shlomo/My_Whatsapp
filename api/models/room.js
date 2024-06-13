import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String }, 
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPrivate: { type: Boolean, default: true }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
