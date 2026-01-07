import React from 'react';
import { ShoppingBag, Menu, Search, User, Zap, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, setView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinkClass = "text-base font-bold uppercase hover:bg-primary hover:text-black px-2 py-1 transition-colors border-2 border-transparent hover:border-black hover:shadow-neo-sm cursor-pointer";

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
          <span className={navLinkClass} onClick={() => setView('home')}>Home</span>
          <span className={navLinkClass} onClick={() => setView('catalog')}>Shop</span>
          <span className={navLinkClass} onClick={() => setView('wishlist')}>Stash</span>
          <span className={navLinkClass} onClick={() => setView('profile')}>Profile</span>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('cart')}
            className="hidden sm:flex items-center justify-center h-10 px-6 bg-primary border-2 border-black shadow-neo font-bold text-sm uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all gap-2"
          >
            <span>Cart ({cartCount})</span>
            <ShoppingBag size={18} />
          </button>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 border-2 border-black shadow-neo-sm hover:bg-primary active:shadow-none transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-4 border-black bg-white p-4 flex flex-col gap-4">
           <span className={navLinkClass} onClick={() => { setView('home'); setMobileMenuOpen(false); }}>Home</span>
           <span className={navLinkClass} onClick={() => { setView('catalog'); setMobileMenuOpen(false); }}>Shop</span>
           <span className={navLinkClass} onClick={() => { setView('wishlist'); setMobileMenuOpen(false); }}>Stash</span>
           <span className={navLinkClass} onClick={() => { setView('profile'); setMobileMenuOpen(false); }}>Profile</span>
           <span className={navLinkClass} onClick={() => { setView('cart'); setMobileMenuOpen(false); }}>Cart ({cartCount})</span>
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

// UI Primitives
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'black' | 'outline' }> = ({ 
  children, variant = 'primary', className = '', ...props 
}) => {
  const base = "h-12 px-6 font-bold uppercase border-2 border-black transition-all flex items-center justify-center gap-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]";
  const variants = {
    primary: "bg-primary text-black shadow-neo hover:bg-white",
    secondary: "bg-secondary text-white shadow-neo hover:bg-black",
    black: "bg-black text-white shadow-neo hover:bg-white hover:text-black",
    outline: "bg-transparent text-black border-black shadow-neo-sm hover:bg-black hover:text-white"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border-4 border-black shadow-neo hover:shadow-neo-lg transition-all ${className}`}>
    {children}
  </div>
);