const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  threadmill: {
    type: Number,
    default: 0
  },
  cycling: {
    type: Number,
    default: 0
  },
  stair_machines: {
    type: Number,
    default: 0
  },
  weight_training: {
    type: Number,
    default: 0
  }
});

const logHoursSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  exercise: {
    type: exerciseSchema,
    default: {}
  }
});

module.exports = mongoose.model('LogHours', logHoursSchema);
