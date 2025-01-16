const Achievement = require('../models/Achievement');

const addAchievements = async (req, res) => {
  try {
    console.log('Adding achievements:', req.body);
    // Extract achievements array from req.body
    const { achievements } = req.body;
    
    if (!achievements || !Array.isArray(achievements)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid achievements data format'
      });
    }

    // Validate each achievement
    for (const achievement of achievements) {
      if (!achievement.title || !achievement.organization || 
          !achievement.date || !achievement.description) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields'
        });
      }
    }

    const savedAchievements = await Achievement.insertMany(achievements);
    
    res.status(201).json({
      success: true,
      data: savedAchievements
    });
  } catch (error) {
    console.error('Add achievements error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const getAchievements = async (req, res) => {
  try {
    console.log('Fetching achievements');
    const achievements = await Achievement.find({}).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  addAchievements,
  getAchievements
};