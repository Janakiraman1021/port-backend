const express = require('express');
const { createInternship, getInternships, updateInternship } = require('../controllers/InternshipController');

const router = express.Router();

router.post('/internships', createInternship);
router.get('/internships', getInternships);
router.put('/internships/:id', updateInternship);

module.exports = router;
