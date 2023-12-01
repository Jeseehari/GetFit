// models/classSchedule.js
const mongoose = require('mongoose');


const classSchedule = new mongoose.Schema({
  title: {
    type: String,
    required : true
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required :true,
  },
});



module.exports = mongoose.model('ClassSchedule', classSchedule);
