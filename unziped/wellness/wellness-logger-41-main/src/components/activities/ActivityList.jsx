
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Flame } from 'lucide-react';
import { formatDate } from '@/utils/mockData';

interface ActivityItem {
  id: number;
  activity: string;
  duration: string;
  calories: number;
  timestamp: Date;
}

interface ActivityListProps {
  activities: ActivityItem[];
  className?: string;
}

export function ActivityList({ activities, className }: ActivityListProps) {
  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    const dateKey = activity.timestamp.toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(activity);
    return acc;
  }, {} as Record<string, ActivityItem[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Card className={`health-card p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
      </div>
      
      <div className="space-y-5">
        {sortedDates.map((dateKey) => (
          <div key={dateKey} className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-t border-gray-200 w-full"></div>
              </div>
              <div className="relative flex justify-start">
                <span className="bg-card px-2 text-xs font-medium text-muted-foreground">
                  {new Date(dateKey).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {groupedActivities[dateKey].map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  // Determine the appropriate color for each activity type
  const getActivityColor = (type: string) => {
    const colorMap: Record<string, string> = {
      'Running': 'bg-health-blue text-white',
      'Walking': 'bg-health-green text-white',
      'Cycling': 'bg-health-purple text-white',
      'Swimming': 'bg-health-blue text-white',
      'Strength Training': 'bg-health-orange text-white',
      'Yoga': 'bg-health-green text-white',
      'HIIT': 'bg-health-red text-white',
      'Pilates': 'bg-health-purple text-white',
      'Dancing': 'bg-health-yellow text-white',
      // Default fallback
      'default': 'bg-gray-200 text-gray-700'
    };
    
    return colorMap[type] || colorMap.default;
  };

  return (
    <div className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.activity)}`}>
        {activity.activity.charAt(0)}
      </div>
      
      <div className="ml-3 flex-1">
        <p className="font-medium">{activity.activity}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(activity.timestamp)}
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={14} className="mr-1" />
          {activity.duration}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Flame size={14} className="mr-1" />
          {activity.calories} cal
        </div>
      </div>
    </div>
  );
}
