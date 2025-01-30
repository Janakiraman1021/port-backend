const Skill = require('../models/Skill');

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new skill(s)
exports.createSkill = async (req, res) => {
  try {
    const skillsData = req.body.skills || req.body;
    const skills = Array.isArray(skillsData) ? skillsData : [skillsData];

    // Basic validation
    for (const skill of skills) {
      if (!skill.name || !skill.category || skill.level === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields'
        });
      }
    }

    const createdSkills = await Skill.create(skills);
    
    res.status(201).json({
      success: true,
      data: createdSkills
    });

  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
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
