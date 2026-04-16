import React from 'react';
import { NavLink } from 'react-router-dom';
import { AlertCircle, Target, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface MorePracticeListProps {
  questions: Question[];
}

export const MorePracticeList: React.FC<MorePracticeListProps> = ({ questions }) => {
  const { state } = useAppContext();

  // Find questions with score < 4 and attempts > 0
  const strugglingQuestions = questions.filter(q => {
    const hist = state.history[q.id];
    return hist && hist.attempts > 0 && hist.lastScore < 4;
  });

  if (strugglingQuestions.length === 0) {
    return (
      <div className="glass-panel p-4 sm:p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px] sm:min-h-[200px]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center mb-3 sm:mb-4">
          <Target className="text-neon-cyan" size={20} />
        </div>
        <h3 className="font-semibold text-base sm:text-lg mb-1">You're doing great!</h3>
        <p className="text-xs sm:text-sm text-slate-400">No questions require immediate attention.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 sm:p-6 flex flex-col h-full max-h-[350px] sm:max-h-[400px]">
      <div className="flex items-center gap-2 mb-4 sm:mb-6 text-orange-400">
        <AlertCircle size={18} />
        <h3 className="text-base sm:text-lg font-semibold">More Practice Needed</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-2 sm:space-y-3">
        {strugglingQuestions.slice(0, 10).map(q => {
          const hist = state.history[q.id];
          return (
            <div key={q.id} className="p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/50 text-slate-300 truncate">
                  {q.categoryName}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-orange-500/10 text-orange-400 whitespace-nowrap shrink-0">
                  {hist.lastScore}/5
                </span>
              </div>
              <p className="text-xs sm:text-sm line-clamp-2 text-slate-200 mb-2 sm:mb-3">{q.text}</p>
              
              <NavLink 
                to={`/question/${q.id}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-neon-cyan hover:text-white transition-colors"
              >
                Retry <ArrowRight size={12} />
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
