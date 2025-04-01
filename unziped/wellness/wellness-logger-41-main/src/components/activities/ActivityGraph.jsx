
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityGraphProps {
  data: Array<{
    day: string;
    hours: number;
  }>;
  title?: string;
  className?: string;
}

export function ActivityGraph({ data, title = "Daily Activity", className }: ActivityGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  return (
    <Card className={cn("health-card p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">Hours of activity per day</p>
        </div>
        <Clock className="text-primary" size={20} />
      </div>
      
      <div className="h-64" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '8px'
              }}
              formatter={(value) => [`${value} hours`, 'Activity']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar 
              dataKey="hours" 
              fill="#0A84FF" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
