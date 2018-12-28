const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  toDate: {
    type: String
  },
  fromDate: {
    type: String
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'property'
  }
});


module.exports = Post = mongoose.model('booking', BookingSchema);
