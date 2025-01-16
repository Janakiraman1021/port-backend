const express = require('express');
const { addAchievements, getAchievements } = require('../controllers/achievementController');

const router = express.Router();

router.post('/', addAchievements);
router.get('/', getAchievements);

module.exports = router;
