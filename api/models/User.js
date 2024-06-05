// api/models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
  // Add other user fields here
});

export default model('User', userSchema);
