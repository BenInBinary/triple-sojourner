import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, Menu, X } from 'lucide-react';
import { SettingsModal } from './SettingsModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
    ${isActive ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}
  `;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden glass-panel rounded-none border-x-0 border-t-0 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg text-slate-300 hover:text-neon-cyan hover:bg-white/5 transition-all"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold font-outfit tracking-tight neon-text-cyan">
            Triple Sojourner
          </h1>
        </div>
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan"></span>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, shown as drawer when toggled */}
      <aside className={`
        fixed md:relative z-50 md:z-auto
        w-72 md:w-64 glass-panel border-r border-y-0 border-l-0 rounded-none h-full flex flex-col pt-8
        transition-transform duration-300 ease-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="px-6 mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-bold font-outfit tracking-tight neon-text-cyan">
            Triple Sojourner
          </h1>
          <p className="text-xs text-slate-400 font-mono tracking-wider">INTERVIEW AI</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink to="/" className={navLinkClass}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          
          <NavLink to="/history" className={navLinkClass}>
            <BookOpen size={20} />
            <span className="font-medium">Practice History</span>
          </NavLink>
          <button
            onClick={() => { setIsSettingsOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-panel p-4 rounded-xl border-t border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <div className="relative flex h-3 w-3 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
              </div>
              <span className="font-semibold text-neon-cyan drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">Assistant Ready</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">The AI actively listens and transcribes your technical answers via speech recognition.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto pb-12 relative scroll-smooth p-4 sm:p-6 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto flex flex-col h-full">
          {children}
        </div>
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
