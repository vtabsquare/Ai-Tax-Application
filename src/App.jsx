import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, Sun, Moon, ReceiptText, BookOpen, ShieldCheck } from 'lucide-react';
import Hero from './components/landing/Hero';
import Overview from './components/dashboard/Overview';
import TaxWizard from './components/wizard/TaxWizard';
import TaxHandbook from './components/dashboard/TaxHandbook';
import { cn } from './lib/utils';

function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('wizard');
  const [taxData, setTaxData] = useState(null);
  const [reportMode, setReportMode] = useState('portfolio');
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bgAura, setBgAura] = useState(isDarkMode ? '#0f172a' : '#f8fafc');

  const themeColors = {
    dark: {
      1: '#0b1121', 2: '#0b1121', 3: '#0b1121', 4: '#0b1121', 5: '#0b1121',
      dashboard: '#0d1117'
    },
    light: {
      1: '#f1f5f9', 2: '#f1f5f9', 3: '#f1f5f9', 4: '#f1f5f9', 5: '#f1f5f9',
      dashboard: '#ffffff'
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    setBgAura(isDarkMode ? '#0f172a' : '#f1f5f9');
  }, [isDarkMode]);

  const startAnalysis = () => {
    setView('app');
    setActiveTab('wizard');
    setBgAura(isDarkMode ? themeColors.dark[1] : themeColors.light[1]);
  };

  const handleWizardStepChange = (stepId) => {
    const palette = isDarkMode ? themeColors.dark : themeColors.light;
    setBgAura(palette[stepId] || palette[1]);
  };

  const handleSynthesisComplete = (data) => {
    setTaxData(data);
    setActiveTab('dashboard');
    setBgAura(isDarkMode ? themeColors.dark.dashboard : themeColors.light.dashboard);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={cn(
      "h-screen w-screen transition-all duration-1000 relative overflow-hidden flex flex-col font-sans selection:bg-primary/20",
      isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-950"
    )}>
      
      {/* Dynamic Atmospheric Canvas */}
      <motion.div 
        animate={{ 
          backgroundColor: bgAura,
          opacity: isDarkMode ? [0.7, 0.85, 0.7] : [0.3, 0.5, 0.3]
        }}
        transition={{ 
          backgroundColor: { duration: 1.2, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "linear" }
        }}
        className="absolute inset-0 z-0 print:hidden"
      />

      {/* Decorative Mesh Gradients */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none print:hidden">
        <div className={cn("absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]", isDarkMode ? "bg-white/10" : "bg-blue-200/40")} />
        <div className={cn("absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]", isDarkMode ? "bg-black/40" : "bg-purple-100/30")} />
      </div>

      <TaxHandbook isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} isDarkMode={isDarkMode} />

      {view === 'landing' ? (
        <div className="relative z-10 flex flex-col h-screen">
           <header className="fixed top-0 left-0 w-full z-50 no-print">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-2xl border border-white/20">
                  <ShieldCheck size={26} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className={cn("text-2xl font-black tracking-tighter uppercase italic leading-none", isDarkMode ? "text-white" : "text-slate-950")}>
                    Tax<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 not-italic">AI</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className={cn(
                  "p-3 rounded-2xl transition-all duration-500 border",
                  isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-slate-950/5 border-slate-950/10 text-slate-950 hover:bg-slate-950/10"
                )}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
             <Hero onGetStarted={startAnalysis} isDarkMode={isDarkMode} />
          </div>
        </div>
      ) : (
        <>
          {/* Glass Header */}
          <header className={cn(
            "fixed top-0 left-0 w-full z-50 border-b backdrop-blur-2xl transition-colors duration-500 print:hidden",
            isDarkMode ? "border-white/5 bg-black/20" : "border-slate-950/5 bg-white/40"
          )}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => { setView('landing'); setActiveTab('wizard'); }}>
                <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <ShieldCheck size={26} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className={cn("text-2xl font-black tracking-tighter uppercase italic leading-none", isDarkMode ? "text-white" : "text-slate-950")}>
                    Tax<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 not-italic">AI</span>
                  </span>
                  <span className={cn("text-[8px] font-black uppercase tracking-[0.4em] italic ml-0.5", isDarkMode ? "text-white/30" : "text-slate-950/30")}>Institutional</span>
                </div>
              </div>
              
              <nav className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className={cn(
                    "p-2.5 rounded-xl transition-all border mx-2",
                    isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-slate-950/5 border-slate-950/10 text-slate-950 hover:bg-slate-950/10"
                  )}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className={cn("w-px h-4 mx-2", isDarkMode ? "bg-white/10" : "bg-slate-950/10")} />
                <button 
                  onClick={() => setIsHandbookOpen(true)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-[10px] font-black uppercase tracking-widest",
                    isDarkMode ? "text-white/60 hover:text-white hover:bg-white/10" : "text-slate-950/60 hover:text-slate-950 hover:bg-slate-950/10"
                  )}
                >
                  <ReceiptText size={14} /> Handbook
                </button>

              </nav>
            </div>
          </header>

          <main className={cn(
            "relative z-10 flex-1 flex flex-col no-scrollbar",
            activeTab === 'wizard' ? "items-center justify-center overflow-hidden" : "overflow-y-auto"
          )}>
            <div className={cn(
              "w-full max-w-7xl mx-auto px-6",
              activeTab === 'wizard' ? "" : "h-full"
            )}>
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div 
                    key="dashboard" 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }} 
                    transition={{ duration: 0.4 }} 
                    className="w-full pt-28"
                  >
                    <Overview 
                      data={taxData} 
                      mode={reportMode} 
                      isDarkMode={isDarkMode}
                      onBack={() => {
                        setActiveTab('wizard');
                        const palette = isDarkMode ? themeColors.dark : themeColors.light;
                        setBgAura(palette[1]);
                      }}
                    />
                  </motion.div>
                )}
                {activeTab === 'wizard' && (
                  <motion.div key="wizard" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.5 }} className="h-full flex flex-col justify-center">
                    <TaxWizard 
                      onComplete={handleSynthesisComplete} 
                      initialData={taxData} 
                      onStepChange={handleWizardStepChange}
                      isDarkMode={isDarkMode}
                    />
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
