import re

file_path = r'f:\VTAB_PROJECTS\Ai_Tax_Application\backend\ai_service.py'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define a more flexible pattern
pattern = r'\"verdict\": \"string \(12-word executive summary\)\",\s+\"actionable_insights\": \[.*?\"strategic_impact\": \"string \(A deep mathematical summary of total potential retention\)\"\s+\}\}\s+"""'

replacement = r'''"verdict": "string (12-word executive summary)",
        "actionable_insights": [
            {{
                "title": "catchy title",
                "action": "exact instructions",
                "potential_savings": "₹XXXX",
                "rationale": "Deep statutory explanation of why this strategy is effective.",
                "steps": ["Step 1", "Step 2", "Step 3"],
                "impact_score": "Critical/High/Medium"
            }}
        ],
        "strategic_impact": "string (A deep mathematical summary of total potential retention)"
    }}
    """'''

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Also update the fallback logic
fallback_pattern = r'# Intelligent Fallback logic if AI fails.*?return \{.*?\"strategic_impact\": \"You can achieve significant retention by maximizing statutory chapters\.\"\s+\}'
fallback_replacement = r'''# Intelligent Fallback logic if AI fails
        insights = []
        if current_values["80C"] < 150000:
            insights.append({
                "title": "80C Maximization", 
                "action": "Invest remaining in PPF/ELSS", 
                "potential_savings": f"₹{int((150000 - current_values['80C']) * 0.3)}", 
                "rationale": "Section 80C allows a flat reduction of taxable income up to 1.5L. Utilizing the full gap reduces your top-slice taxable income.",
                "steps": ["1. Identify the gap in your 80C portfolio", "2. Invest in ELSS or PPF", "3. Submit proofs to HR"],
                "impact_score": "Critical"
            })
        if current_values["80CCD1B"] < 50000:
            insights.append({
                "title": "NPS Booster", 
                "action": "Invest extra 50k in Section 80CCD(1B)", 
                "potential_savings": "₹15,600", 
                "rationale": "80CCD(1B) is a dedicated NPS window over and above the 80C limit.",
                "steps": ["1. Open an NPS Tier-1 account", "2. Contribute exactly ₹50,000", "3. Claim additional deduction"],
                "impact_score": "High"
            })
        if current_values["24B"] < 200000:
            insights.append({
                "title": "Home Loan Shield", 
                "action": "Utilize Section 24(b) for Interest", 
                "potential_savings": "₹62,400", 
                "rationale": "Section 24(b) allows interest deduction on home loans for self-occupied properties.",
                "steps": ["1. Obtain interest certificate from bank", "2. Declare interest amount in ITR", "3. Ensure property is self-occupied"],
                "impact_score": "Critical"
            })
            
        return {
            "verdict": "Your profile is being synthesized using our local statutory engine.",
            "actionable_insights": insights,
            "strategic_impact": "You can achieve significant retention by maximizing statutory chapters."
        }'''

new_content = re.sub(fallback_pattern, fallback_replacement, new_content, flags=re.DOTALL)

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: AI Service updated.")
else:
    print("ERROR: Patterns not found.")
