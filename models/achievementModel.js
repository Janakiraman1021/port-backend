const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
