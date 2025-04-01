
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UtensilsCrossed } from 'lucide-react';
import { dailyFoodIntake } from '@/utils/dietData';
import { toast } from 'sonner';

export function DietTracker() {
  const [meals, setMeals] = useState(dailyFoodIntake);

  const handleAddMeal = () => {
    toast.info("Add meal feature will be implemented in the next update");
  };
  
  return (
    <Card className="health-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Today's Meals</CardTitle>
          <CardDescription>Track your daily food intake</CardDescription>
        </div>
        <Button onClick={handleAddMeal} size="sm" className="h-8 gap-1">
          <Plus size={16} />
          Add Meal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-start gap-4 p-3 rounded-lg border bg-card/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <UtensilsCrossed className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{meal.meal}</h4>
                  <span className="text-xs text-muted-foreground">{meal.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{meal.foods.join(', ')}</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <MacroStat label="Calories" value={`${meal.calories}`} />
                  <MacroStat label="Protein" value={`${meal.protein}g`} />
                  <MacroStat label="Carbs" value={`${meal.carbs}g`} />
                  <MacroStat label="Fat" value={`${meal.fat}g`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface MacroStatProps {
  label: string;
  value: string;
}

function MacroStat({ label, value }: MacroStatProps) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
