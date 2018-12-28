const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PropertySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  country: {
    type: String
  },
  street: {
    type: String
  },
  unit: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: String
  },
  headline: {
    type: String
  },
  desc: {
    type: String
  },
  type: {
    type: String
  },
  bedroom: {
    type: String
  },
  bathroom: {
    type: String
  },
  photos: {
    type: String
  },
  options: {
    type: String
  },
  currency: {
    type: String
  },
  base: {
    type: String
  },
  stay: {
    type: String
  }
});


module.exports = Post = mongoose.model('property', PropertySchema);
