import React from 'react';
import { Question } from '../types';
import { CheckCircle, Loader2, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { allQuestions } from '../data';

interface EvaluationPanelProps {
  question: Question;
  userApproach: string;
  userCode: string;
  onApprove: (score: number, feedback?: string, reconstructedApproach?: string) => void;
}

export const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ question, userApproach, userCode, onApprove }) => {
  const [rating, setRating] = React.useState<number>(0);
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [aiFeedback, setAiFeedback] = React.useState<string | null>(null);
  const [reconstructedApproach, setReconstructedApproach] = React.useState(userApproach);
  
  const navigate = useNavigate();
  const { state } = useAppContext();

  React.useEffect(() => {
    const autoEvaluate = async () => {
      if (!state.apiKey) return;
      setIsEvaluating(true);
      
      try {
        const genAI = new GoogleGenerativeAI(state.apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.5-flash",
          generationConfig: { responseMimeType: "application/json" }
        });
        
        const prompt = `
          You are a strict technical interviewer. 

          Question: ${question.text}
          Gold Standard Ideal Answer: ${question.idealAnswer}
          Gold Standard Code (if applicable): ${question.codingExample || 'N/A'}
          
          User's Raw Speech-to-text Explanation: "${userApproach || 'No explanation provided'}"
          User's Code: "${userCode || 'No code provided'}"
          
          The user's explanation was generated via a weak browser Speech-to-Text engine and might contain severe phonetic misinterpretations of programming jargon (e.g. "corn star" instead of "const are", "where" instead of "var", "late" instead of "let").
          
          Step 1: Intelligently reconstruct their intended technical answer by deciphering the speech-to-text transcription errors.
          Step 2: Evaluate their reconstructed answer against the Gold Standard. 
          
          Return a JSON object with EXACTLY three keys: 
          1. "reconstructedAnswer" (string): The cleaned, jargon-fixed version of their explanation.
          2. "score" (integer 1-5): The strict rating.
          3. "feedback" (string): Your technical feedback.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const parsed = JSON.parse(responseText);
        
        if (parsed.reconstructedAnswer) {
          setReconstructedApproach(parsed.reconstructedAnswer);
        }
        setRating(parsed.score || 1);
        setAiFeedback(parsed.feedback || "AI provided no feedback.");
      } catch (e: any) {
        console.error("AI Evaluation failed", e);
        const errorMsg = `AI Evaluation failed: ${e.message || 'Network error or invalid key'}. Please check your API key and connection, or evaluate manually.`;
        setAiFeedback(errorMsg);
        setRating(1); 
      } finally {
        setIsEvaluating(false);
      }
    };
    
    autoEvaluate();
  }, [state.apiKey, question, userApproach, userCode]);

  const handleComplete = () => {
    const finalRating = rating === 0 ? 1 : rating;
    onApprove(finalRating, aiFeedback || "No AI feedback available.", reconstructedApproach);
    
    if (finalRating >= 3) {
      let candidateQuestions = allQuestions.filter(q => 
        q.categoryId === question.categoryId && 
        q.id !== question.id && 
        !state.approvedQuestions.includes(q.id)
      );

      if (candidateQuestions.length === 0) {
        candidateQuestions = allQuestions.filter(q => 
          q.id !== question.id && 
          !state.approvedQuestions.includes(q.id)
        );
      }

      if (candidateQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidateQuestions.length);
        const nextQ = candidateQuestions[randomIndex];
        setTimeout(() => navigate(`/question/${nextQ.id}`), 100);
        return;
      }
    }
    
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in slide-in-from-right fade-in duration-500 max-w-4xl mx-auto w-full">
      {/* User's answer */}
      <div className="glass-panel p-4 sm:p-6 border-white/5 opacity-70">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">Your Answer</div>
          {isEvaluating && <span className="text-xs font-normal text-neon-cyan animate-pulse">AI is cleaning transcription...</span>}
        </h3>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4 sm:mb-6 bg-black/20 p-3 sm:p-4 rounded-lg italic">
          {reconstructedApproach || 'No approach provided.'}
        </p>
        
        {question.requiresCode && (
          <>
            <h4 className="font-semibold text-slate-300 mb-2 text-sm sm:text-base">Your Code</h4>
            <pre className="bg-black/40 p-3 sm:p-4 rounded-lg border border-white/5 overflow-x-auto opacity-70">
              <code className="text-emerald-500 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre">
                {userCode || '// No code provided'}
              </code>
            </pre>
          </>
        )}
      </div>

      {/* Gold standard */}
      <div className="glass-panel p-4 sm:p-6 border-neon-cyan/30">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-neon-cyan">
          <CheckCircle size={20} className="sm:w-6 sm:h-6" /> Gold Standard Answer
        </h3>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4 sm:mb-6 bg-white/5 p-3 sm:p-4 rounded-lg">
          {question.idealAnswer}
        </p>

        <h4 className="font-semibold text-slate-300 mb-2 text-sm sm:text-base">Real-Life Scenario</h4>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 italic border-l-2 border-neon-purple pl-3 sm:pl-4">
          {question.realLifeScenario}
        </p>

        {question.requiresCode && question.codingExample && (
          <>
            <h4 className="font-semibold text-slate-300 mb-2 text-sm sm:text-base">Coding Example</h4>
            <pre className="bg-[#0d1117] p-3 sm:p-4 rounded-lg border border-white/5 overflow-x-auto">
              <code className="text-emerald-400 font-mono text-xs sm:text-sm">
                {question.codingExample}
              </code>
            </pre>
          </>
        )}
      </div>

      {/* Evaluation rubric */}
      <div className="glass-panel p-4 sm:p-6 md:p-8 text-center bg-gradient-to-b from-transparent to-neon-purple/5 relative">
        {state.apiKey && isEvaluating && (
          <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-neon-cyan/30 p-4">
            <Loader2 className="animate-spin text-neon-cyan mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-bold font-mono">Gemini is evaluating...</h3>
            <p className="text-slate-400 mt-2 text-sm">Checking strict alignment with the Gold Standard.</p>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-bold mb-2 flex justify-center items-center gap-2">
          {state.apiKey ? <><Bot className="text-neon-purple" /> AI Evaluation Results</> : 'Self-Evaluation Rubric'}
        </h3>
        <p className="text-slate-400 mb-4 sm:mb-6 max-w-xl mx-auto text-xs sm:text-sm">
          {state.apiKey 
            ? "Gemini has graded your response based on the gold standard. You can override this score if needed."
            : "Compare your answer with the gold standard above. Be completely honest. To approve this question, you must score a 4 or 5."
          }
        </p>

        {aiFeedback && (
          <div className="text-left bg-neon-purple/10 border border-neon-purple/30 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8">
            <h4 className="font-bold text-neon-purple mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Bot size={18} /> API Feedback
            </h4>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{aiFeedback}</p>
          </div>
        )}

        {/* Score buttons */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {[1, 2, 3, 4, 5].map(score => (
            <button
              key={score}
              onClick={() => !isEvaluating && setRating(score)}
              disabled={isEvaluating}
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-300 shadow-lg
                ${isEvaluating ? 'opacity-30 cursor-not-allowed' : ''}
                ${rating === score 
                  ? 'bg-neon-cyan text-black scale-110 shadow-[0_0_20px_rgba(0,240,255,0.6)]' 
                  : 'bg-black/60 border border-white/10 text-slate-400 hover:border-neon-cyan/50 hover:text-neon-cyan'
                }
              `}
            >
              {score}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={handleComplete}
            disabled={isEvaluating}
            className={`glow-btn px-6 sm:px-8 py-3 mx-auto flex items-center gap-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base ${
              isEvaluating 
                ? 'opacity-50 grayscale cursor-not-allowed bg-white/5 text-slate-600'
                : 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105'
            }`}
          >
            {isEvaluating ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />} 
            {isEvaluating ? 'AI is Evaluating...' : 'Complete & Return'}
          </button>
        </div>
      </div>
    </div>
  );
};
