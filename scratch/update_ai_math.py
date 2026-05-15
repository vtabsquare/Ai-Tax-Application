import re

file_path = r'f:\VTAB_PROJECTS\Ai_Tax_Application\backend\ai_service.py'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the AI prompt for triple-insights and investment math
pattern_prompt = r'\"potential_savings\": \"₹XXXX\",.*?\"impact_score\": \"Critical/High/Medium\"'
replacement_prompt = r'''"potential_savings": "₹XXXX",
                "investment_required": "₹XXXX",
                "rationale_points": ["Statutory Point 1", "Statutory Point 2", "Statutory Point 3"],
                "steps": ["Step 1", "Step 2", "Step 3"],
                "compliance_note": "Unique statutory reference.",
                "impact_score": "Critical/High/Medium"'''

content = re.sub(pattern_prompt, replacement_prompt, content, flags=re.DOTALL)

# 2. Update fallback logic
fallback_block_pattern = r'# Intelligent Fallback logic if AI fails.*?return \{.*?\"strategic_impact\": \"You can achieve significant retention by maximizing statutory chapters\.\"\s+\}'
new_fallback_block = r'''# Intelligent Fallback logic if AI fails
        insights = []
        if current_values["80C"] < 150000:
            gap = 150000 - current_values["80C"]
            savings = int(gap * 0.3)
            insights.append({
                "title": "80C Maximization", 
                "action": "Invest remaining in PPF/ELSS", 
                "potential_savings": f"₹{savings}", 
                "investment_required": f"₹{int(gap)}",
                "rationale_points": [
                    "Full utilization of Section 80C reduces taxable income by 1.5 Lakhs.",
                    "PPF and ELSS offer EEE status (Exempt-Exempt-Exempt).",
                    "Acts as a long-term wealth generator with government-backed security."
                ],
                "steps": ["1. Identify the gap in your 80C portfolio", "2. Invest in ELSS or PPF", "3. Submit proofs to HR"],
                "compliance_note": "Compliant with Section 80C. ELSS/PPF are EEE instruments, ensuring tax-free corpus maturity.",
                "impact_score": "Critical"
            })
        if current_values["80CCD1B"] < 50000:
            insights.append({
                "title": "NPS Booster", 
                "action": "Invest extra 50k in Section 80CCD(1B)", 
                "potential_savings": "₹15,600", 
                "investment_required": "₹50,000",
                "rationale_points": [
                    "Exclusive window over and above the 1.5L limit of Section 80C.",
                    "Professional fund management with low expense ratios.",
                    "Additional tier of social security for retirement planning."
                ],
                "steps": ["1. Open an NPS Tier-1 account", "2. Contribute exactly ₹50,000", "3. Claim additional deduction"],
                "compliance_note": "Aligned with PFRDA guidelines. 80CCD(1B) provides an exclusive deduction layer independent of the standard 80C cap.",
                "impact_score": "High"
            })
        if current_values["24B"] < 200000:
            insights.append({
                "title": "Home Loan Shield", 
                "action": "Utilize Section 24(b) for Interest", 
                "potential_savings": "₹62,400", 
                "investment_required": "₹2,00,000 (Interest)",
                "rationale_points": [
                    "Directly reduces taxable income by the interest component of home loans.",
                    "Applicable for self-occupied properties for immediate tax relief.",
                    "One of the highest deduction caps available in the Old Regime."
                ],
                "steps": ["1. Obtain interest certificate from bank", "2. Declare interest amount in ITR", "3. Ensure property is self-occupied"],
                "compliance_note": "Statutory deduction under Section 24(b) for residential property interest payments.",
                "impact_score": "Critical"
            })
            
        return {
            "verdict": "Your profile is being synthesized using our local statutory engine.",
            "actionable_insights": insights,
            "strategic_impact": "You can achieve significant retention by maximizing statutory chapters."
        }'''

content = re.sub(fallback_block_pattern, new_fallback_block, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("SUCCESS: AI Service updated with triple-insights and investment math.")
