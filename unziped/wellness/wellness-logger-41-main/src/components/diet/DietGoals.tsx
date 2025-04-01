
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NutrientProgressBar } from './NutrientProgressBar';
import { nutrientGoals } from '@/utils/dietData';
import { GlassWater, Flame, Beef, Apple, Cookie, Atom } from 'lucide-react';

export function DietGoals() {
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle>Nutrition Goals</CardTitle>
        <CardDescription>Your daily targets and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GoalItem 
              icon={<Flame className="h-4 w-4 text-health-red" />}
              title="Calories"
              current={nutrientGoals.calories.current}
              target={nutrientGoals.calories.target}
            />
            
            <GoalItem 
              icon={<GlassWater className="h-4 w-4 text-health-blue" />}
              title="Water"
              current={nutrientGoals.water.current}
              target={nutrientGoals.water.target}
              unit="L"
            />
          </div>
          
          <div className="space-y-3 pt-2">
            <NutrientProgressBar 
              label="Protein"
              current={nutrientGoals.protein.current}
              target={nutrientGoals.protein.target}
              unit="g"
              className="pb-1"
            />
            
            <NutrientProgressBar 
              label="Carbohydrates"
              current={nutrientGoals.carbs.current}
              target={nutrientGoals.carbs.target}
              unit="g"
              className="pb-1"
            />
            
            <NutrientProgressBar 
              label="Fat"
              current={nutrientGoals.fat.current}
              target={nutrientGoals.fat.target}
              unit="g"
              className="pb-1"
            />
            
            <NutrientProgressBar 
              label="Fiber"
              current={nutrientGoals.fiber.current}
              target={nutrientGoals.fiber.target}
              unit="g"
              className="pb-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface GoalItemProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  target: number;
  unit?: string;
}

function GoalItem({ icon, title, current, target, unit = '' }: GoalItemProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className="p-4 rounded-lg border bg-card/50">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="text-sm font-medium">{title}</h4>
        </div>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight">
          {current}{unit && <span className="text-sm font-normal ml-0.5">{unit}</span>}
        </span>
        <span className="text-sm text-muted-foreground">
          of {target}{unit && unit}
        </span>
      </div>
    </div>
  );
}
