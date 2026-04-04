from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.medicine_service import find_generics

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze")
async def analyze(request: AnalyzeRequest):
    try:
        if not request.text or not request.text.strip():
            return JSONResponse(status_code=400, content={"error": "No medicine names provided"})
        result = find_generics(request.text)
        return result
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Something went wrong"})