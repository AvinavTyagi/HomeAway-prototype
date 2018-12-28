const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  about: {
    type: String
  },
  address: {
    type: String
  },
  company: {
    type: String
  },
  school: {
    type: String
  },
  hometown: {
    type: String
  },
  languages: {
    type: String
  },
  gender: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = User = mongoose.model('users', UserSchema);
