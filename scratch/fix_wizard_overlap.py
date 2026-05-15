import re

file_path = r'f:\VTAB_PROJECTS\Ai_Tax_Application\src\components\wizard\TaxWizard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Reduce gaps in the grid for all categories to save space
content = content.replace('grid grid-cols-2 gap-x-8 gap-y-4', 'grid grid-cols-2 gap-x-8 gap-y-3')

# 2. Add safe bottom padding to the scrollable container so buttons don't overlap last item
content = content.replace('flex-1 overflow-y-auto no-scrollbar px-10 py-6', 'flex-1 overflow-y-auto no-scrollbar px-10 pt-6 pb-24')

# 3. Tighten the Wellness category specifically
wellness_pattern = r'\{taxCategory === \'health\' && \(.*?<>\s+(.*?)\s+</>\s+\)\}'
wellness_replacement = r"""{taxCategory === 'health' && (
                  <div className="col-span-full space-y-4">
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
                    <div className="space-y-0.5">
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
                  </div>
                )}"""

content = re.sub(wellness_pattern, wellness_replacement, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("SUCCESS: Layout compressed and buffer added.")
