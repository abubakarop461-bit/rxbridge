import json
import os
import re
from fuzzywuzzy import process

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDICINES_PATH = os.path.join(BASE_DIR, "data", "medicines.json")

with open(MEDICINES_PATH, "r") as f:
    MEDICINES_DB = json.load(f)["medicines"]

# Pre-map all brand names to their respective medicine objects
ALL_BRANDS_MAP = {}
for med in MEDICINES_DB:
    for brand in med["brand_names"]:
        ALL_BRANDS_MAP[brand] = med

ALL_BRAND_NAMES = list(ALL_BRANDS_MAP.keys())

def find_generics(text: str) -> dict:
    matched = []
    unmatched = []

    total_branded = 0
    total_generic = 0

    # Split input text by newlines and commas
    parts = re.split(r'[\n,]', text)
    
    for part in parts:
        raw_name = part.strip()
        if not raw_name:
            continue
            
        name = raw_name.lower()
        matched_med = None
        matched_brand = None
        
        # Exact Match
        for brand, med in ALL_BRANDS_MAP.items():
            if name == brand.lower():
                matched_med = med
                matched_brand = brand
                break
                
        # Fuzzy Match
        if not matched_med:
            result = process.extractOne(name, ALL_BRAND_NAMES, score_cutoff=70)
            if result:
                matched_brand = result[0]
                matched_med = ALL_BRANDS_MAP[matched_brand]

        if matched_med:
            branded_price = matched_med["branded"]
            generic_price = matched_med["generic"]
            savings_per_strip = branded_price - generic_price
            savings_percent = round((savings_per_strip / branded_price) * 100) if branded_price > 0 else 0
            
            matched.append({
                "input_name": raw_name,
                "brand": matched_brand,
                "salt": f"{matched_med['salt']} {matched_med['dosage']}",
                "category": matched_med["category"],
                "branded_price": branded_price,
                "generic_price": generic_price,
                "savings_per_strip": savings_per_strip,
                "savings_percent": savings_percent,
                "jan_aushadhi_available": True
            })
            
            total_branded += branded_price
            total_generic += generic_price
        else:
            unmatched.append(raw_name)

    total_savings = total_branded - total_generic
    overall_savings_percent = round((total_savings / total_branded) * 100) if total_branded > 0 else 0
    annual_savings = total_savings * 12
    
    return {
        "matched": matched,
        "unmatched": unmatched,
        "summary": {
            "total_branded": total_branded,
            "total_generic": total_generic,
            "total_savings": total_savings,
            "savings_percent": overall_savings_percent,
            "annual_savings": annual_savings,
            "medicines_found": len(matched),
            "medicines_not_found": len(unmatched)
        }
    }
