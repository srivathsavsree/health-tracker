
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function NutrientProgressBar({ 
  label, 
  current, 
  target, 
  unit = '', 
  className 
}) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-orange-400";
    if (percentage < 75) return "bg-yellow-400";
    return "bg-green-500";
  };
  
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {current} <span className="text-xs">{unit}</span> / {target} <span className="text-xs">{unit}</span>
        </p>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
}
