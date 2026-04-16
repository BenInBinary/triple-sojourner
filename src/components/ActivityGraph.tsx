import React from 'react';
import { subDays, format, getDay } from 'date-fns';

interface ActivityGraphProps {
  dailyActivity: Record<string, number>;
}

export const ActivityGraph: React.FC<ActivityGraphProps> = ({ dailyActivity }) => {
  // Generate last 180 days array
  const today = new Date();
  const days = Array.from({ length: 180 }, (_, i) => {
    const d = subDays(today, 179 - i);
    return {
      date: format(d, 'yyyy-MM-dd'),
      count: dailyActivity[format(d, 'yyyy-MM-dd')] || 0,
      dayOfWeek: getDay(d)
    };
  });

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-white/5 border-white/5';
    if (count < 3) return 'bg-neon-cyan/20 border-neon-cyan/30';
    if (count < 7) return 'bg-neon-cyan/40 border-neon-cyan/50';
    if (count < 12) return 'bg-neon-cyan/70 border-neon-cyan/80 text-space-950';
    return 'bg-neon-cyan border-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]';
  };

  return (
    <div className="glass-panel p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-neon-cyan blur-[1px]"></span>
        Training Activity
      </h3>
      
      <div className="flex gap-2 text-xs text-slate-400 mb-2">
        <span className="w-6 sm:w-8 invisible">Day</span>
        <span>Past 180 days of activity</span>
      </div>
      
      <div className="flex gap-1 sm:gap-2 overflow-x-auto">
        <div className="flex flex-col gap-[3px] text-[10px] text-slate-500 justify-between py-1 shrink-0">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        
        <div className="grid grid-rows-7 grid-flow-col gap-[2px] sm:gap-1 overflow-x-auto p-1 sm:p-2 -m-1 sm:-m-2 pb-3 mb-[-12px] scrollbar-hide flex-1">
          {days.map((day, index) => {
            const isTopRow = (index % 7) < 4;
            const verticalPosition = isTopRow ? 'top-full mt-2' : 'bottom-full -translate-y-2';
            const horizontalPosition = index >= 150 ? 'right-0' : index <= 30 ? 'left-0' : 'left-1/2 -translate-x-1/2';
            
            return (
              <div
                key={day.date}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] border transition-colors duration-300 hover:scale-125 hover:z-10 relative group ${getIntensityClass(day.count)}`}
              >
                <div className={`absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs whitespace-nowrap px-2 py-1 rounded pointer-events-none z-[100] hidden sm:block ${verticalPosition} ${horizontalPosition}`}>
                  {day.count} questions on {day.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 text-xs mt-4 text-slate-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-white/5"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-neon-cyan/20"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-neon-cyan/40"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-neon-cyan/70"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-neon-cyan shadow-[0_0_5px_rgba(0,240,255,0.5)]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
