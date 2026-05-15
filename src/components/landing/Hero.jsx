import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Zap, TrendingUp, Cpu, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

const Hero = ({ onGetStarted, isDarkMode }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 pt-10">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full blur-[120px]", isDarkMode ? "bg-blue-600" : "bg-blue-400")}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: isDarkMode ? [0.1, 0.15, 0.1] : [0.05, 0.08, 0.05],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full blur-[150px]", isDarkMode ? "bg-emerald-600" : "bg-emerald-400")}
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-10">
        {/* Brand & Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl border border-white/20">
               <ShieldCheck size={32} color="white" />
             </div>
             <span className={cn("text-4xl font-black tracking-tighter uppercase italic leading-none", isDarkMode ? "text-white" : "text-slate-950")}>
               Tax<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 not-italic">AI</span>
             </span>
          </div>

          <div className={cn(
            "px-6 py-2.5 rounded-full border backdrop-blur-md flex items-center gap-3",
            isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-950/5 border-slate-950/10 shadow-sm"
          )}>
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", isDarkMode ? "text-white/60" : "text-slate-950/60")}>Neural Tax Engine <span className="text-blue-500">Active</span></span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn("text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic", isDarkMode ? "text-white" : "text-slate-950")}
          >
            Maximize Your Wealth <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">With Precision Synthesis</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn("text-lg md:text-xl max-w-2xl mx-auto font-bold uppercase tracking-tight leading-relaxed", isDarkMode ? "text-white/40" : "text-slate-950/40")}
          >
            Experience a new standard of financial clarity. Our neural engine identifies deep savings and elite investment strategies for the FY 2024–25 cycle.
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <button 
            onClick={onGetStarted}
            className={cn(
              "group relative px-14 py-7 rounded-[2.5rem] text-[14px] font-black uppercase tracking-[0.5em] hover:scale-105 active:scale-95 transition-all shadow-3xl",
              isDarkMode ? "bg-white text-slate-950 shadow-[0_0_50px_rgba(255,255,255,0.1)]" : "bg-slate-950 text-white shadow-[0_30px_60px_rgba(15,23,42,0.2)]"
            )}
          >
            <div className="absolute inset-[-2px] rounded-[2.6rem] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />
            <span className="flex items-center gap-3">
              Start Your Analysis <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>

          {/* Features */}
          <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t w-full", isDarkMode ? "border-white/5" : "border-slate-950/5")}>
             {[
               { icon: Cpu, label: "AI Synthesis" },
               { icon: Shield, label: "Zero-Data Leak" },
               { icon: Zap, label: "Instant Calc" },
               { icon: TrendingUp, label: "Wealth Max" }
             ].map((f, i) => (
               <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl border flex items-center justify-center transition-all",
                    isDarkMode 
                      ? "bg-white/5 border-white/10 text-white/40 group-hover:text-white group-hover:bg-white/10" 
                      : "bg-slate-950/5 border-slate-950/10 text-slate-950/40 group-hover:text-slate-950 group-hover:bg-slate-950/10"
                  )}>
                    <f.icon size={20} />
                  </div>
                  <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] transition-colors", isDarkMode ? "text-white/30 group-hover:text-white/60" : "text-slate-950/30 group-hover:text-slate-950/60")}>{f.label}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
