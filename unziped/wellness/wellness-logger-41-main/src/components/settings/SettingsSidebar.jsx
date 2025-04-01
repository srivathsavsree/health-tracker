
import React from 'react';
import { User, Lock, Bell, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function SettingsSidebar({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'personal', name: 'Personal Information', icon: <User size={18} /> },
    { id: 'security', name: 'Login & Security', icon: <Lock size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'data', name: 'Data & Privacy', icon: <Database size={18} /> },
  ];

  return (
    <Card className="p-4 sticky top-24">
      <nav className="flex flex-col space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
              ${activeSection === section.id 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-secondary text-foreground'}
            `}
          >
            {section.icon}
            {section.name}
          </button>
        ))}
      </nav>
    </Card>
  );
}
