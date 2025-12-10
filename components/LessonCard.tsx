import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => {
  const getIconColor = (category: string) => {
    switch (category) {
      case 'History': return 'text-rwanda-blue';
      case 'Values': return 'text-rwanda-green';
      default: return 'text-rwanda-yellow';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-4 active:scale-95 transition-transform cursor-pointer mb-3"
    >
      <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 ${getIconColor(lesson.category)}`}>
        <PlayCircle size={24} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 leading-tight">{lesson.title}</h3>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">
            {lesson.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{lesson.description}</p>
        <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
          <Clock size={12} />
          <span>{lesson.duration}</span>
        </div>
      </div>
    </div>
  );
};