
import React, { useState } from 'react';
import { getAIFeedback } from '../services/geminiService';

interface AITutorProps {
  context: string;
}

export const AITutor: React.FC<AITutorProps> = ({ context }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    try {
      const feedback = await getAIFeedback(query, context);
      setResponse(feedback);
    } catch (err) {
      setResponse("Erro ao conectar com o tutor. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg shadow-md">🤖</div>
        <div>
          <h4 className="font-bold text-slate-900">Tutor AI Especialista</h4>
          <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider">Disponível agora</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tire suas dúvidas sobre este tema..."
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none pr-12 transition-all"
        />
        <button 
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </form>

      {response && (
        <div className="bg-white rounded-xl p-4 border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};
