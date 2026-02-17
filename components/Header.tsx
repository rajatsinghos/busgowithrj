
import React, { useState, useRef, useEffect } from 'react';
import { Bus, User, HelpCircle, Menu, X, MapPin, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { ViewType, User as UserType } from '../types';

interface HeaderProps {
  onNavigate: (view: ViewType) => void;
  currentView: string;
  onAuthClick: () => void;
  onLogout: () => void;
  user: UserType | null;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, onAuthClick, onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-red-200 group-hover:rotate-6 transition-all duration-300">
                <Bus className="text-white w-5 h-5" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                Bus<span className="text-red-600">Go</span>
              </span>
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Travel</span>
                <span className="text-[10px] font-medium text-red-400 italic">by Rajat</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => handleNav('home')} 
              className={`font-semibold text-sm uppercase tracking-wide transition active:scale-95 ${currentView === 'home' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNav('bookings')} 
              className={`font-semibold text-sm uppercase tracking-wide transition active:scale-95 ${currentView === 'bookings' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              My Bookings
            </button>
            <button 
              onClick={() => handleNav('track')} 
              className={`flex items-center gap-1 font-semibold text-sm uppercase tracking-wide transition active:scale-95 ${currentView === 'track' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Track</span>
            </button>
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-gray-50 pl-2 pr-3 py-1.5 rounded-full border border-gray-100 hover:bg-white transition-all shadow-sm group"
                >
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xs group-hover:scale-110 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-gray-700">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => handleNav('profile')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <UserCircle className="w-4 h-4" />
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleNav('bookings')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Bus className="w-4 h-4" />
                      My Bookings
                    </button>
                    <button 
                      onClick={() => handleNav('support')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Support
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    <button 
                      onClick={() => { onLogout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 active:scale-95 transition-all shadow-md hover:shadow-red-200"
              >
                <User className="w-4 h-4" />
                <span>Login / Sign Up</span>
              </button>
            )}
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2 active:bg-gray-100 rounded-full transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 animate-in slide-in-from-top duration-300 shadow-2xl">
          <button onClick={() => handleNav('home')} className={`block w-full text-left px-4 py-3 font-bold rounded-xl active:bg-gray-50 ${currentView === 'home' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}>
            Home
          </button>
          <button onClick={() => handleNav('bookings')} className={`block w-full text-left px-4 py-3 font-bold rounded-xl active:bg-gray-50 ${currentView === 'bookings' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}>
            My Bookings
          </button>
          <button onClick={() => handleNav('track')} className={`block w-full text-left px-4 py-3 font-bold rounded-xl active:bg-gray-50 ${currentView === 'track' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}>
            Track Journey
          </button>
          {user && (
            <button onClick={() => handleNav('profile')} className={`block w-full text-left px-4 py-3 font-bold rounded-xl active:bg-gray-50 ${currentView === 'profile' ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}>
              View Profile
            </button>
          )}
          <div className="pt-2 border-t border-gray-100 mt-2">
            {user ? (
               <div className="space-y-2">
                 <div className="flex items-center gap-3 w-full text-left px-4 py-4 font-bold text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black">{user.name.charAt(0)}</div>
                    <div className="flex flex-col">
                      <span className="leading-none">{user.name}</span>
                      <span className="text-xs font-medium text-gray-400 mt-1">{user.email}</span>
                    </div>
                 </div>
                 <button onClick={onLogout} className="flex items-center gap-3 w-full text-left px-4 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-transform">
                   <LogOut className="w-5 h-5" /> Logout
                 </button>
               </div>
            ) : (
              <button onClick={onAuthClick} className="flex items-center gap-3 w-full text-left px-4 py-4 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-transform">
                <User className="w-5 h-5" /> Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
