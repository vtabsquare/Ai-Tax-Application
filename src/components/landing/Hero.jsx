import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = ({ onGetStarted, isDarkMode }) => {
  return (
    <div className="w-full flex flex-col items-center px-6 lg:px-8 relative">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] blur-[120px] rounded-full transition-all duration-700 ${
          isDarkMode ? 'bg-[#2DD4BF]/5' : 'bg-[#2DD4BF]/10'
        }`} />
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-primary font-black text-[9px] mb-6 tracking-[0.25em] uppercase shadow-sm"
        >
          <Sparkles size={11} fill="currentColor" />
          <span>Neural Tax Engine Active</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-7xl font-black tracking-tighter mb-6 leading-[1.05] text-foreground uppercase"
        >
          Maximize your wealth with <br />
          <span className="gradient-text">Precision Tax Synthesis</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-bold"
        >
          Experience a new standard of financial clarity. Our neural engine identifies deep savings and elite investment strategies for the FY 2024–25 cycle.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            onClick={onGetStarted}
            className="btn-premium group py-4 px-10"
          >
            Start Your Analysis
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={22} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
