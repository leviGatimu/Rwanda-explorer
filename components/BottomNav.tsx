import React from 'react';
import { Home, BookOpen, BrainCircuit, Sparkles } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, icon: Home, label: 'Home' },
    { id: Tab.LEARN, icon: BookOpen, label: 'Learn' },
    { id: Tab.QUIZ, icon: BrainCircuit, label: 'Quiz' },
    { id: Tab.AI_TUTOR, icon: Sparkles, label: 'AI Tutor' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 h-20">
      <div className="flex justify-between items-center max-w-md mx-auto h-full pb-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${
              currentTab === item.id 
                ? 'text-rwanda-blue -translate-y-2' 
                : 'text-gray-400 hover:text-rwanda-green'
            }`}
          >
            <div className={`p-2 rounded-full ${currentTab === item.id ? 'bg-blue-50' : 'bg-transparent'}`}>
              <item.icon size={24} strokeWidth={currentTab === item.id ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};