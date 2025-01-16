const mongoose = require('mongoose');

// Define project schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  githubUrl: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: false,
    default: ''
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
