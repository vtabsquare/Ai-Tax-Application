import re

file_path = r'f:\VTAB_PROJECTS\Ai_Tax_Application\src\components\wizard\TaxWizard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the grid gap for consistency
content = content.replace('grid-cols-2 gap-x-8 gap-y-3', 'grid-cols-2 gap-x-8 gap-y-6')

# 2. Refactor the Wellness category to the requested 2-row layout
wellness_pattern = r'\{taxCategory === \'health\' && \(.*?<div className="col-span-full space-y-4">.*?</div>\s+\)\}'
wellness_replacement = r"""{taxCategory === 'health' && (
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
                )}"""

content = re.sub(wellness_pattern, wellness_replacement, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("SUCCESS: Dual-row Wellness layout applied.")
