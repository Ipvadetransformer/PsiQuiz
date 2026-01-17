
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  userStats: { xp: number; level: number };
}

export const Layout: React.FC<LayoutProps> = ({ children, userStats }) => {
  const progressToNextLevel = (userStats.xp % 500) / 5;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-200">
            Ψ
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">PsycheQuest</h1>
            <p className="text-xs text-slate-500 font-medium">Jornada do Conhecimento</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-700">Nível {userStats.level}</span>
            <div className="w-32 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="text-amber-500 font-bold">✨</span>
            <span className="text-amber-700 font-bold text-sm">{userStats.xp} XP</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-slate-400 text-sm">
        &copy; 2024 PsycheQuest. Powered by Gemini AI.
      </footer>
    </div>
  );
};
