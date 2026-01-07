import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Filter, Check, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, BRANDS } from '../constants';

interface CatalogProps {
  products: Product[];
  onViewProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  initialCategory?: string;
  initialBrand?: string;
  isStashed: (id: string) => boolean;
  onToggleStash: (id: string) => void;
}

type SortOption = 'newest' | 'price-low-high' | 'price-high-low';

const SORT_LABELS: Record<SortOption, string> = {
  'newest': 'NEWEST DROP',
  'price-low-high': 'PRICE: LOW TO HIGH',
  'price-high-low': 'PRICE: HIGH TO LOW'
};

export const CatalogPage: React.FC<CatalogProps> = ({ 
  products, 
  onViewProduct, 
  onAddToCart, 
  initialCategory = 'All',
  initialBrand = 'All',
  isStashed,
  onToggleStash
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSelectedBrand(initialBrand);
  }, [initialBrand]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low-high') return a.price - b.price;
    if (sortOption === 'price-high-low') return b.price - a.price;
    // Newest
    if (a.isNew === b.isNew) return 0;
    return a.isNew ? -1 : 1;
  });

  return (
    <div className="flex flex-col w-full bg-light dark:bg-dark min-h-screen">
      {/* Utility Banner - Static (Not Sticky) */}
      <div className="w-full border-b-4 border-black bg-white px-6 py-6 lg:px-20 shadow-sm relative z-40">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 w-full md:w-2/3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight text-black">
              {selectedCategory === 'All' ? 'Full Inventory' : selectedCategory}
            </h2>
            <div className="relative mt-2 flex w-full items-center">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="text-black text-2xl" />
              </div>
              <input 
                className="h-14 w-full border-4 border-black bg-white pl-12 pr-4 text-lg font-bold text-black placeholder-gray-500 shadow-neo focus:bg-primary/10 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all" 
                placeholder="SEARCH INVENTORY..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
             {/* Mobile Filter Toggle */}
             <button 
               className="md:hidden flex h-14 w-14 items-center justify-center border-4 border-black bg-white shadow-neo active:translate-y-1 active:shadow-none transition-all"
               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
             >
                <Filter />
             </button>

             {/* Custom Sort Dropdown */}
             <div className="relative w-full md:w-[280px]" ref={dropdownRef}>
                <button 
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="h-14 w-full flex items-center justify-between border-4 border-black bg-white px-4 text-base font-bold text-black shadow-neo hover:bg-gray-50 transition-all active:translate-y-[2px] active:shadow-none"
                >
                  <span className="uppercase truncate">{SORT_LABELS[sortOption]}</span>
                  <ChevronDown className={`transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full border-4 border-black bg-white shadow-neo-lg z-50 flex flex-col">
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`px-4 py-3 text-left font-bold uppercase border-b-2 border-black last:border-b-0 hover:bg-primary hover:text-black transition-colors flex justify-between items-center ${sortOption === option ? 'bg-black text-white' : 'text-black'}`}
                      >
                        {SORT_LABELS[option]}
                        {sortOption === option && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:px-10">
        {/* Sidebar Filters */}
        <aside className={`w-full shrink-0 flex-col gap-8 lg:w-[300px] lg:flex ${mobileFiltersOpen ? 'flex' : 'hidden'}`}>
          <div className="flex flex-col gap-8 rounded-none border-4 border-black bg-dark p-6 shadow-neo">
            <div className="border-b-4 border-dashed border-gray-600 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white uppercase">FILTER_ZONE</h3>
                <p className="text-sm font-mono text-gray-400 uppercase">Narrow It Down</p>
              </div>
              <button className="lg:hidden text-white" onClick={() => setMobileFiltersOpen(false)}><X /></button>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-bold text-primary">CATEGORIES</h4>
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex w-full items-center justify-between border-2 border-${selectedCategory === cat ? 'black' : 'white'} bg-${selectedCategory === cat ? 'white' : 'transparent'} px-4 py-3 font-bold text-${selectedCategory === cat ? 'black' : 'white'} ${selectedCategory === cat ? 'shadow-neo-sm bg-primary' : 'hover:bg-white hover:text-black'} transition-all text-left uppercase`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="text-sm">&gt;</span>}
                </button>
              ))}
            </div>

            {/* Brand Filter */}
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-bold text-primary">BRANDS</h4>
              <div className="flex flex-wrap gap-2">
                 {BRANDS.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1 text-sm font-bold uppercase border-2 ${selectedBrand === brand ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white'} transition-all`}
                    >
                       {brand}
                    </button>
                 ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold text-primary">MAX PRICE</h4>
                <span className="font-mono text-black text-sm bg-accent border-2 border-black font-bold px-2 py-1 shadow-sm">${maxPrice}</span>
              </div>
              <input 
                 className="w-full accent-primary h-4 bg-gray-700 rounded-none appearance-none cursor-pointer border-2 border-transparent focus:outline-none focus:border-white" 
                 type="range" 
                 min="0" 
                 max="1000" 
                 step="10"
                 value={maxPrice}
                 onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>$0</span>
                  <span>$1000+</span>
              </div>
            </div>

            <button 
              onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(1000); setSearchQuery(''); }}
              className="mt-4 w-full border-2 border-red-500 bg-transparent py-2 font-bold text-red-500 hover:bg-red-500 hover:text-black uppercase"
            >
              Reset All
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-black font-mono font-bold">SHOWING {sortedProducts.length} ITEMS</p>
          </div>
          
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onView={onViewProduct}
                  onAdd={onAddToCart}
                  isStashed={isStashed(product.id)}
                  onToggleStash={onToggleStash}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-4 border-dashed border-gray-400">
               <h3 className="text-2xl font-black uppercase text-gray-400">Nothing Found</h3>
               <p className="text-gray-500 font-mono">Try adjusting your filters.</p>
            </div>
          )}

          {/* Pagination (Simulated) */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
             <div className="flex gap-2">
                {[1].map(page => (
                   <button 
                    key={page}
                    className={`w-12 h-12 flex items-center justify-center font-bold border-2 border-black ${page === 1 ? 'bg-primary shadow-neo-sm' : 'bg-white hover:bg-black hover:text-white'}`}
                   >
                    {page}
                   </button>
                ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};