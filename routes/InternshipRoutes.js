const express = require('express');
const { createInternship, getInternships } = require('../controllers/InternshipController');

const router = express.Router();

router.post('/internships', createInternship);
router.get('/internships', getInternships);

module.exports = router;
