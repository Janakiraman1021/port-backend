const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');

// Get all certifications
router.get('/', certificationController.getCertifications);

// Create a new certification
router.post('/', certificationController.createCertification);

// Update a certification
router.put('/:id', certificationController.updateCertification);

// Delete a certification
router.delete('/:id', certificationController.deleteCertification);

module.exports = router;
