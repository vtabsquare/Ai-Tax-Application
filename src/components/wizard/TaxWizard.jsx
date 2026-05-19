import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ReceiptText, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Banknote,
  Landmark,
  ShieldCheck,
  Loader2,
  ChevronDown,
  Info,
  Rocket,
  HeartPulse,
  Heart,
  GraduationCap,
  Wallet,
  Home,
  AlertCircle,
  BellRing
} from 'lucide-react';
import { cn } from '../../lib/utils';

const STEPS = [
  { id: 1, title: 'Identity', sub: 'Profile', icon: User, theme: 'blue' },
  { id: 2, title: 'Salary', sub: 'Revenue', icon: Banknote, theme: 'emerald' },
  { id: 3, title: 'Income', sub: 'External', icon: Landmark, theme: 'violet' },
  { id: 4, title: 'Tax', sub: 'Optimize', icon: ShieldCheck, theme: 'amber' },
  { id: 5, title: 'Review', sub: 'Synthesis', icon: ReceiptText, theme: 'indigo' },
];

const LIMITS = {
  investments80C: 150000,
  sec80CCD1B: 50000,
  deduction80D: 100000,
  sec24b: 200000,
  sec80EEA: 150000,
  sec80EE: 50000,
  sec80GG: 60000,
  sec80U: 125000,
};

const DARK_THEMES = {
  blue: { bg: 'from-blue-600/30', border: 'border-blue-500/40', glow: 'shadow-[0_0_80px_rgba(37,99,235,0.35)]', text: 'text-blue-400', accent: 'bg-blue-600', input: 'bg-blue-600/10 focus:bg-blue-600/20 focus:border-blue-400/60' },
  emerald: { bg: 'from-emerald-600/30', border: 'border-emerald-500/40', glow: 'shadow-[0_0_80px_rgba(16,185,129,0.35)]', text: 'text-emerald-400', accent: 'bg-emerald-600', input: 'bg-emerald-600/10 focus:bg-emerald-600/20 focus:border-emerald-400/60' },
  violet: { bg: 'from-violet-600/30', border: 'border-violet-500/40', glow: 'shadow-[0_0_80px_rgba(139,92,246,0.35)]', text: 'text-violet-400', accent: 'bg-violet-600', input: 'bg-violet-600/10 focus:bg-violet-600/20 focus:border-violet-400/60' },
  amber: { bg: 'from-amber-600/30', border: 'border-amber-500/40', glow: 'shadow-[0_0_80px_rgba(245,158,11,0.35)]', text: 'text-amber-400', accent: 'bg-amber-600', input: 'bg-amber-600/10 focus:bg-amber-600/20 focus:border-amber-400/60' },
  indigo: { bg: 'from-indigo-600/30', border: 'border-indigo-500/40', glow: 'shadow-[0_0_80px_rgba(99,102,241,0.35)]', text: 'text-indigo-400', accent: 'bg-indigo-600', input: 'bg-indigo-600/10 focus:bg-indigo-600/20 focus:border-indigo-400/60' },
};

const LIGHT_THEMES = {
  blue: { bg: 'from-blue-100', border: 'border-blue-200', glow: 'shadow-[0_0_40px_rgba(37,99,235,0.15)]', text: 'text-blue-600', accent: 'bg-blue-600', input: 'bg-blue-50 focus:bg-blue-100 focus:border-blue-500/50' },
  emerald: { bg: 'from-emerald-100', border: 'border-emerald-200', glow: 'shadow-[0_0_40px_rgba(16,185,129,0.15)]', text: 'text-emerald-600', accent: 'bg-emerald-600', input: 'bg-emerald-50 focus:bg-emerald-100 focus:border-emerald-500/50' },
  violet: { bg: 'from-violet-100', border: 'border-violet-200', glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]', text: 'text-violet-600', accent: 'bg-violet-600', input: 'bg-violet-50 focus:bg-violet-100 focus:border-violet-500/50' },
  amber: { bg: 'from-amber-100', border: 'border-amber-200', glow: 'shadow-[0_0_40px_rgba(245,158,11,0.15)]', text: 'text-amber-600', accent: 'bg-amber-600', input: 'bg-amber-50 focus:bg-amber-100 focus:border-amber-500/50' },
  indigo: { bg: 'from-indigo-100', border: 'border-indigo-200', glow: 'shadow-[0_0_40px_rgba(99,102,241,0.15)]', text: 'text-indigo-600', accent: 'bg-indigo-600', input: 'bg-indigo-50 focus:bg-indigo-100 focus:border-indigo-500/50' },
};

const TAX_CATEGORIES = [
  { id: 'savings', label: 'Savings', icon: Wallet },
  { id: 'health', label: 'Wellness', icon: HeartPulse },
  { id: 'loans', label: 'Housing', icon: Home },
  { id: 'social', label: 'Social', icon: Heart },
];

const StatutoryAlert = ({ message, visible, onHide, isDarkMode }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="absolute top-8 left-0 right-0 z-[200] flex justify-center px-6 pointer-events-none"
      >
        <div className={cn(
          "max-w-md w-full px-6 py-4 rounded-[1.5rem] border-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex items-center gap-4 pointer-events-auto",
          isDarkMode 
            ? "bg-red-500/20 border-red-500/40 text-red-100" 
            : "bg-white border-red-500/20 text-red-600 shadow-red-500/10"
        )}>
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <BellRing size={20} className="animate-bounce" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-0.5 leading-none">Statutory Guardrail</p>
            <p className="text-[13px] font-bold leading-tight tracking-tight">{message}</p>
          </div>
          <button onClick={onHide} className="p-2 hover:bg-black/5 rounded-lg transition-colors">
            <AlertCircle size={18} />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const InputDesc = ({ text, limit, error, isDarkMode }) => (
  <div className="flex flex-col gap-0.5 mt-1 ml-0.5">
    <div className="flex items-start gap-1.5">
      <Info size={10} className={cn("mt-0.5 shrink-0", error ? "text-red-500" : isDarkMode ? "text-white/60" : "text-slate-950/80")} />
      <p className={cn("text-[9px] font-bold uppercase tracking-wider leading-tight", error ? "text-red-500" : isDarkMode ? "text-white/60" : "text-slate-950/80")}>
        {text} {limit && <span className={cn("ml-1 font-black", isDarkMode ? "text-emerald-400/80" : "text-emerald-600/80")}>[MAX: {limit}]</span>}
      </p>
    </div>
  </div>
);

const PremiumSelect = ({ value, onChange, options, placeholder, label, shake, theme, direction = "down", isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState(null);
  const triggerRef = useRef(null);
  const currentTheme = (isDarkMode ? DARK_THEMES : LIGHT_THEMES)[theme];

  const handleOpen = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropdownRect(r);
    }
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative space-y-2 w-full">
      <label className={cn("text-[10.5px] font-black uppercase tracking-[0.35em] ml-1 italic block", isDarkMode ? "text-white/80" : "text-slate-950")}>{label}</label>
      <div 
        ref={triggerRef}
        onClick={handleOpen}
        className={cn(
          "w-full backdrop-blur-xl border rounded-xl px-6 py-4 flex items-center justify-between cursor-pointer transition-all",
          currentTheme.input,
          isDarkMode ? "border-white/5" : "border-slate-950/10 shadow-sm",
          isOpen && (isDarkMode ? "border-white/20" : "border-slate-950/30"),
          !value && shake && "border-red-500/50 bg-red-500/5"
        )}
      >
        <span className={cn("text-[14px] font-bold tracking-tight", !value ? (isDarkMode ? "text-white/40" : "text-slate-950/50") : (isDarkMode ? "text-white" : "text-slate-950"))}>
          {value || placeholder}
        </span>
        <ChevronDown size={18} className={cn("transition-transform duration-300", isDarkMode ? "text-white/40" : "text-slate-950/50", isOpen && "rotate-180")} />
      </div>

      {isOpen && dropdownRect && createPortal(
        <>
          <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setIsOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            style={{
              position: 'fixed',
              top: dropdownRect.bottom + 4,
              left: dropdownRect.left,
              width: dropdownRect.width,
              zIndex: 9999,
            }}
            className={cn(
              "border rounded-2xl py-3 overflow-hidden",
              isDarkMode ? "bg-[#020617] border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]" : "bg-white border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            )}
          >
            {options.map((opt, i) => (
              <div 
                key={i}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-6 py-3 text-[13px] font-bold cursor-pointer transition-colors",
                  isDarkMode ? "text-white/70 hover:text-white hover:bg-white/5" : "text-slate-800 hover:bg-slate-50",
                  value === opt && (isDarkMode ? "text-white bg-white/5" : "text-slate-950 bg-slate-100")
                )}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        </>,
        document.body
      )}
    </div>
  );
};

const TaxWizard = ({ onComplete, initialData, onStepChange, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [taxCategory, setTaxCategory] = useState('savings');
  const [isSaving, setIsSaving] = useState(false);
  const [shake, setShake] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '' });

  const activeStep = STEPS.find(s => s.id === currentStep);
  const themes = isDarkMode ? DARK_THEMES : LIGHT_THEMES;
  const activeTheme = themes[activeStep.theme];

  React.useEffect(() => {
    if (onStepChange) onStepChange(currentStep);
  }, [currentStep, onStepChange]);

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => setAlert(prev => ({ ...prev, visible: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert.visible]);

  const [formData, setFormData] = useState(initialData || {
    name: '', email: '', mobile: '', age: '', employment: 'Salaried', city: '',
    isMetro: false,
    annualSalary: '', basicSalary: '', hra: '', allowances: '', bonus: '',
    interestIncome: '', rentalIncome: '', freelanceIncome: '',
    epf: '', ppf: '', elss: '', lic: '', nsc: '', other80c: '',
    sec80CCD1B: '', 
    deduction80D: '', sec80DD: '', sec80DDB: '',
    sec80E: '', sec80EEA: '', sec80EE: '', sec80G: '',
    sec80GG: '', sec80TTA: '', sec80U: '',
    disabilityStatus: 'None (0%)',
    rentPaid: '', sec24b: '',
  });

  const updateField = (field, value) => {
    let finalValue = value;
    let currentLimit = LIMITS[field];
    
    // Dynamic Limit for 80TTA (10k) vs 80TTB (50k for Seniors)
    if (field === 'sec80TTA') {
      currentLimit = formData.age && formData.age.includes('Senior') ? 50000 : 10000;
    }
    
    // Dynamic Limit for 80DDB (40k vs 100k for Seniors)
    if (field === 'sec80DDB') {
      currentLimit = formData.age && formData.age.includes('Senior') ? 100000 : 40000;
    }

    if (currentLimit && value > currentLimit) {
      finalValue = currentLimit;
      const sectionName = field.replace('investments', '').replace('sec', 'Section ').replace('deduction', 'Section ');
      setAlert({
        visible: true,
        message: `Maximum allowed for ${sectionName} is ₹${currentLimit.toLocaleString('en-IN')}. Amount auto-capped.`
      });
    }
    if (field === 'city') {
      const isMetro = value === 'Metro (Tier 1)';
      setFormData(prev => {
        let newHra = prev.hra;
        if (prev.annualSalary) {
          const annual = parseFloat(prev.annualSalary) || 0;
          const basic = annual * 0.4;
          newHra = isMetro ? basic * 0.5 : basic * 0.4;
        } else if (prev.basicSalary && parseFloat(prev.basicSalary) > 0) {
          newHra = isMetro ? parseFloat(prev.basicSalary) * 0.5 : parseFloat(prev.basicSalary) * 0.4;
        }
        return { ...prev, city: value, isMetro, hra: newHra ? String(newHra) : '' };
      });
      return;
    }

    if (field === 'annualSalary') {
       const annual = parseFloat(value) || 0;
       const basic = annual * 0.4;
       const isMetro = formData.isMetro;
       const hra = isMetro ? basic * 0.5 : basic * 0.4;
       
       setFormData(prev => ({ 
           ...prev, 
           annualSalary: value,
           basicSalary: value ? String(basic) : '',
           hra: value ? String(hra) : ''
       }));
       return;
    }

    if (field === 'disabilityStatus') {
      const amount = value.includes('Normal') ? 75000 : (value.includes('Severe') ? 125000 : 0);
      setFormData(prev => ({ ...prev, disabilityStatus: value, sec80U: amount }));
      return;
    }

    setFormData(prev => ({ ...prev, [field]: finalValue }));
  };

  const validateStep = (stepId) => {
    if (stepId === 1) {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      const isMobileValid = /^\d{10}$/.test(formData.mobile);
      return formData.name && formData.age && formData.city && isEmailValid && isMobileValid;
    }
    if (stepId === 2) return (formData.annualSalary && parseFloat(formData.annualSalary) > 0) || (formData.basicSalary && parseFloat(formData.basicSalary) > 0);
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleFinalize = async () => {
    if (!formData.name || !formData.basicSalary) return;
    setIsSaving(true);
    try {
      const cleanValue = (val) => {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? 0 : parsed;
      };

      const apiPayload = {
        ...formData,
        annualSalary: cleanValue(formData.annualSalary),
        basicSalary: cleanValue(formData.basicSalary),
        hra: cleanValue(formData.hra),
        allowances: cleanValue(formData.allowances),
        bonus: cleanValue(formData.bonus),
        interestIncome: cleanValue(formData.interestIncome),
        rentalIncome: cleanValue(formData.rentalIncome),
        freelanceIncome: cleanValue(formData.freelanceIncome),
        investments80C: Math.min(150000, 
           (parseFloat(formData.epf) || 0) +
           (parseFloat(formData.ppf) || 0) +
           (parseFloat(formData.elss) || 0) +
           (parseFloat(formData.lic) || 0) +
           (parseFloat(formData.nsc) || 0) +
           (parseFloat(formData.other80c) || 0)
        ),
        sec80CCD1B: cleanValue(formData.sec80CCD1B),
        deduction80D: cleanValue(formData.deduction80D),
        sec80DD: cleanValue(formData.sec80DD),
        sec80DDB: cleanValue(formData.sec80DDB),
        sec80E: cleanValue(formData.sec80E),
        sec80EEA: cleanValue(formData.sec80EEA),
        sec80EE: cleanValue(formData.sec80EE),
        sec80G: cleanValue(formData.sec80G),
        sec80GG: cleanValue(formData.sec80GG),
        sec80TTA: cleanValue(formData.sec80TTA),
        sec80U: cleanValue(formData.sec80U),
        rentPaid: cleanValue(formData.rentPaid),
        sec24b: cleanValue(formData.sec24b),
        isMetro: formData.isMetro
      };

      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload)
      });
      
      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const result = await response.json();
      if (result.success) {
        onComplete({ ...formData, ...apiPayload, synthesis: result.synthesis, ai_insights: result.ai_insights });
      } else {
        alert("Synthesis failed. Please check your network.");
      }
    } catch (error) {
      console.error('Synthesis Error:', error);
      alert("AI Engine Sync Error. Please verify backend.");
    } finally {
      setIsSaving(false);
    }
  };

  const labelStyle = cn("text-[10.5px] font-black uppercase tracking-[0.35em] ml-1 italic mb-2 block", isDarkMode ? "text-white/80" : "text-slate-950");
  const inputStyle = (field, customValidation) => cn(
    "w-full border rounded-xl px-5 py-3 outline-none transition-all font-bold tracking-tight text-[14px] shadow-inner backdrop-blur-xl",
    activeTheme.input,
    isDarkMode ? "border-white/5 text-white placeholder:text-white/30" : "border-slate-950/10 text-slate-950 placeholder:text-slate-950/40 shadow-sm",
    shake && (customValidation === false || !formData[field]) && "border-red-500/50 bg-red-500/5"
  );

  const renderStepInputs = (id) => {
    switch (id) {
      case 1:
        const isEmailValid = formData.email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) : true;
        const isMobileValid = formData.mobile ? /^\d{10}$/.test(formData.mobile) : true;

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
              <label className={labelStyle}>Full Identity</label>
              <input type="text" placeholder="Enter your full name" className={inputStyle('name')} value={formData.name} onChange={(e) => updateField('name', e.target.value)} />
              <InputDesc text="Verification as per PAN record." isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Email Address</label>
              <input type="email" placeholder="name@domain.com" className={inputStyle('email', isEmailValid)} value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
              <InputDesc text={isEmailValid ? "Official communication channel." : "Invalid email format"} error={!isEmailValid} isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Mobile Number</label>
              <input type="tel" placeholder="10-digit number" className={inputStyle('mobile', isMobileValid)} value={formData.mobile} onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} />
              <InputDesc text={isMobileValid ? "For identity verification." : "Must be exactly 10 digits"} error={!isMobileValid} isDarkMode={isDarkMode} />
            </div>
            <PremiumSelect label="Age Group" theme={activeStep.theme} isDarkMode={isDarkMode} placeholder="Select age group" options={["Individual (Below 60)", "Senior (60-80)", "Super Senior (80+)"]} value={formData.age} onChange={(val) => updateField('age', val)} shake={shake} />
            <PremiumSelect label="Location" theme={activeStep.theme} isDarkMode={isDarkMode} placeholder="Residential type" options={["Metro (Tier 1)", "Non-Metro"]} value={formData.city} onChange={(val) => updateField('city', val)} shake={shake} />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="col-span-full space-y-1">
              <label className={labelStyle}>Annual Gross Salary (₹)</label>
              <input type="number" placeholder="Total Gross Pay" className={inputStyle('annualSalary')} value={formData.annualSalary || ''} onChange={(e) => updateField('annualSalary', e.target.value)} />
              <InputDesc text="Master total. Basic & HRA are auto-calculated from this." isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Annual Basic (₹)</label>
              <input type="number" placeholder="Fixed annual pay" className={cn(inputStyle('basicSalary'), "opacity-60 cursor-not-allowed pointer-events-none", isDarkMode ? "bg-black/20" : "bg-black/5")} value={formData.basicSalary} readOnly tabIndex={-1} />
              <InputDesc text="40% of Gross Salary (Auto-filled)." isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Annual HRA (₹)</label>
              <input type="number" placeholder="Rent allowance component" className={cn(inputStyle('hra'), "opacity-60 cursor-not-allowed pointer-events-none", isDarkMode ? "bg-black/20" : "bg-black/5")} value={formData.hra} readOnly tabIndex={-1} />
              <InputDesc text={formData.isMetro ? "50% of Basic (Metro - Auto-filled)" : "40% of Basic (Non-Metro - Auto-filled)"} isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Allowances (₹)</label>
              <input type="number" placeholder="LTA / Special pay" className={inputStyle('allowances')} value={formData.allowances} onChange={(e) => updateField('allowances', e.target.value)} />
              <InputDesc text="Sum of all other taxable perks." isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Bonus / Var (₹)</label>
              <input type="number" placeholder="Annual incentives" className={inputStyle('bonus')} value={formData.bonus} onChange={(e) => updateField('bonus', e.target.value)} />
              <InputDesc text="Performance based variable pay." isDarkMode={isDarkMode} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
              <label className={labelStyle}>Interest (₹)</label>
              <input type="number" placeholder="FD / Savings interest" className={inputStyle('interestIncome')} value={formData.interestIncome} onChange={(e) => updateField('interestIncome', e.target.value)} />
              <InputDesc text="Annual income from bank interest." isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Rental (₹)</label>
              <input type="number" placeholder="Annual property rent" className={inputStyle('rentalIncome')} value={formData.rentalIncome} onChange={(e) => updateField('rentalIncome', e.target.value)} />
              <InputDesc text="Total gross rent received." isDarkMode={isDarkMode} />
            </div>
            <div className="col-span-full space-y-1">
              <label className={labelStyle}>Freelance / Other (₹)</label>
              <input type="number" placeholder="Secondary revenue" className={inputStyle('freelanceIncome')} value={formData.freelanceIncome} onChange={(e) => updateField('freelanceIncome', e.target.value)} />
              <InputDesc text="Income from side business or consulting." isDarkMode={isDarkMode} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-visible relative">
            <div className={cn("flex items-center gap-2 border-b pb-3 mb-1", isDarkMode ? "border-white/5" : "border-slate-950/10")}>
              {TAX_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setTaxCategory(cat.id)}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all border",
                    taxCategory === cat.id 
                      ? `${activeTheme.accent}/40 border-current ${isDarkMode ? "text-white" : "text-slate-950"} shadow-lg` 
                      : isDarkMode 
                        ? "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                        : "bg-slate-950/5 border-slate-950/10 text-slate-950/40 hover:bg-slate-950/10"
                  )}
                >
                  <cat.icon size={14} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden lg:block">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="w-full">
               {taxCategory === 'savings' && (
                 <div className="flex flex-col h-full gap-y-3">
                   <div className="border-b pb-2 mb-1 flex items-center justify-between" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                     <div>
                       <h3 className={cn("text-lg font-black uppercase italic tracking-tighter", isDarkMode ? "text-white" : "text-slate-950")}>80C Breakdown</h3>
                       <p className={cn("text-[10px] font-bold uppercase tracking-widest", isDarkMode ? "text-white/40" : "text-slate-950/40")}>Max total deduction: ₹1,50,000</p>
                     </div>
                     <div className={cn("px-4 py-2 rounded-xl border flex items-center gap-3 shadow-lg", (() => {
                        const t80 = (parseFloat(formData.epf) || 0) + (parseFloat(formData.ppf) || 0) + (parseFloat(formData.elss) || 0) + (parseFloat(formData.lic) || 0) + (parseFloat(formData.nsc) || 0) + (parseFloat(formData.other80c) || 0);
                        if (t80 > 150000) return isDarkMode ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-600";
                        if (t80 > 0) return isDarkMode ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-blue-100 border-blue-200 text-blue-600";
                        return isDarkMode ? "bg-white/5 border-white/10 text-white/40" : "bg-slate-950/5 border-slate-950/10 text-slate-950/40";
                     })())}>
                       <div className="flex flex-col text-right">
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70">Total 80C</span>
                         <span className="text-sm font-bold tracking-tight">₹{((parseFloat(formData.epf) || 0) + (parseFloat(formData.ppf) || 0) + (parseFloat(formData.elss) || 0) + (parseFloat(formData.lic) || 0) + (parseFloat(formData.nsc) || 0) + (parseFloat(formData.other80c) || 0)).toLocaleString('en-IN')}</span>
                       </div>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                     <div className="space-y-0.5">
                       <label className={labelStyle}>EPF (₹)</label>
                       <input type="number" placeholder="Employee Provident Fund" className={inputStyle('epf')} value={formData.epf} onChange={(e) => updateField('epf', e.target.value)} />
                     </div>
                     <div className="space-y-0.5">
                       <label className={labelStyle}>PPF (₹)</label>
                       <input type="number" placeholder="Public Provident Fund" className={inputStyle('ppf')} value={formData.ppf} onChange={(e) => updateField('ppf', e.target.value)} />
                     </div>
                     <div className="space-y-0.5">
                       <label className={labelStyle}>ELSS (₹)</label>
                       <input type="number" placeholder="Equity Linked Mutual Funds" className={inputStyle('elss')} value={formData.elss} onChange={(e) => updateField('elss', e.target.value)} />
                     </div>
                     <div className="space-y-0.5">
                       <label className={labelStyle}>LIC Prem (₹)</label>
                       <input type="number" placeholder="Life Insurance Premium" className={inputStyle('lic')} value={formData.lic} onChange={(e) => updateField('lic', e.target.value)} />
                     </div>
                     <div className="space-y-0.5">
                       <label className={labelStyle}>NSC (₹)</label>
                       <input type="number" placeholder="National Savings Certificate" className={inputStyle('nsc')} value={formData.nsc} onChange={(e) => updateField('nsc', e.target.value)} />
                     </div>
                     <div className="space-y-0.5">
                       <label className={labelStyle}>Other 80C (₹)</label>
                       <input type="number" placeholder="Tuition Fees / Home Principal" className={inputStyle('other80c')} value={formData.other80c} onChange={(e) => updateField('other80c', e.target.value)} />
                     </div>
                   </div>
                   
                   <div className="space-y-0.5 mt-1 pt-2 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                     <label className={labelStyle}>NPS Additional [80CCD(1B)] (₹)</label>
                     <input type="number" placeholder="Extra NPS" className={inputStyle('sec80CCD1B')} value={formData.sec80CCD1B} onChange={(e) => updateField('sec80CCD1B', e.target.value)} />
                     <InputDesc text="Bonus deduction over and above 80C limit." limit="₹50,000" isDarkMode={isDarkMode} />
                   </div>
                 </div>
               )}

               {taxCategory !== 'savings' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                   {taxCategory === 'health' && (
                  <>
                    <div className="space-y-0.5">
                      <label className={labelStyle}>Health Insurance [80D] (₹)</label>
                      <input type="number" placeholder="Medical Premium" className={inputStyle('deduction80D')} value={formData.deduction80D} onChange={(e) => updateField('deduction80D', e.target.value)} />
                      <InputDesc text="Self, Family, and Senior Citizen Parents." limit="₹1,00,000" isDarkMode={isDarkMode} />
                    </div>
                    <div className="space-y-0.5">
                      <label className={labelStyle}>Diseases [80DDB] (₹)</label>
                      <input type="number" placeholder="Medical Treatment" className={inputStyle('sec80DDB')} value={formData.sec80DDB} onChange={(e) => updateField('sec80DDB', e.target.value)} />
                      <InputDesc text="Specific critical illness treatment costs." limit={formData.age && formData.age.includes('Senior') ? "₹1,00,000" : "₹40,000"} isDarkMode={isDarkMode} />
                    </div>
                    <div className="col-span-full space-y-0.5">
                      <PremiumSelect 
                        label="Disability Status [80DD/U]" 
                        theme={activeStep.theme} 
                        isDarkMode={isDarkMode} 
                        placeholder="Select status" 
                        options={["None (0%)", "Normal (40-80%)", "Severe (>80%)"]} 
                        value={formData.disabilityStatus} 
                        onChange={(val) => updateField('disabilityStatus', val)} 
                        shake={shake} 
                      />
                      <InputDesc text="Fixed flat deduction based on disability percentage." limit={formData.sec80U > 0 ? `₹${formData.sec80U.toLocaleString()}` : "₹0"} isDarkMode={isDarkMode} />
                    </div>
                  </>
                )}
               {taxCategory === 'loans' && (
                 <>
                   <div className="space-y-0.5">
                     <label className={labelStyle}>Home Loan Int [24(b)] (₹)</label>
                     <input type="number" placeholder="Self-Occupied Home Loan Interest" className={inputStyle('sec24b')} value={formData.sec24b} onChange={(e) => updateField('sec24b', e.target.value)} />
                     <InputDesc text="Interest on Self-Occupied property." limit="₹2,00,000" isDarkMode={isDarkMode} />
                   </div>
                   <div className="space-y-0.5">
                     <label className={labelStyle}>Education [80E] (₹)</label>
                     <input type="number" placeholder="Education Loan Interest Paid" className={inputStyle('sec80E')} value={formData.sec80E} onChange={(e) => updateField('sec80E', e.target.value)} />
                     <InputDesc text="Deduction available for up to 8 years." limit="NO UPPER LIMIT" isDarkMode={isDarkMode} />
                   </div>
                   <div className="space-y-0.5">
                     <label className={labelStyle}>Housing [80EEA] (₹)</label>
                     <input type="number" placeholder="Affordable Housing Loan Interest" className={inputStyle('sec80EEA')} value={formData.sec80EEA} onChange={(e) => updateField('sec80EEA', e.target.value)} />
                     <InputDesc text="For affordable housing loans (2019-22)." limit="₹1,50,000" isDarkMode={isDarkMode} />
                   </div>
                   <div className="space-y-0.5">
                     <label className={labelStyle}>First Home [80EE] (₹)</label>
                     <input type="number" placeholder="First Home Loan (2016-17 Scheme)" className={inputStyle('sec80EE')} value={formData.sec80EE} onChange={(e) => updateField('sec80EE', e.target.value)} />
                     <InputDesc text="Deduction for first home loans (2016-17)." limit="₹50,000" isDarkMode={isDarkMode} />
                   </div>
                 </>
               )}
               {taxCategory === 'social' && (
                 <>
                   <div className="space-y-0.5">
                     <label className={labelStyle}>Donations [80G] (₹)</label>
                     <input type="number" placeholder="Charity" className={inputStyle('sec80G')} value={formData.sec80G} onChange={(e) => updateField('sec80G', e.target.value)} />
                     <InputDesc text="Subject to institution's eligibility." limit="VARIES (50/100%)" isDarkMode={isDarkMode} />
                   </div>
                   <div className="space-y-0.5">
                     <label className={labelStyle}>Rent [80GG] (₹)</label>
                     <input type="number" placeholder="No HRA Recipient" className={inputStyle('sec80GG')} value={formData.sec80GG} onChange={(e) => updateField('sec80GG', e.target.value)} />
                     <InputDesc text="Rent deduction if HRA is not received." limit="₹60,000" isDarkMode={isDarkMode} />
                   </div>
                   <div className="col-span-full space-y-0.5">
                     <label className={labelStyle}>Interest Inc [80TTA/B] (₹)</label>
                     <input type="number" placeholder="Savings/FD Interest" className={inputStyle('sec80TTA')} value={formData.sec80TTA} onChange={(e) => updateField('sec80TTA', e.target.value)} />
                     <InputDesc text="Savings & FD interest tax benefit." limit={formData.age && formData.age.includes('Senior') ? "₹50,000 (80TTB)" : "₹10,000 (80TTA)"} isDarkMode={isDarkMode} />
                   </div>
                  </>
                )}
             </div>
            )}
          </div>
            
            <StatutoryAlert 
              visible={alert.visible} 
              message={alert.message} 
              onHide={() => setAlert(prev => ({ ...prev, visible: false }))} 
              isDarkMode={isDarkMode} 
            />
          </div>
        );
      case 5:
        const total80c = Math.min(150000, (parseFloat(formData.epf) || 0) + (parseFloat(formData.ppf) || 0) + (parseFloat(formData.elss) || 0) + (parseFloat(formData.lic) || 0) + (parseFloat(formData.nsc) || 0) + (parseFloat(formData.other80c) || 0));
        const formatMoney = (val) => val ? `₹${parseFloat(val).toLocaleString('en-IN')}` : '₹0';
        
        return (
          <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <div className={cn("flex items-center justify-between border-b pb-4 mb-4 shrink-0", isDarkMode ? "border-white/5" : "border-slate-950/10")}>
              <div>
                <h2 className={cn("text-2xl font-black uppercase italic tracking-tighter", isDarkMode ? "text-white" : "text-slate-950")}>Data Summary</h2>
                <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", isDarkMode ? "text-white/40" : "text-slate-950/40")}>Final review before neural synthesis</p>
              </div>
              <div className={cn("w-12 h-12 rounded-full border-2 flex items-center justify-center", activeTheme.glow, activeTheme.border, activeTheme.text)}>
                <Sparkles size={20} className="animate-pulse" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-6 pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Card */}
                <div className={cn("p-5 rounded-2xl border", isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-slate-950/5 border-slate-950/10 text-slate-950")}>
                  <h3 className={cn("text-xs font-black uppercase tracking-widest mb-4", isDarkMode ? "text-white/40" : "text-slate-950/40")}>Profile & Identity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className={cn("text-[10px] font-bold uppercase", isDarkMode ? "text-white/60" : "text-slate-700")}>Name</span><span className="text-xs font-black uppercase">{formData.name || '-'}</span></div>
                    <div className="flex justify-between items-center"><span className={cn("text-[10px] font-bold uppercase", isDarkMode ? "text-white/60" : "text-slate-700")}>Email</span><span className="text-xs font-black">{formData.email || '-'}</span></div>
                    <div className="flex justify-between items-center"><span className={cn("text-[10px] font-bold uppercase", isDarkMode ? "text-white/60" : "text-slate-700")}>Mobile</span><span className="text-xs font-black">{formData.mobile || '-'}</span></div>
                    <div className="flex justify-between items-center"><span className={cn("text-[10px] font-bold uppercase", isDarkMode ? "text-white/60" : "text-slate-700")}>Age Group</span><span className="text-xs font-black uppercase">{formData.age || '-'}</span></div>
                    <div className="flex justify-between items-center"><span className={cn("text-[10px] font-bold uppercase", isDarkMode ? "text-white/60" : "text-slate-700")}>Location</span><span className="text-xs font-black uppercase">{formData.city || '-'}</span></div>
                  </div>
                </div>

                {/* Income Card */}
                <div className={cn("p-5 rounded-2xl border", isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-slate-950/5 border-slate-950/10 text-slate-950")}>
                  <h3 className={cn("text-xs font-black uppercase tracking-widest mb-4", isDarkMode ? "text-white/40" : "text-slate-950/40")}>Income Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Basic Salary</span><span className="text-xs font-black">{formatMoney(formData.basicSalary)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">HRA Received</span><span className="text-xs font-black">{formatMoney(formData.hra)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Other Perks</span><span className="text-xs font-black">{formatMoney(formData.otherAllowances)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Bonus</span><span className="text-xs font-black">{formatMoney(formData.bonus)}</span></div>
                    <div className="flex justify-between items-center pt-2 border-t border-current/10"><span className="text-[10px] font-bold uppercase opacity-60">Interest/Rental/Other</span><span className="text-xs font-black">{formatMoney((parseFloat(formData.interestIncome)||0) + (parseFloat(formData.rentalIncome)||0) + (parseFloat(formData.freelanceIncome)||0))}</span></div>
                  </div>
                </div>
              </div>

              {/* Deductions Card */}
              <div className={cn("p-5 rounded-2xl border", isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-slate-950/5 border-slate-950/10 text-slate-950")}>
                <h3 className={cn("text-xs font-black uppercase tracking-widest mb-4", isDarkMode ? "text-white/40" : "text-slate-950/40")}>Tax Savings & Deductions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {parseFloat(formData.epf) > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">EPF (80C)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.epf)}</span></div>}
                  {parseFloat(formData.ppf) > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">PPF (80C)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.ppf)}</span></div>}
                  {parseFloat(formData.elss) > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">ELSS (80C)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.elss)}</span></div>}
                  {parseFloat(formData.lic) > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">LIC Prem (80C)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.lic)}</span></div>}
                  {parseFloat(formData.nsc) > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">NSC (80C)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.nsc)}</span></div>}
                  {parseFloat(formData.other80c) > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Other 80C</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.other80c)}</span></div>}
                  {total80c === 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">80C Investments</span><span className="text-xs font-black text-emerald-500">₹0</span></div>}
                  
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">NPS Additional (80CCD)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.sec80CCD1B)}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Health Insurance (80D)</span><span className="text-xs font-black text-emerald-500">{formatMoney((parseFloat(formData.sec80D_self)||0) + (parseFloat(formData.sec80D_parents)||0))}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Home Loan Interest (24b)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.sec24b)}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">HRA Rent Paid</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.rentPaid)}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase opacity-60">Education Loan (80E)</span><span className="text-xs font-black text-emerald-500">{formatMoney(formData.sec80E)}</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden min-h-0">

      {/* THE VIVID DYNAMIC SLIDER */}
      <div className={cn(
        "w-full flex-1 flex items-stretch relative overflow-hidden min-h-0 transition-all duration-700",
        isDarkMode ? "bg-[#0a1121]/80 backdrop-blur-3xl" : "bg-white/60 backdrop-blur-3xl"
      )}>
        
        <div className={cn("absolute inset-0 transition-all duration-1000 opacity-90 bg-gradient-to-br pointer-events-none", activeTheme.bg, isDarkMode ? "to-slate-950/90" : "to-white/90")} />
        <div className={cn("absolute top-0 left-10 right-10 h-1 blur-sm rounded-full transition-all duration-1000 opacity-60 z-20", activeTheme.accent)} />

        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const Icon = step.icon;
          const theme = themes[step.theme];

          return (
            <motion.div
              key={step.id}
              onClick={() => {
                if (isSaving) return;
                if (step.id < currentStep) setCurrentStep(step.id);
                else if (step.id === currentStep + 1) handleNext();
              }}
              animate={{ flex: isActive ? 12 : 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "relative cursor-pointer transition-all flex border-r last:border-0",
                isDarkMode ? "border-white/5" : "border-slate-950/5",
                isActive ? "cursor-default" : isDarkMode ? "hover:bg-white/10 group" : "hover:bg-slate-950/5 group"
              )}
            >
              {!isActive && (
                <div className="absolute inset-0 flex flex-col items-center py-16 overflow-hidden">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl border flex items-center justify-center transition-all shadow-inner",
                     isDarkMode 
                       ? "bg-white/5 border-white/10 text-white/40 group-hover:text-white" 
                       : "bg-slate-950/5 border-slate-950/10 text-slate-950/40 group-hover:text-slate-950"
                   )}>
                      <Icon size={20} />
                   </div>
                   <div className="flex-1 flex items-center">
                     <span className={cn(
                       "font-black uppercase tracking-[1em] text-[11px] rotate-180 [writing-mode:vertical-lr] opacity-30 group-hover:opacity-100 transition-opacity",
                       isDarkMode ? "text-white" : "text-slate-950"
                     )}>
                       {step.title}
                     </span>
                   </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full h-full p-10 md:p-14 flex flex-col relative z-10"
                  >
                    <div className="flex justify-between items-start mb-6 shrink-0">
                       <div className="space-y-1">
                         <h2 className={cn("text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none", isDarkMode ? "text-white" : "text-slate-950")}>{step.title}</h2>
                         <p className={cn("text-[14px] md:text-[16px] font-black uppercase tracking-[0.8em] italic ml-2", activeTheme.text)}>{step.sub}</p>
                       </div>
                       <div className={cn("w-18 h-18 rounded-[2rem] border-2 flex items-center justify-center shadow-3xl transition-all duration-700", activeTheme.border, activeTheme.text, isDarkMode ? "bg-white/10" : "bg-white shadow-xl")}>
                          <Icon size={36} />
                       </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 w-full pt-4" style={{ overflowY: 'auto', overflowX: 'visible' }}>
                       <div className="w-full relative z-[10] pb-24 overflow-visible">
                         {renderStepInputs(step.id)}
                       </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 shrink-0 h-16 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                       <div className="flex gap-3">
                          {STEPS.map(s => (
                            <div key={s.id} className={cn("h-2 rounded-full transition-all duration-500", s.id === currentStep ? (isDarkMode ? "bg-white w-20" : "bg-slate-950 w-20") : (isDarkMode ? "bg-white/10 w-6" : "bg-slate-950/10 w-6"))} />
                          ))}
                       </div>
                       <div className="flex gap-4">
                          {currentStep > 1 && (
                            <button onClick={(e) => { e.stopPropagation(); setCurrentStep(prev => prev -1); }} className={cn(
                              "w-14 h-14 rounded-2xl border flex items-center justify-center transition-all shadow-xl",
                              isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-950/10 text-slate-950 hover:bg-slate-950/5"
                            )}>
                              <ChevronLeft size={26} />
                            </button>
                          )}
                          {currentStep < 5 ? (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleNext(); }} 
                              className={cn(
                                "px-12 h-14 rounded-2xl text-[13px] font-black uppercase tracking-[0.5em] flex items-center gap-5 transition-all shadow-2xl",
                                validateStep(currentStep) 
                                  ? (isDarkMode ? "bg-white text-slate-950 hover:scale-105" : "bg-slate-950 text-white hover:scale-105") 
                                  : (isDarkMode ? "bg-white/10 text-white/20" : "bg-slate-950/10 text-slate-950/20")
                              )}
                            >
                              Advance <ChevronRight size={20} />
                            </button>
                          ) : (
                            <button 
                               disabled={isSaving}
                               onClick={(e) => { e.stopPropagation(); handleFinalize(); }}
                               className={cn(
                                 "px-8 md:px-10 h-14 shadow-xl hover:scale-105 active:scale-95 text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all flex items-center gap-3 md:gap-4",
                                 isDarkMode ? "bg-white text-slate-950" : "bg-slate-950 text-white shadow-slate-950/20"
                               )}
                            >
                               {isSaving ? <Loader2 className="animate-spin" /> : <><Rocket size={18} /> Execute Synthesis</>}
                            </button>
                          )}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TaxWizard;
