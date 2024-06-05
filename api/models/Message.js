// api/models/Message.js
import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  roomId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model('Message', messageSchema);
