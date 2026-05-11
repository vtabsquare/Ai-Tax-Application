import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

const STEPS = [
  { id: 1, title: 'Identity', sub: 'Profile', icon: User },
  { id: 2, title: 'Salary', sub: 'Revenue', icon: Banknote },
  { id: 3, title: 'Income', sub: 'External', icon: Landmark },
  { id: 4, title: 'Tax', sub: 'Optimize', icon: ShieldCheck },
  { id: 5, title: 'Review', sub: 'Synthesis', icon: ReceiptText },
];

const TaxWizard = ({ onComplete, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    name: '', email: '', mobile: '', age: '', employment: '', city: '',
    basicSalary: '', hra: '', allowances: '', bonus: '',
    interestIncome: '', rentalIncome: '', freelanceIncome: '',
    investments80C: '', deduction80D: '', deduction80E: '', nps: '', rentPaid: '',
  });

  const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleFinalize = async () => {
    // VALIDATION: Prevent empty synthesis
    if (!formData.name || !formData.basicSalary) {
      alert("Please enter values for the synthesis (Name and Basic Salary are required).");
      return;
    }

    setIsSaving(true);
    try {
      // 1. Save to Supabase (Persistence)
      const dbPayload = {
        full_name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        age_group: formData.age,
        employment_type: formData.employment,
        city_type: formData.city,
        basic_salary: parseFloat(formData.basicSalary) || 0,
        hra: parseFloat(formData.hra) || 0,
        allowances: parseFloat(formData.allowances) || 0,
        bonus: parseFloat(formData.bonus) || 0,
        interest_income: parseFloat(formData.interestIncome) || 0,
        rental_income: parseFloat(formData.rentalIncome) || 0,
        freelance_income: parseFloat(formData.freelanceIncome) || 0,
        investments_80c: parseFloat(formData.investments80C) || 0,
        deduction_80d: parseFloat(formData.deduction80D) || 0,
        deduction_80e: parseFloat(formData.deduction80E) || 0,
        nps_contribution: parseFloat(formData.nps) || 0,
        rent_paid_monthly: parseFloat(formData.rentPaid) || 0
      };

      await supabase.from('tax_profiles').insert([dbPayload]);

      // 2. Call Python FastAPI (Intelligence)
      // Ensure we send cleaned numbers to the API
      const apiPayload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        age: formData.age,
        employment: formData.employment,
        city: formData.city,
        basicSalary: parseFloat(formData.basicSalary) || 0,
        hra: parseFloat(formData.hra) || 0,
        allowances: parseFloat(formData.allowances) || 0,
        bonus: parseFloat(formData.bonus) || 0,
        interestIncome: parseFloat(formData.interestIncome) || 0,
        rentalIncome: parseFloat(formData.rentalIncome) || 0,
        freelanceIncome: parseFloat(formData.freelanceIncome) || 0,
        investments80C: parseFloat(formData.investments80C) || 0,
        deduction80D: parseFloat(formData.deduction80D) || 0,
        deduction80E: parseFloat(formData.deduction80E) || 0,
        nps: parseFloat(formData.nps) || 0,
        rentPaid: parseFloat(formData.rentPaid) || 0
      };

      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload)
      });
      
      const result = await response.json();
      
      if (result.success) {
        onComplete({ ...formData, synthesis: result.synthesis });
      } else {
        onComplete(formData);
      }
    } catch (error) {
      console.error('Synthesis Error:', error);
      onComplete(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
              <input type="text" placeholder="Enter your full name" className="input-premium py-3 text-sm" value={formData.name} onChange={(e) => updateField('name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Age Group</label>
              <select className="input-premium py-3 text-sm" value={formData.age} onChange={(e) => updateField('age', e.target.value)}>
                <option value="">Select your age category</option>
                <option>Individual (Below 60)</option>
                <option>Senior (60-80)</option>
                <option>Super Senior (80+)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
              <input type="email" placeholder="e.g., alex@company.com" className="input-premium py-3 text-sm" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mobile</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className="input-premium py-3 text-sm" value={formData.mobile} onChange={(e) => updateField('mobile', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Employment</label>
              <select className="input-premium py-3 text-sm" value={formData.employment} onChange={(e) => updateField('employment', e.target.value)}>
                <option value="">Select employment status</option>
                <option>Salaried</option>
                <option>Business</option>
                <option>Freelancer</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</label>
              <select className="input-premium py-3 text-sm" value={formData.city} onChange={(e) => updateField('city', e.target.value)}>
                <option value="">Select your city type</option>
                <option>Metro (Tier 1)</option>
                <option>Non-Metro</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Basic (₹)</label>
              <input type="number" placeholder="Enter annual basic" className="input-premium py-3 text-sm" value={formData.basicSalary} onChange={(e) => updateField('basicSalary', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">HRA (₹)</label>
              <input type="number" placeholder="Enter annual HRA if applicable" className="input-premium py-3 text-sm" value={formData.hra} onChange={(e) => updateField('hra', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Allowances (₹)</label>
              <input type="number" placeholder="Other allowances if applicable" className="input-premium py-3 text-sm" value={formData.allowances} onChange={(e) => updateField('allowances', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Bonus (₹)</label>
              <input type="number" placeholder="Annual bonus if applicable" className="input-premium py-3 text-sm" value={formData.bonus} onChange={(e) => updateField('bonus', e.target.value)} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Interest (₹)</label>
              <input type="number" placeholder="Bank interest if applicable" className="input-premium py-3 text-sm" value={formData.interestIncome} onChange={(e) => updateField('interestIncome', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Rental (₹)</label>
              <input type="number" placeholder="Property rent if applicable" className="input-premium py-3 text-sm" value={formData.rentalIncome} onChange={(e) => updateField('rentalIncome', e.target.value)} />
            </div>
            <div className="col-span-full space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Freelance / Other (₹)</label>
              <input type="number" placeholder="Other professional income if applicable" className="input-premium py-3 text-sm" value={formData.freelanceIncome} onChange={(e) => updateField('freelanceIncome', e.target.value)} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4 animate-in">
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">80C (₹)</label><input type="number" placeholder="Enter 80C if applicable" className="input-premium py-3 text-sm" value={formData.investments80C} onChange={(e) => updateField('investments80C', e.target.value)} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">80D (₹)</label><input type="number" placeholder="Enter 80D if applicable" className="input-premium py-3 text-sm" value={formData.deduction80D} onChange={(e) => updateField('deduction80D', e.target.value)} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">80E (₹)</label><input type="number" placeholder="Education loan interest" className="input-premium py-3 text-sm" value={formData.deduction80E} onChange={(e) => updateField('deduction80E', e.target.value)} /></div>
            <div className="space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">NPS (₹)</label><input type="number" placeholder="Enter NPS if applicable" className="input-premium py-3 text-sm" value={formData.nps} onChange={(e) => updateField('nps', e.target.value)} /></div>
            <div className="col-span-full space-y-1"><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Monthly Rent (₹)</label><input type="number" placeholder="Enter rent if applicable" className="input-premium py-3 text-sm" value={formData.rentPaid} onChange={(e) => updateField('rentPaid', e.target.value)} /></div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 animate-in text-center">
             <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <Sparkles size={32} className="animate-pulse" />
             </div>
             <h4 className="text-xl font-black text-foreground tracking-tight">Synthesis Ready</h4>
             <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest max-w-xs mx-auto">FY 2024–25 optimization cycle initialized.</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {/* Compact Stepper */}
      <div className="flex justify-between items-center mb-6 px-12 relative max-w-2xl mx-auto w-full">
        <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 -z-10" />
        <div className="absolute top-1/2 left-0 h-px bg-primary transition-all duration-700 -translate-y-1/2 -z-10" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} />
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border", isActive ? "bg-primary border-primary text-white" : "bg-card border-border text-muted-foreground", isCurrent && "shadow-xl shadow-primary/30 scale-110")}>
                <Icon size={18} />
              </div>
              <div className={cn("absolute -bottom-6 text-[8px] font-black uppercase tracking-[0.2em] transition-all", isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-0")}>{step.title}</div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-8 bg-card/40 backdrop-blur-2xl max-w-3xl mx-auto w-full">
        <div className="mb-8 text-center">
           <h2 className="text-2xl font-black text-foreground mb-1">Step {currentStep}: <span className="text-primary">{STEPS[currentStep-1].title}</span></h2>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">{STEPS[currentStep-1].sub}</p>
        </div>
        <div className="min-h-[280px] flex flex-col justify-center">{renderStep()}</div>
        <div className="flex gap-4 mt-8 pt-8 border-t border-border">
          {currentStep > 1 && (
            <button disabled={isSaving} onClick={prev} className="flex-1 px-8 py-3.5 rounded-xl border border-border text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all flex items-center justify-center shadow-sm disabled:opacity-50"><ChevronLeft className="mr-2" size={16} /> Back</button>
          )}
          <button 
             disabled={isSaving || (currentStep === 1 && (!formData.name || !formData.age || !formData.employment || !formData.city))}
             onClick={currentStep === STEPS.length ? handleFinalize : next} 
             className="flex-[2] btn-premium py-3.5 text-xs disabled:opacity-50 disabled:grayscale flex items-center justify-center"
          >
             {isSaving ? (
               <>
                 <Loader2 className="mr-2 animate-spin" size={18} /> Optimizing Slabs...
               </>
             ) : (
               <>
                 {currentStep === STEPS.length ? 'Finalize Synthesis' : 'Continue'}
                 <ChevronRight className="ml-2" size={20} />
               </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxWizard;
