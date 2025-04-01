
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface SettingsFormProps {
  activeSection: string;
}

export function SettingsForm({ activeSection }: SettingsFormProps) {
  const [formState, setFormState] = useState({
    // Personal Information
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    age: '32',
    gender: 'male',
    height: '175',
    weight: '75',
    activityLevel: 'active',
    medicalConditions: '',
    
    // Login & Security
    username: 'johndoe',
    password: '••••••••',
    
    // Notifications & Preferences
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    toast.success('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Personal Information */}
      {activeSection === 'personal' && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Manage your personal details and health information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={formState.fullName} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formState.email} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  value={formState.age} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={formState.gender} 
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  name="height" 
                  type="number" 
                  value={formState.height} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  value={formState.weight} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select 
                value={formState.activityLevel} 
                onValueChange={(value) => handleSelectChange('activityLevel', value)}
              >
                <SelectTrigger id="activityLevel">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions (optional)</Label>
              <Textarea 
                id="medicalConditions" 
                name="medicalConditions" 
                placeholder="List any relevant medical conditions or allergies..." 
                value={formState.medicalConditions} 
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
      )}

      {/* Login & Security */}
      {activeSection === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle>Login & Security</CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  value={formState.username} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-4">
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={formState.password} 
                    onChange={handleInputChange} 
                    disabled 
                  />
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
      )}

      {/* Notifications & Preferences */}
      {activeSection === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>Notifications & Preferences</CardTitle>
            <CardDescription>
              Manage how you receive updates and reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates and alerts via email
                  </p>
                </div>
                <Switch 
                  id="emailNotifications"
                  checked={formState.emailNotifications}
                  onCheckedChange={(value) => handleSwitchChange('emailNotifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts on your device
                  </p>
                </div>
                <Switch 
                  id="pushNotifications"
                  checked={formState.pushNotifications}
                  onCheckedChange={(value) => handleSwitchChange('pushNotifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyReports">Weekly Progress Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a summary of your health metrics each week
                  </p>
                </div>
                <Switch 
                  id="weeklyReports"
                  checked={formState.weeklyReports}
                  onCheckedChange={(value) => handleSwitchChange('weeklyReports', value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
      )}

      {/* Data & Privacy */}
      {activeSection === 'data' && (
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>
              Manage your data and privacy preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="pt-4 border-t border-border">
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Permanently delete your account and all associated data
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
