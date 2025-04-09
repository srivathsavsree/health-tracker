export const badges = [
  {
    id: 1,
    name: 'Fitness Enthusiast',
    description: 'Complete 5 fitness achievements',
    category: 'fitness',
    rarity: 'rare',
    icon: '🎽',
    points: 150,
    requirements: [
      {
        type: 'achievement',
        value: 5,
        description: 'Complete 5 fitness achievements'
      }
    ],
    unlocked: false,
    progress: 0
  },
  {
    id: 2,
    name: 'Sleep Champion',
    description: 'Maintain a perfect sleep schedule for a month',
    category: 'sleep',
    rarity: 'epic',
    icon: '🌙',
    points: 300,
    requirements: [
      {
        type: 'achievement',
        value: 30,
        description: 'Complete the Early Bird achievement 30 times'
      }
    ],
    unlocked: false,
    progress: 0
  },
  {
    id: 3,
    name: 'Hydration Hero',
    description: 'Master the art of staying hydrated',
    category: 'water',
    rarity: 'rare',
    icon: '🌊',
    points: 200,
    requirements: [
      {
        type: 'achievement',
        value: 15,
        description: 'Complete the Hydration Master achievement 15 times'
      }
    ],
    unlocked: false,
    progress: 0
  },
  {
    id: 4,
    name: 'Nutrition Expert',
    description: 'Become a master of healthy eating',
    category: 'nutrition',
    rarity: 'epic',
    icon: '👨‍🍳',
    points: 250,
    requirements: [
      {
        type: 'achievement',
        value: 100,
        description: 'Log 100 healthy meals'
      }
    ],
    unlocked: false,
    progress: 0
  },
  {
    id: 5,
    name: 'Mood Master',
    description: 'Achieve perfect emotional awareness',
    category: 'mood',
    rarity: 'legendary',
    icon: '🎭',
    points: 500,
    requirements: [
      {
        type: 'achievement',
        value: 60,
        description: 'Track mood for 60 consecutive days'
      }
    ],
    unlocked: false,
    progress: 0
  },
  {
    id: 6,
    name: 'Health Guru',
    description: 'Achieve mastery in all health aspects',
    category: 'special',
    rarity: 'legendary',
    icon: '👑',
    points: 1000,
    requirements: [
      {
        type: 'points',
        value: 5000,
        description: 'Earn 5000 total points'
      }
    ],
    unlocked: false,
    progress: 0
  }
]; 