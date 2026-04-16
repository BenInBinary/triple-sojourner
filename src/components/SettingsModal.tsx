import React, { useState } from 'react';
import { X, Key, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { state, setApiKey } = useAppContext();
  const [apiKeyInput, setApiKeyInput] = useState(state.apiKey || '');

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(apiKeyInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel p-8 max-w-md w-full relative shadow-2xl shadow-neon-cyan/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-neon-cyan/10 rounded-xl text-neon-cyan">
            <Key size={24} />
          </div>
          <h2 className="text-2xl font-bold">API Settings</h2>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex gap-3 text-sm text-slate-300">
            <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
            <p>Your API key is stored securely in your browser's local storage. It is never sent to any server other than directly to Google's API.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Gemini API Key</label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 outline-none text-slate-200"
            />
            <p className="text-xs text-slate-500 mt-1">
              Required for automated answer evaluation and feedback.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium text-slate-300 hover:text-white transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2 rounded-lg font-medium bg-neon-cyan text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
