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
      message: error.message
    });
  }
};

// Get all internships
exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      data: internships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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

// Update an internship by ID
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete an internship by ID
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
