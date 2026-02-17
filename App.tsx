
import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BusCard from './components/BusCard';
import SeatSelector from './components/SeatSelector';
import PaymentSection from './components/PaymentSection';
import TicketInvoice from './components/TicketInvoice';
import TrackJourney from './components/TrackJourney';
import { MOCK_BUSES } from './constants';
import { Bus, SearchQuery, BookingDetails, BookingStep, ViewType, User as UserType } from './types';
import { Bus as BusIcon, ShieldCheck, Clock, CreditCard, ChevronRight, Star, Ticket, Headphones, Mail, Phone, MessageCircle, X, Facebook, Mail as MailIcon, Loader2, UserCircle, Settings, Award, MapPin } from 'lucide-react';

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void; onLogin: (user: UserType) => void }> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: 'Aditya Kumar',
        email: 'aditya.kumar@gmail.com'
      });
      onClose();
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: email.split('@')[0],
        email: email
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="relative p-8 md:p-10">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl text-red-600 mb-6">
              <BusIcon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-500 font-medium">Experience the future of bus travel</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-8">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email or Phone</label>
                <input 
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 active:scale-95 transition-all mb-6 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (isLogin ? 'Login' : 'Get Started')}
            </button>
          </form>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gray-100"></div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Or continue with</span>
            <div className="h-[1px] flex-1 bg-gray-100"></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 rounded-2xl font-black text-sm hover:bg-gray-50 transition active:scale-95 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
              <path fill="#FBBC05" d="M16.04 18.013c-1.09.303-2.26.478-3.463.478-4.173 0-7.756-2.614-9.15-6.236L.25 15.46c2.03 4.545 6.64 7.696 12.01 7.696 2.91 0 5.61-.926 7.82-2.508l-4.04-3.635Z" />
              <path fill="#4285F4" d="M19.83 23.156A11.91 11.91 0 0 0 24 12c0-3.34-.84-6.485-2.32-9.214l-4.22 3.655C18.42 8.04 19 10 19 12c0 2.93-1.18 5.61-3.09 7.555l3.92 3.601Z" />
              <path fill="#34A853" d="M12 24c3.08 0 5.89-1.01 8.12-2.73l-4.04-3.635c-1.12.72-2.48 1.14-4.08 1.14-2.85 0-5.32-1.68-6.53-4.12L1.24 17.77C3.198 21.302 7.27 24 12 24Z" />
            </svg>
            Sign in with Google
          </button>

          <div className="mt-10 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-black text-gray-500 hover:text-red-600 transition">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-red-600 underline">
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [bookingStep, setBookingStep] = useState<BookingStep>('searching');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [results, setResults] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showSeatSelector, setShowSeatSelector] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [email, setEmail] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const handleSearch = (from: string, to: string, date: string) => {
    setSearchPerformed(true);
    setResults(MOCK_BUSES);
    setCurrentView('home');
    setBookingStep('searching');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
    setShowSeatSelector(true);
  };

  const handleSeatsConfirmed = (seats: string[]) => {
    setSelectedSeats(seats);
    setShowSeatSelector(false);
    setBookingStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = () => {
    if (!selectedBus) return;
    
    const newBooking: BookingDetails = {
      id: Math.random().toString(36).substr(2, 9),
      bus: selectedBus,
      selectedSeats,
      totalAmount: selectedBus.price * selectedSeats.length,
      bookingDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      passengerName: user?.name || 'Guest User',
      pnr: `BG${Math.floor(1000000 + Math.random() * 9000000)}`
    };
    
    setConfirmedBooking(newBooking);
    setBookingStep('ticket');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setBookingStep('searching');
    if (view === 'home') {
      setSearchPerformed(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    setSearchPerformed(false);
    alert('You have been logged out successfully.');
  };

  const renderHome = () => (
    <>
      {bookingStep === 'searching' && (
        <>
          <div className="bg-gradient-to-r from-red-600 to-red-700 pb-32 pt-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500">
                Premium Bus Travel <br /> Across <span className="bg-white text-red-600 px-4 rounded-2xl shadow-xl">India</span>
              </h1>
              <p className="text-red-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
                Book premium bus tickets at unbeatable prices. Fast, secure, and powered by AI travel assistance.
              </p>
            </div>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!searchPerformed ? (
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:shadow-red-50 transition-all cursor-pointer active:scale-95 group">
                    <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Safe Travels</h3>
                    <p className="text-gray-500 font-medium">Industry-leading safety standards with live bus tracking on all premium routes.</p>
                  </div>
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:shadow-green-50 transition-all cursor-pointer active:scale-95 group">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Clock className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Punctual Trips</h3>
                    <p className="text-gray-500 font-medium">98% on-time performance across our extensive network of bus operators.</p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden group shadow-2xl">
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black mb-4">Refer & Earn ₹500</h2>
                      <p className="text-gray-400 text-xl mb-8 max-w-md font-medium">Share your unique referral link with friends and get travel credits for every booking.</p>
                      <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black hover:bg-red-50 active:scale-95 transition flex items-center gap-3 shadow-xl">
                        Get My Link <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/5 p-8 rounded-[2rem] backdrop-blur-md border border-white/10 text-center hover:bg-white/10 transition">
                        <p className="text-4xl font-black mb-1">1M+</p>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Happy Users</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-[2rem] backdrop-blur-md border border-white/10 text-center hover:bg-white/10 transition">
                        <p className="text-4xl font-black mb-1">500+</p>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Operators</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full group-hover:bg-red-600/20 transition duration-1000"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black">Filters</h3>
                      <button className="text-xs text-red-600 font-black hover:underline tracking-widest">CLEAR ALL</button>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Bus Type</h4>
                        <div className="space-y-3">
                          {['AC', 'Non-AC', 'Sleeper', 'Seater'].map(type => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                              <input type="checkbox" className="w-6 h-6 rounded-lg border-gray-200 text-red-600 focus:ring-red-500 cursor-pointer transition-all" />
                              <span className="text-gray-600 font-bold group-hover:text-red-600 transition">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-gray-900">{results.length} Buses found</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Sort by:</span>
                      <select className="bg-transparent font-black text-gray-900 focus:outline-none cursor-pointer hover:text-red-600 transition-colors">
                        <option>Recommended</option>
                        <option>Lowest Price</option>
                        <option>Top Rated</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {results.map(bus => (
                      <BusCard key={bus.id} bus={bus} onSelect={handleBusSelect} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {bookingStep === 'payment' && selectedBus && (
        <PaymentSection 
          bus={selectedBus} 
          selectedSeats={selectedSeats} 
          onPaymentSuccess={handlePaymentSuccess}
          onBack={() => setBookingStep('searching')}
        />
      )}

      {bookingStep === 'ticket' && confirmedBooking && (
        <TicketInvoice 
          booking={confirmedBooking} 
          onHome={() => handleNavigate('home')} 
        />
      )}
    </>
  );

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-red-600 to-red-500 h-40"></div>
        <div className="px-8 md:px-12 pb-12 relative">
          <div className="absolute -top-16 left-12 md:left-16">
            <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-2xl">
              <div className="w-full h-full bg-red-600 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
          
          <div className="pt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">{user?.name}</h2>
              <div className="flex items-center gap-4 text-gray-500 font-bold">
                <p>{user?.email}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <p>Member since 2024</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-black hover:bg-gray-800 transition active:scale-95 shadow-xl">
              <Settings className="w-5 h-5" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-gray-100 text-center hover:bg-white hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black mb-1">04</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Trips</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-gray-100 text-center hover:bg-white hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black mb-1">2,450</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Reward Points</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-gray-100 text-center hover:bg-white hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black mb-1">12</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Cities Visited</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-red-50 p-4 rounded-3xl text-red-600 shadow-sm">
          <Headphones className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-4xl font-black">Help & Support</h2>
          <p className="text-gray-500 font-medium">We're here to help you 24/7</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-2">Email Us</h3>
          <p className="text-gray-500 font-medium mb-6">Our support team usually responds within 24 hours to all queries.</p>
          <a href="mailto:support@busgo.in" className="text-red-600 font-black text-lg hover:underline">support@busgo.in</a>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-2">Call Us</h3>
          <p className="text-gray-500 font-medium mb-6">Toll-free number for immediate assistance with bookings.</p>
          <a href="tel:18001234567" className="text-green-600 font-black text-lg hover:underline">1800-123-4567</a>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-2">Chat with Agent</h3>
          <p className="text-gray-500 font-medium mb-6">Quickest way to get help for your ongoing or past journeys.</p>
          <button className="text-blue-600 font-black text-lg hover:underline">Start WhatsApp Chat</button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-600 group-hover:text-white transition-all">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-2">Refund Status</h3>
          <p className="text-gray-500 font-medium mb-6">Check the status of your canceled tickets and pending refunds.</p>
          <button className="text-yellow-600 font-black text-lg hover:underline">Track Refund</button>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-red-50 p-4 rounded-3xl text-red-600 shadow-sm">
          <Ticket className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-4xl font-black">My Bookings</h2>
          <p className="text-gray-500 font-medium">Manage your upcoming journeys</p>
        </div>
      </div>
      
      {confirmedBooking ? (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-6">
               <div className="bg-red-50 p-4 rounded-2xl"><BusIcon className="w-8 h-8 text-red-600" /></div>
               <div>
                 <h3 className="font-black text-xl">{confirmedBooking.bus.operatorName}</h3>
                 <p className="text-gray-500 font-bold text-sm">PNR: {confirmedBooking.pnr}</p>
                 <p className="text-gray-400 text-xs mt-1">{confirmedBooking.bookingDate}</p>
               </div>
             </div>
             <div className="flex gap-2">
               <button 
                 onClick={() => { handleNavigate('track'); }}
                 className="bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-black text-sm active:scale-95 transition"
               >
                 Track Bus
               </button>
               <button 
                 onClick={() => { setBookingStep('ticket'); setCurrentView('home'); }}
                 className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm active:scale-95 transition shadow-lg shadow-red-100"
               >
                 View Ticket
               </button>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-gray-100 text-center">
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <BusIcon className="w-14 h-14 text-gray-200" />
          </div>
          <h3 className="text-2xl font-black mb-2">No upcoming trips</h3>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">Looks like you haven't booked any trips yet. Ready to start your next journey?</p>
          <button 
            onClick={handleNavigate.bind(null, 'home')}
            className="bg-red-600 text-white px-12 py-4 rounded-2xl font-black shadow-2xl shadow-red-100 hover:bg-red-700 active:scale-95 transition-all"
          >
            Book a Bus
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col text-gray-900 bg-slate-50">
      <Header 
        onNavigate={handleNavigate} 
        currentView={currentView} 
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        user={user}
      />
      
      <main className="flex-1">
        {currentView === 'home' && renderHome()}
        {currentView === 'bookings' && renderBookings()}
        {currentView === 'support' && renderSupport()}
        {currentView === 'track' && <TrackJourney />}
        {currentView === 'profile' && renderProfile()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-16 px-4 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-8 cursor-pointer group" onClick={() => handleNavigate('home')}>
              <div className="bg-red-600 p-2 rounded-lg">
                <BusIcon className="text-white w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-gray-900">
                Bus<span className="text-red-600">Go</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed font-medium">
              BusGo is India's largest online bus ticket booking service trusted by over 25 million happy customers globally. Experience luxury and punctuality.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer active:scale-90 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer active:scale-90 shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-6">About BusGo</h4>
            <ul className="space-y-4 text-gray-600 font-bold text-sm">
              <li onClick={() => handleNavigate('support')} className="hover:text-red-600 cursor-pointer transition active:translate-x-1">About Us</li>
              <li onClick={() => handleNavigate('support')} className="hover:text-red-600 cursor-pointer transition active:translate-x-1">Contact Us</li>
              <li className="text-gray-300 cursor-default">Mobile Apps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-6">Support</h4>
            <ul className="space-y-4 text-gray-600 font-bold text-sm">
              <li className="hover:text-red-600 cursor-pointer transition active:translate-x-1">Terms & Conditions</li>
              <li className="hover:text-red-600 cursor-pointer transition active:translate-x-1">Privacy Policy</li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-6">Stay Updated</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); setEmail(''); }} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-gray-100 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-red-500 font-medium" 
              />
              <button type="submit" className="bg-red-600 text-white px-5 py-3 rounded-xl text-sm font-black active:scale-95 transition shadow-lg shadow-red-100">Go</button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-100 mt-16 pt-8 text-center text-gray-400 text-xs font-bold tracking-widest uppercase">
          © 2024 BusGo India • Designed & Developed by Rajat
        </div>
      </footer>

      {showSeatSelector && selectedBus && (
        <SeatSelector bus={selectedBus} onClose={() => setShowSeatSelector(false)} onConfirm={handleSeatsConfirmed} />
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={setUser} />
    </div>
  );
};

export default App;
