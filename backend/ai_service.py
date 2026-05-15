import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=API_KEY)

def get_ai_suggestions(tax_data, synthesis_results):
    """
    Generate Deep Statutory Tax Intelligence using Gemini Pro
    """
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    is_senior = synthesis_results.get('is_senior', False)
    
    # Statutory Reference for the AI
    statutory_limits = {
        "80C": 150000,
        "80CCD1B": 50000,
        "80D": 100000 if is_senior else 50000,
        "24b": 200000,
        "80EEA": 150000,
        "80GG": 60000,
        "80TTA_B": 50000 if is_senior else 10000,
        "80DDB": 100000 if is_senior else 40000,
        "80U_DD": 125000
    }
    
    # Current User Values
    current_values = {
        "80C": float(tax_data.get('investments80C', 0)),
        "80CCD1B": float(tax_data.get('sec80CCD1B', 0)),
        "80D": float(tax_data.get('deduction80D', 0)),
        "24b": float(tax_data.get('sec24b', 0)),
        "80EEA": float(tax_data.get('sec80EEA', 0)),
        "80GG": float(tax_data.get('sec80GG', 0)),
        "80TTA": float(tax_data.get('sec80TTA', 0)),
        "80G": float(tax_data.get('sec80G', 0)),
        "80E": float(tax_data.get('sec80E', 0))
    }

    prompt = f"""
    You are an AI Tax Auditor for the Indian Income Tax Department. 
    Analyze the following profile and identify EVERY possible optimization gap.
    
    PROFILE:
    - Income: ₹{synthesis_results['gross_income']}
    - Recommended: {synthesis_results['recommended_regime']}
    
    STATUTORY LIMITS VS USER CURRENT:
    {json.dumps(statutory_limits, indent=2)}
    VS
    {json.dumps(current_values, indent=2)}
    
    TAX SLAB CONTEXT:
    The user is likely in a high tax bracket. Every ₹10,000 deduction saves approximately ₹3,120 in tax (including Cess).
    
    TASK:
    1. You MUST identify at least 6 to 8 distinct Actionable Insights if gaps exist.
    2. For each insight, provide a title, a specific action, and the EXACT calculated tax reduction (e.g., ₹15,600).
    3. Calculate the tax saving as: Gap Amount * User Slab (assume 30% if income > 15L, 20% if 10-15L, 10% if 7-10L).
    4. CRITICAL: If a user has already MAXED a section (e.g., 80C is 150,000), do NOT suggest it.
    
    FORMAT:
    Return ONLY a JSON object:
    {{
        "verdict": "string (12-word executive summary)",
        "actionable_insights": [
            {{
                "title": "catchy title",
                "action": "exact instructions",
                "potential_savings": "₹XXXX",
                "investment_required": "₹XXXX",
                "rationale_points": ["Statutory Point 1", "Statutory Point 2", "Statutory Point 3"],
                "steps": ["Step 1", "Step 2", "Step 3"],
                "compliance_note": "Unique statutory reference.",
                "impact_score": "Critical/High/Medium"
            }}
        ],
        "strategic_impact": "string (A deep mathematical summary of total potential retention)"
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        content = response.text.strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        return json.loads(content)
    except Exception as e:
        print(f"AI ERROR: {e}")
        # Intelligent Fallback logic if AI fails
        insights = []
        if current_values["80C"] < 150000:
            insights.append({"title": "80C Maximization", "action": "Invest remaining in PPF/ELSS", "potential_savings": f"₹{int((150000 - current_values['80C']) * 0.3)}", "impact_score": "Critical"})
        if current_values["80CCD1B"] < 50000:
            insights.append({"title": "NPS Booster", "action": "Invest extra 50k in Section 80CCD(1B)", "potential_savings": "₹15,600", "impact_score": "High"})
        if current_values["24b"] < 200000:
            insights.append({"title": "Home Loan Shield", "action": "Utilize Section 24(b) for Interest", "potential_savings": "₹62,400", "impact_score": "Critical"})
        if current_values["80D"] < 50000:
            insights.append({"title": "Health Guard", "action": "Secure Health Insurance for Family", "potential_savings": "₹15,600", "impact_score": "High"})
            
        return {
            "verdict": "Your profile is being synthesized using our local statutory engine.",
            "actionable_insights": insights[:5],
            "strategic_impact": "Fully utilizing your statutory limits could preserve significant capital. Ensure all certificates are valid for the current FY."
        }
