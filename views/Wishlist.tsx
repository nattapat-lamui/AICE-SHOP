import React, { useState } from 'react';
import { HeartCrack, ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewProduct: (p: Product) => void;
  onGoToCatalog: () => void;
}

export const WishlistPage: React.FC<WishlistProps> = ({ products, onAddToCart, onViewProduct, onGoToCatalog }) => {
    const [addingId, setAddingId] = useState<string | null>(null);

    const handleAddToCart = (product: Product) => {
        if (addingId) return;
        setAddingId(product.id);
        setTimeout(() => {
            onAddToCart(product);
            setAddingId(null);
        }, 600);
    };

    return (
        <div className="p-4 md:p-12 min-h-[80vh]">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-2 mb-12 border-b-4 border-black pb-8 relative">
                    <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.8] uppercase">My Stash</h1>
                    <div className="flex items-center gap-4">
                        <div className="h-4 w-4 bg-primary border border-black"></div>
                        <p className="text-primary bg-black px-2 py-1 font-bold text-lg uppercase tracking-widest font-mono transform rotate-1 inline-block">Save it or Lose it</p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 relative">
                         {/* Background Decor */}
                         <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[18rem] font-black text-gray-200 select-none pointer-events-none opacity-40 z-0">
                            EMPTY
                         </h2>
                         
                         <div className="relative z-10 flex flex-col items-center gap-6">
                             <div className="relative">
                                <div className="absolute top-2 left-2 w-24 h-24 bg-black rounded-full opacity-100"></div>
                                <HeartCrack 
                                    size={96} 
                                    className="text-primary fill-primary stroke-black stroke-[2.5px] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-[-12deg] relative z-10" 
                                />
                             </div>
                             
                             <div className="text-center">
                                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-2">Your Stash Is Empty.</h3>
                                <p className="font-mono text-gray-500 text-lg md:text-xl font-bold bg-white border-2 border-black inline-block px-4 py-1 shadow-neo-sm transform rotate-1">
                                    Don't let your dreams be dreams. Fill this up.
                                </p>
                             </div>

                             <button 
                                onClick={onGoToCatalog}
                                className="mt-8 bg-black text-white px-8 py-4 text-xl font-black uppercase border-4 border-black shadow-neo hover:bg-primary hover:text-black hover:shadow-neo-lg hover:-translate-y-1 transition-all flex items-center gap-3 group"
                             >
                                Start Raiding <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                             </button>
                         </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <div key={product.id} className="bg-white border-4 border-black p-3 shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all group">
                                <div 
                                    className="relative w-full aspect-[4/5] border-2 border-black overflow-hidden bg-gray-100 mb-4 cursor-pointer"
                                    onClick={() => onViewProduct(product)}
                                >
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 font-mono text-xs font-bold border-t-2 border-r-2 border-black">ID_{product.id}</div>
                                </div>
                                <div onClick={() => onViewProduct(product)} className="cursor-pointer">
                                    <h3 className="font-black text-xl uppercase text-black mb-1 leading-none">{product.name}</h3>
                                    <p className="font-mono text-2xl font-black text-black mb-4">${product.price.toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(product)} 
                                    disabled={addingId === product.id}
                                    className="w-full bg-primary text-black font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:bg-white transition-all uppercase text-sm flex items-center justify-center gap-2"
                                >
                                    {addingId === product.id ? <Loader2 size={16} className="animate-spin" /> : 'Move to Cart'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}