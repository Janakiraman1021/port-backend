const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  period: {
    type: String,
    required: [true, 'Period is required'],
    trim: true
  },
  responsibilities: {
    type: [String],
    required: [true, 'At least one responsibility is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Responsibilities cannot be empty'
    }
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Internship', InternshipSchema);
