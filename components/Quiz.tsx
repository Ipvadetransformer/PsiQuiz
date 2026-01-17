
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

interface QuizProps {
  topic: string;
  onComplete: (xpEarned: number) => void;
  onCancel: () => void;
  xpReward: number;
}

export const Quiz: React.FC<QuizProps> = ({ topic, onComplete, onCancel, xpReward }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await generateQuiz(topic);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [topic]);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const xpFinal = Math.round((score / questions.length) * xpReward);
      onComplete(xpFinal);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="animate-bounce text-6xl">🧠</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
          <p className="text-slate-500 font-medium">Gerando desafios personalizados com IA...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return <div>Falha ao carregar quiz.</div>;

  const current = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200 border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 w-8 rounded-full transition-all duration-500 ${
                i <= currentIndex ? 'bg-indigo-600' : 'bg-slate-100'
              }`} 
            />
          ))}
        </div>
        <span className="text-sm font-bold text-slate-400">{currentIndex + 1}/{questions.length}</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">{current.question}</h2>

      <div className="space-y-3 mb-8">
        {current.options.map((option, idx) => {
          let stateClass = "border-slate-200 hover:border-indigo-300 bg-white";
          if (showExplanation) {
            if (idx === current.correctAnswer) stateClass = "border-emerald-500 bg-emerald-50 text-emerald-700";
            else if (idx === selectedOption) stateClass = "border-rose-500 bg-rose-50 text-rose-700";
            else stateClass = "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
          }

          return (
            <button
              key={idx}
              disabled={showExplanation}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center ${stateClass}`}
            >
              <span>{option}</span>
              {showExplanation && idx === current.correctAnswer && (
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8 text-sm text-slate-600 leading-relaxed italic">
             {current.explanation}
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            {currentIndex === questions.length - 1 ? 'Finalizar e Ganhar XP' : 'Próxima Pergunta'}
          </button>
        </div>
      )}
    </div>
  );
};
