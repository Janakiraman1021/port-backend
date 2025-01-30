const Certification = require('../models/Certification');

exports.getCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            data: certifications
        });
    } catch (error) {
        console.error('Get certifications error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch certifications' });
    }
};

exports.createCertification = async (req, res) => {
    try {
        const certifications = Array.isArray(req.body) ? req.body : [req.body];
        
        // Validate input
        if (!certifications.length) {
            return res.status(400).json({
                success: false,
                error: 'No certification data provided'
            });
        }

        // Create all certifications
        const createdCertifications = await Certification.insertMany(certifications);
        
        res.status(201).json({
            success: true,
            data: createdCertifications
        });
    } catch (error) {
        console.error('Create certification error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create certification',
            details: error.message 
        });
    }
};

exports.updateCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const certification = await Certification.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!certification) {
            return res.status(404).json({
                success: false,
                error: 'Certification not found'
            });
        }

        res.status(200).json({
            success: true,
            data: certification
        });
    } catch (error) {
        console.error('Update certification error:', error);
        res.status(500).json({ success: false, error: 'Failed to update certification' });
    }
};

exports.deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);
        
        if (!certification) {
            return res.status(404).json({
                success: false,
                error: 'Certification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Certification deleted successfully'
        });
    } catch (error) {
        console.error('Delete certification error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete certification' });
    }
};
