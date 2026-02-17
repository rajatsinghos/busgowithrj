
import React, { useState } from 'react';
import { CreditCard, Smartphone, Landmark, ShieldCheck, Loader2, ChevronRight, ArrowLeft, QrCode } from 'lucide-react';
import { Bus } from '../types';

interface PaymentSectionProps {
  bus: Bus;
  selectedSeats: string[];
  onPaymentSuccess: () => void;
  onBack: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ bus, selectedSeats, onPaymentSuccess, onBack }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpiStatus, setShowUpiStatus] = useState(false);
  const totalAmount = bus.price * selectedSeats.length;

  const handlePayment = () => {
    setIsProcessing(true);
    if (method === 'upi') {
      setShowUpiStatus(true);
    }
    
    // Realistic multi-stage simulation
    setTimeout(() => {
      onPaymentSuccess();
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold mb-8 hover:text-red-600 transition group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Modify Selection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black mb-8">Secure Checkout</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => setMethod('upi')}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all active:scale-[0.98] ${method === 'upi' ? 'border-red-600 bg-red-50/30' : 'border-gray-100 hover:border-red-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${method === 'upi' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-black">UPI (GPay, PhonePe, Paytm)</p>
                    <p className="text-sm text-gray-500 font-medium">Pay via QR or Virtual Address</p>
                  </div>
                </div>
              </button>

              {method === 'upi' && (
                <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100 relative">
                      <QrCode className="w-40 h-40 text-gray-900" />
                      <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center backdrop-blur-[1px] rounded-3xl opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black uppercase text-gray-900 bg-white px-2 py-1 rounded shadow">Scan to Pay</span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or enter UPI ID</p>
                    <div className="w-full relative">
                      <input 
                        type="text" 
                        placeholder="yourname@bank" 
                        className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-red-500 font-bold"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 font-black text-xs uppercase hover:underline">Verify</button>
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setMethod('card')}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all active:scale-[0.98] ${method === 'card' ? 'border-red-600 bg-red-50/30' : 'border-gray-100 hover:border-red-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${method === 'card' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-black">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500 font-medium">Safe & Quick Checkout</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-6 bg-green-50 rounded-2xl border border-green-100">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <p className="text-sm font-bold text-green-800 tracking-tight">Your transaction is secured with 256-bit SSL encryption</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-black mb-6">Fare Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                <span>Fare ({selectedSeats.length} Seats)</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                <span>Service Fee</span>
                <span className="text-green-600">₹0</span>
              </div>
              <div className="h-[2px] bg-gray-50"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-black">Total Payable</span>
                <span className="text-2xl font-black text-red-600">₹{totalAmount}</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Waiting for Payment...</span>
                </>
              ) : (
                <>
                  <span>Complete Payment</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            {showUpiStatus && (
              <p className="text-center mt-4 text-[10px] text-red-600 font-black uppercase animate-pulse">Please check your phone for UPI request</p>
            )}
            
            <p className="text-center mt-6 text-[10px] text-gray-400 font-black uppercase tracking-widest">Powered by BusGo Payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
