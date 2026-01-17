
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CourseCard } from './components/CourseCard';
import { AITutor } from './components/AITutor';
import { Quiz } from './components/Quiz';
import { MODULES, ACHIEVEMENTS } from './constants';
import { Module, UserStats } from './types';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('psychequest_stats');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      completedModules: [],
      badges: []
    };
  });

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    localStorage.setItem('psychequest_stats', JSON.stringify(stats));
    
    // Auto-calculate level based on XP (500 per level)
    const newLevel = Math.floor(stats.xp / 500) + 1;
    if (newLevel > stats.level) {
      setStats(prev => ({ ...prev, level: newLevel }));
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [stats.xp]);

  const handleCompleteQuiz = (xpEarned: number) => {
    if (!selectedModule) return;
    
    setStats(prev => ({
      ...prev,
      xp: prev.xp + xpEarned,
      completedModules: prev.completedModules.includes(selectedModule.id) 
        ? prev.completedModules 
        : [...prev.completedModules, selectedModule.id]
    }));
    
    setIsQuizMode(false);
    setSelectedModule(null);
  };

  return (
    <Layout userStats={{ xp: stats.xp, level: stats.level }}>
      {showLevelUp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-indigo-600 text-white px-8 py-6 rounded-3xl shadow-2xl animate-bounce pointer-events-auto border-4 border-indigo-400">
            <h2 className="text-3xl font-black text-center mb-1">🎉 NÍVEL UP!</h2>
            <p className="text-center font-medium opacity-90">Você agora é Nível {stats.level}</p>
          </div>
        </div>
      )}

      {!selectedModule ? (
        <div className="animate-in fade-in duration-700">
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo à sua jornada</h2>
                <p className="text-slate-500">Escolha um módulo para começar a aprender sobre a mente humana.</p>
              </div>
              <div className="flex gap-2">
                {ACHIEVEMENTS.map(ach => (
                  <div 
                    key={ach.id} 
                    title={ach.title}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border transition-all ${
                      stats.xp >= 1000 || stats.completedModules.length > 0 ? 'bg-white border-indigo-100 grayscale-0' : 'bg-slate-100 border-slate-200 grayscale'
                    }`}
                  >
                    {ach.icon}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MODULES.map(module => (
                <CourseCard 
                  key={module.id} 
                  module={module} 
                  isCompleted={stats.completedModules.includes(module.id)}
                  onSelect={setSelectedModule}
                />
              ))}
            </div>
          </section>

          <section className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Mestre em Neurodivergência?</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Conclua os módulos de TDAH e Autismo para desbloquear o distintivo de Especialista e ganhar bônus de XP diário.
                </p>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-bold uppercase mb-1">Seu Progresso</span>
                    <div className="flex gap-1">
                      {['tdah-deep-dive', 'autism-spectrum'].map(id => (
                        <div key={id} className={`w-12 h-1.5 rounded-full ${stats.completedModules.includes(id) ? 'bg-indigo-500' : 'bg-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-8xl animate-pulse">⚡</div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </section>
        </div>
      ) : isQuizMode ? (
        <Quiz 
          topic={selectedModule.title} 
          xpReward={selectedModule.xpReward}
          onCancel={() => setIsQuizMode(false)}
          onComplete={handleCompleteQuiz}
        />
      ) : (
        <div className="animate-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedModule(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors mb-8 font-medium group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Dashboard
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{selectedModule.icon}</span>
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedModule.category}</span>
                    <h2 className="text-3xl font-bold text-slate-900">{selectedModule.title}</h2>
                  </div>
                </div>
                
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-8">
                  <p className="text-lg">{selectedModule.content}</p>
                  <div className="h-px bg-slate-100 my-8" />
                  <h4 className="font-bold text-slate-900 mb-4">O que você aprenderá neste módulo:</h4>
                  <ul className="space-y-3 list-none p-0">
                    {["Conceitos fundamentais e históricos", "Critérios de diagnóstico baseados no DSM-V", "Estratégias de intervenção clínica", "Ética e empatia no atendimento"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-indigo-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setIsQuizMode(true)}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
                >
                  <span className="text-xl">✍️</span>
                  Iniciar Desafio (Quiz)
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                   Estatísticas do Módulo
                </h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Dificuldade</span>
                     <span className="font-bold text-slate-700">{selectedModule.difficulty}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Tempo Estimado</span>
                     <span className="font-bold text-slate-700">15 min</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500">Prêmio</span>
                     <span className="font-bold text-indigo-600">+{selectedModule.xpReward} XP</span>
                   </div>
                </div>
              </div>

              <AITutor context={selectedModule.content} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
