import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit,
  LayoutGrid,
  Home,
  ArrowDownLeft, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Rocket,
  CheckCircle2,
  Printer,
  ChevronLeft,
  Crown,
  Target,
  CircleDollarSign,
  Wallet,
  HeartPulse,
  GraduationCap,
  Heart,
  TrendingDown,
  Info,
  ArrowRight,
  Gem,
  Lightbulb,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const MetricCard = ({ title, amount, sub, optimized, color, isDarkMode }) => (
  <div className={cn(
    "p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col transition-all hover:translate-y-[-4px] shadow-2xl border",
    isDarkMode ? "bg-[#020617] border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.4)]" : "bg-white border-slate-950/10 shadow-slate-950/5",
  )}>
    <div className="flex justify-between items-center mb-6">
      <span className={cn("text-[10px] font-black uppercase tracking-[0.4em]", isDarkMode ? "text-white/40" : "text-slate-950/40")}>{title}</span>
      {optimized && (
        <div className={cn(
          "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
          isDarkMode ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-600/10 text-emerald-600 border border-emerald-600/20"
        )}>
           <Crown size={10} /> Optimized
        </div>
      )}
    </div>
    <div>
      <h3 className={cn("text-4xl font-black tracking-tighter italic uppercase", isDarkMode ? "text-white" : "text-slate-950")}>
        ₹{amount ? amount.toLocaleString('en-IN') : '0'}
      </h3>
      <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em] mt-3", color)}>{sub}</p>
    </div>
    {/* Decorative Gradient Line */}
    <div className={cn("absolute bottom-0 left-0 right-0 h-1", optimized ? "bg-emerald-500" : "bg-blue-600")} />
  </div>
);

const StrategyInsight = ({ insight, isDarkMode, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={cn(
      "p-6 rounded-3xl border transition-all hover:border-blue-500/40 group relative overflow-hidden cursor-pointer",
      isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-slate-950/10 shadow-sm"
    )}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
        insight.impact_score === 'Critical' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
      )}>
        {insight.impact_score} Impact
      </div>
      <div className={cn("text-xl font-black italic", isDarkMode ? "text-emerald-400" : "text-emerald-600")}>
        Save {insight.potential_savings}
      </div>
    </div>
    <h4 className={cn("text-lg font-black uppercase italic tracking-tighter mb-2", isDarkMode ? "text-white" : "text-slate-950")}>
      {insight.title}
    </h4>
    <p className={cn("text-[12px] font-bold leading-relaxed mb-4", isDarkMode ? "text-white/60" : "text-slate-950/60")}>
      {insight.action}
    </p>
    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 transition-all">
       View Detailed Strategy <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
    </div>
    <ArrowUpRight className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-30 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
  </motion.div>
);


const getStatutoryDetails = (title, investment, savings) => {
  const t = title.toUpperCase();
  let points = ["Strategic optimization of this chapter is required.", "Ensure all proofs are ready for audit.", "This move reduces your top-slice taxable income."];
  let math = `By investing ${investment || 'the full gap'}, your tax will be reduced by ${savings} instantly.`;

  if (t.includes('80C') || t.includes('SAVINGS')) {
    points = [
      "Maximizes Section 80C limit (₹1.5 Lakhs) using ELSS, PPF, or LIC.",
      "ELSS/PPF are EEE (Exempt-Exempt-Exempt) instruments, meaning zero tax on maturity.",
      "Reduces your total taxable income directly by the investment amount."
    ];
    math = `By investing ${investment || '₹1,50,000'} in these instruments, you save ${savings} in taxes every year.`;
  } else if (t.includes('NPS') || t.includes('80CCD')) {
    points = [
      "Exclusive ₹50,000 deduction under Section 80CCD(1B) beyond the 1.5L limit.",
      "Professional fund management ensures higher long-term retirement returns.",
      "60% of the final corpus at age 60 is completely tax-free."
    ];
    math = `By contributing ₹50,000 extra to NPS, your tax burden drops by ${savings} (approx. 30% of contribution).`;
  } else if (t.includes('HOME LOAN') || t.includes('24(B)') || t.includes('SHIELD')) {
    points = [
      "Deducts up to ₹2 Lakhs of annual interest paid on your home loan.",
      "Can be claimed together with 80C (Principal) for dual tax benefits.",
      "Applicable for self-occupied property for immediate tax-efficient retention."
    ];
    math = `By utilizing the full ₹2 Lakh interest window, you retain ${savings} which otherwise goes to the government.`;
  } else if (t.includes('HEALTH') || t.includes('80D') || t.includes('GUARD')) {
    points = [
      "Covers premiums for health insurance for you, your spouse, and children.",
      "Includes additional limit for senior citizen parents (up to ₹50,000).",
      "Also covers preventive health checkups up to ₹5,000 per year."
    ];
    math = `By securing premium health insurance, you gain protection and save ${savings} in tax liability.`;
  }
  
  return { points, math };
};

const StrategyDrawer = ({ strategy, isOpen, onClose, isDarkMode }) => {
  if (!strategy) return null;
  
  const details = getStatutoryDetails(strategy.title, strategy.investment_required, strategy.potential_savings);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className={cn(
              "fixed right-0 top-0 h-full w-full max-w-xl z-[101] shadow-2xl flex flex-col",
              isDarkMode ? "bg-slate-950 text-white border-l border-white/10" : "bg-white text-slate-950 border-l border-slate-950/10"
            )}
          >
            <div className="p-10 flex-1 overflow-y-auto no-scrollbar">
              <button onClick={onClose} className="mb-10 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <div className="space-y-12">
                <div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">{strategy.title}</h2>
                  <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-8" />
                </div>

                <div className="space-y-6">
                   <div className="space-y-6">
                      {details.points.map((point, i) => (
                        <div key={i} className="flex gap-6 items-start">
                           <div className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                           <p className="text-[18px] font-bold leading-relaxed italic">{point}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className={cn("p-10 rounded-[3rem] border-2 shadow-2xl shadow-blue-500/10", isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-950/5 border-slate-950/10")}>
                   <p className="text-2xl font-black italic uppercase tracking-tighter leading-tight">
                      {details.math}
                   </p>
                </div>

                <div className={cn("p-10 rounded-[3rem] border-2 border-dashed", isDarkMode ? "border-white/10" : "border-slate-950/10")}>
                   <div className="flex items-center gap-4 mb-4 opacity-50">
                      <ShieldCheck size={24} className="text-emerald-500" />
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">Institutional Compliance Pass</span>
                   </div>
                   <p className="text-[13px] font-bold leading-relaxed opacity-80 italic">"{strategy.compliance_note || 'This strategy is fully compliant with the current statutory guidelines.'}"</p>
                </div>
              </div>
            </div>

            <div className={cn("p-10 border-t", isDarkMode ? "border-white/10 bg-white/2" : "border-slate-950/10 bg-slate-950/2")}>
              <button 
                onClick={onClose}
                className={cn(
                  "w-full py-5 rounded-3xl font-black uppercase tracking-[0.4em] text-[12px] transition-all active:scale-95 shadow-2xl shadow-blue-500/20",
                  isDarkMode ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-slate-950 text-white hover:bg-slate-800"
                )}
              >
                Acknowledge & Sync
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const PortfolioRing = ({ title, icon: Icon, amount, limit, isDarkMode }) => {
  const percentage = Math.min(100, Math.round(((parseFloat(amount) || 0) / limit) * 100));
  
  return (
    <div className={cn(
      "p-5 rounded-3xl border transition-all",
      isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-slate-950/5 shadow-sm"
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isDarkMode ? "bg-white/10 text-white" : "bg-slate-950 text-white")}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-[9px] font-black uppercase tracking-[0.2em] truncate", isDarkMode ? "text-white/40" : "text-slate-950/40")}>{title}</p>
          <p className={cn("text-lg font-black tracking-tighter italic", isDarkMode ? "text-white" : "text-slate-950")}>₹{amount?.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-60">
          <span>Utilization</span>
          <span>{percentage}%</span>
        </div>
        <div className={cn("w-full h-1.5 rounded-full overflow-hidden", isDarkMode ? "bg-white/5" : "bg-slate-950/5")}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={cn("h-full rounded-full", percentage >= 100 ? "bg-emerald-500" : "bg-blue-600")}
          />
        </div>
      </div>
    </div>
  );
};

const Overview = ({ data: userData, onBack, isDarkMode }) => {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openStrategy = (strategy) => {
    setSelectedStrategy(strategy);
    setIsDrawerOpen(true);
  };

  const synth = userData?.synthesis || {};
  const ai = userData?.ai_insights || {};
  const insights = ai.actionable_insights || [];

  const handleExport = () => {
    window.print();
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const portfolio = [
    { title: "80C Savings", icon: Wallet, amount: userData?.investments80C, limit: 150000 },
    { title: "NPS Bonus", icon: Target, amount: userData?.sec80CCD1B, limit: 50000 },
    { title: "80D Health", icon: HeartPulse, amount: userData?.deduction80D, limit: 100000 },
    { title: "24(b) Home", icon: Home, amount: userData?.sec24b, limit: 200000 }
  ];

  return (
    <>
      <div className="w-full flex flex-col space-y-10 py-10 lg:py-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-24 max-w-7xl mx-auto px-4 print:hidden">
          
          {/* Nav & Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className={cn(
                  "w-12 h-12 rounded-2xl backdrop-blur-3xl border flex items-center justify-center transition-all active:scale-90",
                  isDarkMode ? "bg-white/5 border-white/10 text-white/40 hover:text-white" : "bg-white border-slate-950/10 text-slate-950/40 hover:text-slate-950"
                )}
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h1 className={cn("text-4xl lg:text-5xl font-black tracking-tighter uppercase italic", isDarkMode ? "text-white" : "text-slate-950")}>
                  Executive <span className="text-blue-600 not-italic">Synthesis</span>
                </h1>
                <p className={cn("text-[9px] font-black uppercase tracking-[0.5em] italic mt-1 opacity-40", isDarkMode ? "text-white" : "text-slate-950")}>
                  FY 2025–26 | Neural Optimization Suite
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleExport}
              className={cn(
                "flex items-center gap-3 px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-xl active:scale-95 group print:hidden",
                exportSuccess ? "bg-emerald-500 text-white" : (isDarkMode ? "bg-white text-slate-950" : "bg-slate-950 text-white")
              )}
            >
              {exportSuccess ? <><CheckCircle2 size={16} /> Exported</> : <><Printer size={16} /> Export Report</>}
            </button>
          </div>

          {/* Primary Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              title="Institutional (Old)" 
              amount={synth?.old_regime_tax} 
              sub="Standard Deduction Applied" 
              optimized={synth?.recommended_regime === "Old Regime"} 
              color="text-blue-500"
              isDarkMode={isDarkMode}
            />
            <MetricCard 
              title="Advanced (New)" 
              amount={synth?.new_regime_tax} 
              sub="Budget 2025 Revised" 
              optimized={synth?.recommended_regime === "New Regime"} 
              color="text-emerald-500"
              isDarkMode={isDarkMode}
            />
            <MetricCard 
              title="Capital Retention" 
              amount={synth?.net_retention} 
              sub="Total Efficiency Gain" 
              optimized={false} 
              color="text-indigo-500"
              isDarkMode={isDarkMode}
            />
          </div>

          {/* AI STRATEGIST DASHBOARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Actionable Insights */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <BrainCircuit size={20} className="text-blue-600" />
                  <h4 className={cn("text-[11px] font-black uppercase tracking-[0.4em] italic", isDarkMode ? "text-white/40" : "text-slate-950/40")}>AI Actionable Insights</h4>
                </div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest italic flex items-center gap-2">
                  <Sparkles size={12} /> {insights.length} Opportunities Identified
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {insights.map((insight, i) => (
                  <StrategyInsight 
                    key={i} 
                    insight={insight} 
                    isDarkMode={isDarkMode} 
                    onClick={() => openStrategy(insight)}
                  />
                ))}
                {insights.length === 0 && (
                  <div className={cn("col-span-full p-12 border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center", isDarkMode ? "border-white/10" : "border-slate-950/10")}>
                      <ShieldCheck size={40} className="opacity-20 mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Your profile is 100% optimized for the current inputs.</p>
                  </div>
                )}
              </div>

              {/* Deep Impact Analysis */}
              <div className={cn(
                "p-10 rounded-[3rem] border relative overflow-hidden",
                isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-slate-950/5 shadow-sm"
              )}>
                <div className={cn("absolute top-0 right-0 w-40 h-40 blur-3xl opacity-20", isDarkMode ? "bg-blue-600" : "bg-blue-400")} />
                <div className="flex items-start gap-6 relative z-10">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0", isDarkMode ? "bg-blue-600" : "bg-slate-950")}>
                      <Gem size={28} />
                    </div>
                    <div className="space-y-4">
                      <p className={cn("text-[10px] font-black uppercase tracking-[0.4em] italic", isDarkMode ? "text-blue-400" : "text-blue-600")}>Strategic Impact Synthesis</p>
                      <p className={cn("text-[16px] font-bold leading-relaxed italic border-l-4 border-blue-600 pl-6", isDarkMode ? "text-white/80" : "text-slate-950/80")}>
                        {ai?.strategic_impact}
                      </p>
                    </div>
                </div>
              </div>
            </div>

            {/* Right: Portfolio Visualization */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 px-2">
                <LayoutGrid size={20} className="text-blue-600" />
                <h4 className={cn("text-[11px] font-black uppercase tracking-[0.4em] italic", isDarkMode ? "text-white/40" : "text-slate-950/40")}>Statutory Portfolio</h4>
              </div>
              <div className="space-y-4">
                {portfolio.map((item, i) => (
                  <PortfolioRing key={i} {...item} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>

          </div>
      </div>

      <StrategyDrawer 
        strategy={selectedStrategy} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        isDarkMode={isDarkMode} 
      />

      {/* PRINT ONLY REPORT (Professional Audit Grade) */}
      <div className="hidden print:block bg-white p-12 text-slate-950 font-serif leading-tight">
          {/* Document Header */}
          <div className="flex justify-between items-start border-b border-slate-900 pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter italic mb-1">TaxAI Institutional</h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500">Official Strategic Audit Report</p>
            </div>
            <div className="text-right space-y-0.5">
              <p className="text-[12px] font-black uppercase tracking-widest">{userData?.name}</p>
              <p className="text-[10px] font-medium text-slate-600">{userData?.email}</p>
              <p className="text-[10px] font-medium text-slate-600">+91 {userData?.mobile}</p>
              <p className="text-[8px] font-bold uppercase tracking-widest pt-1 text-slate-400">Generated: {new Date().toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Executive Verdict */}
          <div className="mb-8">
            <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">Executive Verdict</h2>
            <p className="text-lg font-black italic border-l-2 border-slate-900 pl-6 py-1">
              "{ai?.verdict}"
            </p>
          </div>

          {/* Synthesis Ledger */}
          <div className="mb-10">
            <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 border-b pb-1">Financial Synthesis Ledger</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-[8px] font-black uppercase tracking-widest">Regime Type</th>
                  <th className="py-2 text-[8px] font-black uppercase tracking-widest">Deductions Applied</th>
                  <th className="py-2 text-[8px] font-black uppercase tracking-widest text-right">Tax Liability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 text-[12px] font-bold uppercase italic">Institutional (Old)</td>
                  <td className="py-3 text-[12px]">₹{synth?.deductions_applied?.toLocaleString()}</td>
                  <td className="py-3 text-[12px] text-right font-black">₹{synth?.old_regime_tax?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-3 text-[12px] font-bold uppercase italic text-emerald-600">Advanced (New)</td>
                  <td className="py-3 text-[12px] text-slate-400">Standard Only</td>
                  <td className="py-3 text-[12px] text-right font-black text-emerald-600">₹{synth?.new_regime_tax?.toLocaleString()}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 font-black uppercase tracking-widest text-[10px]">Net Retention Benefit</td>
                  <td className="py-3 text-[10px] text-slate-400 italic">Efficiency Gain</td>
                  <td className="py-3 text-right font-black text-[16px]">₹{synth?.net_retention?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Strategic Insights */}
          <div className="mb-10">
            <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 border-b pb-1">Actionable Strategy Appendix</h2>
            <div className="grid grid-cols-1 gap-4">
                {insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 border-b border-slate-50 pb-2">
                    <div className="text-lg font-black text-slate-200">0{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-[13px] font-black uppercase italic tracking-tighter">{insight.title}</h4>
                        <span className="text-[11px] font-black text-emerald-600">Save: {insight.potential_savings}</span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-600 leading-tight">{insight.action}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Final Impact Note */}
          <div className="p-6 bg-slate-50 rounded-none border-l-4 border-slate-900 mb-10">
            <p className="text-[11px] font-bold leading-relaxed text-slate-800 italic">
              {ai?.strategic_impact}
            </p>
          </div>

          {/* Footer Disclaimer */}
          <div className="text-[8px] font-medium text-slate-400 leading-tight border-t pt-6">
            <p className="mb-1 uppercase font-black tracking-widest">Official Disclaimer</p>
            <p>
              This report is generated by the TaxAI Neural Engine (v61.0) for FY 2025-26. 
              Document serves as a strategic advisory and does not constitute official legal or CA advice. 
              Values subject to statutory validation by IT Department.
            </p>
          </div>
      </div>
    </>
  );
};

export default Overview;
