def calculate_old_regime(income, deductions, age_group="Individual (Below 60)"):
    """
    Calculate Tax for FY 2024-25 (Old Regime)
    """
    taxable_income = max(0, income - deductions - 50000)  # Standard Deduction 50k
    
    # Define Exemption Limit based on Age Group
    exemption_limit = 250000
    if "Senior (60-80)" in age_group:
        exemption_limit = 300000
    elif "Super Senior (80+)" in age_group:
        exemption_limit = 500000

    if taxable_income <= exemption_limit:
        return 0
    
    tax = 0
    # Slab 1: Exemption Limit to 5L
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
    Calculate Tax for FY 2024-25 (New Regime - Revised Slabs)
    Note: New Regime slabs are same for all ages since FY 2023-24.
    """
    taxable_income = max(0, income - 75000)  # Standard Deduction 75k (Budget 2024)
    
    # Rebate 87A (New Regime) - Tax Nil if income <= 7L (pre-deduction)
    if income <= 775000: # Effective nil tax if income <= 7L + 75k SD
        return 0
        
    tax = 0
    # 0 - 3L: Nil
    # 3L - 6L @ 5%
    if taxable_income > 300000:
        amount = min(taxable_income, 600000) - 300000
        tax += amount * 0.05
        
    # 6L - 9L @ 10%
    if taxable_income > 600000:
        amount = min(taxable_income, 900000) - 600000
        tax += amount * 0.10
        
    # 9L - 12L @ 15%
    if taxable_income > 900000:
        amount = min(taxable_income, 1200000) - 900000
        tax += amount * 0.15
        
    # 12L - 15L @ 20%
    if taxable_income > 1200000:
        amount = min(taxable_income, 1500000) - 1200000
        tax += amount * 0.20
        
    # Above 15L @ 30%
    if taxable_income > 1500000:
        amount = taxable_income - 1500000
        tax += amount * 0.30
        
    return tax * 1.04  # 4% Cess

def get_tax_synthesis(data):
    """
    Main Engine Entry Point - Refined Optimization
    """
    # Sum up income
    gross_income = (
        float(data.get('basic_salary', 0)) + 
        float(data.get('allowances', 0)) + 
        float(data.get('bonus', 0)) + 
        float(data.get('interest_income', 0)) + 
        float(data.get('rental_income', 0)) + 
        float(data.get('freelance_income', 0))
    )
    
    # Sum up deductions for Old Regime
    deductions = (
        min(150000, float(data.get('investments_80c', 0))) + 
        float(data.get('deduction_80d', 0)) + 
        float(data.get('deduction_80e', 0)) + 
        min(50000, float(data.get('nps_contribution', 0)))
    )
    
    # Add HRA exemption if applicable
    hra = float(data.get('hra', 0))
    rent = float(data.get('rent_paid_monthly', 0)) * 12
    if rent > 0:
        hra_exemption = min(hra, max(0, rent - (float(data.get('basic_salary', 0)) * 0.1)))
        deductions += hra_exemption

    # Get Age Group for calculation
    age_group = data.get('age_group', 'Individual (Below 60)')

    old_tax = calculate_old_regime(gross_income, deductions, age_group)
    new_tax = calculate_new_regime(gross_income)
    
    # CALCULATE DELTA SAVINGS
    net_retention = abs(old_tax - new_tax)
    recommended = "New Regime" if new_tax <= old_tax else "Old Regime"
    
    return {
        "gross_income": gross_income,
        "old_regime_tax": round(old_tax),
        "new_regime_tax": round(new_tax),
        "net_retention": round(net_retention),
        "recommended_regime": recommended,
        "deductions_applied": round(deductions)
    }
