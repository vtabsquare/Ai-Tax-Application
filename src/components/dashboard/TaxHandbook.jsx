import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Landmark,
  ArrowRight,
  Calculator,
  UserCheck,
  Scale,
  AlertCircle,
  ShieldAlert,
  Wallet,
  Home,
  HeartPulse,
  Heart
} from 'lucide-react';
import { cn } from '../../lib/utils';

const HandbookSection = ({ icon: Icon, title, content, table, variant, accentColor, isDarkMode }) => (
  <div className={cn(
    "space-y-4 p-6 rounded-3xl border transition-all group animate-up",
    isDarkMode ? "bg-white/5 border-white/5 hover:border-white/10" : "bg-slate-950/5 border-slate-950/5 hover:border-slate-950/10",
    accentColor && (isDarkMode ? `border-${accentColor}/20` : `border-${accentColor}/10`)
  )}>
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg",
        accentColor ? `bg-${accentColor} text-white` : "bg-white/10 text-white"
      )}>
        <Icon size={20} />
      </div>
      <h4 className={cn("text-[12px] font-black uppercase tracking-[0.2em] italic", isDarkMode ? "text-white" : "text-slate-950")}>{title}</h4>
    </div>
    
    {content && (
      <div className="space-y-3 pl-2">
        {content.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-start">
             <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", accentColor ? `bg-${accentColor}` : "bg-white/40")} />
             <p className={cn("text-[11px] font-bold leading-relaxed", isDarkMode ? "text-white/60" : "text-slate-950/60")}>{item}</p>
          </div>
        ))}
      </div>
    )}

    {table && (
      <div className={cn("rounded-2xl border overflow-hidden", isDarkMode ? "border-white/10 bg-black/20" : "border-slate-950/10 bg-white shadow-sm")}>
        <table className="w-full text-[10px]">
          <thead className={isDarkMode ? "bg-white/5" : "bg-slate-950/5"}>
            <tr>
              {table.headers.map((h, i) => <th key={i} className={cn("px-4 py-3 text-left font-black uppercase tracking-wider border-b", isDarkMode ? "text-white/40 border-white/10" : "text-slate-950/40 border-slate-950/10")}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={cn("border-b last:border-0 transition-colors", isDarkMode ? "border-white/5 hover:bg-white/5" : "border-slate-950/5 hover:bg-slate-950/5")}>
                {row.map((cell, j) => <td key={j} className={cn("px-4 py-3 font-bold", isDarkMode ? "text-white/80" : "text-slate-950/80")}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const TaxHandbook = ({ isOpen, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('slabs');

  const tabs = [
    { id: 'slabs', label: 'Slabs & Regimes', icon: Calculator, color: 'blue-600' },
    { id: 'catalog', label: 'Section Catalog', icon: ShieldCheck, color: 'emerald-600' },
    { id: 'rules', label: 'Regime Rules', icon: Scale, color: 'indigo-600' },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]"
          />
          
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 300 }}
            className={cn(
              "fixed top-0 right-0 h-full w-full max-w-2xl border-l z-[101] flex flex-col transition-colors duration-500",
              isDarkMode 
                ? "bg-slate-950 border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] text-white" 
                : "bg-slate-50 border-slate-950/10 shadow-[0_0_100px_rgba(0,0,0,0.1)] text-slate-950"
            )}
          >
            {/* Header */}
            <div className={cn("p-6 border-b", isDarkMode ? "border-white/5 bg-white/[0.02]" : "border-slate-950/5 bg-slate-950/[0.02]")}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xl transition-colors", isDarkMode ? "bg-white text-slate-950" : "bg-slate-950 text-white")}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                     <h2 className={cn("text-lg font-black uppercase tracking-tighter leading-none mb-0.5 italic", isDarkMode ? "text-white" : "text-slate-950")}>Institutional <span className={isDarkMode ? "text-white/40 not-italic font-light" : "text-slate-950/40 not-italic font-light"}>Handbook</span></h2>
                     <p className={cn("text-[8px] font-black uppercase tracking-[0.3em]", isDarkMode ? "text-white/30" : "text-slate-950/30")}>Statutory Repository FY 2024–25</p>
                  </div>
                </div>
                <button 
                  onClick={onClose} 
                  className={cn(
                    "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                    isDarkMode ? "bg-white/5 border-white/10 text-white/40 hover:text-white" : "bg-slate-950/5 border-slate-950/10 text-slate-950/40 hover:text-slate-950"
                  )}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className={cn("flex gap-1.5 p-1 rounded-2xl border", isDarkMode ? "bg-black/40 border-white/5" : "bg-slate-950/5 border-slate-950/5")}>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
                        isSelected ? "text-white" : (isDarkMode ? "text-white/30 hover:text-white/60" : "text-slate-950/30 hover:text-slate-950/60")
                      )}
                    >
                      {isSelected && (
                        <motion.div layoutId="activeTab" className={cn("absolute inset-0 z-0", `bg-${tab.color}`)} />
                      )}
                      <div className="relative z-10 flex items-center gap-1.5">
                        <Icon size={12} /> {tab.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className={cn("flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar", isDarkMode ? "bg-gradient-to-b from-transparent to-black/20" : "bg-white")}>
              {activeTab === 'slabs' && (
                <div className="space-y-8 animate-in">
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="blue-600"
                     icon={Zap}
                     title="New Regime (Budget 2025 Revised)"
                     content={[
                       "Standard Deduction: Fixed at ₹75,000 for salaried employees.",
                       "Rebate 87A: Nil tax if total taxable income is up to ₹12,00,000.",
                       "Strategic Slabs: Tax rates move in consistent ₹4 Lakh increments."
                     ]}
                     table={{
                       headers: ["Income Range", "Tax Rate"],
                       rows: [
                         ["Up to ₹4,00,000", "Nil"],
                         ["₹4,00,001 - ₹8,00,000", "5%"],
                         ["₹8,00,001 - ₹12,00,000", "10%"],
                         ["₹12,00,001 - ₹16,00,000", "15%"],
                         ["₹16,00,001 - ₹20,00,000", "20%"],
                         ["₹20,00,001 - ₹24,00,000", "25%"],
                         ["Above ₹24,00,000", "30%"]
                       ]
                     }}
                   />
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="blue-600"
                     icon={UserCheck}
                     title="Old Regime (Legacy Slabs)"
                     content={[
                       "Standard Deduction: Fixed at ₹50,000.",
                       "Rebate 87A: Nil tax if total income is up to ₹5,00,000.",
                       "Exemption limits vary based on the taxpayer's age."
                     ]}
                     table={{
                       headers: ["Age Group", "Nil Tax Limit"],
                       rows: [
                         ["General (Below 60)", "₹2,50,000"],
                         ["Senior (60-80)", "₹3,00,000"],
                         ["Super Senior (80+)", "₹5,00,000"]
                       ]
                     }}
                   />
                </div>
              )}

              {activeTab === 'catalog' && (
                <div className="space-y-8 animate-in">
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="emerald-600"
                     icon={Wallet}
                     title="Life & Savings [80C Portfolio]"
                     content={[
                       "Section 80C: PPF, ELSS, Insurance Premium, Tuition Fees, Home Loan Principal (₹1,50,000).",
                       "80CCD(1B): Bonus deduction for NPS investments over 80C (₹50,000)."
                     ]}
                   />
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="emerald-600"
                     icon={HeartPulse}
                     title="Wellness & Care [Health Suite]"
                     content={[
                       "Section 80D: Medical Insurance Premium (₹25k for self/family, ₹50k for parents).",
                       "80DDB: Treatment for specified diseases (₹40k / ₹1L for Seniors).",
                       "80DD/U: Deduction for disability (₹75k / ₹1.25L based on severity)."
                     ]}
                   />
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="emerald-600"
                     icon={Home}
                     title="Housing & Education [Mortgage Suite]"
                     content={[
                       "Section 24(b): Interest on Self-Occupied Home Loan (Capped at ₹2,00,000).",
                       "80EEA: Additional Interest for First-Time Buyers (₹1,50,000).",
                       "80EE: Legacy Interest Deduction for 2016-17 loans (₹50,000).",
                       "80E: Higher Education Loan Interest (No limit for 8 years)."
                     ]}
                   />
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="emerald-600"
                     icon={Heart}
                     title="Social & Interest [Social Suite]"
                     content={[
                       "Section 80G: Donations to approved institutions (Varies 50% / 100%).",
                       "80GG: Rent Deduction for those without HRA (Capped at ₹60,000).",
                       "80TTA/B: Bank Interest Deduction (₹10,000 / ₹50,000 for Seniors)."
                     ]}
                   />
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-8 animate-in">
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="indigo-600"
                     icon={ShieldAlert}
                     title="Regime Compatibility Matrix"
                     table={{
                       headers: ["Deduction Type", "Old Regime", "New Regime"],
                       rows: [
                         ["Standard Deduction", "Allowed (50k)", "Allowed (75k)"],
                         ["Section 80C / 80D", "Allowed", "Disallowed"],
                         ["Home Loan Int (S.O)", "Allowed", "Disallowed"],
                         ["HRA / LTA / Prof Tax", "Allowed", "Disallowed"],
                         ["Employer NPS (80CCD2)", "Allowed", "Allowed"]
                       ]
                     }}
                   />
                   <HandbookSection 
                     isDarkMode={isDarkMode}
                     accentColor="indigo-600"
                     icon={Scale}
                     title="Strategic Logic"
                     content={[
                       "Optimized Threshold: If your total deductions exceed ₹4,00,000, the Old Regime usually becomes the Best Path.",
                       "Automatic Cess: A mandatory 4% Health & Education Cess is added to all final tax liabilities.",
                       "Neural Synthesis: Our engine automatically runs over 100 permutations to pick your optimal regime."
                     ]}
                   />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={cn("p-5 border-t", isDarkMode ? "border-white/5 bg-white/[0.02]" : "border-slate-950/5 bg-slate-950/[0.02]")}>
               <div className={cn("flex gap-3 items-center mb-4 p-3 rounded-2xl border shadow-sm", isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-950/5 border-slate-950/10")}>
                  <TrendingUp className={isDarkMode ? "text-white" : "text-slate-950"} size={16} />
                  <p className={cn("text-[9px] font-bold leading-relaxed uppercase tracking-wide", isDarkMode ? "text-white/60" : "text-slate-950/60")}>
                     <span className={isDarkMode ? "text-white" : "text-slate-950"}>Neural Optimizer</span>: Picking your optimal regime.
                  </p>
               </div>
               <button onClick={onClose} className={cn(
                 "w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl",
                 isDarkMode ? "bg-white text-slate-950" : "bg-slate-950 text-white"
               )}>
                  Exit Hub <ArrowRight size={16} />
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaxHandbook;
