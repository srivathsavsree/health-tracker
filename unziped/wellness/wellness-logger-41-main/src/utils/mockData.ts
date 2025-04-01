
// Mock data for activities
export const weeklyActivityData = {
  current: 12.5, // hours
  previous: 10.2, // hours
  change: 22.5, // percentage
};

export const dailyActivityData = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 2.7 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 0.8 },
];

export const recentActivityLogs = [
  {
    id: 1,
    activity: 'Running',
    duration: '45 min',
    calories: 320,
    timestamp: new Date('2023-07-01T08:30:00'),
  },
  {
    id: 2,
    activity: 'Strength Training',
    duration: '60 min',
    calories: 280,
    timestamp: new Date('2023-07-01T16:15:00'),
  },
  {
    id: 3,
    activity: 'Yoga',
    duration: '30 min',
    calories: 150,
    timestamp: new Date('2023-06-30T07:00:00'),
  },
  {
    id: 4,
    activity: 'Swimming',
    duration: '40 min',
    calories: 350,
    timestamp: new Date('2023-06-29T18:00:00'),
  },
  {
    id: 5,
    activity: 'Cycling',
    duration: '75 min',
    calories: 480,
    timestamp: new Date('2023-06-28T16:30:00'),
  },
];

// Activity types with their corresponding colors
export const activityTypes = {
  'Running': 'health-blue',
  'Walking': 'health-green',
  'Cycling': 'health-purple',
  'Swimming': 'health-blue',
  'Strength Training': 'health-orange',
  'Yoga': 'health-green',
  'HIIT': 'health-red',
  'Pilates': 'health-purple',
  'Dancing': 'health-yellow',
};

// Format date utility
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
