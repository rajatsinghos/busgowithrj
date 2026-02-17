
import React, { useState } from 'react';
import { Search, MapPin, Clock, Navigation, AlertCircle, Loader2 } from 'lucide-react';

const TrackJourney: React.FC = () => {
  const [pnr, setPnr] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr) return;
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">Track Your Journey</h2>
        <p className="text-gray-500 text-lg font-medium">Enter your PNR or Ticket Number to see live bus location.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mb-12">
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Enter PNR Number (e.g., BG8273645)" 
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl outline-none font-bold transition-all"
            />
          </div>
          <button 
            type="submit"
            disabled={isTracking}
            className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-red-100 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isTracking ? <Loader2 className="animate-spin w-5 h-5" /> : 'Track Bus'}
          </button>
        </form>
      </div>

      {showResult && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-3 rounded-2xl text-white">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Live Location: Near Pune Highway</h3>
                  <p className="text-gray-500 font-bold text-sm">Bus: MH 12 BQ 4567 | VRL Travels</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest">
                On Time
              </div>
            </div>

            <div className="p-8">
              <div className="relative">
                {/* Simulated Map Path */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-100 rounded-full"></div>
                <div className="absolute left-8 top-0 h-[60%] w-1 bg-red-600 rounded-full"></div>

                <div className="space-y-12 relative z-10">
                  <div className="flex items-start gap-8">
                    <div className="w-4 h-4 rounded-full bg-gray-400 mt-2 ml-[26px]"></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Departure</p>
                      <h4 className="text-lg font-black">Mumbai (Bandra Terminus)</h4>
                      <p className="text-gray-500 text-sm">Departed at 21:05 (Scheduled 21:00)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-8">
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-red-600 mt-1 ml-[25px] shadow-lg shadow-red-100 animate-pulse"></div>
                    <div>
                      <p className="text-xs font-black text-red-600 uppercase tracking-widest">Current Location</p>
                      <h4 className="text-lg font-black">Lonavala Food Mall</h4>
                      <p className="text-gray-500 text-sm">Estimated arrival at Pune: 23:45</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 opacity-40">
                    <div className="w-4 h-4 rounded-full bg-gray-300 mt-2 ml-[26px]"></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Next Stop</p>
                      <h4 className="text-lg font-black">Pune (Swargate)</h4>
                      <p className="text-gray-500 text-sm">ETA: 23:50</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 opacity-40">
                    <div className="w-4 h-4 rounded-full bg-gray-300 mt-2 ml-[26px]"></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Destination</p>
                      <h4 className="text-lg font-black">Bengaluru (Majestic)</h4>
                      <p className="text-gray-500 text-sm">ETA: 06:30 (Tomorrow)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-red-50 rounded-[2rem] border border-red-100 flex items-center gap-4">
                <AlertCircle className="text-red-600 w-6 h-6" />
                <p className="text-red-800 text-sm font-bold">Expect heavy traffic near Satara due to road construction. Bus may be delayed by 15-20 mins.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackJourney;
