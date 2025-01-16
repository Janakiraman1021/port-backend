const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const projects = Array.isArray(req.body) ? req.body : [req.body];

    // Validate projects data
    for (const project of projects) {
      const { title, description, technologies } = project;
      if (!title || !description || !technologies) {
        return res.status(400).json({
          success: false,
          message: 'Each project requires title, description, and technologies'
        });
      }
    }

    // Process projects with default values
    const processedProjects = projects.map(project => ({
      ...project,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: project.image || ''
    }));

    const savedProjects = await Project.insertMany(processedProjects);

    res.status(201).json({
      success: true,
      data: savedProjects
    });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
