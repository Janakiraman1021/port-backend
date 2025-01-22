const Project = require('../models/Project');
const sharp = require('sharp');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const projects = Array.isArray(req.body) ? req.body : [req.body];

    // Process and validate projects
    const processedProjects = await Promise.all(projects.map(async project => {
      // Validate required fields
      const { title, description, technologies } = project;
      if (!title || !description || !technologies) {
        throw new Error('Each project requires title, description, and technologies');
      }

      // Process image if exists
      let processedImage = project.image;
      if (project.image && project.image.startsWith('data:image')) {
        const base64Data = project.image.split(';base64,').pop();
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        // Compress and resize image
        const compressedImage = await sharp(imageBuffer)
          .resize(800, 600, { fit: 'inside' })
          .jpeg({ quality: 80 })
          .toBuffer();
        
        processedImage = `data:image/jpeg;base64,${compressedImage.toString('base64')}`;
      }

      return {
        ...project,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        image: processedImage
      };
    }));

    const savedProjects = await Project.insertMany(processedProjects);
    
    res.status(201).json({
      success: true,
      data: savedProjects
    });
  } catch (error) {
    res.status(400).json({
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
