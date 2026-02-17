
import React from 'react';
import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Bus } from '../types';
import { AMENITY_ICONS } from '../constants';

interface BusCardProps {
  bus: Bus;
  onSelect: (bus: Bus) => void;
}

const BusCard: React.FC<BusCardProps> = ({ bus, onSelect }) => {
  const handleSmallAction = (action: string) => {
    alert(`${action} for ${bus.operatorName} coming soon!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden mb-4 group">
      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Operator Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{bus.operatorName}</h3>
              <div className="flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-bold">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                {bus.rating}
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium">{bus.type}</p>
            
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
              {bus.amenities.slice(0, 3).map(amenity => (
                <div key={amenity} className="flex items-center gap-1.5 hover:text-gray-600 cursor-default">
                  {AMENITY_ICONS[amenity]}
                  <span>{amenity}</span>
                </div>
              ))}
              {bus.amenities.length > 3 && (
                <button 
                  onClick={() => handleSmallAction('Amenities List')}
                  className="text-red-500 font-medium hover:underline active:scale-95 transition"
                >
                  +{bus.amenities.length - 3} more
                </button>
              )}
            </div>
          </div>

          {/* Time & Route */}
          <div className="flex flex-1 items-center justify-between md:justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{bus.departureTime}</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Departure</p>
            </div>
            <div className="flex flex-col items-center flex-1 max-w-[120px]">
              <p className="text-xs text-gray-400 mb-1 font-medium">{bus.duration}</p>
              <div className="w-full h-[2px] bg-gray-100 relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-gray-300 bg-white"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-red-500 bg-white"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{bus.arrivalTime}</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Arrival</p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex flex-col items-end justify-between md:min-w-[140px]">
            <div className="text-right">
              <p className="text-gray-400 text-xs font-semibold">Starts from</p>
              <p className="text-2xl font-black text-gray-900">₹{bus.price}</p>
            </div>
            <button 
              onClick={() => onSelect(bus)}
              className="mt-4 md:mt-0 w-full bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-red-700 active:scale-95 transition flex items-center justify-center gap-2 group shadow-lg shadow-red-100"
            >
              <span>Select Seats</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <p className="mt-2 text-xs text-gray-400 font-medium">{bus.availableSeats} Seats left</p>
          </div>
        </div>
      </div>
      
      {/* Quick Footer */}
      <div className="bg-gray-50 px-6 py-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium">
        <div className="flex gap-4">
          <button onClick={() => handleSmallAction('Live Tracking')} className="hover:text-red-600 active:scale-95 transition">Live Tracking</button>
          <button onClick={() => handleSmallAction('Policies')} className="hover:text-red-600 active:scale-95 transition">Policies</button>
          <button onClick={() => handleSmallAction('Photos')} className="hover:text-red-600 active:scale-95 transition">Photos</button>
        </div>
        <button 
          onClick={() => handleSmallAction('Track My Bus')}
          className="flex items-center gap-1 text-green-600 hover:text-green-700 active:scale-95 transition group"
        >
          <MapPin className="w-3 h-3" />
          <span className="group-hover:underline">Track My Bus</span>
        </button>
      </div>
    </div>
  );
};

export default BusCard;
