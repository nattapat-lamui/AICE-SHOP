import React, { useRef } from 'react';
import { ArrowRight, Truck, Shield, Skull, ChevronLeft, ChevronRight, Shirt, Footprints, Watch, ToyBrick as Toy, Layers, Sparkles, Play, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { BRANDS } from '../constants';

interface HomeProps {
  products: Product[];
  onViewProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onViewCatalog: (category?: string, brand?: string) => void;
  isStashed: (id: string) => boolean;
  onToggleStash: (id: string) => void;
}

// Special mock data for the Trending Carousel
const TRENDING_PRODUCTS: Product[] = [
  {
    id: 't1',
    name: 'Cyberpunk Runner',
    price: 240.00,
    category: 'Sneakers',
    brand: 'AICE',
    description: 'Neon accents with a distressed sole.',
    image: 'https://images.unsplash.com/photo-1605406930614-7c392cd5c7a4?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: 't2',
    name: 'Oversized Bomber',
    price: 180.00,
    category: 'Jackets',
    brand: 'Alpha',
    description: 'Technical fabric bomber jacket.',
    image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80',
    isOnSale: true
  },
  {
    id: 't3',
    name: 'Utility Chest Rig',
    price: 85.00,
    category: 'Accessories',
    brand: 'AICE',
    description: 'Essential carry for the urban explorer.',
    image: 'https://images.unsplash.com/photo-1551488852-08018d998317?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't4',
    name: 'Graffiti Denim',
    price: 120.00,
    category: 'Bottoms',
    brand: 'Stüssy',
    description: 'Hand-painted denim jeans.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't5',
    name: 'Tech Fleece V2',
    price: 110.00,
    category: 'Hoodies',
    brand: 'Nike',
    description: 'Advanced thermal regulation.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=800&q=80',
    isNew: true
  }
];

export const HomePage: React.FC<HomeProps> = ({ 
  products, 
  onViewProduct, 
  onAddToCart, 
  onViewCatalog,
  isStashed,
  onToggleStash
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320 + 32; // Card width + gap
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="border-b-4 border-black bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-20 lg:py-24 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="flex flex-col gap-6 relative z-10 order-2 lg:order-1">
              <div className="inline-block w-fit bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest border-2 border-transparent transform -rotate-2">
                New Collection 2024
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase drop-shadow-sm">
                Wear It <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary" style={{ WebkitTextStroke: '3px black' }}>LOUD.</span>
              </h1>
              <p className="text-lg md:text-xl font-medium max-w-md border-l-4 border-primary pl-4 bg-white/80 backdrop-blur-sm">
                Streetwear for the internet generation. No compromises. Raw aesthetics for the bold.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => onViewCatalog('All')}
                  className="h-14 px-8 bg-primary border-4 border-black shadow-neo-lg font-black text-lg uppercase hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-neo transition-all flex items-center justify-center gap-2 group"
                >
                  Shop The Drop 
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                   onClick={() => onViewCatalog('All')}
                   className="h-14 px-8 bg-white border-4 border-black shadow-neo-lg font-black text-lg uppercase hover:bg-black hover:text-white hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-neo transition-all"
                >
                  View Lookbook
                </button>
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="absolute top-0 right-0 w-full h-full bg-secondary border-4 border-black translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 z-0"></div>
              <div className="relative z-10 w-full bg-white border-4 border-black shadow-neo-lg p-2 md:p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 left-4 z-20 bg-primary border-2 border-black px-3 py-1 font-bold text-xs uppercase transform -rotate-12 shadow-neo-sm">
                  Best Seller
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?auto=format&fit=crop&w=1000&q=80" 
                  alt="Hero Model" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-black text-primary border-b-4 border-black py-4 overflow-hidden select-none">
        <div className="animate-marquee font-black text-2xl md:text-3xl uppercase tracking-widest gap-12">
          <span>LIMITED STOCK /// FRESH ITEMS ADDED DAILY /// DONT SLEEP ON THIS /// FREE SHIPPING WORLDWIDE /// NEW DROPS EVERY FRIDAY /// LIMITED STOCK /// FRESH ITEMS ADDED DAILY /// DONT SLEEP ON THIS /// FREE SHIPPING WORLDWIDE /// NEW DROPS EVERY FRIDAY ///</span>
          <span>LIMITED STOCK /// FRESH ITEMS ADDED DAILY /// DONT SLEEP ON THIS /// FREE SHIPPING WORLDWIDE /// NEW DROPS EVERY FRIDAY /// LIMITED STOCK /// FRESH ITEMS ADDED DAILY /// DONT SLEEP ON THIS /// FREE SHIPPING WORLDWIDE /// NEW DROPS EVERY FRIDAY ///</span>
        </div>
      </div>

      {/* Shop by Category Grid */}
      <section className="bg-white py-16 md:py-24 border-b-4 border-black">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tighter">Choose Your <span className="text-secondary underline decoration-4 underline-offset-8">Vibe</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sneakers', icon: <Footprints size={48} />, bg: 'bg-primary' },
              { name: 'T-Shirts', icon: <Shirt size={48} />, bg: 'bg-accent' },
              { name: 'Hoodies', icon: <Layers size={48} />, bg: 'bg-secondary' },
              { name: 'Accessories', icon: <Watch size={48} />, bg: 'bg-white' },
              { name: 'Collectibles', icon: <Toy size={48} />, bg: 'bg-gray-200' },
              { name: 'All', icon: <Sparkles size={48} />, bg: 'bg-black', text: 'text-white' }
            ].map((cat, i) => (
              <div 
                key={i}
                onClick={() => onViewCatalog(cat.name)}
                className={`group cursor-pointer relative border-4 border-black ${cat.bg} p-8 flex flex-col items-center justify-center gap-6 shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all`}
              >
                <div className={`bg-white border-4 border-black p-6 shadow-neo-sm group-hover:rotate-12 transition-transform ${cat.text === 'text-white' ? 'text-black' : ''}`}>
                  {cat.icon}
                </div>
                <h3 className={`text-4xl font-black uppercase tracking-tighter ${cat.text || 'text-black'}`}>{cat.name}</h3>
                <div className={`absolute bottom-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity ${cat.text || 'text-black'}`}>
                   <ArrowRight size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Video Section (Redesigned) */}
      <section className="relative w-full border-b-4 border-black bg-black">
        <div className="relative w-full h-[60vh] overflow-hidden group">
           <video 
              src="https://videos.pexels.com/video-files/3753696/3753696-hd_1920_1080_25fps.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1920&q=80"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
           />
           {/* Overlay */}
           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent h-1/2 pointer-events-none"></div>
           <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
              <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2 mix-blend-difference">
                 Street Culture <br/> // 2024
              </h2>
              <div className="w-20 h-1 bg-primary"></div>
           </div>
        </div>
      </section>

      {/* Why AICE-SHOP? Section */}
      <section className="bg-primary py-16 border-b-4 border-black">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center gap-4 bg-white border-4 border-black p-8 shadow-neo-sm transform -rotate-1">
                <div className="w-20 h-20 bg-accent border-4 border-black flex items-center justify-center mb-2">
                    <Truck size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase">WE SHIP FAST</h3>
                <p className="font-bold text-gray-700 font-mono">Orders dispatched within 24 hours. No waiting for drip.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-white border-4 border-black p-8 shadow-neo-sm transform rotate-2">
                <div className="w-20 h-20 bg-secondary border-4 border-black flex items-center justify-center mb-2 text-white">
                    <Shield size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase">LIFETIME WARRANTY</h3>
                <p className="font-bold text-gray-700 font-mono">Our threads are built for war. Or just the club. Same thing.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-white border-4 border-black p-8 shadow-neo-sm transform -rotate-1">
                <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mb-2 text-primary">
                    <Skull size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase">NO BS RETURNS</h3>
                <p className="font-bold text-gray-700 font-mono">Not feeling it? Ship it back. No questions. No stress.</p>
            </div>
        </div>
      </section>

      {/* BRAND TAKEOVER SECTION */}
      <section className="bg-white py-16 border-b-4 border-black overflow-hidden relative">
         <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-12">
               <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">The <span className="text-transparent bg-clip-text bg-black" style={{ WebkitTextStroke: '2px #FFF500' }}>Arsenal</span></h2>
               <div className="hidden md:block w-32 h-2 bg-black"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
               {BRANDS.filter(b => b !== 'All').map((brand, i) => (
                  <button 
                     key={brand}
                     onClick={() => onViewCatalog('All', brand)}
                     className={`h-32 border-4 border-black bg-white hover:bg-black hover:text-white transition-all shadow-neo hover:shadow-neo-lg hover:-translate-y-1 flex items-center justify-center group relative overflow-hidden`}
                  >
                     <span className="text-2xl md:text-3xl font-black uppercase tracking-widest relative z-10">{brand}</span>
                     {/* Decorative noise */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                  </button>
               ))}
               <button 
                  onClick={() => onViewCatalog('All', 'All')}
                  className="h-32 border-4 border-black bg-primary flex items-center justify-center shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all"
               >
                  <span className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">View All <ArrowRight /></span>
               </button>
            </div>
         </div>
      </section>

      {/* Trending Now / Carousel Mockup */}
      <section className="bg-light py-20 border-b-4 border-black overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Hot Right <span className="text-secondary italic">Now</span></h2>
            <div className="flex gap-4">
               <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:bg-black active:text-white"
               >
                  <ChevronLeft size={24} />
               </button>
               <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:bg-black active:text-white"
               >
                  <ChevronRight size={24} />
               </button>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {TRENDING_PRODUCTS.map(product => (
              <div key={product.id} className="min-w-[320px] snap-center">
                <ProductCard 
                  product={product} 
                  onView={onViewProduct}
                  onAdd={onAddToCart}
                  isStashed={isStashed(product.id)}
                  onToggleStash={onToggleStash}
                />
              </div>
            ))}
            
            {/* View All Card in Carousel */}
            <div className="min-w-[320px] snap-center flex items-center justify-center">
               <div 
                 onClick={() => onViewCatalog('All')}
                 className="w-full h-full min-h-[400px] bg-black border-4 border-black shadow-neo flex flex-col items-center justify-center text-white p-8 cursor-pointer hover:bg-zinc-900 transition-colors group"
               >
                  <h3 className="text-4xl font-black uppercase text-center mb-4">View Full<br/>Collection</h3>
                  <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight size={32} />
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <button 
               onClick={() => onViewCatalog('All')}
               className="bg-black text-white border-4 border-white px-12 py-6 text-2xl font-black uppercase shadow-neo-lg hover:bg-primary hover:text-black hover:border-black transition-all"
             >
                Explore Entire Drop
             </button>
          </div>
        </div>
      </section>
    </>
  );
};