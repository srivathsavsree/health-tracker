
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mealSuggestions, commonNutritionQuestions, weeklyNutritionData } from '@/utils/dietData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Bot, Sparkles, ChefHat, ArrowRight, SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function NutritionInsights() {
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle>Nutrition Insights</CardTitle>
        <CardDescription>Personalized analytics and suggestions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="suggestions">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b h-12">
            <TabsTrigger value="suggestions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              <ChefHat className="h-4 w-4 mr-2" />
              Meal Plan
            </TabsTrigger>
            <TabsTrigger value="trends" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              <Sparkles className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              <Bot className="h-4 w-4 mr-2" />
              Nutrition AI
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestions" className="pt-4 px-6 pb-6">
            <MealSuggestions />
          </TabsContent>
          
          <TabsContent value="trends" className="pt-4 px-6 pb-6">
            <NutritionTrends />
          </TabsContent>
          
          <TabsContent value="chatbot" className="pt-4 px-6 pb-6">
            <NutritionChatbot />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MealSuggestions() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Based on your goals and recent activity, here are personalized meal suggestions:
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {mealSuggestions.map((meal) => (
          <div key={meal.id} className="p-3 rounded-lg border bg-card/50">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium">{meal.meal}</h4>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {meal.calories} cal
              </span>
            </div>
            <p className="text-sm mt-1">{meal.suggestion}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {meal.benefits.map((benefit, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4 group">
        View Full Meal Plan
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

function NutritionTrends() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Your nutrition trends for the past week:
      </p>
      
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyNutritionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '8px'
              }}
            />
            <Legend />
            <Bar 
              name="Calories (÷10)"
              dataKey={(data) => data.calories / 10} 
              fill="#0A84FF" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Protein (g)"
              dataKey="protein" 
              fill="#30D158" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Carbs (g)"
              dataKey="carbs" 
              fill="#FF9F0A" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-sm font-medium mt-4">Insights:</p>
      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
        <li>Your protein intake is consistently meeting your daily goals</li>
        <li>Your calorie intake varies significantly on weekends</li>
        <li>Consider balancing your carbohydrate intake throughout the week</li>
      </ul>
    </div>
  );
}

function NutritionChatbot() {
  const [query, setQuery] = useState('');
  
  const handleSend = () => {
    if (!query.trim()) return;
    
    toast.info("AI nutritionist feature coming soon!");
    setQuery('');
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Ask our AI nutritionist about diet plans, food choices, or nutrition advice.
      </p>
      
      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <p className="text-sm font-medium">Popular questions:</p>
        <div className="flex flex-wrap gap-2">
          {commonNutritionQuestions.map((question, index) => (
            <button
              key={index}
              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              onClick={() => setQuery(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about nutrition..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} type="submit">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Powered by AI for personalized nutrition guidance
        </p>
      </div>
    </div>
  );
}
