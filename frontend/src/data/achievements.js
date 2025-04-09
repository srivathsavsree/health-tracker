export const achievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Track your first workout session',
    category: 'fitness',
    type: 'oneTime',
    requirements: {
      metric: 'workouts',
      value: 1,
      timeframe: 'allTime'
    },
    points: 50,
    icon: '🏃',
    progress: 0,
    completed: false
  },
  {
    id: 2,
    name: 'Early Bird',
    description: 'Log 7 days of sleep data in a row',
    category: 'sleep',
    type: 'streak',
    requirements: {
      metric: 'sleep',
      value: 7,
      timeframe: 'daily'
    },
    points: 100,
    icon: '😴',
    progress: 0,
    completed: false
  },
  {
    id: 3,
    name: 'Hydration Master',
    description: 'Drink 8 glasses of water daily for 5 days',
    category: 'water',
    type: 'streak',
    requirements: {
      metric: 'water',
      value: 8,
      timeframe: 'daily'
    },
    points: 75,
    icon: '💧',
    progress: 0,
    completed: false
  },
  {
    id: 4,
    name: 'Nutrition Novice',
    description: 'Log 10 healthy meals',
    category: 'nutrition',
    type: 'progressive',
    requirements: {
      metric: 'meals',
      value: 10,
      timeframe: 'allTime'
    },
    points: 80,
    icon: '🥗',
    progress: 0,
    completed: false
  },
  {
    id: 5,
    name: 'Mood Tracker',
    description: 'Track your mood for 14 consecutive days',
    category: 'mood',
    type: 'streak',
    requirements: {
      metric: 'mood',
      value: 14,
      timeframe: 'daily'
    },
    points: 120,
    icon: '😊',
    progress: 0,
    completed: false
  },
  {
    id: 6,
    name: 'Point Collector',
    description: 'Earn 1000 points',
    category: 'special',
    type: 'milestone',
    requirements: {
      metric: 'points',
      value: 1000,
      timeframe: 'allTime'
    },
    points: 200,
    icon: '🏆',
    progress: 0,
    completed: false
  }
]; 