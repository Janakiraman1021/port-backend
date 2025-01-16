const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  deleteSkill,
} = require('../controllers/skillController');

router.route('/').get(getSkills).post(createSkill);
router.route('/:id').delete(deleteSkill);

module.exports = router;
