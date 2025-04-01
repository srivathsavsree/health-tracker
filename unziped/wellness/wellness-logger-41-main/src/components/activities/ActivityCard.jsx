
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function ActivityCard({ title, value, unit, change, className, icon }) {
  const isPositiveChange = change !== undefined && change >= 0;

  return (
    <Card className={cn("health-card p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-1 flex items-baseline">
            <h3 className="text-3xl font-extrabold tracking-tight">{value}</h3>
            {unit && <span className="ml-1 text-sm text-muted-foreground">{unit}</span>}
          </div>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  isPositiveChange
                    ? "text-health-green bg-health-green/10"
                    : "text-health-red bg-health-red/10"
                )}
              >
                {isPositiveChange ? (
                  <ArrowUp className="mr-1" size={12} />
                ) : (
                  <ArrowDown className="mr-1" size={12} />
                )}
                {Math.abs(change)}%
              </span>
              <span className="ml-1 text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        )}
      </div>
    </Card>
  );
}
