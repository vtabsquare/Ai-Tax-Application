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
    employment: Optional[str] = "Salaried"
    city: str
    isMetro: bool = False
    # Income Fields
    basicSalary: float = 0
    hra: float = 0
    allowances: float = 0
    bonus: float = 0
    interestIncome: float = 0
    rentalIncome: float = 0
    freelanceIncome: float = 0
    # Tax Savings Fields (Master List)
    investments80C: float = 0
    sec80CCC: float = 0
    sec80CCD1: float = 0
    sec80CCD1B: float = 0
    sec80CCD2: float = 0
    deduction80D: float = 0
    sec80DD: float = 0
    sec80DDB: float = 0
    sec80E: float = 0
    sec80EEA: float = 0
    sec80G: float = 0
    sec80GG: float = 0
    sec80TTA: float = 0
    sec80U: float = 0
    sec24b: float = 0
    sec80EE: float = 0
    rentPaid: float = 0

@app.get("/")
async def health_check():
    return {"status": "active", "engine": "TaxAI V1.0", "regime": "FY 2024-25"}

@app.post("/synthesize")
async def synthesize(data: TaxInput):
    try:
        input_data = data.dict()
        
        # 1. Perform Mathematical Synthesis (Smart Capping Logic inside engine)
        synthesis = get_tax_synthesis(input_data)
        
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
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
