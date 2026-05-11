import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileDown, 
  ArrowDownLeft, 
  Sparkles, 
  Zap, 
  TrendingDown, 
  Info,
  ChevronRight,
  LayoutGrid,
  BrainCircuit,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { cn } from '../../lib/utils';

const RegimeCard = ({ title, amount, sub, optimized }) => (
  <div className={cn(
    "glass-card p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px] transition-all hover:scale-[1.02]",
    optimized ? "border-primary/20 shadow-lg shadow-primary/5" : "border-border"
  )}>
    <div className="flex justify-between items-start">
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">{title}</span>
      {optimized && (
        <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
           <Zap size={8} fill="currentColor" /> Optimized
        </div>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-black tracking-tighter text-foreground">₹ {amount ? amount.toLocaleString() : '0'}</h3>
      <p className="text-[9px] font-black uppercase tracking-[0.1em] text-primary/80 mt-2">{sub}</p>
    </div>
  </div>
);

const AllocationCard = ({ icon: Icon, title, description }) => {
  const isList = description.includes('1.');
  
  return (
    <div className="glass-card p-5 flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer h-full">
       <div className="flex gap-4 items-start mb-3">
          <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
             <Icon size={24} />
          </div>
          <div className="flex-1">
             <div className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">{title}</div>
             {isList ? (
               <div className="space-y-1 mt-2">
                 {description.split('\n').map((line, i) => (
                   <p key={i} className="text-[10px] font-bold text-foreground leading-tight">
                     {line}
                   </p>
                 ))}
               </div>
             ) : (
               <p className="text-xs font-bold text-foreground leading-tight mt-1">
                 {description}
               </p>
             )}
          </div>
       </div>
       <div className="flex justify-end">
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all">
             <ChevronRight size={16} />
          </div>
       </div>
    </div>
  );
};

const FormalIntelligenceReport = ({ synth, ai, userData }) => (
  <div className="hidden print:block bg-white p-10 font-sans text-black w-full min-h-screen">
    {/* Letterhead Header */}
    <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">Tax<span className="text-teal-600">AI</span> Executive Report</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Financial Year 2024-25 • Institutional Synthesis</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black uppercase">Prepared For: {userData?.name || 'Executive'}</p>
        <p className="text-[10px] text-gray-500">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
      </div>
    </div>

    {/* Verdict Banner */}
    <div className="bg-gray-100 p-4 rounded-lg mb-8 border border-gray-200">
      <p className="text-xs font-black uppercase tracking-widest text-teal-700 mb-1">Executive Intelligence Verdict</p>
      <p className="text-lg font-bold italic leading-tight">"{ai.verdict}"</p>
    </div>

    {/* Financial Comparison Table */}
    <div className="mb-10">
      <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Comparative Analysis</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-y border-gray-300">
            <th className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-wider">Tax Regime Type</th>
            <th className="py-3 px-4 text-right text-[10px] font-black uppercase tracking-wider">Calculated Liability</th>
            <th className="py-3 px-4 text-right text-[10px] font-black uppercase tracking-wider">Efficiency Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-4 text-sm font-bold">Institutional (Old) Regime</td>
            <td className="py-4 px-4 text-right text-sm font-black">₹ {synth.old_regime_tax.toLocaleString()}</td>
            <td className="py-4 px-4 text-right text-[10px] font-bold uppercase text-gray-500">Traditional Path</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-4 text-sm font-bold">Advanced (New) Regime</td>
            <td className="py-4 px-4 text-right text-sm font-black">₹ {synth.new_regime_tax.toLocaleString()}</td>
            <td className="py-4 px-4 text-right text-[10px] font-black uppercase text-teal-600">
               {synth.recommended_regime === "New Regime" ? "● Optimized Path" : ""}
            </td>
          </tr>
          <tr className="bg-teal-50">
            <td className="py-4 px-4 text-sm font-black text-teal-800">Net Retention (Annual Savings)</td>
            <td className="py-4 px-4 text-right text-xl font-black text-teal-800">₹ {synth.net_retention.toLocaleString()}</td>
            <td className="py-4 px-4 text-right text-[10px] font-black uppercase text-teal-800 italic">Target Capital Preservation</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Strategic Recommendations - LARGE TEXT */}
    <div className="grid grid-cols-1 gap-10">
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Institutional (Old) Strategy</h2>
        <div className="bg-white border border-gray-300 p-6 rounded-lg">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Priority Action Checklist:</p>
           <div className="space-y-3">
             {ai.suggestion_old.split('\n').map((line, i) => (
               <div key={i} className="flex gap-4 items-start">
                 <div className="w-5 h-5 rounded border border-black flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i+1}</div>
                 <p className="text-sm font-bold leading-snug">{line.replace(/^\d+\.\s*/, '')}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Advanced (New) Strategy</h2>
        <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg">
           <p className="text-sm font-bold italic leading-relaxed text-gray-800">
             "{ai.suggestion_new}"
           </p>
        </div>
      </section>
    </div>

    {/* Footer Footer */}
    <div className="mt-auto pt-10 border-t border-gray-200">
      <p className="text-[8px] text-gray-400 leading-relaxed max-w-2xl">
        CONFIDENTIAL: This AI-generated synthesis is prepared by TaxAI Neural Engine (Gemini 1.5 Flash). Calculations are based on current FY 2024-25 tax legislation. This document is intended for strategic planning only and does not constitute formal legal or audit certification.
      </p>
    </div>
  </div>
);

const Overview = ({ data: userData, mode, onBack }) => {
  const [exportSuccess, setExportSuccess] = useState(false);

  const synth = userData?.synthesis || {
    old_regime_tax: 125000,
    new_regime_tax: 95000,
    net_retention: 30000,
    recommended_regime: "New Regime",
    deductions_applied: 200000,
    gross_income: 0
  };

  const ai = userData?.ai_insights || {
    verdict: "Optimized strategy identified for current profile.",
    suggestion_old: "1. Maximize Section 80C up to ₹1.5L.\n2. Invest ₹50k in NPS 80CCD(1B).\n3. Claim ₹25k Health Insurance (80D).\n4. Optimize HRA via rent receipts.\n5. Claim Standard Deduction of ₹50k.",
    suggestion_new: "For Advanced (New), leverage the ₹75k Standard Deduction and reinvest your tax savings into ELSS."
  };

  const handleExport = () => {
    window.print();
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <>
      {/* 1. INTERACTIVE DASHBOARD (Visible on screen, Hidden on print) */}
      <div className="h-full flex flex-col justify-center space-y-6 lg:space-y-8 animate-up print:hidden">
        {/* Header */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all active:scale-90"
              title="Back to Inputs"
            >
               <ChevronRight className="rotate-180" size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-4xl font-black tracking-tight text-foreground uppercase italic">Executive <span className="text-primary not-italic">Intelligence</span></h1>
                <div className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-[8px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                  <BrainCircuit size={10} /> AI Synthesis Active
                </div>
              </div>
              <p className="text-muted-foreground font-bold uppercase text-[9px] tracking-widest flex items-center gap-2">
                {ai.verdict} <div className="h-1 w-1 rounded-full bg-border" /> FY 2024–25
              </p>
            </div>
          </div>
          <button 
            onClick={handleExport}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95",
              exportSuccess 
                ? "bg-green-500 text-white shadow-green-500/20" 
                : "bg-primary text-white hover:opacity-90 shadow-primary/20"
            )}
          >
             {exportSuccess ? (
               <><CheckCircle2 size={14} /> Opening Print Engine</>
             ) : (
               <><Printer size={14} /> Export Formal Report</>
             )}
          </button>
        </div>

        <div className="space-y-8 p-1">
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RegimeCard 
              title="Institutional Regime (Old)" 
              amount={synth.old_regime_tax} 
              sub="Traditional Path" 
              optimized={synth.recommended_regime === "Old Regime"}
            />
            <RegimeCard 
              title="Advanced Regime (New)" 
              amount={synth.new_regime_tax} 
              sub="Streamlined Efficiency" 
              optimized={synth.recommended_regime === "New Regime"} 
            />
            <div className="glass-card p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Net Retention</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <ArrowDownLeft size={16} />
                  </div>
              </div>
              <div>
                  <h3 className="text-3xl font-black tracking-tighter text-foreground">₹ {synth.net_retention.toLocaleString()}</h3>
                  <p className="text-[9px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">
                    Annual Capital Preservation.
                  </p>
              </div>
            </div>
          </div>

          {/* AI Dual Strategy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <LayoutGrid size={12} className="text-primary" />
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">AI Dual-Regime Intelligence</h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AllocationCard 
                icon={ShieldCheck}
                title="Institutional (Old) Strategy"
                description={ai.suggestion_old}
              />
              <AllocationCard 
                icon={Rocket}
                title="Advanced (New) Strategy"
                description={ai.suggestion_new}
              />
            </div>
          </div>

          {/* AI Intelligence Disclaimer */}
          <div className="p-6 rounded-[1.5rem] bg-card border border-border flex gap-6 items-center">
            <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-primary shrink-0 animate-pulse">
                <BrainCircuit size={20} />
            </div>
            <div className="max-w-4xl">
                <h5 className="text-[8px] font-black uppercase tracking-[0.2em] text-primary mb-1">TaxAI Neural Engine (Gemini 1.5 Flash)</h5>
                <p className="text-[10px] text-muted-foreground font-bold leading-relaxed">
                  This intelligence synthesis is powered by Google Gemini. The 5-point Institutional checklist is personalized based on current FY 2024-25 tax legislation. For institutional execution, please consult with a certified tax auditor.
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FORMAL REPORT (Hidden on screen, Visible on print) */}
      <FormalIntelligenceReport synth={synth} ai={ai} userData={userData} />
    </>
  );
};

export default Overview;
