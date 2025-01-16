const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
