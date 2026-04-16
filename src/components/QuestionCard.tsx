import React, { useState, useCallback } from 'react';
import { Question } from '../types';
import { Play, Mic, Volume2, Send, BookOpen, RefreshCw, SkipForward } from 'lucide-react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { allQuestions } from '../data/index';

interface QuestionCardProps {
  question: Question;
  onSubmit: (approach: string, code: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSubmit }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [approach, setApproach] = useState('');
  const [interimText, setInterimText] = useState('');
  const [code, setCode] = useState('');
  const [isPracticeMode, setIsPracticeMode] = useState(searchParams.get('practice') === 'true');

  React.useEffect(() => {
    setApproach('');
    setCode('');
    setInterimText('');
    setIsPracticeMode(searchParams.get('practice') === 'true');
  }, [question.id, searchParams]);

  // Offline Dictionary for fixing Web Speech API Tech Jargon
  const cleanTranscript = (rawText: string) => {
    let cleaned = rawText;
    const rules = [
      { pattern: /\bwhere\b/gi, replacement: 'var' },
      { pattern: /\bcaused\b/gi, replacement: 'const' },
      { pattern: /\bcost\b/gi, replacement: 'const' },
      { pattern: /\bcorns\b/gi, replacement: 'const' },
      { pattern: /\bconstant\b/gi, replacement: 'const' },
      { pattern: /\blet's\b/gi, replacement: 'let' },
      { pattern: /\blate\b/gi, replacement: 'let' },
      { pattern: /\bhosting\b/gi, replacement: 'hoisting' },
      { pattern: /\bradcliared\b/gi, replacement: 'redeclared' },
      { pattern: /\bread clear\b/gi, replacement: 'redeclare' },
      { pattern: /\bread cleared\b/gi, replacement: 'redeclared' },
      { pattern: /\bre clear\b/gi, replacement: 'redeclare' },
      { pattern: /\bredelair\b/gi, replacement: 'redeclare' },
      { pattern: /\bdegree assigning\b/gi, replacement: 'reassigning' },
      { pattern: /\bdegree signing\b/gi, replacement: 'reassigning' },
      { pattern: /\breasine\b/gi, replacement: 'reassign' },
      { pattern: /\bcorn star\b/gi, replacement: 'const are' },
      { pattern: /\bblock this court\b/gi, replacement: 'block scoped' },
      { pattern: /\bblock stop\b/gi, replacement: 'block scoped' },
      { pattern: /\bfor each\b/gi, replacement: 'forEach' },
      { pattern: /\basynchronous await\b/gi, replacement: 'async await' },
      { pattern: /\bcall back\b/gi, replacement: 'callback' },
      { pattern: /\bsync weight\b/gi, replacement: 'async await' }
    ];

    rules.forEach(rule => {
      cleaned = cleaned.replace(rule.pattern, rule.replacement);
    });
    return cleaned;
  };

  const handleTranscript = useCallback((finalText: string, interimText: string) => {
    if (finalText) {
      setApproach(prev => cleanTranscript(prev + finalText));
    }
    setInterimText(interimText);
  }, []);

  const { isListening, isSpeaking, stopSession } = useVoiceSession({
    questionText: question.text,
    onTranscriptUpdate: handleTranscript,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!approach.trim() && !code.trim()) return;
    stopSession();
    onSubmit(approach, code);
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom flex-1 fade-in duration-500">
      {/* Top toolbar */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <NavLink 
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors text-sm"
        >
          <Play size={16} /> Dashboard
        </NavLink>
        
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button 
            type="button"
            onClick={() => {
              const newMode = !isPracticeMode;
              setIsPracticeMode(newMode);
              if (!newMode) {
                navigate(`/question/${question.id}`);
              } else {
                navigate(`/question/${question.id}?practice=true`);
              }
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-lg ${isPracticeMode ? 'bg-neon-cyan text-black shadow-neon-cyan/20' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            <BookOpen size={14} /> {isPracticeMode ? 'Practice Mode Active' : 'Peek Solution'}
          </button>
          <div className="hidden md:block px-3 py-1 rounded bg-white/5 text-xs text-slate-300 font-mono">
            {question.categoryName}
          </div>
        </div>
      </div>

      {/* Question panel */}
      <div className="glass-panel p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 relative overflow-hidden flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
        <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan"></div>
        
        <div className="flex-1 pl-3 sm:pl-0">
          <p className="text-xs text-slate-500 font-mono mb-1 md:hidden">{question.categoryName}</p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed">{question.text}</h2>
        </div>
        
        <div className="flex bg-black/40 rounded-full p-1.5 sm:p-2 border border-white/5 gap-1.5 sm:gap-2 shrink-0 items-center self-end sm:self-auto">
          <div className={`p-2 sm:p-3 rounded-full flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'bg-neon-purple/20 text-neon-purple shadow-[0_0_15px_rgba(138,43,226,0.3)]' : 'text-slate-600'}`} title="AI Speaking">
            <Volume2 size={20} className={isSpeaking ? "animate-pulse" : ""} />
          </div>
          <div className={`p-2 sm:p-3 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-neon-cyan/20 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-slate-600'}`} title="AI Listening">
            {isListening ? (
              <div className="flex items-center gap-1 sm:gap-1.5 h-5 sm:h-6">
                <span className="w-1 sm:w-1.5 h-2/3 bg-neon-cyan rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                <span className="w-1 sm:w-1.5 h-full bg-neon-cyan rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                <span className="w-1 sm:w-1.5 h-1/2 bg-neon-cyan rounded-full animate-[bounce_1s_infinite_400ms]"></span>
                <span className="w-1 sm:w-1.5 h-3/4 bg-neon-cyan rounded-full animate-[bounce_1s_infinite_600ms]"></span>
              </div>
            ) : (
              <Mic size={20} />
            )}
          </div>
        </div>
      </div>

      {/* Answer form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 sm:gap-6">
        <div className="glass-panel p-4 sm:p-6 border-white/5 space-y-4 sm:space-y-6 flex-1 flex flex-col min-h-0">
          
          {isPracticeMode && (
            <div className="p-3 sm:p-4 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 animate-in fade-in slide-in-from-top-4">
              <div className="text-xs text-neon-cyan font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={14} /> Practice Reference Answer
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-neon-cyan pl-3">
                {question.idealAnswer}
              </p>
            </div>
          )}

          <div className="flex flex-col flex-1 min-h-[150px] sm:min-h-[200px] relative mt-2 sm:mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider flex justify-between items-center w-full">
                Your Approach
                {isListening && (
                  <span className="text-neon-cyan flex items-center gap-2 text-xs normalcase font-medium animate-pulse lowercase">
                     Live dictation tracking...
                  </span>
                )}
              </h3>
            </div>
            <textarea
              value={approach + (interimText ? (approach.endsWith(' ') ? '' : ' ') + interimText : '')}
              onChange={(e) => setApproach(e.target.value)}
              disabled={isListening}
              placeholder="Dictate into the microphone or type your explanation here..."
              className={`w-full flex-1 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 outline-none resize-none transition-all text-sm sm:text-base ${isListening ? 'opacity-80 cursor-default shadow-[inset_0_0_20px_rgba(0,240,255,0.05)] border-neon-cyan/30' : ''}`}
            />
          </div>
        </div>

        {question.requiresCode && (
          <div className="flex flex-col flex-1 gap-2 mt-2 sm:mt-4">
            <label className="text-sm font-medium text-slate-300">Code Solution</label>
            
            {isPracticeMode && question.codingExample && (
              <div className="mb-2 animate-in fade-in slide-in-from-top-4">
                <div className="text-xs text-neon-cyan mb-1 flex items-center gap-2 uppercase tracking-wider font-bold">
                  <BookOpen size={12}/> Reference Code
                </div>
                <pre className="w-full flex-1 p-3 sm:p-4 font-mono text-xs sm:text-sm rounded-xl bg-black/60 border border-neon-cyan/30 text-emerald-400/70 overflow-x-auto">
                  {question.codingExample}
                </pre>
              </div>
            )}

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 min-h-[150px] sm:min-h-[200px] p-3 sm:p-4 font-mono text-xs sm:text-sm rounded-xl bg-[#0d1117] border border-white/10 focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 outline-none text-emerald-400 resize-none transition-all placeholder:text-slate-700"
              placeholder="// Write your code here..."
              spellCheck="false"
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-2 sm:pt-4 pb-4 sm:pb-8">
          {isPracticeMode && (
            <button 
              type="button"
              onClick={() => {
                const sameCategory = allQuestions.filter(q => q.categoryId === question.categoryId);
                let nextQ;
                
                if (sameCategory.length > 1) {
                  const currentIndex = sameCategory.findIndex(q => q.id === question.id);
                  nextQ = sameCategory[(currentIndex + 1) % sameCategory.length];
                } else {
                  const currentIndex = allQuestions.findIndex(q => q.id === question.id);
                  nextQ = allQuestions[(currentIndex + 1) % allQuestions.length];
                }
                
                if (nextQ) {
                  navigate(`/question/${nextQ.id}?practice=true`);
                }
              }}
              className="glow-btn px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-sm sm:text-base"
            >
              <SkipForward size={18} /> Next Question
            </button>
          )}
          <button
            type={isPracticeMode ? "button" : "submit"}
            onClick={isPracticeMode ? () => {
              setIsPracticeMode(false);
              setApproach('');
              setCode('');
              navigate(`/question/${question.id}`);
            } : undefined}
            disabled={!isPracticeMode && (!approach.trim() && (!question.requiresCode || !code.trim()))}
            className={`glow-btn px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base ${isPracticeMode ? 'bg-orange-500 hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : ''}`}
          >
            {isPracticeMode ? (
              <><RefreshCw size={18} /> Clear & Try for Real</>
            ) : (
              <><Send size={18} /> Submit for Evaluation</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
