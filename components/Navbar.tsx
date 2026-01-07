import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu, Zap, Instagram, Twitter, Facebook } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, setView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);

  // Trigger animation when cartCount changes
  useEffect(() => {
    if (cartCount === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  const navLinkClass = (view: ViewState) => `text-base font-bold uppercase hover:bg-primary hover:text-black px-2 py-1 transition-colors border-2 border-transparent hover:border-black hover:shadow-neo-sm cursor-pointer ${currentView === view ? 'bg-primary border-black shadow-neo-sm' : ''}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-transparent group-hover:bg-primary group-hover:border-black transition-colors">
            <Zap className="text-primary group-hover:text-black w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase decoration-4 hover:underline decoration-primary underline-offset-4">
            AICE_SHOP
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <span className={navLinkClass('home')} onClick={() => setView('home')}>Home</span>
          <span className={navLinkClass('catalog')} onClick={() => setView('catalog')}>Shop</span>
          <span className={navLinkClass('wishlist')} onClick={() => setView('wishlist')}>Stash</span>
          <span className={navLinkClass('profile')} onClick={() => setView('profile')}>Profile</span>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('cart')}
            className={`hidden sm:flex relative items-center justify-center h-12 px-6 bg-white border-4 border-black shadow-neo font-black text-lg uppercase transition-all hover:bg-gray-50 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none gap-3 ${isBumping ? 'scale-110' : 'scale-100'}`}
          >
            <span>Cart</span>
            <ShoppingBag size={22} strokeWidth={2.5} />
            
            {/* Floating Badge */}
            {cartCount > 0 && (
              <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-secondary text-white border-2 border-black rounded-full text-sm font-black shadow-sm z-10">
                {cartCount}
              </div>
            )}
          </button>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 border-2 border-black shadow-neo-sm hover:bg-primary active:shadow-none transition-all relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
            {cartCount > 0 && (
               <div className="absolute -top-2 -right-2 w-5 h-5 bg-secondary border-2 border-black rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {cartCount}
               </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-4 border-black bg-white p-4 flex flex-col gap-4">
           <span className="text-lg font-bold uppercase" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Home</span>
           <span className="text-lg font-bold uppercase" onClick={() => { setView('catalog'); setMobileMenuOpen(false); }}>Shop</span>
           <span className="text-lg font-bold uppercase" onClick={() => { setView('wishlist'); setMobileMenuOpen(false); }}>Stash</span>
           <span className="text-lg font-bold uppercase" onClick={() => { setView('profile'); setMobileMenuOpen(false); }}>Profile</span>
           <span className="text-lg font-bold uppercase flex justify-between" onClick={() => { setView('cart'); setMobileMenuOpen(false); }}>
              Cart <span className="bg-secondary text-white px-2 rounded-full text-sm font-black">{cartCount}</span>
           </span>
        </div>
      )}
    </header>
  );
};

interface FooterProps {
  setView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8 border-t-4 border-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div onClick={() => setView('home')} className="text-3xl font-black tracking-tighter uppercase mb-4 block text-primary cursor-pointer">AICE_SHOP</div>
          <p className="max-w-xs font-mono text-sm text-gray-300">
            Designing the future of streetwear with zero apologies. Based in the internet.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-lg uppercase mb-4 text-primary underline decoration-2 underline-offset-4">Explore</h4>
          <ul className="space-y-2 font-mono text-sm">
            <li><button onClick={() => setView('catalog')} className="hover:text-primary hover:underline decoration-2 text-left w-full uppercase">All Products</button></li>
            <li><button onClick={() => setView('catalog')} className="hover:text-primary hover:underline decoration-2 text-left w-full uppercase">New Arrivals</button></li>
            <li><button onClick={() => setView('catalog')} className="hover:text-primary hover:underline decoration-2 text-left w-full uppercase">Accessories</button></li>
            <li><button onClick={() => setView('wishlist')} className="hover:text-primary hover:underline decoration-2 text-left w-full uppercase">My Stash</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg uppercase mb-4 text-primary underline decoration-2 underline-offset-4">Connect</h4>
          <div className="flex gap-4 mb-4">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center border-2 border-transparent hover:bg-primary hover:border-white transition-colors cursor-pointer">
              <Instagram size={20} />
            </div>
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center border-2 border-transparent hover:bg-primary hover:border-white transition-colors cursor-pointer">
              <Twitter size={20} />
            </div>
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center border-2 border-transparent hover:bg-primary hover:border-white transition-colors cursor-pointer">
              <Facebook size={20} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-400">
        <p>© 2024 AICE_SHOP. Built for the bold.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};