
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  current: number;
  target: number;
  unit: string;
  completed: boolean;
}

// Sample data for goals
const dailyGoals: Goal[] = [
  { id: 1, title: 'Drink water', current: 6, target: 8, unit: 'glasses', completed: false },
  { id: 2, title: 'Walk', current: 8500, target: 10000, unit: 'steps', completed: false },
  { id: 3, title: 'Meditate', current: 10, target: 10, unit: 'minutes', completed: true },
  { id: 4, title: 'Eat vegetables', current: 3, target: 5, unit: 'servings', completed: false },
];

const weeklyGoals: Goal[] = [
  { id: 1, title: 'Exercise', current: 3, target: 5, unit: 'days', completed: false },
  { id: 2, title: 'Sleep well', current: 4, target: 7, unit: 'nights', completed: false },
  { id: 3, title: 'Meal prep', current: 1, target: 1, unit: 'times', completed: true },
  { id: 4, title: 'Read books', current: 2, target: 3, unit: 'hours', completed: false },
];

const monthlyGoals: Goal[] = [
  { id: 1, title: 'Weight target', current: 2, target: 4, unit: 'lbs', completed: false },
  { id: 2, title: 'New recipes', current: 5, target: 8, unit: 'recipes', completed: false },
  { id: 3, title: 'Yoga classes', current: 6, target: 12, unit: 'classes', completed: false },
  { id: 4, title: 'Alcohol-free days', current: 18, target: 20, unit: 'days', completed: false },
];

export function GoalsTracking() {
  const [timeframe, setTimeframe] = useState<string>('daily');
  
  const getGoals = () => {
    switch (timeframe) {
      case 'daily':
        return dailyGoals;
      case 'weekly':
        return weeklyGoals;
      case 'monthly':
        return monthlyGoals;
      default:
        return dailyGoals;
    }
  };

  return (
    <Card className="p-6 mb-8 bg-card shadow-lg border border-border/50 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-semibold">Goals Tracking</h3>
          <p className="text-sm text-muted-foreground">Track your health and fitness goals</p>
        </div>
        <ToggleGroup type="single" value={timeframe} onValueChange={(value) => value && setTimeframe(value)}>
          <ToggleGroupItem value="daily" className="text-sm">Daily</ToggleGroupItem>
          <ToggleGroupItem value="weekly" className="text-sm">Weekly</ToggleGroupItem>
          <ToggleGroupItem value="monthly" className="text-sm">Monthly</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getGoals().map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </Card>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);
  
  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-orange-400";
    if (percentage < 75) return "bg-yellow-400";
    return "bg-green-500";
  };
  
  return (
    <div className={cn(
      "p-4 rounded-lg border bg-card/50 flex flex-col",
      goal.completed ? "border-green-200 bg-green-50/30 dark:bg-green-950/10" : ""
    )}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium flex-1">{goal.title}</h4>
        {goal.completed && (
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
        )}
      </div>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5 text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {goal.current} / {goal.target} {goal.unit}
          </span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2" 
          indicatorClassName={getProgressColor()}
        />
      </div>
    </div>
  );
}
