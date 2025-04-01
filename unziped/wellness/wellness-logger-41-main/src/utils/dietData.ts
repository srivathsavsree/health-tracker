
// Mock data for diet tracking and analytics

// Daily food intake data
export const dailyFoodIntake = [
  {
    id: 1,
    meal: 'Breakfast',
    foods: ['Oatmeal', 'Banana', 'Almond milk'],
    calories: 420,
    protein: 12,
    carbs: 68,
    fat: 9,
    time: '07:30 AM'
  },
  {
    id: 2,
    meal: 'Lunch',
    foods: ['Grilled chicken salad', 'Whole grain bread'],
    calories: 550,
    protein: 35,
    carbs: 45,
    fat: 15,
    time: '12:15 PM'
  },
  {
    id: 3,
    meal: 'Snack',
    foods: ['Greek yogurt', 'Berries', 'Honey'],
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 2,
    time: '03:00 PM'
  },
  {
    id: 4,
    meal: 'Dinner',
    foods: ['Salmon', 'Quinoa', 'Roasted vegetables'],
    calories: 620,
    protein: 42,
    carbs: 40,
    fat: 25,
    time: '07:00 PM'
  }
];

// Nutrient goals
export const nutrientGoals = {
  calories: { current: 1770, target: 2000 },
  protein: { current: 104, target: 120, unit: 'g' },
  carbs: { current: 173, target: 200, unit: 'g' },
  fat: { current: 51, target: 65, unit: 'g' },
  fiber: { current: 22, target: 30, unit: 'g' },
  sugar: { current: 45, target: 50, unit: 'g' },
  sodium: { current: 1850, target: 2300, unit: 'mg' },
  water: { current: 1.8, target: 2.5, unit: 'L' }
};

// Weekly nutrition trends
export const weeklyNutritionData = [
  { day: 'Mon', calories: 1900, protein: 95, carbs: 220, fat: 55 },
  { day: 'Tue', calories: 1850, protein: 110, carbs: 180, fat: 62 },
  { day: 'Wed', calories: 1770, protein: 105, carbs: 175, fat: 50 },
  { day: 'Thu', calories: 2100, protein: 120, carbs: 210, fat: 70 },
  { day: 'Fri', calories: 1950, protein: 100, carbs: 190, fat: 65 },
  { day: 'Sat', calories: 2200, protein: 90, carbs: 240, fat: 75 },
  { day: 'Sun', calories: 1800, protein: 105, carbs: 185, fat: 55 }
];

// Meal suggestions based on goals
export const mealSuggestions = [
  {
    id: 1,
    meal: 'Breakfast',
    suggestion: 'Protein smoothie with spinach, banana, and chia seeds',
    calories: 320,
    benefits: ['High protein', 'Rich in antioxidants', 'Good source of fiber']
  },
  {
    id: 2,
    meal: 'Lunch',
    suggestion: 'Mediterranean bowl with quinoa, chickpeas, and vegetables',
    calories: 480,
    benefits: ['Heart healthy fats', 'Complete protein', 'High in fiber']
  },
  {
    id: 3,
    meal: 'Dinner',
    suggestion: 'Baked white fish with sweet potato and steamed broccoli',
    calories: 410,
    benefits: ['Lean protein', 'Complex carbs', 'Low calorie']
  },
  {
    id: 4,
    meal: 'Snack',
    suggestion: 'Apple slices with almond butter',
    calories: 200,
    benefits: ['Healthy fats', 'Sustained energy', 'Good source of fiber']
  }
];

// Common nutrition questions for the chatbot
export const commonNutritionQuestions = [
  "How much protein should I eat per day?",
  "What are good sources of plant-based protein?",
  "How can I reduce sugar cravings?",
  "What should I eat before a workout?",
  "How can I increase my fiber intake?"
];
