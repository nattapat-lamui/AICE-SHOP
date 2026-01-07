import React, { useState } from 'react';
import { Plus, Heart, Loader2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAdd: (product: Product) => void;
  isStashed?: boolean;
  onToggleStash?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onView, 
  onAdd,
  isStashed = false,
  onToggleStash 
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding) return;
    
    setIsAdding(true);
    // Simulate async network request
    setTimeout(() => {
      onAdd(product);
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="group bg-white border-4 border-black shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all flex flex-col h-full relative">
      <div 
        className="relative border-b-4 border-black aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onView(product)}
      >
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {product.isNew && (
            <div className="bg-secondary text-white text-xs font-black px-2 py-1 border-2 border-black shadow-neo-sm">NEW</div>
          )}
          {product.isOnSale && (
            <div className="bg-primary text-black text-xs font-black px-2 py-1 border-2 border-black shadow-neo-sm">SALE</div>
          )}
        </div>

        {/* Stash Button */}
        {onToggleStash && (
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleStash(product.id); }}
            className={`absolute top-2 right-2 z-20 w-10 h-10 flex items-center justify-center border-2 border-black shadow-neo-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none ${isStashed ? 'bg-secondary text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            <Heart size={20} fill={isStashed ? "currentColor" : "none"} />
          </button>
        )}

        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between gap-4">
        <div onClick={() => onView(product)} className="cursor-pointer">
          <div className="flex justify-between items-start">
             <h3 className="text-xl font-black uppercase leading-tight mb-1">{product.name}</h3>
          </div>
          <div className="flex gap-2 text-xs font-bold font-mono uppercase text-gray-500">
             <span>{product.brand}</span>
             <span>/</span>
             <span>{product.category}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-black bg-black text-white px-2 py-1 transform -rotate-2">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={handleAddClick}
            disabled={isAdding}
            className={`w-10 h-10 flex items-center justify-center bg-primary border-2 border-black shadow-neo-sm transition-all ${isAdding ? 'cursor-not-allowed opacity-80' : 'hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:bg-black active:text-white'}`}
          >
            {isAdding ? <Loader2 size={20} className="animate-spin text-black" /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};