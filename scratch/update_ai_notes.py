import re

file_path = r'f:\VTAB_PROJECTS\Ai_Tax_Application\backend\ai_service.py'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the AI prompt to include 'compliance_note'
pattern_prompt = r'\"potential_savings\": \"₹XXXX\",.*?\"impact_score\": \"Critical/High/Medium\"'
replacement_prompt = r'''"potential_savings": "₹XXXX",
                "rationale": "Deep statutory explanation of why this strategy is effective.",
                "steps": ["Step 1", "Step 2", "Step 3"],
                "compliance_note": "Unique statutory reference explaining the legality/benefit of this specific section.",
                "impact_score": "Critical/High/Medium"'''

content = re.sub(pattern_prompt, replacement_prompt, content, flags=re.DOTALL)

# 2. Update the fallback logic to include unique compliance notes
fallback_updates = [
    {
        "title": "80C Maximization",
        "note": "Compliant with Section 80C of the IT Act. ELSS/PPF are EEE (Exempt-Exempt-Exempt) instruments, ensuring tax-free maturity."
    },
    {
        "title": "NPS Booster",
        "note": "Fully aligned with PFRDA guidelines. Section 80CCD(1B) provides an exclusive deduction layer independent of the standard 80C cap."
    },
    {
        "title": "Home Loan Shield",
        "note": "Statutory deduction under Section 24(b). Verified against interest certificate requirements for self-occupied residential property."
    }
]

for update in fallback_updates:
    pattern = rf'\"title\": \"{update["title"]}\",.*?\"impact_score\":'
    replacement = rf'"title": "{update["title"]}", \n                "action": "...", \n                "potential_savings": "...", \n                "rationale": "...", \n                "steps": [...], \n                "compliance_note": "{update["note"]}", \n                "impact_score":'
    # This is complex, let's just replace the whole fallback block for precision
    pass

# Better approach: Replace the whole fallback return block
fallback_block_pattern = r'# Intelligent Fallback logic if AI fails.*?return \{.*?\"strategic_impact\": \"You can achieve significant retention by maximizing statutory chapters\.\"\s+\}'
new_fallback_block = r'''# Intelligent Fallback logic if AI fails
        insights = []
        if current_values["80C"] < 150000:
            insights.append({
                "title": "80C Maximization", 
                "action": "Invest remaining in PPF/ELSS", 
                "potential_savings": f"₹{int((150000 - current_values['80C']) * 0.3)}", 
                "rationale": "Section 80C allows a flat reduction of taxable income up to 1.5L. Utilizing the full gap reduces your top-slice taxable income.",
                "steps": ["1. Identify the gap in your 80C portfolio", "2. Invest in ELSS or PPF", "3. Submit proofs to HR"],
                "compliance_note": "Compliant with Section 80C. ELSS/PPF are EEE instruments, ensuring tax-free corpus maturity.",
                "impact_score": "Critical"
            })
        if current_values["80CCD1B"] < 50000:
            insights.append({
                "title": "NPS Booster", 
                "action": "Invest extra 50k in Section 80CCD(1B)", 
                "potential_savings": "₹15,600", 
                "rationale": "80CCD(1B) is a dedicated NPS window over and above the 80C limit.",
                "steps": ["1. Open an NPS Tier-1 account", "2. Contribute exactly ₹50,000", "3. Claim additional deduction"],
                "compliance_note": "Aligned with PFRDA guidelines. 80CCD(1B) provides an exclusive deduction layer independent of the standard 80C cap.",
                "impact_score": "High"
            })
        if current_values["24B"] < 200000:
            insights.append({
                "title": "Home Loan Shield", 
                "action": "Utilize Section 24(b) for Interest", 
                "potential_savings": "₹62,400", 
                "rationale": "Section 24(b) allows interest deduction on home loans for self-occupied properties.",
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
print("SUCCESS: AI Service updated with unique compliance notes.")
