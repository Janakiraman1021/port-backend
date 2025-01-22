const Skill = require('../models/Skill');

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.status(200).json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Create new skill(s)
exports.createSkill = async (req, res) => {
  try {
    const skills = Array.isArray(req.body) ? req.body : [req.body];
    
    // Validate skills
    skills.forEach(skill => {
      if (!skill.name || !skill.category || skill.level === undefined) {
        throw new Error('Name, category and level are required');
      }
      if (skill.level < 0 || skill.level > 100) {
        throw new Error('Level must be between 0 and 100');
      }
    });

    const savedSkills = await Skill.insertMany(skills);
    res.status(201).json({ success: true, data: savedSkills });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Update skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level } = req.body;

    if (!name || !category || level === undefined) {
      return res.status(400).json({ success: false, error: 'All fields required' });
    }

    if (level < 0 || level > 100) {
      return res.status(400).json({ success: false, error: 'Level must be 0-100' });
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, category, level },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.status(200).json({ success: true, data: skill });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get skills by category
exports.getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const skills = await Skill.find({ category }).sort({ level: -1 });
    res.status(200).json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
