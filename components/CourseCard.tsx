
import React from 'react';
import { Module } from '../types';

interface CourseCardProps {
  module: Module;
  isCompleted: boolean;
  onSelect: (module: Module) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ module, isCompleted, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(module)}
      className={`group relative flex flex-col items-start p-6 rounded-2xl transition-all duration-300 text-left border ${
        isCompleted 
          ? 'bg-emerald-50 border-emerald-100 hover:border-emerald-200' 
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50 hover:-translate-y-1'
      }`}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {module.icon}
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
          module.category === 'Neurodivergência' ? 'bg-purple-100 text-purple-600' : 
          module.category === 'Clínica' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
        }`}>
          {module.category}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
          {module.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">{module.title}</h3>
      <p className="text-sm text-slate-500 mb-6 flex-1">{module.description}</p>
      
      <div className="w-full flex justify-between items-center mt-auto">
        <span className="text-indigo-600 font-bold text-sm">+{module.xpReward} XP</span>
        {isCompleted ? (
          <span className="text-emerald-500 flex items-center gap-1 text-sm font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Completo
          </span>
        ) : (
          <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        )}
      </div>
    </button>
  );
};
