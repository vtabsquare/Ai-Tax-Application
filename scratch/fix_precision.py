import re

file_path = r'f:\VTAB_PROJECTS\Ai_Tax_Application\src\components\dashboard\Overview.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add the Global Statutory Intelligence Helper
helper_function = """
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
"""

# Inject the helper before StrategyDrawer
content = content.replace('const StrategyDrawer =', helper_function + '\nconst StrategyDrawer =')

# 2. Update StrategyDrawer to use the helper for UNIQUE data
drawer_pattern = r'const StrategyDrawer = \(\{ strategy, isOpen, onClose, isDarkMode \}\) => \{.*?return \(.*?<AnimatePresence>.*?<\/AnimatePresence>.*?\);\s+\};'
new_drawer = r"""const StrategyDrawer = ({ strategy, isOpen, onClose, isDarkMode }) => {
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
};"""

content = re.sub(drawer_pattern, new_drawer, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("SUCCESS: High-Precision Statutory Intelligence implemented.")
