
import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRightLeft, Search, Loader2 } from 'lucide-react';
import { CITIES } from '../constants';

interface SearchBarProps {
  onSearch: (from: string, to: string, date: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      setIsSearching(true);
      // Brief delay to simulate responsiveness/loading
      setTimeout(() => {
        onSearch(from, to, date);
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">From</label>
          <div className="flex items-center border-2 border-gray-100 rounded-xl px-3 py-2.5 hover:border-red-100 transition focus-within:border-red-500 bg-white">
            <MapPin className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
            <select 
              value={from} 
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-800 font-medium cursor-pointer"
              required
            >
              <option value="">Source City</option>
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center pb-3">
          <button 
            type="button"
            onClick={handleSwap}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition active:scale-90 transform hover:rotate-180 duration-500 shadow-sm"
          >
            <ArrowRightLeft className="w-4 h-4 text-red-600" />
          </button>
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">To</label>
          <div className="flex items-center border-2 border-gray-100 rounded-xl px-3 py-2.5 hover:border-red-100 transition focus-within:border-red-500 bg-white">
            <MapPin className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
            <select 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-800 font-medium cursor-pointer"
              required
            >
              <option value="">Destination City</option>
              {CITIES.filter(city => city !== from).map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Date</label>
          <div className="flex items-center border-2 border-gray-100 rounded-xl px-3 py-2.5 hover:border-red-100 transition focus-within:border-red-500 bg-white">
            <Calendar className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
            <input 
              type="date" 
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-800 font-medium cursor-pointer"
              required
            />
          </div>
        </div>

        <div className="md:col-span-4 lg:col-span-1">
          <button 
            type="submit"
            disabled={isSearching}
            className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search Buses</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
