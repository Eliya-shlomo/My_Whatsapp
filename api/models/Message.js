// api/models/Message.js
import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  text: String,
  sender: String,
  timestamp: Date,
});

export default model('Message', messageSchema);
