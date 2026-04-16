// Removed unused React import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';

import { QuestionView } from './views/QuestionView';
import { CategoryView } from './views/CategoryView';
import { HistoryView } from './views/HistoryView';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-space-950 text-slate-200 font-sans selection:bg-neon-cyan/30">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<HistoryView />} />
              <Route path="/category/:id" element={<CategoryView />} />
              <Route path="/question/:id" element={<QuestionView />} />
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
