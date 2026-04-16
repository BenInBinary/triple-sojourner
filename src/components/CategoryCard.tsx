import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Question } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface CategoryCardProps {
  categoryId: string;
  categoryName: string;
  questions: Question[];
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ categoryId, categoryName, questions }) => {
  const { state } = useAppContext();
  
  const approvedCount = questions.filter(q => state.approvedQuestions.includes(q.id)).length;
  const totalCount = questions.length;
  const progressPercent = Math.round((approvedCount / totalCount) * 100) || 0;

  return (
    <NavLink 
      to={`/category/${categoryId}`}
      className="glass-panel p-4 sm:p-6 hover:border-cyan-500/50 hover:bg-white/5 active:bg-white/10 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[140px] sm:min-h-[160px]"
    >
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-neon-cyan/5 rounded-full blur-2xl group-hover:bg-neon-cyan/20 transition-all duration-500"></div>
      
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-200 mb-0.5 sm:mb-1 group-hover:text-neon-cyan transition-colors">{categoryName}</h3>
        <p className="text-xs sm:text-sm text-slate-500">{totalCount} Questions</p>
      </div>

      <div className="mt-4 sm:mt-6 flex items-end justify-between">
        <div className="flex-1 max-w-[70%]">
          <div className="flex justify-between text-xs mb-1.5 sm:mb-2">
            <span className="text-slate-400">Progress</span>
            <span className={progressPercent === 100 ? 'text-neon-cyan font-bold' : 'text-slate-300'}>
              {progressPercent}%
            </span>
          </div>
          <div className="h-1 sm:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan group-hover:text-black transition-all">
          <ChevronRight size={16} />
        </div>
      </div>
    </NavLink>
  );
};
