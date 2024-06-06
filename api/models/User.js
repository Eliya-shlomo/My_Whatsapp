import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export const findOne = async (query) => {
  try {
    return await User.findOne(query);
  } catch (error) {
    console.error('Error in findOne:', error);
    throw error;
  }
};

export const createUser = async ({ username, password }) => {
  try {
    const newUser = new User({ username, password });
    // Save the new user document to the database
    await newUser.save();
    return newUser; // Return the newly created user document
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};


export default model('User', userSchema);
