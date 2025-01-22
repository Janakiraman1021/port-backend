const Internship = require('../models/Internship');

// Create a new internship
exports.createInternship = async (req, res) => {
  try {
    const internships = Array.isArray(req.body) ? req.body : [req.body];
    const savedInternships = await Internship.insertMany(internships);
    
    res.status(201).json({
      success: true,
      data: savedInternships
    });
  } catch (error) {
    console.error('Internship creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Get all internships
exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching internships'
    });
  }
};

// Get a specific internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.status(200).json({
      success: true,
      data: internship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
