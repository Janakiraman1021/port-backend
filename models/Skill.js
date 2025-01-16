const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [0, 'Level must be at least 0'],
    max: [100, 'Level cannot exceed 100'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Programming Languages', 'Blockchain Development', 'Frameworks & Tools'],
  },
});

module.exports = mongoose.model('Skill', SkillSchema);
