import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, Sun, Moon, LayoutGrid, PieChart, BookOpen } from 'lucide-react';
import Hero from './components/landing/Hero';
import Overview from './components/dashboard/Overview';
import TaxWizard from './components/wizard/TaxWizard';
import TaxHandbook from './components/dashboard/TaxHandbook';
import { cn } from './lib/utils';

function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('wizard');
  const [taxData, setTaxData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [reportMode, setReportMode] = useState('portfolio');
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);

  // Synchronize theme with document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const startAnalysis = () => {
    setView('app');
    setActiveTab('wizard');
  };

  const handleWizardComplete = (data) => {
    setTaxData(data);
    setActiveTab('dashboard');
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden flex flex-col font-sans selection:bg-primary/20">
      
      <TaxHandbook isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} />

      {view === 'landing' ? (
        <>
          <nav className="shrink-0 w-full h-24 flex items-center">
             <div className="max-w-7xl mx-auto w-full px-10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                     <Sparkles size={22} color="white" fill="white" />
                   </div>
                   <span className="font-black text-3xl tracking-tighter uppercase">Tax<span className="text-primary">AI</span></span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                     onClick={() => setIsHandbookOpen(true)}
                     className="px-4 py-2 rounded-xl bg-card border border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
                  >
                     <BookOpen size={14} /> Handbook
                  </button>
                  <button 
                     onClick={() => setIsDarkMode(!isDarkMode)} 
                     className="p-3 rounded-2xl bg-card border border-border text-muted-foreground hover:text-foreground transition-all shadow-sm"
                  >
                     {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                  </button>
                </div>
             </div>
          </nav>
          <div className="flex-1 flex flex-col justify-center overflow-hidden pb-12">
             <Hero onGetStarted={startAnalysis} isDarkMode={isDarkMode} />
          </div>
        </>
      ) : (
        <>
          <header className="shrink-0 h-20 border-b border-border bg-card/80 backdrop-blur-xl px-8 flex items-center justify-between z-50 transition-all">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/10">
                   <Sparkles size={22} color="white" fill="white" />
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">Tax<span className="text-primary">AI</span></span>
             </div>

             <div className="flex items-center gap-4">
                <button 
                   onClick={() => setIsHandbookOpen(true)}
                   className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
                >
                   <BookOpen size={14} /> Handbook
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors shadow-sm">
                   {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
                   <User size={20} />
                </div>
             </div>
          </header>

          <main className="flex-1 overflow-hidden relative">
            <div className="h-full w-full max-w-7xl mx-auto p-6 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div key="dashboard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="h-full flex flex-col justify-center">
                    <Overview 
                      data={taxData} 
                      mode={reportMode} 
                      onBack={() => setActiveTab('wizard')}
                    />
                  </motion.div>
                )}
                {activeTab === 'wizard' && (
                  <motion.div key="wizard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="h-full flex flex-col justify-center">
                    <TaxWizard onComplete={handleWizardComplete} initialData={taxData} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
