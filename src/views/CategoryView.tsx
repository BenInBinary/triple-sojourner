import React from 'react';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import { getQuestionsByCategory } from '../data';
import { useAppContext } from '../contexts/AppContext';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';

export const CategoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAppContext();
  
  const categories = getQuestionsByCategory();
  const questions = id ? categories.get(id) : undefined;
  
  if (!questions) {
    return <Navigate to="/" replace />;
  }

  const categoryName = questions[0].categoryName;

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto w-full">
      <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6">
        <NavLink 
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors w-max text-sm"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </NavLink>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">{categoryName}</h1>
        <p className="text-sm sm:text-base text-slate-400">Master the core concepts from this category to pass the technical round.</p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {questions.map((q, index) => {
          const isApproved = state.approvedQuestions.includes(q.id);
          const history = state.history[q.id];
          const hasAttempted = history && history.attempts > 0;

          return (
            <NavLink 
              key={q.id}
              to={`/question/${q.id}`}
              className={`glass-panel p-4 sm:p-6 transition-all duration-300 flex items-center justify-between group
                ${isApproved ? 'border-neon-cyan/30 bg-neon-cyan/5 hover:bg-neon-cyan/10' : 'hover:border-neon-purple/50 hover:bg-white/5'}
              `}
            >
              <div className="flex gap-3 sm:gap-4 items-center flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {isApproved ? (
                    <CheckCircle2 className="text-neon-cyan" size={20} />
                  ) : hasAttempted ? (
                    <Circle className="text-orange-400" size={20} />
                  ) : (
                    <Circle className="text-slate-600 group-hover:text-neon-purple transition-colors" size={20} />
                  )}
                </div>
                
                <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                  <span className="text-xs text-slate-500 font-mono">Question {index + 1}</span>
                  <p className={`text-sm sm:text-base font-medium truncate sm:whitespace-normal ${isApproved ? 'text-slate-200' : 'text-slate-300 group-hover:text-white transition-colors'}`}>
                    {q.text}
                  </p>
                </div>
              </div>

              <div className="ml-2 sm:ml-4 shrink-0">
                {hasAttempted && !isApproved && (
                  <span className="px-2 sm:px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold whitespace-nowrap">
                    <span className="hidden sm:inline">Last Score: </span>{history.lastScore}/5
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
