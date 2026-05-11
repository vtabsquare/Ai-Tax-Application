import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Mail, Phone, CreditCard, Sparkles, ChevronRight, ChevronLeft, Wallet, PieChart, Landmark, ReceiptText, Building2 } from 'lucide-react';

const STEPS = [1, 2, 3, 4, 5, 6];

const TaxWizard = ({ onComplete, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    ageGroup: 'below60',
    location: 'metro',
    basicSalary: '',
    hraReceived: '',
    allowances: '',
    bonus: '',
    employerNps: '',
    professionalTax: '',
    interestIncome: '',
    rentalIncome: '',
    freelanceIncome: '',
    capitalGains: '',
    section80C: '',
    section80D: '',
    section80E: '',
    nps80CCD: '',
    homeLoanInterest: '',
    rentPaid: '',
    landlordPan: '',
    tdsPaid: ''
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="animate-up">
      <div className="hero-title">
        {currentStep === 1 && <h1>Personal <span className="gradient-span">Profile</span></h1>}
        {currentStep === 2 && <h1>Salary <span className="gradient-span">Structure</span></h1>}
        {currentStep === 3 && <h1>Other <span className="gradient-span">Revenue</span></h1>}
        {currentStep === 4 && <h1>Strategic <span className="gradient-span">Exemptions</span></h1>}
        {currentStep === 5 && <h1>Tax <span className="gradient-span">Credits</span></h1>}
        {currentStep === 6 && <h1>Review & <span className="gradient-span">Synthesize</span></h1>}
      </div>

      <p className="hero-subtitle">
        {currentStep === 1 && "Precise data input for high-performance tax synthesis."}
        {currentStep === 2 && "Primary employment revenue and statutory contributions."}
        {currentStep === 3 && "Additional revenue streams and capital appreciation."}
        {currentStep === 4 && "Legislative instruments for capital shielding."}
        {currentStep === 5 && "Tax already paid or TDS deducted from revenue."}
        {currentStep === 6 && "AI Synthesis Active • Verifying Compliant Instruments"}
      </p>

      <div className="container-v5">
        <form onSubmit={(e) => { e.preventDefault(); onComplete(formData); }}>
          {currentStep === 1 && (
            <div className="animate-up">
              <div className="field-group">
                <label className="input-label-v5">Legal Name</label>
                <div className="input-wrapper">
                  <div className="input-icon"><User size={16} /></div>
                  <input type="text" name="name" className="input-box-v5" placeholder="Rahul Sharma" style={{ paddingLeft: '3rem' }} value={formData.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Official Email</label>
                  <div className="input-wrapper">
                    <div className="input-icon"><Mail size={16} /></div>
                    <input type="email" name="email" className="input-box-v5" placeholder="rahul@premium.com" style={{ paddingLeft: '3rem' }} value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Mobile Number</label>
                  <div className="input-wrapper">
                    <div className="input-icon"><Phone size={16} /></div>
                    <input type="tel" name="mobile" className="input-box-v5" placeholder="+91 90000 00000" style={{ paddingLeft: '3rem' }} value={formData.mobile} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Age Profile</label>
                  <select name="ageGroup" className="input-box-v5" value={formData.ageGroup} onChange={handleChange}>
                    <option value="below60">Individual (Below 60)</option>
                    <option value="60-80">Senior Citizen (60-80)</option>
                    <option value="above80">Super Senior (80+)</option>
                  </select>
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Residence Tier</label>
                  <select name="location" className="input-box-v5" value={formData.location} onChange={handleChange}>
                    <option value="metro">Metro (Tier 1)</option>
                    <option value="nonmetro">Non-Metro (Tier 2+)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-up">
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Basic Salary</label>
                  <div className="input-wrapper">
                    <div className="input-icon" style={{ fontWeight: 800 }}>₹</div>
                    <input type="number" name="basicSalary" className="input-box-v5" placeholder="0" style={{ paddingLeft: '2.5rem' }} value={formData.basicSalary} onChange={handleChange} required />
                  </div>
                </div>
                <div className="field-group">
                  <label className="input-label-v5">HRA Received</label>
                  <input type="number" name="hraReceived" className="input-box-v5" placeholder="0" value={formData.hraReceived} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Allowances</label>
                  <input type="number" name="allowances" className="input-box-v5" placeholder="0" value={formData.allowances} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Annual Bonus</label>
                  <input type="number" name="bonus" className="input-box-v5" placeholder="0" value={formData.bonus} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Employer NPS</label>
                  <input type="number" name="employerNps" className="input-box-v5" placeholder="0" value={formData.employerNps} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Professional Tax</label>
                  <input type="number" name="professionalTax" className="input-box-v5" placeholder="0" value={formData.professionalTax} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-up">
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Interest Income</label>
                  <div className="input-wrapper">
                    <div className="input-icon"><Landmark size={16} /></div>
                    <input type="number" name="interestIncome" className="input-box-v5" placeholder="Savings / FD" style={{ paddingLeft: '3rem' }} value={formData.interestIncome} onChange={handleChange} />
                  </div>
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Rental Income</label>
                  <input type="number" name="rentalIncome" className="input-box-v5" placeholder="Annual" value={formData.rentalIncome} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Freelance / Biz</label>
                  <input type="number" name="freelanceIncome" className="input-box-v5" placeholder="Annual" value={formData.freelanceIncome} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Capital Gains</label>
                  <input type="number" name="capitalGains" className="input-box-v5" placeholder="Stocks / Property" value={formData.capitalGains} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-up">
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Section 80C</label>
                  <input type="number" name="section80C" className="input-box-v5" placeholder="Max ₹ 1.5L" value={formData.section80C} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Section 80D</label>
                  <input type="number" name="section80D" className="input-box-v5" placeholder="Medical" value={formData.section80D} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Section 80E</label>
                  <input type="number" name="section80E" className="input-box-v5" placeholder="Edu Loan" value={formData.section80E} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="input-label-v5">NPS (80CCD-1B)</label>
                  <input type="number" name="nps80CCD" className="input-box-v5" placeholder="Max ₹ 50K" value={formData.nps80CCD} onChange={handleChange} />
                </div>
              </div>
              <div className="field-group">
                <label className="input-label-v5">Home Loan Interest (Self Occupied)</label>
                <input type="number" name="homeLoanInterest" className="input-box-v5" placeholder="Max ₹ 2L" value={formData.homeLoanInterest} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="field-group">
                  <label className="input-label-v5">Annual Rent Paid</label>
                  <div className="input-wrapper">
                    <div className="input-icon"><Building2 size={16} /></div>
                    <input type="number" name="rentPaid" className="input-box-v5" placeholder="0" style={{ paddingLeft: '3rem' }} value={formData.rentPaid} onChange={handleChange} />
                  </div>
                </div>
                <div className="field-group">
                  <label className="input-label-v5">Landlord PAN (Optional)</label>
                  <input type="text" name="landlordPan" className="input-box-v5" placeholder="Required if > ₹1L" value={formData.landlordPan} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="animate-up">
              <div className="field-group">
                <label className="input-label-v5">TDS / Taxes Already Paid</label>
                <div className="input-wrapper">
                  <div className="input-icon"><ReceiptText size={16} /></div>
                  <input type="number" name="tdsPaid" className="input-box-v5" placeholder="Enter total TDS deducted" style={{ paddingLeft: '3rem' }} value={formData.tdsPaid} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="animate-up" style={{ textAlign: 'center' }}>
              <div style={{ background: 'var(--bg-input)', padding: '2rem', borderRadius: '1.25rem', border: '1px solid var(--border-main)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-main)', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-ghost)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em' }}>EXECUTIVE</span>
                  <span style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>{formData.name || 'ANONYMOUS'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-ghost)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em' }}>ANNUAL REVENUE</span>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>₹ {(
                    Number(formData.basicSalary || 0) + 
                    Number(formData.hraReceived || 0) + 
                    Number(formData.allowances || 0) + 
                    Number(formData.bonus || 0) + 
                    Number(formData.interestIncome || 0) + 
                    Number(formData.rentalIncome || 0) + 
                    Number(formData.freelanceIncome || 0) + 
                    Number(formData.capitalGains || 0)
                  ).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-ghost)', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.1em' }}>CLAIMED EXEMPTIONS</span>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>₹ {(
                    Number(formData.section80C || 0) + 
                    Number(formData.section80D || 0) + 
                    Number(formData.section80E || 0) + 
                    Number(formData.nps80CCD || 0) + 
                    Number(formData.homeLoanInterest || 0)
                  ).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
            {currentStep > 1 && (
              <button type="button" className="btn-v5 btn-secondary-v5" onClick={prevStep}>
                <ChevronLeft size={18} /> Previous
              </button>
            )}
            
            {currentStep < 6 ? (
              <button type="button" className="btn-v5 btn-primary-v5" onClick={nextStep}>
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button type="submit" className="btn-v5 btn-primary-v5">
                Calculate Strategy <Sparkles size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxWizard;
