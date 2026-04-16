import React from 'react';
import { getQuestionsByCategory, allQuestions } from '../data/index';
import { CategoryCard } from './CategoryCard';
import { ActivityGraph } from './ActivityGraph';
import { MorePracticeList } from './MorePracticeList';
import { useAppContext } from '../contexts/AppContext';

export const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const categories = getQuestionsByCategory();
  
  const totalApproved = state.approvedQuestions.length;
  const totalQuestions = allQuestions.length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-1 sm:mb-2">Welcome Back.</h1>
          <p className="text-sm sm:text-base text-slate-400">Continue your path to technical mastery.</p>
        </div>
        <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-slate-500 sm:mb-1">Overall Mastery</div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-neon-cyan">
            {totalApproved} <span className="text-base sm:text-lg text-slate-500 font-sans">/ {totalQuestions}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <ActivityGraph dailyActivity={state.dailyActivity} />
        </div>
        <div className="lg:col-span-1">
          <MorePracticeList questions={allQuestions} />
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <span className="w-1.5 h-5 sm:h-6 bg-neon-purple rounded-full inline-block"></span>
          Knowledge Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Array.from(categories.entries()).map(([categoryId, questions]) => (
            <CategoryCard 
              key={categoryId}
              categoryId={categoryId}
              categoryName={questions[0].categoryName}
              questions={questions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
