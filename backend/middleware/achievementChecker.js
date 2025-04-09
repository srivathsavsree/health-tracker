const Achievement = require('../models/Achievement');
const UserAchievement = require('../models/UserAchievement');
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');

const checkAchievements = async (userId, category, metric, value) => {
  try {
    // Find relevant achievements for this category and metric
    const achievements = await Achievement.find({
      'requirements.metric': metric,
      category
    });

    for (const achievement of achievements) {
      // Get or create user achievement
      let userAchievement = await UserAchievement.findOne({
        user: userId,
        achievement: achievement._id
      });

      if (!userAchievement) {
        userAchievement = new UserAchievement({
          user: userId,
          achievement: achievement._id
        });
      }

      // Update progress based on achievement type
      switch (achievement.type) {
        case 'oneTime':
          if (value > 0 && !userAchievement.completed) {
            await userAchievement.updateProgress(1);
          }
          break;

        case 'streak':
          await userAchievement.updateProgress(value);
          break;

        case 'progressive':
          await userAchievement.updateProgress(
            userAchievement.progress.current + value
          );
          break;

        case 'milestone':
          await userAchievement.updateProgress(value);
          break;
      }

      // Check for badge unlocks if achievement completed
      if (userAchievement.completed && !userAchievement.claimed) {
        await checkBadges(userId, category);
      }
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
};

const checkBadges = async (userId, category) => {
  try {
    const badges = await Badge.find({ category });
    
    for (const badge of badges) {
      // Check if user already has the badge
      const userBadge = await UserBadge.findOne({
        user: userId,
        badge: badge._id
      });

      if (!userBadge) {
        // Check badge requirements
        const requirements = badge.requirements[0]; // Currently supporting single requirement
        let requirementMet = false;

        if (requirements.type === 'achievement') {
          // Count completed achievements in category
          const completedCount = await UserAchievement.countDocuments({
            user: userId,
            completed: true,
            'achievement.category': category
          });
          requirementMet = completedCount >= requirements.value;
        } else if (requirements.type === 'points') {
          // Get user's total points
          const user = await User.findById(userId);
          requirementMet = user.points >= requirements.value;
        }

        // Award badge if requirements met
        if (requirementMet) {
          await UserBadge.create({
            user: userId,
            badge: badge._id,
            earnedAt: new Date()
          });
        }
      }
    }
  } catch (error) {
    console.error('Error checking badges:', error);
  }
};

// Middleware to check achievements after relevant actions
const achievementChecker = (category, metric) => async (req, res, next) => {
  try {
    // Get the value from the request based on the metric
    let value = 0;
    switch (metric) {
      case 'sleep':
        value = req.body.duration || 0;
        break;
      case 'water':
        value = req.body.glasses || 0;
        break;
      case 'meals':
        value = 1; // Count each meal log as 1
        break;
      case 'mood':
        value = 1; // Count each mood log as 1
        break;
      case 'workouts':
        value = 1; // Count each workout log as 1
        break;
      case 'points':
        value = req.user.points || 0;
        break;
      default:
        value = req.body.value || 0;
    }

    // Check achievements after response is sent
    res.on('finish', async () => {
      if (res.statusCode === 200 || res.statusCode === 201) {
        await checkAchievements(req.user._id, category, metric, value);
      }
    });

    next();
  } catch (error) {
    console.error('Achievement checker middleware error:', error);
    next();
  }
};

module.exports = achievementChecker; 