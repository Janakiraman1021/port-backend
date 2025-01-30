const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [0, 'Level must be at least 0'],
    max: [100, 'Level cannot exceed 100']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend Development', 'Backend Development', 'Database & Tools']
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
