import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
API_KEY = "AIzaSyC-sRzvYQryG8g5q7rdbOrcUUqv6sbaSTA"
genai.configure(api_key=API_KEY)

def get_ai_suggestions(tax_data, synthesis_results):
    """
    Generate personalized tax advice using Gemini Pro (Detailed Old Regime List)
    """
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are an elite Indian Tax Strategist AI. Analyze the following tax data for FY 2024-25:
    
    USER DATA:
    - Gross Income: ₹{synthesis_results['gross_income']}
    - Employment: {tax_data.get('employment')}
    - Deductions Applied: ₹{synthesis_results['deductions_applied']}
    
    SYNTHESIS RESULTS:
    - Old Regime Tax: ₹{synthesis_results['old_regime_tax']}
    - New Regime Tax: ₹{synthesis_results['new_regime_tax']}
    - Recommended: {synthesis_results['recommended_regime']}
    
    TASK:
    Provide 2 very crisp, high-impact suggestions for the user.
    
    Suggestion 1 (suggestion_old): Provide a numbered list of exactly 5 specific actions to reduce tax IF the user chooses the OLD Regime. Be very specific about limits (e.g. 1.5L for 80C, 50k for NPS).
    
    Suggestion 2 (suggestion_new): A single strategic sentence about how to optimize or reinvest IF the user chooses the NEW Regime.
    
    FORMAT:
    Return ONLY a JSON object with this structure:
    {{
        "verdict": "A 10-word executive summary",
        "suggestion_old": "1. ...\n2. ...\n3. ...\n4. ...\n5. ...",
        "suggestion_new": "One sentence starting with 'For Advanced (New), you should...'"
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
        print(f"AI Error: {e}")
        return {
            "verdict": "Institutional assessment identified optimization path.",
            "suggestion_old": "1. Maximize 80C up to ₹1.5L.\n2. Invest ₹50k in NPS 80CCD(1B).\n3. Claim ₹25k Health Insurance (80D).\n4. Optimize HRA via rent receipts.\n5. Claim Standard Deduction of ₹50k.",
            "suggestion_new": "For Advanced (New), leverage the ₹75k Standard Deduction and reinvest your tax savings."
        }
