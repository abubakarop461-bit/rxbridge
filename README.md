# RxBridge 💊
### Generic Medicine Finder for India

> "Google Translate for your medicine bill"

## Problem
Indian families overpay up to 90% on medicines because
nobody tells them generic equivalents exist.
Medicines account for 69% of out-of-pocket health
spending in India.

## Solution
Enter your prescription → RxBridge instantly shows
generic alternatives → Save up to 90% → Find nearest
Jan Aushadhi store to buy them.

## Tech Stack
- Frontend: Next.js 14, Tailwind CSS
- Backend: FastAPI, Python
- Matching: FuzzyWuzzy string matching
- Database: NPPA verified medicine prices

## Team Apex
- Abubakar — Backend + AI
- [Teammate name] — Frontend

## Run Locally

### Backend
cd rxbridge-backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

### Frontend
cd rxbridge-frontend
npm install
npm run dev

## Impact
- 30+ medicines in database
- Covers most common Indian prescriptions
- Nagpur Jan Aushadhi store locator included
- Works offline, no API dependencies