import Link from 'next/link';
import { Pill, ArrowRight, IndianRupee, Store, TrendingDown, ClipboardList, Sparkles, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-primary/10 p-2.5 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                <Pill className="text-primary w-7 h-7 transform -rotate-45" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">
                  RxBridge
                </h1>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-0.5">
                  Generic Medicine Finder
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-white to-white -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-8 border border-primary/10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Powered by Government Data
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              Stop Overpaying <br className="hidden md:block"/> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#137c59]">Medicines</span>
            </h2>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
              Find cheaper generic alternatives to your branded medicines instantly. 
              <span className="font-semibold text-gray-900"> Save up to 90%</span> on your pharmacy bills.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Link 
                href="/analyze" 
                className="group relative inline-flex items-center justify-center gap-3 bg-primary hover:bg-[#15815f] text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_8px_30px_rgb(29,158,117,0.3)] hover:shadow-[0_8px_30px_rgb(29,158,117,0.5)] hover:-translate-y-1"
              >
                Check My Prescription
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-4">
                 Free <span className="w-1 h-1 rounded-full bg-gray-300"></span> 
                 No signup <span className="w-1 h-1 rounded-full bg-gray-300"></span> 
                 Instant Analysis
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-6 transition-transform duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mb-4">
                  <TrendingDown className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2">Up to 90%</h3>
                <p className="text-gray-500 font-medium">Cheaper than branded</p>
              </div>
              <div className="p-6 transition-transform duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-4">
                  <Store className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2">10,000+</h3>
                <p className="text-gray-500 font-medium">Jan Aushadhi Stores</p>
              </div>
              <div className="p-6 transition-transform duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 mb-4">
                  <IndianRupee className="text-orange-500 w-6 h-6" />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2">₹2,800 Cr</h3>
                <p className="text-gray-500 font-medium">Saved by Indians so far</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How RxBridge Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Three simple steps to significantly reduce your healthcare expenses.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-gray-200 via-primary/30 to-gray-200 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
                  <ClipboardList className="w-10 h-10 text-gray-700 group-hover:text-primary transition-colors" />
                </div>
                <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">STEP 1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter your medicines</h3>
                <p className="text-gray-600 leading-relaxed">
                  Type in the branded medicines prescribed by your doctor or upload your prescription.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
                  <Sparkles className="w-10 h-10 text-gray-700 group-hover:text-primary transition-colors" />
                </div>
                <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">STEP 2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI finds generics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our system instantly matches your brand names with exact, high-quality generic equivalents.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
                  <ShoppingBag className="w-10 h-10 text-gray-700 group-hover:text-primary transition-colors" />
                </div>
                <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">STEP 3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Save at Jan Aushadhi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Locate the nearest Jan Aushadhi Kendra or affiliated pharmacy to buy at a fraction of the cost.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 opacity-50 mb-6">
            <Pill className="w-5 h-5 -rotate-45" />
            <span className="font-bold text-lg tracking-tight">RxBridge</span>
          </div>
          <p className="text-gray-500 text-sm mb-2">
            Data sourced from NPPA & Jan Aushadhi Scheme, Govt. of India
          </p>
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} RxBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
