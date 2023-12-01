const mongoose = require('mongoose');

const checkInOutSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  checkin_time: {
    type: Date,
    required: true
  },
  checkout_time: {
    type: Date,
    required: false
  },
  hours_worked: {
    type: Number,
    required: true
  }
});

const Checkin = mongoose.model('CheckInOut', checkInOutSchema);

module.exports = Checkin;
