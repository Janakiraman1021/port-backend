const Certification = require('../models/Certification');

// Get all certifications
exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certifications' });
  }
};

// Create a new certification
exports.createCertification = async (req, res) => {
  const { title, issuer, date, credentialUrl } = req.body;
  try {
    const newCertification = new Certification({ title, issuer, date, credentialUrl });
    await newCertification.save();
    res.status(201).json(newCertification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create certification' });
  }
};

// Update an existing certification
exports.updateCertification = async (req, res) => {
  const { id } = req.params;
  const { title, issuer, date, credentialUrl } = req.body;
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(
      id,
      { title, issuer, date, credentialUrl },
      { new: true }
    );
    if (!updatedCertification) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.status(200).json(updatedCertification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update certification' });
  }
};

// Delete a certification
exports.deleteCertification = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCertification = await Certification.findByIdAndDelete(id);
    if (!deletedCertification) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.status(200).json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete certification' });
  }
};
