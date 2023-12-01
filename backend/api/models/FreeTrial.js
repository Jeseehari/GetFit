const mongoose = require('mongoose');

const freeTrial = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('FreeTrial', freeTrial);