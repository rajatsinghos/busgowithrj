
import React, { useState, useMemo } from 'react';
import { X, Check, Monitor, Wind, ShieldCheck } from 'lucide-react';
import { Bus, Seat } from '../types';

interface SeatSelectorProps {
  bus: Bus;
  onClose: () => void;
  onConfirm: (selectedSeats: string[]) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ bus, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');

  // Generate mock seats for both decks
  const allSeats = useMemo(() => {
    const generated: Seat[] = [];
    ['lower', 'upper'].forEach((deck) => {
      const rows = deck === 'lower' ? 6 : 5; // Differing rows for variety
      const cols = 3; // 2+1 layout for premium feel
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          generated.push({
            id: `${deck.charAt(0).toUpperCase()}${r + 1}-${c + 1}`,
            row: r,
            col: c,
            isAvailable: Math.random() > 0.25,
            price: deck === 'upper' ? bus.price + 100 : bus.price,
            type: deck as 'lower' | 'upper'
          });
        }
      }
    });
    return generated;
  }, [bus.price]);

  const currentDeckSeats = allSeats.filter(s => s.type === activeDeck);

  const toggleSeat = (id: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(prev => prev.filter(s => s !== id));
    } else {
      if (selectedSeats.length >= 6) {
        alert("You can select up to 6 seats per booking.");
        return;
      }
      setSelectedSeats(prev => [...prev, id]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((acc, id) => {
      const seat = allSeats.find(s => s.id === id);
      return acc + (seat?.price || 0);
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 border border-white/20">
        
        {/* Left Side: Seat Map */}
        <div className="flex-[1.5] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 bg-white relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">Select Your Seat</h3>
              <p className="text-gray-400 text-sm font-bold flex items-center gap-2 mt-1">
                {bus.type.includes('Sleeper') ? 'Sleeper Berths' : 'Comfort Seating'} 
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                Max 6 per user
              </p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-90 bg-gray-50 text-gray-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Deck Tabs */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-10 w-fit mx-auto shadow-inner">
            <button 
              onClick={() => setActiveDeck('lower')}
              className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeDeck === 'lower' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Lower Deck
            </button>
            <button 
              onClick={() => setActiveDeck('upper')}
              className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeDeck === 'upper' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Upper Deck
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-[320px] bg-slate-50 rounded-[50px] p-8 pt-16 border-[6px] border-slate-200 shadow-inner">
            {/* Steering Wheel Area */}
            <div className="absolute top-6 right-10 flex flex-col items-center opacity-40">
               <div className="w-10 h-10 rounded-full border-4 border-slate-300 flex items-center justify-center">
                 <div className="w-6 h-1.5 bg-slate-300 rounded-full"></div>
               </div>
               <span className="text-[8px] font-black text-slate-400 uppercase mt-1">Driver</span>
            </div>

            <div className="space-y-6">
              {Array.from({ length: activeDeck === 'lower' ? 6 : 5 }).map((_, rIdx) => (
                <div key={rIdx} className="flex justify-between items-center gap-4">
                  {/* Left Column (2 seats) */}
                  <div className="flex gap-4">
                    {[0, 1].map(cIdx => {
                      const seat = currentDeckSeats.find(s => s.row === rIdx && s.col === cIdx);
                      if (!seat) return null;
                      const isSelected = selectedSeats.includes(seat.id);
                      return (
                        <button
                          key={seat.id}
                          disabled={!seat.isAvailable}
                          onClick={() => toggleSeat(seat.id, seat.isAvailable)}
                          className={`
                            h-10 w-12 rounded-xl transition-all duration-300 relative flex items-center justify-center
                            ${!seat.isAvailable 
                              ? 'bg-slate-200 cursor-not-allowed border-2 border-slate-300 opacity-60' 
                              : isSelected 
                                ? 'bg-red-600 shadow-xl shadow-red-200 scale-110 z-10' 
                                : 'bg-white border-2 border-slate-200 hover:border-red-400 hover:shadow-md'}
                          `}
                        >
                          <div className={`absolute -top-1 left-2 right-2 h-1 rounded-full ${isSelected ? 'bg-red-400' : 'bg-slate-100'}`}></div>
                          {isSelected && <Check className="w-5 h-5 text-white animate-in zoom-in duration-200" />}
                          {!isSelected && seat.isAvailable && <span className="text-[10px] font-black text-slate-300">{seat.id}</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle - No content */}
                  <div className="w-8 flex justify-center opacity-10">
                    <div className="w-px h-10 bg-slate-400 border-dashed border-l"></div>
                  </div>

                  {/* Right Column (1 seat) */}
                  <div>
                    {[2].map(cIdx => {
                      const seat = currentDeckSeats.find(s => s.row === rIdx && s.col === cIdx);
                      if (!seat) return null;
                      const isSelected = selectedSeats.includes(seat.id);
                      return (
                        <button
                          key={seat.id}
                          disabled={!seat.isAvailable}
                          onClick={() => toggleSeat(seat.id, seat.isAvailable)}
                          className={`
                            h-10 w-12 rounded-xl transition-all duration-300 relative flex items-center justify-center
                            ${!seat.isAvailable 
                              ? 'bg-slate-200 cursor-not-allowed border-2 border-slate-300 opacity-60' 
                              : isSelected 
                                ? 'bg-red-600 shadow-xl shadow-red-200 scale-110 z-10' 
                                : 'bg-white border-2 border-slate-200 hover:border-red-400 hover:shadow-md'}
                          `}
                        >
                          <div className={`absolute -top-1 left-2 right-2 h-1 rounded-full ${isSelected ? 'bg-red-400' : 'bg-slate-100'}`}></div>
                          {isSelected && <Check className="w-5 h-5 text-white animate-in zoom-in duration-200" />}
                          {!isSelected && seat.isAvailable && <span className="text-[10px] font-black text-slate-300">{seat.id}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white border-2 border-slate-200 rounded-lg"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-200 border-2 border-slate-300 rounded-lg"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 rounded-lg shadow-sm"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected</span>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Summary */}
        <div className="flex-1 bg-slate-50 p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-10">
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase mb-6 tracking-[0.2em]">Trip Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-bold text-sm">Operator</span>
                  <span className="text-gray-900 font-black text-right">{bus.operatorName}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-bold text-sm">Bus Type</span>
                  <span className="text-red-600 font-black text-right">{bus.type}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase mb-6 tracking-[0.2em]">Amenities</h4>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                    <Monitor className="w-5 h-5" />
                 </div>
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                    <Wind className="w-5 h-5" />
                 </div>
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase mb-6 tracking-[0.2em]">Your Seats</h4>
              <div className="flex flex-wrap gap-2 min-h-[48px]">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map(s => (
                    <span key={s} className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-red-100 animate-in zoom-in duration-200">
                      {s}
                    </span>
                  ))
                ) : (
                  <div className="w-full h-12 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">No selection</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Total Payable</p>
                <p className="text-4xl font-black text-gray-900 tracking-tighter">₹{calculateTotal()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-red-600">{selectedSeats.length} Ticket(s)</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Incl. Taxes</p>
              </div>
            </div>
            <button
              disabled={selectedSeats.length === 0}
              onClick={() => onConfirm(selectedSeats)}
              className={`
                w-full py-5 rounded-[2rem] font-black text-lg shadow-2xl transition-all active:scale-95
                ${selectedSeats.length > 0 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-200' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}
              `}
            >
              Continue to Book
            </button>
            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-6">
              100% Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
