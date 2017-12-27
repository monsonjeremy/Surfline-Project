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

export function findUser(username) {
  return User.findOne({ username, })
    .exec()
    .then(user => {
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      return user;
    })
    .catch(err => {
      err.statusCode = 500;
      throw err;
    });
}
