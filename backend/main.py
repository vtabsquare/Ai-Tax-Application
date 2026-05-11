from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from engine import get_tax_synthesis
from ai_service import get_ai_suggestions

app = FastAPI(title="TaxAI Executive Engine")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaxInput(BaseModel):
    name: str
    email: Optional[str] = None
    mobile: Optional[str] = None
    age: str
    employment: str
    city: str
    basicSalary: float = 0
    hra: float = 0
    allowances: float = 0
    bonus: float = 0
    interestIncome: float = 0
    rentalIncome: float = 0
    freelanceIncome: float = 0
    investments80C: float = 0
    deduction80D: float = 0
    deduction80E: float = 0
    nps: float = 0
    rentPaid: float = 0

@app.get("/")
async def health_check():
    return {"status": "active", "engine": "TaxAI V1.0", "regime": "FY 2024-25"}

@app.post("/synthesize")
async def synthesize(data: TaxInput):
    try:
        input_data = data.dict()
        mapped_data = {
            "basic_salary": input_data["basicSalary"],
            "hra": input_data["hra"],
            "allowances": input_data["allowances"],
            "bonus": input_data["bonus"],
            "interest_income": input_data["interestIncome"],
            "rental_income": input_data["rentalIncome"],
            "freelance_income": input_data["freelanceIncome"],
            "investments_80c": input_data["investments80C"],
            "deduction_80d": input_data["deduction80D"],
            "deduction_80e": input_data["deduction80E"],
            "nps_contribution": input_data["nps"],
            "rent_paid_monthly": input_data["rentPaid"]
        }
        
        # 1. Perform Mathematical Synthesis
        synthesis = get_tax_synthesis(mapped_data)
        
        # 2. Perform AI Intelligence Synthesis
        ai_insights = get_ai_suggestions(input_data, synthesis)
        
        return {
            "success": True,
            "synthesis": synthesis,
            "ai_insights": ai_insights
        }
    except Exception as e:
        print(f"API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
