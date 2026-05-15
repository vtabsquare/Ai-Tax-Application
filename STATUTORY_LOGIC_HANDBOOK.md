# TaxAI Institutional: Statutory Logic Handbook (V61.0)
## FY 2025-26 | AY 2026-27 Compliance Engine

This document provides the definitive mathematical logic used by the TaxAI Institutional Engine to synthesize tax liabilities and strategic insights.

---

### 1. Income Synthesis Logic
The engine first calculates the **Gross Total Income (GTI)** by aggregating all revenue streams:
- **Salaried Income**: `Basic Salary` + `HRA` + `Bonus` + `Allowances`.
- **Passive Income**: `Interest Income` (Savings/FD) + `Rental Income` (from property).
- **Secondary Income**: `Freelance / Consulting revenue`.

---

### 2. HRA Exemption (Old Regime Only)
The engine applies the **Official 3-Step Statutory Rule** to calculate the HRA exemption:
The exemption is the **LEAST** of the following three values:
1. **Actual HRA**: The HRA component received from the employer.
2. **Rent Adjustment**: (Annual Rent Paid) - (10% of Annual Basic Salary).
3. **City Threshold**: 
   - **50% of Basic Salary** (if "Metro (Tier 1)" is selected).
   - **40% of Basic Salary** (if "Non-Metro" is selected).

---

### 3. Deductions Pipeline (Old Regime)
The engine applies deductions in a specific statutory sequence to arrive at the **Net Taxable Income**:

| Section | Description | Limit (FY 25-26) |
| :--- | :--- | :--- |
| **Standard Deduction** | Auto-applied for all salaried employees | ₹50,000 |
| **Section 80C** | LIC, PPF, ELSS, EPF, Principal on Home Loan | ₹1,50,000 |
| **80CCD(1B)** | Additional NPS contribution | ₹50,000 |
| **Section 80D** | Health Insurance (Self/Parents) | ₹50,000 (Non-Senior) / ₹1,00,000 (Senior) |
| **Section 24(b)** | Home Loan Interest (Self-occupied) | ₹2,00,000 |
| **Section 80E** | Education Loan Interest | No Upper Limit |
| **Section 80G** | Donations to recognized funds | 50% or 100% of donation |
| **Section 80TTA/B** | Savings Interest (TTA for Individual / TTB for Senior) | ₹10,000 (TTA) / ₹50,000 (TTB) |

---

### 4. New Regime Calculation (The "Advanced" Tier)
The New Regime (Default) is calculated using the **Budget 2025 Revised Slabs**:

#### **Step A: Standard Deduction**
- **Salaried Employees**: ₹75,000 (Auto-deducted from GTI).

#### **Step B: Progressive Slabs (4-Lakh Intervals)**
| Income Range | Tax Rate |
| :--- | :--- |
| ₹0 - ₹4,00,000 | 0% |
| ₹4,00,001 - ₹8,00,000 | 5% |
| ₹8,00,001 - ₹12,00,000 | 10% |
| ₹12,00,001 - ₹16,00,000 | 15% |
| ₹16,00,001 - ₹20,00,000 | 20% |
| Above ₹20,00,000 | 25% |

#### **Step C: Section 87A Rebate (The 12-Lakh Rule)**
- If **Taxable Income ≤ ₹12,00,000**, the tax liability is reduced to **ZERO** via the 100% statutory rebate.

---

### 5. Final Synthesis
1. **Total Tax**: Calculated based on the chosen regime.
2. **Health & Education Cess**: 4% is added to the calculated tax.
3. **Net Retention**: `Tax(Old Regime)` - `Tax(New Regime)`.
4. **AI Verdict**: The Neural Engine analyzes the "Delta" (the difference) and recommends the regime with the lowest liability.

---
**Disclaimer**: This logic is strictly aligned with the Union Budget 2025-26 statutory updates as of May 2026.
