import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', UserSchema);

/**
 * @description This function takes a username and using the user schema defined above
 * returns a promise to search the database for the username
 * 
 * @param {string} username The username to find
 * @return {Promise} promise
 */
export function findUser(username) {
  return User.findOne({ username, }).exec();
}
