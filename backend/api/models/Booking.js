const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingsSchema);