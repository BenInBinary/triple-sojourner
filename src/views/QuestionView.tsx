import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { allQuestions } from '../data/index';
import { QuestionCard } from '../components/QuestionCard';
import { EvaluationPanel } from '../components/EvaluationPanel';
import { useAppContext } from '../contexts/AppContext';

export const QuestionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { submitEvaluation, state } = useAppContext();
  
  const [approach, setApproach] = useState('');
  const [code, setCode] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const question = allQuestions.find(q => q.id === id);

  useEffect(() => {
    // Hydrate state from previous attempts if available
    if (id && state.history[id]) {
      const hist = state.history[id];
      setApproach(hist.lastApproach || '');
      setCode(hist.lastCode || '');
    } else {
      setApproach('');
      setCode('');
    }
    setIsEvaluating(false);
  }, [id, state.history]);

  if (!question) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (userApproach: string, userCode: string) => {
    setApproach(userApproach);
    setCode(userCode);
    setIsEvaluating(true);
  };

  const handleApprove = async (score: number, feedback?: string, updatedApproach?: string) => {
    await submitEvaluation(question.id, score, updatedApproach || approach, code, feedback);
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col min-h-[calc(100vh-8rem)]">
      {!isEvaluating ? (
        <QuestionCard 
          question={question} 
          onSubmit={handleSubmit} 
        />
      ) : (
        <EvaluationPanel 
          question={question}
          userApproach={approach}
          userCode={code}
          onApprove={handleApprove}
        />
      )}
    </div>
  );
};
