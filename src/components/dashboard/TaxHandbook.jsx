import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Landmark,
  CircleHelp,
  ArrowRight,
  Calculator,
  UserCheck,
  Scale,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

const HandbookSection = ({ icon: Icon, title, content, table, variant }) => (
  <div className={cn(
    "space-y-4 p-5 rounded-2xl border transition-all group animate-up",
    variant === 'highlight' 
      ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/5" 
      : "bg-muted/50 border-border hover:border-primary/20"
  )}>
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
        variant === 'highlight' ? "bg-primary text-white" : "bg-primary/10 text-primary"
      )}>
        <Icon size={18} />
      </div>
      <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground">{title}</h4>
    </div>
    
    {content && (
      <div className="space-y-2.5">
        {content.map((item, idx) => (
          <div key={idx} className="flex gap-2.5 items-start">
             <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", variant === 'highlight' ? "bg-primary" : "bg-primary/60")} />
             <p className="text-[10px] text-muted-foreground font-bold leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    )}

    {table && (
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-[9px]">
          <thead className="bg-muted">
            <tr>
              {table.headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-black uppercase tracking-wider text-muted-foreground border-b border-border">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                {row.map((cell, j) => <td key={j} className="px-3 py-2 font-bold text-foreground">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const TaxHandbook = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('slabs');

  const tabs = [
    { id: 'slabs', label: 'Slabs & Ages', icon: Calculator },
    { id: 'deductions', label: 'Deductions', icon: ShieldCheck },
    { id: 'rules', label: 'Regime Rules', icon: Scale },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-card border-l border-border z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-border bg-muted/20">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <BookOpen size={24} />
                  </div>
                  <div>
                     <h2 className="text-xl font-black uppercase tracking-tighter text-foreground leading-none mb-1">Tax Intelligence <span className="text-primary italic">Handbook</span></h2>
                     <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Institutional Repository FY 2024–25</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-muted border border-border hover:bg-card transition-all text-muted-foreground hover:text-foreground">
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1 bg-muted rounded-2xl border border-border">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                        activeTab === tab.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon size={14} /> {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {activeTab === 'slabs' && (
                <div className="space-y-6 animate-in">
                   <HandbookSection 
                     icon={Zap}
                     title="New Regime (Default Optimization)"
                     content={["FY 2024-25 Revised Slabs. Applicable to all individuals regardless of age."]}
                     table={{
                       headers: ["Income Range", "Tax Rate"],
                       rows: [
                         ["Up to ₹3,00,000", "Nil"],
                         ["₹3,00,001 - ₹6,00,000", "5%"],
                         ["₹6,00,001 - ₹9,00,000", "10%"],
                         ["₹9,00,001 - ₹12,00,000", "15%"],
                         ["₹12,00,001 - ₹15,00,000", "20%"],
                         ["Above ₹15,00,000", "30%"]
                       ]
                     }}
                   />
                   <HandbookSection 
                     icon={UserCheck}
                     title="Old Regime (Institutional Slabs)"
                     content={["Requires deductions to be lucrative. Slabs vary by age group."]}
                     table={{
                       headers: ["Age Group", "Nil Tax Limit"],
                       rows: [
                         ["Individual (Below 60)", "₹2,50,000"],
                         ["Senior (60-80)", "₹3,00,000"],
                         ["Super Senior (80+)", "₹5,00,000"]
                       ]
                     }}
                   />
                </div>
              )}

              {activeTab === 'deductions' && (
                <div className="space-y-6 animate-in">
                   <HandbookSection 
                     icon={ShieldCheck}
                     title="The 80 Series (Old Regime Only)"
                     content={[
                       "80C: PPF, ELSS, EPF, LIC, Home Loan Principal. Limit: ₹1,50,000.",
                       "80D: Medical Insurance. Self/Family: ₹25k. Parents: ₹25k (₹50k if Senior).",
                       "80CCD(1B): NPS Additional Benefit. Limit: ₹50,000 (Over 80C).",
                       "80E: Education Loan Interest. No upper limit for 8 years.",
                       "80TTA: Savings Interest up to ₹10k. (80TTB for Seniors up to ₹50k)."
                     ]}
                   />
                   <HandbookSection 
                     icon={Landmark}
                     title="Exemptions & Allowances"
                     content={[
                       "Standard Deduction: ₹75,000 (New) / ₹50,000 (Old).",
                       "HRA: Minimum of (Actual HRA, Rent-10% Basic, 50% Basic in Metros).",
                       "LTA: Exemption on domestic travel twice in a block of 4 years."
                     ]}
                   />
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-6 animate-in">
                   <HandbookSection 
                     variant="highlight"
                     icon={AlertCircle}
                     title="Statutory Levies: The 4% Cess"
                     content={[
                       "Health & Education Cess: A mandatory 4% levy added to your total tax liability.",
                       "Tax on Tax: This is calculated on the tax amount, not on your income.",
                       "Universal Application: This applies to both Old and New regimes for all citizens."
                     ]}
                   />
                   <HandbookSection 
                     icon={Scale}
                     title="Optimization Intelligence"
                     content={[
                       "Section 87A Rebate: Net tax is Nil if income ≤ ₹7L (New) or ₹5L (Old).",
                       "Choosing New: Best if deductions are below ₹3,75,000.",
                       "Choosing Old: High-HRA or large Home Loan interest holders benefit more.",
                       "Surcharge: 10% (Income > 50L), 15% (> 1Cr), up to 25% (New) or 37% (Old)."
                     ]}
                   />
                   <HandbookSection 
                     icon={CircleHelp}
                     title="Taxable vs Non-Taxable"
                     table={{
                       headers: ["Component", "Taxability Status"],
                       rows: [
                         ["Basic Salary", "Fully Taxable"],
                         ["Bonus / Commission", "Fully Taxable"],
                         ["HRA / LTA", "Partially Exempt (Old)"],
                         ["Professional Tax", "Deductible (Old)"],
                         ["EPF Interest > 2.5L", "Taxable"]
                       ]
                     }}
                   />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-border bg-muted/20">
               <div className="flex gap-4 items-center mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <TrendingUp className="text-primary shrink-0" size={20} />
                  <p className="text-[10px] font-bold text-muted-foreground leading-snug">
                     <span className="text-primary">Pro Optimization</span>: Switching to the New Regime is now the default for most taxpayers earning up to ₹15L.
                  </p>
               </div>
               <button onClick={onClose} className="w-full py-5 rounded-2xl bg-foreground text-background text-[11px] font-black uppercase tracking-[0.4em] hover:opacity-90 transition-all flex items-center justify-center gap-3">
                  Close Intelligence Hub <ArrowRight size={16} />
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaxHandbook;
