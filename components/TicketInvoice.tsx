
import React from 'react';
import { Download, CheckCircle2, QrCode, Share2, MapPin, Calendar, Clock, ArrowRight, Home } from 'lucide-react';
import { BookingDetails } from '../types';

interface TicketInvoiceProps {
  booking: BookingDetails;
  onHome: () => void;
}

const TicketInvoice: React.FC<TicketInvoiceProps> = ({ booking, onHome }) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-12 duration-700">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-50">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-black mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 font-medium">Your ticket has been sent to your email.</p>
      </div>

      {/* Ticket UI */}
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 relative mb-12 print:shadow-none print:border-none">
        {/* Left Side: Main Info */}
        <div className="p-10 md:p-14 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Bus Operator</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900">{booking.bus.operatorName}</h2>
              <p className="text-red-600 font-bold text-sm">{booking.bus.type}</p>
            </div>
            <div className="text-right">
              <span className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">PNR Number</span>
              <p className="text-2xl font-black text-gray-900 tracking-tighter">{booking.pnr}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-12 relative">
             {/* Route Line Decoration */}
             <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-[2px] bg-dashed border-t-2 border-dashed border-gray-200 -translate-y-1/2 z-0"></div>
             
             <div className="text-center relative z-10">
               <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <MapPin className="text-red-600 w-6 h-6" />
               </div>
               <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">From</p>
               <h3 className="text-xl font-black">City Center</h3>
               <p className="text-gray-500 text-sm font-bold">Pick-up Point</p>
             </div>

             <div className="text-center">
               <div className="bg-gray-900 text-white px-4 py-2 rounded-xl inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest mb-4">
                 <Clock className="w-3 h-3" /> {booking.bus.duration}
               </div>
               <div className="flex items-center justify-center gap-2">
                 <ArrowRight className="w-8 h-8 text-red-600" />
               </div>
             </div>

             <div className="text-center relative z-10">
               <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <MapPin className="text-red-600 w-6 h-6" />
               </div>
               <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">To</p>
               <h3 className="text-xl font-black">Destination</h3>
               <p className="text-gray-500 text-sm font-bold">Drop-off Point</p>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-gray-100">
            <div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Departure</p>
              <p className="font-black text-lg">{booking.bus.departureTime}</p>
              <p className="text-gray-500 text-xs font-bold uppercase">{booking.bookingDate}</p>
            </div>
            <div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Arrival</p>
              <p className="font-black text-lg">{booking.bus.arrivalTime}</p>
              <p className="text-gray-500 text-xs font-bold uppercase">Next Morning</p>
            </div>
            <div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Seats</p>
              <div className="flex flex-wrap gap-1">
                {booking.selectedSeats.map(s => (
                  <span key={s} className="bg-red-600 text-white px-2 py-0.5 rounded-lg text-xs font-black">S-{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Passenger</p>
              <p className="font-black text-lg">{booking.passengerName}</p>
            </div>
          </div>
        </div>

        {/* Perforation Line */}
        <div className="relative h-12 flex items-center justify-between px-[-10px] print:hidden">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-gray-100 -ml-5 shadow-inner"></div>
          <div className="flex-1 border-t-2 border-dashed border-gray-100 mx-4"></div>
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-gray-100 -mr-5 shadow-inner"></div>
        </div>

        {/* Bottom Bar: QR & Price */}
        <div className="bg-gray-50 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100">
              <QrCode className="w-20 h-20 text-gray-900" />
            </div>
            <div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">Scan for Boarding</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[140px]">Show this code at the boarding gate for instant check-in.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-1">Amount Paid</p>
            <p className="text-4xl font-black text-red-600">₹{booking.totalAmount}</p>
            <p className="text-green-600 font-black text-[10px] uppercase tracking-widest mt-1">Payment Successful</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 print:hidden">
        <button 
          onClick={handleDownload}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl hover:bg-gray-800 active:scale-95 transition-all"
        >
          <Download className="w-5 h-5" />
          Download Ticket
        </button>
        <button 
          onClick={onHome}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-black border-2 border-gray-100 shadow-xl hover:bg-gray-50 active:scale-95 transition-all"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TicketInvoice;
