import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, ArrowRight, CheckCircle, MessageSquare, Send, Loader2, ZoomIn } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
}

const INITIAL_REVIEWS = [
  { id: 1, user: "KAI_ZEN", text: "Quality is insane. The fit is exactly what I wanted. Worth every credit.", rating: 5, date: "2 DAYS AGO" },
  { id: 2, user: "NEON_RIDER", text: "Shipping was faster than light. Hoodie is heavy, feels armored.", rating: 5, date: "1 WEEK AGO" },
  { id: 3, user: "GLITCH_BOY", text: "A bit pricey but the aesthetic is unmatched. V2 update is legit.", rating: 4, date: "2 WEEKS AGO" },
];

export const ProductDetailPage: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [isAdding, setIsAdding] = useState(false);
  
  // Gallery State
  const [activeImage, setActiveImage] = useState(product.image);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  // Mock Gallery Images (including the main product image)
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605406930614-7c392cd5c7a4?auto=format&fit=crop&w=800&q=80'
  ];

  const handleIncrement = () => setQuantity(prev => Math.min(10, prev + 1));
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (isAdding) return;
    
    setIsAdding(true);
    // Simulate async network request with visual feedback
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
      setIsAdding(false);
    }, 800);
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    
    const review = {
      id: reviews.length + 1,
      user: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      date: "JUST NOW"
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', text: '', rating: 5 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-primary min-h-screen">
      {/* Marquee */}
      <div className="relative flex overflow-x-hidden bg-black text-white border-b-4 border-black py-2">
        <div className="whitespace-nowrap flex gap-12 text-lg font-bold uppercase tracking-widest animate-marquee">
          <span>Free Shipping on Orders Over $500</span> <span className="text-primary">★</span>
          <span>Limited Edition Drop</span> <span className="text-primary">★</span>
          <span>Don't Miss Out</span> <span className="text-primary">★</span>
          <span>No Returns for Cowards</span> <span className="text-primary">★</span>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 font-bold uppercase border-b-4 border-black hover:bg-black hover:text-primary transition-colors px-1 text-black">
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-black opacity-100 rotate-1 border-4 border-black"></div>
              
              {/* Main Image with Zoom */}
              <div 
                className="relative aspect-square md:aspect-[4/3] w-full bg-white border-4 border-black shadow-neo-lg overflow-hidden flex items-center justify-center z-10 cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                 {/* Badge */}
                 <div className="absolute top-4 left-4 z-20 bg-accent border-4 border-black px-4 py-2 shadow-neo-sm -rotate-6 pointer-events-none">
                    <span className="font-black text-xl">V2.0 UPDATED</span>
                 </div>

                 {/* Zoom Hint */}
                 <div className={`absolute bottom-4 right-4 z-20 bg-black/80 text-white px-3 py-1 font-bold text-xs uppercase border-2 border-white pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="flex items-center gap-2"><ZoomIn size={14} /> Hover to Zoom</span>
                 </div>

                 <img 
                    src={activeImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-100 ease-out" 
                    style={{
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
                    }}
                 />
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4 mt-6 z-10 relative">
               {galleryImages.map((img, i) => (
                 <button 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square bg-white border-4 ${activeImage === img ? 'border-primary shadow-[4px_4px_0px_0px_#000]' : 'border-black shadow-neo-sm'} hover:bg-gray-50 transition-all p-2 flex items-center justify-center relative overflow-hidden group`}
                 >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain" />
                    {activeImage === img && (
                        <div className="absolute inset-0 border-4 border-primary pointer-events-none"></div>
                    )}
                 </button>
               ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-neo-lg relative">
               <div className="absolute -top-6 -right-4 md:-right-8 bg-secondary text-white border-4 border-black px-6 py-3 rotate-3 shadow-neo-sm z-20">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter">${product.price.toFixed(2)}</span>
               </div>
               
               <div className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500">{product.category} / Limited</div>
               <h1 className="text-5xl md:text-6xl font-black leading-[0.9] mb-6 uppercase tracking-tight text-black">
                  {product.name}
               </h1>

               <div className="flex items-center gap-2 mb-8">
                  <div className="flex text-black">
                    {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#FFF500" strokeWidth={2} />)}
                  </div>
                  <span className="font-bold underline decoration-2 decoration-black">{reviews.length} Reviews</span>
               </div>

               <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 border-l-4 border-primary pl-4 text-black">
                  {product.description} Raw materials for raw people. The definitive footwear for the modern internet explorer.
               </p>

               {/* Selectors */}
               <div className="space-y-6 mb-8">
                  <div>
                    <label className="block font-black text-xl mb-3 uppercase">Select Color</label>
                    <div className="flex gap-4">
                      {['bg-green-500', 'bg-pink-500', 'bg-cyan-500'].map(color => (
                        <div key={color} className={`w-12 h-12 ${color} border-4 border-black shadow-sm cursor-pointer hover:-translate-y-1 transition-transform`}></div>
                      ))}
                    </div>
                  </div>
               </div>

               {/* Quantity & Add to Cart */}
               <div className="flex flex-col sm:flex-row gap-4">
                 <div className="flex items-center border-4 border-black bg-white shadow-neo-sm w-full sm:w-auto shrink-0">
                    <button 
                      onClick={handleDecrement}
                      disabled={isAdding}
                      className="w-14 h-14 flex items-center justify-center font-black text-2xl hover:bg-primary border-r-4 border-black transition-colors disabled:opacity-50"
                    >
                      -
                    </button>
                    <div className="w-20 h-14 flex items-center justify-center font-black text-2xl bg-white text-black">
                      {quantity}
                    </div>
                    <button 
                      onClick={handleIncrement}
                      disabled={isAdding}
                      className="w-14 h-14 flex items-center justify-center font-black text-2xl hover:bg-primary border-l-4 border-black transition-colors disabled:opacity-50"
                    >
                      +
                    </button>
                 </div>
                 
                 <button 
                   onClick={handleAddToCart}
                   disabled={isAdding}
                   className={`flex-1 bg-primary border-4 border-black font-black text-xl uppercase tracking-wider py-4 px-6 shadow-neo transition-all flex items-center justify-center gap-3 group ${isAdding ? 'cursor-not-allowed opacity-80' : 'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:bg-white'}`}
                 >
                    {isAdding ? (
                        <>
                            <span>Adding...</span>
                            <Loader2 className="animate-spin" />
                        </>
                    ) : (
                        <>
                            <span>Add To Cart</span>
                            <ArrowRight className="group-hover:animate-bounce" />
                        </>
                    )}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* REVIEWS & COMMUNITY SECTION */}
        <div className="mt-20 border-4 border-black bg-white shadow-neo">
           <div className="bg-black text-white p-4 border-b-4 border-black flex justify-between items-center">
              <h2 className="text-3xl font-black uppercase flex items-center gap-3">
                 <MessageSquare className="text-primary" /> Street Talk
              </h2>
              <span className="font-mono text-sm uppercase text-gray-400">Verified Buyers Only</span>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
              {/* Rating Summary */}
              <div className="p-8 flex flex-col items-center justify-center text-center bg-light">
                 <span className="text-8xl font-black leading-none mb-2">{averageRating}</span>
                 <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={32} fill={i <= Math.round(parseFloat(averageRating)) ? "#FFF500" : "transparent"} stroke="black" strokeWidth={2} />)}
                 </div>
                 <p className="font-bold uppercase text-xl">Based on {reviews.length} Reviews</p>
              </div>

              {/* Review List & Form */}
              <div className="col-span-2 p-8 flex flex-col gap-8">
                 
                 {/* Write Review Form */}
                 <form onSubmit={handlePostReview} className="border-4 border-black bg-gray-50 p-6 shadow-neo-sm">
                    <h3 className="text-xl font-black uppercase mb-4">Drop Your Knowledge</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                       <input 
                         className="h-12 border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white" 
                         placeholder="YOUR ALIAS"
                         value={newReview.name}
                         onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                         required
                       />
                       <div className="h-12 border-4 border-black flex items-center px-4 bg-white">
                          <span className="font-bold mr-4">RATING:</span>
                          {[1,2,3,4,5].map(i => (
                             <Star 
                               key={i} 
                               size={20} 
                               className="cursor-pointer transition-transform hover:scale-110 mr-1"
                               fill={i <= newReview.rating ? "#FFF500" : "transparent"}
                               stroke="black"
                               strokeWidth={2}
                               onClick={() => setNewReview({...newReview, rating: i})}
                             />
                          ))}
                       </div>
                    </div>
                    <textarea 
                      className="w-full h-24 border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white mb-4 resize-none" 
                      placeholder="TELL US THE TRUTH..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      required
                    ></textarea>
                    <button type="submit" className="w-full bg-black text-white font-black uppercase py-3 border-4 border-black hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-2">
                       Post Review <Send size={18} />
                    </button>
                 </form>

                 <div className="flex flex-col gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-2 border-black p-4 shadow-sm bg-white">
                           <div className="flex justify-between items-start mb-3">
                              <div className="flex flex-col">
                                 <div className="flex items-center gap-2">
                                    <span className="font-black uppercase text-lg">{review.user}</span>
                                    {/* Only show badge for mock users for now, or new users if logic added */}
                                    {review.id <= 3 && (
                                        <span className="bg-green-400 text-black text-[10px] font-black px-1 border border-black flex items-center gap-1">
                                           <CheckCircle size={10} /> VERIFIED
                                        </span>
                                    )}
                                 </div>
                                 <span className="text-xs font-mono text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < review.rating ? "#FFF500" : "transparent"} stroke="black" strokeWidth={2} />
                                 ))}
                              </div>
                           </div>
                           <p className="font-bold text-gray-800 leading-tight">"{review.text}"</p>
                        </div>
                     ))}
                 </div>
                 
                 {reviews.length > 3 && (
                    <button className="self-center font-bold underline uppercase hover:text-primary">Load More Comments</button>
                 )}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};