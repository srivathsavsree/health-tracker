
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Activity, Utensils, Moon } from 'lucide-react';

// Sample data for weekly progress
const weeklyProgressData = [
  { day: 'Mon', activity: 65, nutrition: 80, rest: 45 },
  { day: 'Tue', activity: 70, nutrition: 75, rest: 60 },
  { day: 'Wed', activity: 55, nutrition: 85, rest: 75 },
  { day: 'Thu', activity: 80, nutrition: 70, rest: 65 },
  { day: 'Fri', activity: 75, nutrition: 65, rest: 70 },
  { day: 'Sat', activity: 60, nutrition: 90, rest: 80 },
  { day: 'Sun', activity: 50, nutrition: 85, rest: 90 },
];

export function WeeklyProgressGraph() {
  const chartConfig = {
    activity: {
      label: "Activity",
      color: "#FF453A" // health-red
    },
    nutrition: {
      label: "Nutrition",
      color: "#30D158" // health-green
    },
    rest: {
      label: "Rest",
      color: "#0A84FF" // health-blue
    }
  };

  return (
    <Card className="p-6 mb-8 bg-card shadow-lg border border-border/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Weekly Progress</h3>
          <p className="text-sm text-muted-foreground">Your health metrics over the past week</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-health-red" />
            <span className="text-sm font-medium">Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils size={16} className="text-health-green" />
            <span className="text-sm font-medium">Nutrition</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-health-blue" />
            <span className="text-sm font-medium">Rest</span>
          </div>
        </div>
      </div>
      
      <div className="h-72">
        <ChartContainer config={chartConfig} className="h-full">
          <LineChart data={weeklyProgressData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
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
              domain={[0, 100]}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="activity" 
              stroke="#FF453A" 
              strokeWidth={2}
              dot={{ stroke: '#FF453A', strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: '#FF453A', strokeWidth: 2, fill: 'white' }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="nutrition" 
              stroke="#30D158" 
              strokeWidth={2}
              dot={{ stroke: '#30D158', strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: '#30D158', strokeWidth: 2, fill: 'white' }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="rest" 
              stroke="#0A84FF" 
              strokeWidth={2}
              dot={{ stroke: '#0A84FF', strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: '#0A84FF', strokeWidth: 2, fill: 'white' }}
              animationDuration={1500}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
