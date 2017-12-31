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
  favorites: {
    type: [String],
    default: [],
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
export function findUser(username, userId) {
  if (!username) return User.findOne({ _id: userId, }).exec();
  return User.findOne({ username, }).exec();
}

/**
 * @description This function takes a buoy ID and a user ID. Using the user schema defined above
 * returns a promise to add a new favorite to the users favorites
 * 
 * @param {string} userId The user Id to find
 * @param {string} buoyId The buoyId to push to the array
 * @return {Promise} promise
 */
export function addNewFavorite(userId, buoyId) {
  return User.update({ _id: userId, }, { $push: { favorites: buoyId, }, }).exec();
}

/**
 * @description This function takes a buoy ID and a user ID. Using the user schema defined above
 * returns a promise to remove a favorite from the users favorites
 * 
 * @param {string} userId The user Id to find
 * @param {string} buoyId The buoyId to push to the array
 * @return {Promise} promise
 */
export function removeFavorite(userId, buoyId) {
  return User.update({ _id: userId, }, { $pull: { favorites: buoyId, }, }).exec();
}
