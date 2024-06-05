import {mongoose} from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

export async function findOne(query) {
  return User.findOne(query);
}

export default User;
