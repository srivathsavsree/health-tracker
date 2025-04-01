
import React from 'react';
import BootstrapNavbar from '@/components/layout/BootstrapNavbar';
import { Utensils, Apple, GlassWater, Salad, Cookie, Clock, Flame } from 'lucide-react';

// Mock data for diet tracking
const mealData = [
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

const nutritionGoals = {
  calories: { current: 1770, target: 2000 },
  protein: { current: 104, target: 120 },
  carbs: { current: 173, target: 200 },
  fat: { current: 51, target: 65 },
  fiber: { current: 22, target: 30 },
  water: { current: 1.8, target: 2.5 }
};

export default function Diet() {
  return (
    <div className="min-vh-100 bg-light">
      <BootstrapNavbar />
      
      <main className="container py-5 mt-5">
        <header className="mb-4 pt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div>
              <h1 className="fw-bold">Diet & Nutrition</h1>
              <p className="text-muted">
                Track your nutrition and dietary habits
              </p>
            </div>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <div className="card px-3 py-2 d-flex flex-row align-items-center">
                <Salad className="text-success me-2" size={20} />
                <div>
                  <h6 className="mb-0">1,770</h6>
                  <small className="text-muted">Cal today</small>
                </div>
              </div>
              <div className="card px-3 py-2 d-flex flex-row align-items-center">
                <GlassWater className="text-primary me-2" size={20} />
                <div>
                  <h6 className="mb-0">1.8L</h6>
                  <small className="text-muted">Water</small>
                </div>
              </div>
              <div className="card px-3 py-2 d-flex flex-row align-items-center">
                <Apple className="text-danger me-2" size={20} />
                <div>
                  <h6 className="mb-0">22g</h6>
                  <small className="text-muted">Fiber</small>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="row g-4 mb-4">
          <div className="col-md-7">
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Today's Meals</h5>
                <button className="btn btn-sm btn-primary d-flex align-items-center">
                  <span className="me-1">+</span> Add Meal
                </button>
              </div>
              
              {mealData.map((meal) => (
                <div key={meal.id} className="card bg-light border-0 p-3 mb-3">
                  <div className="d-flex align-items-start">
                    <div className="rounded-circle bg-white p-2 me-3">
                      <Utensils className="text-primary" size={18} />
                    </div>
                    
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">{meal.meal}</h6>
                        <span className="text-muted small">{meal.time}</span>
                      </div>
                      <p className="text-muted small mb-2">{meal.foods.join(', ')}</p>
                      <div className="d-flex flex-wrap gap-3">
                        <span className="small"><span className="fw-medium">Calories:</span> {meal.calories}</span>
                        <span className="small"><span className="fw-medium">Protein:</span> {meal.protein}g</span>
                        <span className="small"><span className="fw-medium">Carbs:</span> {meal.carbs}g</span>
                        <span className="small"><span className="fw-medium">Fat:</span> {meal.fat}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-md-5">
            <div className="card p-4">
              <h5 className="mb-3">Nutrition Goals</h5>
              
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="card bg-light border-0 p-3">
                    <div className="d-flex align-items-center mb-2">
                      <Flame className="text-danger me-2" size={16} />
                      <span className="small fw-medium">Calories</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <h3 className="fw-bold mb-0">{nutritionGoals.calories.current}</h3>
                      <span className="text-muted small">of {nutritionGoals.calories.target}</span>
                    </div>
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div 
                        className="progress-bar bg-danger" 
                        role="progressbar" 
                        style={{ width: `${(nutritionGoals.calories.current / nutritionGoals.calories.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="col-6">
                  <div className="card bg-light border-0 p-3">
                    <div className="d-flex align-items-center mb-2">
                      <GlassWater className="text-primary me-2" size={16} />
                      <span className="small fw-medium">Water</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <h3 className="fw-bold mb-0">{nutritionGoals.water.current}L</h3>
                      <span className="text-muted small">of {nutritionGoals.water.target}L</span>
                    </div>
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div 
                        className="progress-bar bg-primary" 
                        role="progressbar" 
                        style={{ width: `${(nutritionGoals.water.current / nutritionGoals.water.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className="fw-medium me-2">Protein</span>
                    <span className="text-muted small">{nutritionGoals.protein.current}g / {nutritionGoals.protein.target}g</span>
                  </div>
                  <span className="badge bg-success">{Math.round((nutritionGoals.protein.current / nutritionGoals.protein.target) * 100)}%</span>
                </div>
                <div className="progress mb-3" style={{ height: "6px" }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${(nutritionGoals.protein.current / nutritionGoals.protein.target) * 100}%` }}
                  ></div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className="fw-medium me-2">Carbohydrates</span>
                    <span className="text-muted small">{nutritionGoals.carbs.current}g / {nutritionGoals.carbs.target}g</span>
                  </div>
                  <span className="badge bg-warning">{Math.round((nutritionGoals.carbs.current / nutritionGoals.carbs.target) * 100)}%</span>
                </div>
                <div className="progress mb-3" style={{ height: "6px" }}>
                  <div 
                    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{ width: `${(nutritionGoals.carbs.current / nutritionGoals.carbs.target) * 100}%` }}
                  ></div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className="fw-medium me-2">Fat</span>
                    <span className="text-muted small">{nutritionGoals.fat.current}g / {nutritionGoals.fat.target}g</span>
                  </div>
                  <span className="badge bg-danger">{Math.round((nutritionGoals.fat.current / nutritionGoals.fat.target) * 100)}%</span>
                </div>
                <div className="progress mb-3" style={{ height: "6px" }}>
                  <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    style={{ width: `${(nutritionGoals.fat.current / nutritionGoals.fat.target) * 100}%` }}
                  ></div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className="fw-medium me-2">Fiber</span>
                    <span className="text-muted small">{nutritionGoals.fiber.current}g / {nutritionGoals.fiber.target}g</span>
                  </div>
                  <span className="badge bg-primary">{Math.round((nutritionGoals.fiber.current / nutritionGoals.fiber.target) * 100)}%</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${(nutritionGoals.fiber.current / nutritionGoals.fiber.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
