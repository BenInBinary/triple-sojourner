import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Clock, Award, ChevronDown, ChevronUp, Bot, FileText } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { allQuestions } from '../data';

export const HistoryView: React.FC = () => {
  const { state } = useAppContext();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  
  const attemptedQuestions = allQuestions.filter(q => {
    const hist = state.history[q.id];
    return hist && hist.attempts > 0;
  });

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
      <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6">
        <NavLink 
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors w-max text-sm"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </NavLink>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3 sm:gap-4">
          <Clock className="text-neon-cyan shrink-0" size={24} /> Practice History
        </h1>
        <p className="text-sm sm:text-base text-slate-400">Review your past attempts and focus on improving weak areas.</p>
      </div>

      {attemptedQuestions.length === 0 ? (
        <div className="glass-panel p-8 sm:p-12 text-center flex flex-col items-center border-white/5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Award className="text-slate-600" size={28} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-300">No History Yet</h3>
          <p className="text-sm text-slate-500">Go to the dashboard and start practicing to see your history here.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {attemptedQuestions.map(q => {
            const hist = state.history[q.id];
            const isApproved = state.approvedQuestions.includes(q.id);
            
            return (
              <div key={q.id} className="glass-panel border-white/5 overflow-hidden transition-all duration-300">
                <div 
                  className="p-4 sm:p-6 flex flex-col gap-4 sm:flex-row sm:gap-6 justify-between items-start sm:items-center cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-mono text-neon-purple bg-neon-purple/10 px-2 py-1 rounded inline-block mb-2">
                      {q.categoryName}
                    </span>
                    <h3 className="font-medium text-sm sm:text-base text-slate-200">{q.text}</h3>
                  </div>
                  
                  <div className="flex gap-4 shrink-0 items-center self-end sm:self-auto">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">Attempts</span>
                      <span className="font-mono text-base sm:text-lg">{hist.attempts}</span>
                    </div>
                    <div className="w-px h-8 sm:h-10 bg-white/10 mx-1 sm:mx-2"></div>
                    <div className="flex flex-col items-end mr-2 sm:mr-4">
                      <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">Score</span>
                      <span className={`font-mono text-base sm:text-lg font-bold ${isApproved ? 'text-neon-cyan' : 'text-orange-400'}`}>
                        {hist.lastScore}/5
                      </span>
                    </div>
                    {expandedId === q.id ? <ChevronUp className="text-slate-400" size={18} /> : <ChevronDown className="text-slate-400" size={18} />}
                  </div>
                </div>

                {expandedId === q.id && (
                  <div className="p-4 sm:p-6 border-t border-white/5 bg-black/40 animate-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      {hist.lastApproach && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                            <FileText size={14} /> Your Approach
                          </h4>
                          <p className="p-3 sm:p-4 bg-white/5 rounded-lg text-xs sm:text-sm text-slate-300 italic">
                            {hist.lastApproach}
                          </p>
                        </div>
                      )}

                      {hist.lastCode && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                            <FileText size={14} /> Your Code
                          </h4>
                          <pre className="p-3 sm:p-4 bg-[#0d1117] rounded-lg text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto">
                            {hist.lastCode}
                          </pre>
                        </div>
                      )}

                      {hist.lastFeedback && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-neon-purple mb-2 flex items-center gap-2">
                            <Bot size={14} /> AI Feedback
                          </h4>
                          <div className="p-3 sm:p-4 bg-neon-purple/10 border border-neon-purple/20 rounded-lg text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {hist.lastFeedback}
                          </div>
                        </div>
                      )}

                      {!hist.lastApproach && !hist.lastFeedback && (
                        <p className="text-xs sm:text-sm text-slate-500 text-center py-4">No detailed history recorded for this attempt.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
