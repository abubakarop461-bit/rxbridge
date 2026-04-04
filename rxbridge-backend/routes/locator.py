from fastapi import APIRouter

router = APIRouter()

@router.get("/locator")
def locator():
    stores = [
        {
          "name": "Jan Aushadhi Kendra - Dharampeth",
          "address": "Dharampeth, Nagpur - 440010",
          "distance_km": 0.8,
          "timing": "9AM - 9PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Dharampeth+Nagpur"
        },
        {
          "name": "PMBJK - Medical Square",
          "address": "Medical Square, Nagpur - 440003",
          "distance_km": 1.4,
          "timing": "8AM - 10PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Medical+Square+Nagpur"
        },
        {
          "name": "Jan Aushadhi Store - Sitabuldi",
          "address": "Sitabuldi, Nagpur - 440012",
          "distance_km": 2.1,
          "timing": "9AM - 8PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Sitabuldi+Nagpur"
        },
        {
          "name": "PMBJK - Gandhibagh",
          "address": "Gandhibagh, Nagpur - 440002",
          "distance_km": 2.8,
          "timing": "9AM - 9PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Gandhibagh+Nagpur"
        },
        {
          "name": "Jan Aushadhi Kendra - Manewada",
          "address": "Manewada Road, Nagpur - 440024",
          "distance_km": 3.5,
          "timing": "10AM - 8PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Manewada+Nagpur"
        },
        {
          "name": "Jan Aushadhi Kendra - Wardha Road",
          "address": "Wardha Road, Nagpur - 440015",
          "distance_km": 4.2,
          "timing": "9AM - 9PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Wardha+Road+Nagpur"
        },
        {
          "name": "PMBJK - Itwari",
          "address": "Itwari, Nagpur - 440002",
          "distance_km": 3.1,
          "timing": "8AM - 9PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Itwari+Nagpur"
        },
        {
          "name": "Jan Aushadhi Store - Hingna Road",
          "address": "Hingna Road, Nagpur - 440016",
          "distance_km": 5.0,
          "timing": "9AM - 8PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Hingna+Nagpur"
        },
        {
          "name": "PMBJK - Kamptee Road",
          "address": "Kamptee Road, Nagpur - 440026",
          "distance_km": 5.8,
          "timing": "9AM - 9PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Kamptee+Nagpur"
        },
        {
          "name": "Jan Aushadhi Kendra - Nandanvan",
          "address": "Nandanvan, Nagpur - 440009",
          "distance_km": 4.5,
          "timing": "10AM - 8PM",
          "maps_url": "https://maps.google.com/?q=Jan+Aushadhi+Nandanvan+Nagpur"
        }
    ]
    return {"stores": stores}

