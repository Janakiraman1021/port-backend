const Education = require('../models/educationModel');

// Get all education entries
exports.getEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch education entries', error });
  }
};

// Create a new education entry
exports.createEducation = async (req, res) => {
  try {
    console.log('Creating education entry:', req.body);

    const { institution, degree, period, score } = req.body;
    
    if (!institution || !degree || !period || !score) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newEducation = new Education({
      institution,
      degree,
      period,
      score
    });

    const savedEducation = await newEducation.save();
    console.log('Education saved:', savedEducation);

    res.status(201).json({
      success: true,
      data: savedEducation
    });

  } catch (error) {
    console.error('Education creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create education entry',
      error: error.message
    });
  }
};

// Update an education entry
exports.updateEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEducation = await Education.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEducation) return res.status(404).json({ message: 'Education entry not found' });
    res.status(200).json({ message: 'Education entry updated successfully', updatedEducation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update education entry', error });
  }
};

// Delete an education entry
exports.deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEducation = await Education.findByIdAndDelete(id);
    if (!deletedEducation) return res.status(404).json({ message: 'Education entry not found' });
    res.status(200).json({ message: 'Education entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete education entry', error });
  }
};
