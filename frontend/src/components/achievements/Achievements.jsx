import React, { useState } from 'react';
import { achievements } from '../../data/achievements';
import { badges } from '../../data/badges';
import './Achievements.css';

const Achievements = () => {
  const [activeTab, setActiveTab] = useState('achievements');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'fitness', 'sleep', 'water', 'nutrition', 'mood', 'special'];

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const filteredBadges = badges.filter(badge => 
    selectedCategory === 'all' || badge.category === selectedCategory
  );

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return '#ffd700'; // Gold
      case 'epic':
        return '#9b30ff'; // Purple
      case 'rare':
        return '#4169e1'; // Blue
      default:
        return '#808080'; // Gray
    }
  };

  const getProgressColor = (progress, target) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 100) return '#4caf50';
    if (percentage >= 50) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h1>Achievements & Badges</h1>
        <div className="tab-buttons">
          <button 
            className={activeTab === 'achievements' ? 'active' : ''} 
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
          <button 
            className={activeTab === 'badges' ? 'active' : ''} 
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="achievements-grid">
        {activeTab === 'achievements' ? (
          filteredAchievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              <div className="achievement-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${Math.min((achievement.progress / achievement.requirements.value) * 100, 100)}%`,
                      backgroundColor: getProgressColor(achievement.progress, achievement.requirements.value)
                    }}
                  />
                </div>
                <span>{achievement.progress} / {achievement.requirements.value}</span>
              </div>
              <div className="achievement-points">
                <span>🏆 {achievement.points} points</span>
              </div>
            </div>
          ))
        ) : (
          filteredBadges.map(badge => (
            <div 
              key={badge.id} 
              className="badge-card"
              style={{
                borderColor: getRarityColor(badge.rarity)
              }}
            >
              <div className="badge-icon">{badge.icon}</div>
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
              <div className="badge-rarity" style={{ color: getRarityColor(badge.rarity) }}>
                {badge.rarity.toUpperCase()}
              </div>
              <div className="badge-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${Math.min((badge.progress / badge.requirements[0].value) * 100, 100)}%`,
                      backgroundColor: getProgressColor(badge.progress, badge.requirements[0].value)
                    }}
                  />
                </div>
                <span>{badge.progress} / {badge.requirements[0].value}</span>
              </div>
              <div className="badge-points">
                <span>🏆 {badge.points} points</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Achievements; 