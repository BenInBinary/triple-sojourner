import React, { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';
import { format } from 'date-fns';

export interface QuestionHistory {
  attempts: number;
  lastScore: number;
  lowestScore: number;
  lastApproach?: string;
  lastCode?: string;
  lastFeedback?: string;
}

export interface AppState {
  apiKey?: string;
  approvedQuestions: string[];
  history: Record<string, QuestionHistory>; // key: question ID
  dailyActivity: Record<string, number>; // key: YYYY-MM-DD, value: count
}

const defaultState: AppState = {
  approvedQuestions: [],
  history: {},
  dailyActivity: {}
};

interface AppContextType {
  state: AppState;
  setApiKey: (key: string) => Promise<void>;
  submitEvaluation: (questionId: string, score: number, approach?: string, code?: string, feedback?: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      try {
        const saved = await localforage.getItem<AppState>('interview-prep-state');
        if (saved) setState(saved);
      } catch (e) {
        console.error('Failed to load state', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  const saveState = async (newState: AppState) => {
    setState(newState);
    await localforage.setItem('interview-prep-state', newState);
  };

  const setApiKey = async (key: string) => {
    const newState = { ...state, apiKey: key };
    await saveState(newState);
  };

  const submitEvaluation = async (questionId: string, score: number, approach?: string, code?: string, feedback?: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newState = { ...state };

    // Update daily activity
    newState.dailyActivity = {
      ...newState.dailyActivity,
      [today]: (newState.dailyActivity[today] || 0) + 1
    };

    // Update history
    const existing = newState.history[questionId] || { attempts: 0, lastScore: 0, lowestScore: 5 };
    newState.history = {
      ...newState.history,
      [questionId]: {
        attempts: existing.attempts + 1,
        lastScore: score,
        lowestScore: Math.min(existing.lowestScore, score),
        lastApproach: approach,
        lastCode: code,
        lastFeedback: feedback
      }
    };

    // Update approval
    if (score >= 4 && !newState.approvedQuestions.includes(questionId)) {
      newState.approvedQuestions = [...newState.approvedQuestions, questionId];
    }

    await saveState(newState);
  };

  const resetProgress = async () => {
    await saveState(defaultState);
  };

  return (
    <AppContext.Provider value={{ state, setApiKey, submitEvaluation, resetProgress, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
