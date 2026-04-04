'use client';

import { useState, useEffect, useRef } from 'react';
import { analyzeMedicines, getStores } from '@/lib/api';
import { 
  Camera, FileText, Image as ImageIcon, Loader2, 
  ArrowRight, AlertCircle, RefreshCcw, Sparkles,
  CheckCircle2, MapPin, Store, Clock, ExternalLink, Share2
} from 'lucide-react';

const CHIPS = ['Crocin', 'Pantop', 'Augmentin', 'Combiflam', 'Allegra', 'Metformin'];

const DEMO_PRESCRIPTION = `Crocin 500mg
Pantop 40mg
Augmentin 625mg
Allegra 120mg
Metformin 500mg`;

const LOADING_MESSAGES = [
  "Reading prescription...",
  "Finding generic alternatives...",
  "Calculating your savings..."
];

export default function AnalyzePage() {
  const [inputMode, setInputMode] = useState<'text' | 'photo'>('text');
  const [medicines, setMedicines] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  
  const [error, setError] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  const [stores, setStores] = useState<any[] | null>(null);
  const [loadingStores, setLoadingStores] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleChipClick = (chip: string) => {
    setMedicines((prev) => {
      const trimmed = prev.trim();
      return trimmed ? trimmed + '\n' + chip : chip;
    });
  };

  const handleAnalyze = async () => {
    if (!medicines.trim()) return;
    
    setLoading(true);
    setError(false);
    setLoadingMsgIdx(0);
    
    try {
      const res = await analyzeMedicines(medicines);
      const formattedResults = {
        summary: {
          monthly_branded_cost: res.data.summary?.total_branded,
          monthly_generic_cost: res.data.summary?.total_generic,
          total_savings: res.data.summary?.total_savings,
          annual_savings: res.data.summary?.annual_savings
        },
        matched: res.data.matched?.map((m: any) => ({
          category_badge: m.category,
          brand_name: m.brand,
          generic_name: m.salt,
          branded_price: m.branded_price,
          generic_price: m.generic_price,
          save_percentage: m.savings_percent,
          jan_aushadhi_available: m.jan_aushadhi_available
        })),
        unmatched: res.data.unmatched
      };
      setResults(formattedResults);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error("API Error", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadStores = async () => {
    setLoadingStores(true);
    try {
      const res = await getStores();
      // FALLBACK MOCK DATA if API isn't fully ready
      const defaultStores = [
        { store_name: "Jan Aushadhi Kendra - Station Road", address: "Shop 12, Near Railway Station", timing: "9 AM - 9 PM", distance: "1.2 km", maps_link: "#" },
        { store_name: "Jan Aushadhi Medical Store", address: "City Hospital Complex, M.G. Road", timing: "24x7", distance: "2.5 km", maps_link: "#" },
        { store_name: "Pradhan Mantri Jan Aushadhi", address: "Block C Market, Vasant Vihar", timing: "10 AM - 8 PM", distance: "3.1 km", maps_link: "#" }
      ];
      setStores(res.data?.length ? res.data : defaultStores);
    } catch (err) {
      console.log(err);
      setStores([]);
    } finally {
      setLoadingStores(false);
    }
  };

  const handleShare = () => {
    const text = `I saved ₹${results?.summary?.total_savings || 0}/month using RxBridge!\nSwitched branded medicines to generics.\nCheck yours free at RxBridge`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const resetForm = () => {
    setResults(null);
    setMedicines('');
    setStores(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-primary/20 selection:text-primary pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.location.href = '/'}
          >
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              RxBridge
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* INPUT SECTION */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Enter Your Medicines
            </h2>
            <p className="text-gray-500">
              Type the medicine names from your prescription
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  inputMode === 'text' 
                    ? 'bg-white text-gray-900 shadow' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4" /> Text Input
              </button>
              <button
                onClick={() => setInputMode('photo')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  inputMode === 'photo' 
                    ? 'bg-white text-gray-900 shadow' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Upload Photo
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-800">Could not analyze. Please try again.</h4>
                <p className="text-sm text-red-600 mt-1">There was an issue communicating with the server.</p>
              </div>
              <button 
                onClick={handleAnalyze}
                className="flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors border border-red-200"
              >
                <RefreshCcw className="w-4 h-4" /> Retry
              </button>
            </div>
          )}

          {inputMode === 'text' ? (
            <div className="space-y-6">
              <textarea
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                placeholder="Type medicine names, one per line&#10;Example:&#10;Crocin 500mg&#10;Pantop 40mg&#10;Augmentin 625mg"
                className="w-full h-[180px] border border-[#e5e7eb] rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all shadow-inner bg-gray-50/50"
              />
              
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Add</p>
                <div className="flex flex-wrap gap-2">
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleChipClick(chip)}
                      className="inline-flex items-center text-sm bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors font-medium shadow-sm hover:border-gray-300"
                    >
                      <span className="text-primary mr-1">+</span> {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setMedicines(DEMO_PRESCRIPTION)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex justify-center items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" /> Try Demo Prescription
                </button>
                
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !medicines.trim()}
                  className="w-full sm:flex-1 bg-primary hover:bg-[#15815f] disabled:bg-primary/50 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgb(29,158,117,0.39)] disabled:shadow-none flex justify-center items-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {LOADING_MESSAGES[loadingMsgIdx]}
                    </>
                  ) : (
                    <>
                      Find Generic Alternatives
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Take a photo of your prescription</h3>
              <p className="text-gray-500 text-center mb-8">AI will extract medicine names automatically</p>
              <button
                onClick={() => setInputMode('text')}
                className="text-primary hover:text-[#15815f] font-bold flex items-center gap-2 px-6 py-3 border-2 border-primary/20 hover:border-primary/40 rounded-xl transition-all"
              >
                Use text input instead
              </button>
            </div>
          )}
        </section>

        {/* RESULTS SECTION */}
        {results && !loading && (
          <section ref={resultsRef} className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 scroll-mt-24">
            
            {/* 1. SAVINGS BANNER */}
            <div className="bg-primary text-white rounded-2xl p-8 shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
                  You can save ₹{results.summary?.total_savings?.toLocaleString()}/month
                </h3>
                <p className="text-[#a4e2cc] font-semibold text-lg mb-6">vs buying branded medicines</p>
                <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-5 py-2 text-sm font-bold text-white shadow-inner border border-white/20">
                  That's ₹{(results.summary?.annual_savings || 0).toLocaleString()} per year
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN: List */}
              <div className="md:col-span-2 space-y-6">
                <h4 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Matched Medicines</h4>
                
                {/* 2. MEDICINE CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.matched?.map((med: any, i: number) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg tracking-wide uppercase">
                          {med.category_badge || 'Medicine'}
                        </span>
                        <span className="text-xs font-extrabold bg-green-100 text-green-700 px-2.5 py-1 rounded-lg">
                          Save {med.save_percentage}%
                        </span>
                      </div>
                      
                      <div className="mb-5 flex-grow">
                        <p className="text-sm text-gray-500 mb-1">Brand: <span className="font-bold text-gray-800">{med.brand_name}</span></p>
                        <p className="text-sm text-primary font-bold">Generic: {med.generic_name}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                        <span className="text-lg font-bold text-gray-400 line-through decoration-red-400/70 decoration-2">₹{med.branded_price}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-2xl font-black text-green-600">₹{med.generic_price}</span>
                      </div>
                      
                      {med.jan_aushadhi_available && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50/80 px-3 py-2 rounded-lg border border-blue-100/50">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" /> Jan Aushadhi Available
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 4. UNMATCHED MEDICINES */}
                {results.unmatched?.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-inner">
                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                      {results.unmatched.length} medicines not found in our database
                    </h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
                      {results.unmatched.map((um: string, i: number) => (
                        <li key={i} className="text-sm font-medium">{um}</li>
                      ))}
                    </ul>
                    <p className="text-xs font-semibold text-gray-400">Database updating soon</p>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Summary */}
              <div className="space-y-6">
                
                {/* 3. SUMMARY BOX */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                  <h4 className="text-lg font-extrabold text-gray-900 mb-5 border-b border-gray-200 pb-3">Savings Summary</h4>
                  
                  <div className="space-y-4 mb-5 text-sm font-medium">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Monthly branded cost:</span>
                      <span className="font-bold text-gray-800 line-through">₹{results.summary?.monthly_branded_cost?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Monthly generic cost:</span>
                      <span className="font-extrabold text-primary text-base">₹{results.summary?.monthly_generic_cost?.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-5 space-y-3">
                    <div className="flex justify-between items-end font-black">
                      <span className="text-gray-900 mb-1">You save:</span>
                      <span className="text-green-600 text-2xl leading-none">₹{results.summary?.total_savings?.toLocaleString()}<span className="text-xs font-bold text-green-600/70 block text-right mt-1">/month</span></span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-600 bg-gray-200/50 p-3 rounded-xl border border-gray-200">
                      <span>Annual savings:</span>
                      <span className="text-gray-900">₹{results.summary?.annual_savings?.toLocaleString()}/year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. STORE LOCATOR SECTION */}
            <div className="bg-white border md:border-2 border-gray-100 md:border-gray-50 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-12 bg-gradient-to-b from-white to-gray-50/50">
              <div className="flex flex-col items-center mb-8 text-center max-w-lg mx-auto">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-4">
                  <Store className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Where to buy generic medicines</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Locate nearby pharmacies stocking these affordable alternatives. Available at 10,000+ Jan Aushadhi Stores.</p>
              </div>
              
              {!stores ? (
                <div className="text-center">
                  <button 
                    onClick={handleLoadStores}
                    disabled={loadingStores}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    {loadingStores ? <Loader2 className="w-5 h-5 animate-spin"/> : <MapPin className="w-5 h-5"/>}
                    Find Jan Aushadhi Stores Near Me
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left animate-in fade-in slide-in-from-bottom-4">
                  {stores.map((s, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-extrabold text-gray-900 leading-snug pr-2 group-hover:text-blue-700 transition-colors">{s.store_name}</h5>
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg tracking-wide whitespace-nowrap">{s.distance}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{s.address}</p>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                          <Clock className="w-3.5 h-3.5 text-gray-400"/> {s.timing}
                        </p>
                        <a href={s.maps_link} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                          Maps <ExternalLink className="w-3.5 h-3.5"/>
                        </a>
                      </div>
                    </div>
                  ))}
                  {stores.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No stores found nearby. Try expanding your search area.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 6. BOTTOM BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <button 
                onClick={resetForm}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-bold rounded-xl transition-all shadow-sm w-full sm:w-auto"
              >
                Analyze Another Prescription
              </button>
              
              <button
                onClick={handleShare}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto flex justify-center items-center gap-2"
              >
                <Share2 className="w-5 h-5 text-gray-300"/> Share My Savings
              </button>
            </div>

          </section>
        )}
      </main>
    </div>
  );
}
