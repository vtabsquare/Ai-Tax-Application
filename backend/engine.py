def calculate_old_regime(income, deductions, age_group="Individual (Below 60)"):
    """
    Calculate Tax for FY 2025-26 (Old Regime - Consistent)
    """
    taxable_income = max(0, income - deductions - 50000)  # Standard Deduction 50k
    
    # Define Exemption Limit based on Age Group
    exemption_limit = 250000
    if "Senior" in age_group:
        exemption_limit = 300000
    elif "Super Senior" in age_group:
        exemption_limit = 500000

    if taxable_income <= exemption_limit:
        return 0
    
    tax = 0
    # Slab 1: Exemption Limit to 5L @ 5%
    if taxable_income > exemption_limit:
        amount = min(taxable_income, 500000) - exemption_limit
        tax += amount * 0.05
        
    # Slab 2: 5L to 10L @ 20%
    if taxable_income > 500000:
        amount = min(taxable_income, 1000000) - 500000
        tax += amount * 0.20
        
    # Slab 3: Above 10L @ 30%
    if taxable_income > 1000000:
        amount = taxable_income - 1000000
        tax += amount * 0.30
        
    # Section 87A Rebate for Old Regime (Up to 5L taxable)
    if taxable_income <= 500000:
        tax = 0
        
    return tax * 1.04  # 4% Cess

def calculate_new_regime(income):
    """
    Calculate Tax for FY 2025-26 (New Regime - Revised Slabs Budget 2025)
    As per 2026 Standards: Slabs move in 4-Lakh increments.
    """
    taxable_income = max(0, income - 75000)  # Standard Deduction 75k
    
    # Rebate 87A (New Regime 2025-26) - Tax Nil if taxable income <= 12,00,000
    if taxable_income <= 1200000:
        return 0
        
    tax = 0
    # 0 - 4L: Nil
    # 4L - 8L @ 5%
    if taxable_income > 400000:
        amount = min(taxable_income, 800000) - 400000
        tax += amount * 0.05
        
    # 8L - 12L @ 10%
    if taxable_income > 800000:
        amount = min(taxable_income, 1200000) - 800000
        tax += amount * 0.10
        
    # 12L - 16L @ 15%
    if taxable_income > 1200000:
        amount = min(taxable_income, 1600000) - 1200000
        tax += amount * 0.15
        
    # 16L - 20L @ 20%
    if taxable_income > 1600000:
        amount = min(taxable_income, 2000000) - 1600000
        tax += amount * 0.20
        
    # 20L - 24L @ 25%
    if taxable_income > 2000000:
        amount = min(taxable_income, 2400000) - 2000000
        tax += amount * 0.25
        
    # Above 24L @ 30%
    if taxable_income > 2400000:
        amount = taxable_income - 2400000
        tax += amount * 0.30
        
    return tax * 1.04  # 4% Cess

def get_tax_synthesis(data):
    """
    Main Engine Entry Point - Future Proof 2026 Implementation (V57.0)
    """
    # 1. Sum up Gross Income
    gross_income = (
        float(data.get('basicSalary', 0)) + 
        float(data.get('allowances', 0)) + 
        float(data.get('bonus', 0)) + 
        float(data.get('interestIncome', 0)) + 
        float(data.get('rentalIncome', 0)) + 
        float(data.get('freelanceIncome', 0))
    )
    
    age_group = data.get('age', 'Individual (Below 60)')
    is_senior = "Senior" in age_group or "Super Senior" in age_group

    # 2. IMPLEMENT STATUTORY CAPPING
    applied_80C = min(150000, float(data.get('investments80C', 0)))
    applied_NPS = min(50000, float(data.get('sec80CCD1B', 0)))
    applied_80D = min(100000, float(data.get('deduction80D', 0)))
    limit_80DDB = 100000 if is_senior else 40000
    applied_80DDB = min(limit_80DDB, float(data.get('sec80DDB', 0)))
    applied_Disability = min(125000, float(data.get('sec80U', 0)))
    applied_24b = min(200000, float(data.get('sec24b', 0)))
    applied_80E = float(data.get('sec80E', 0))
    applied_80EEA = min(150000, float(data.get('sec80EEA', 0)))
    applied_80EE = min(50000, float(data.get('sec80EE', 0)))
    applied_80G = float(data.get('sec80G', 0)) * 0.5
    applied_80GG = min(60000, float(data.get('sec80GG', 0)))
    limit_TTA = 50000 if is_senior else 10000
    applied_Interest = min(limit_TTA, float(data.get('sec80TTA', 0)))

    total_deductions = (
        applied_80C + applied_NPS + applied_80D + applied_80DDB + 
        applied_Disability + applied_24b + applied_80E + 
        applied_80EEA + applied_80EE + applied_80G + 
        applied_80GG + applied_Interest
    )

    # 3. HRA Exemption Logic (Official 3-Step Rule)
    hra_received = float(data.get('hra', 0))
    rent_paid_annual = float(data.get('rentPaid', 0)) * 12
    is_metro = data.get('isMetro', False)
    basic_salary = float(data.get('basicSalary', 0))

    if rent_paid_annual > 0 and hra_received > 0:
        # Rule 1: Actual HRA
        rule1 = hra_received
        
        # Rule 2: Rent Paid minus 10% of Basic
        rule2 = max(0, rent_paid_annual - (basic_salary * 0.1))
        
        # Rule 3: 50% of Basic (Metro) or 40% of Basic (Non-Metro)
        metro_multiplier = 0.5 if is_metro else 0.4
        rule3 = basic_salary * metro_multiplier
        
        # HRA Exemption is the LEAST of the three
        hra_exemption = min(rule1, rule2, rule3)
        total_deductions += hra_exemption

    # 4. Final Math Synthesis
    old_tax = calculate_old_regime(gross_income, total_deductions, age_group)
    new_tax = calculate_new_regime(gross_income)
    
    recommended = "New Regime" if new_tax <= old_tax else "Old Regime"
    delta = abs(old_tax - new_tax)
    
    return {
        "gross_income": gross_income,
        "old_regime_tax": round(old_tax),
        "new_regime_tax": round(new_tax),
        "net_retention": round(delta),
        "recommended_regime": recommended,
        "deductions_applied": round(total_deductions),
        "is_senior": is_senior,
        "regime_year": "FY 2025-26"
    }
