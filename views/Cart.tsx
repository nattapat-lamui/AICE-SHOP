import React, { useState } from 'react';
import { Trash2, Lock, ArrowRight, ArrowUpRight, Check, CreditCard, Truck, Plane, Loader2 } from 'lucide-react';
import { CartItem, Product, User } from '../types';

// ---------------- CART ----------------
interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  onCheckout: () => void;
  total: number;
}

export const CartPage: React.FC<CartProps> = ({ cart, removeFromCart, onCheckout, total }) => {
  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black drop-shadow-[4px_4px_0_#f9e71f] mb-12">
          Your Stash
        </h1>
        
        {cart.length === 0 ? (
           <div className="border-4 border-black p-12 text-center bg-white shadow-neo-lg">
             <h2 className="text-4xl font-black uppercase mb-4">It's Empty.</h2>
             <p className="font-bold text-xl mb-8">Go buy something before the void consumes you.</p>
           </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              {cart.map((item) => (
                <div key={item.id} className="group relative flex flex-col sm:flex-row border-4 border-black bg-white p-4 shadow-neo-lg transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000]">
                  <div className="relative aspect-square w-full sm:w-48 shrink-0 overflow-hidden border-2 border-black bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col justify-between sm:ml-6 sm:mt-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-2xl font-black uppercase leading-none text-black">{item.name}</h3>
                        <p className="mt-2 text-sm font-bold bg-black text-white px-2 py-0.5 w-fit">SIZE: L</p>
                      </div>
                      <p className="text-2xl font-bold text-black">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="flex items-center gap-1 border-2 border-black bg-secondary px-4 py-2 text-xs font-black uppercase text-white shadow-neo transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:bg-red-600"
                       >
                         <Trash2 size={14} />
                         <span>Remove</span>
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/3 relative sticky top-28">
               <div className="border-4 border-black bg-primary p-6 shadow-neo-lg">
                  <h2 className="mb-6 text-3xl font-black uppercase tracking-tight text-black border-b-4 border-black pb-2">Order Summary</h2>
                  <div className="flex flex-col gap-4 text-black">
                     <div className="flex justify-between items-center"><span className="font-bold text-lg">Subtotal</span><span className="font-bold text-lg">${total.toFixed(2)}</span></div>
                     <div className="flex justify-between items-center"><span className="font-bold text-lg">Shipping</span><span className="font-bold text-lg">Calculated at Checkout</span></div>
                     <div className="my-4 h-1 w-full bg-black"></div>
                     <div className="flex justify-between items-end"><span className="font-black text-2xl uppercase">Total</span><span className="font-black text-4xl">${total.toFixed(2)}</span></div>
                  </div>
                  
                  <button 
                    onClick={onCheckout}
                    className="relative mt-8 w-full border-4 border-black bg-accent py-5 px-4 text-center shadow-neo hover:shadow-neo-lg transition-all active:translate-y-1 active:shadow-none group"
                  >
                     <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl font-black uppercase italic tracking-tighter text-black">CHECKOUT NOW</span>
                        <ArrowRight className="text-black group-hover:translate-x-2 transition-transform" />
                     </div>
                  </button>
                  
                  <div className="mt-8 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                     <div className="border-2 border-black p-1 bg-white"><Lock size={24} /></div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------- CHECKOUT ----------------
interface CheckoutProps {
    onSuccess: () => void;
    total: number;
    cart: CartItem[];
}

export const CheckoutPage: React.FC<CheckoutProps> = ({ onSuccess, total, cart }) => {
    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
    const [isProcessing, setIsProcessing] = useState(false);

    const shippingCost = shippingMethod === 'standard' ? 0 : 15.00;
    const tax = total * 0.07;
    const grandTotal = total + shippingCost + tax;

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            onSuccess();
        }, 2000);
    };

    return (
        <div className="py-12 px-4 md:px-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* LEFT COLUMN: USER INPUTS */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                     <div className="border-b-4 border-black pb-6">
                        <h2 className="text-6xl font-black uppercase leading-none">Secure<br/>Checkout</h2>
                        <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase inline-block transform rotate-2 mt-2">Level 4 Encryption</span>
                     </div>
                     
                     {/* Step 1: Contact */}
                     <section className="bg-white border-4 border-black p-6 shadow-neo-sm">
                        <h3 className="text-2xl font-black uppercase mb-6 bg-primary w-fit px-2 border-2 border-black">Step 1: Contact Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block font-bold uppercase text-sm mb-1">Email Address</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="YOU@EXAMPLE.COM" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-bold uppercase text-sm mb-1">Phone Number</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>
                     </section>

                     {/* Step 2: Shipping Address */}
                     <section className="bg-white border-4 border-black p-6 shadow-neo-sm">
                        <h3 className="text-2xl font-black uppercase mb-6 bg-primary w-fit px-2 border-2 border-black">Step 2: Shipping Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block font-bold uppercase text-sm mb-1">Street Address</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="1234 MAIN STREET" />
                            </div>
                            <div>
                                <label className="block font-bold uppercase text-sm mb-1">City</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="NEO TOKYO" />
                            </div>
                            <div>
                                <label className="block font-bold uppercase text-sm mb-1">State / Province</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="CA" />
                            </div>
                            <div>
                                <label className="block font-bold uppercase text-sm mb-1">Zip Code</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="90001" />
                            </div>
                            <div>
                                <label className="block font-bold uppercase text-sm mb-1">Country</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="USA" />
                            </div>
                        </div>
                     </section>

                     {/* Step 3: Shipping Method */}
                     <section className="bg-white border-4 border-black p-6 shadow-neo-sm">
                        <h3 className="text-2xl font-black uppercase mb-6 bg-primary w-fit px-2 border-2 border-black">Step 3: Shipping Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div 
                                onClick={() => setShippingMethod('standard')}
                                className={`border-4 border-black p-4 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'bg-black text-white shadow-neo' : 'bg-white hover:bg-gray-50'}`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-black uppercase text-lg">Standard Mule</span>
                                    {shippingMethod === 'standard' && <Check size={24} className="text-primary" />}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Truck size={18} />
                                    <span className="font-bold text-sm">5-7 Business Days</span>
                                </div>
                                <div className="font-mono text-sm opacity-80">FREE</div>
                            </div>

                            <div 
                                onClick={() => setShippingMethod('express')}
                                className={`border-4 border-black p-4 cursor-pointer transition-all ${shippingMethod === 'express' ? 'bg-black text-white shadow-neo' : 'bg-white hover:bg-gray-50'}`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-black uppercase text-lg">Turbo Jet</span>
                                    {shippingMethod === 'express' && <Check size={24} className="text-primary" />}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Plane size={18} />
                                    <span className="font-bold text-sm">1-2 Business Days</span>
                                </div>
                                <div className="font-mono text-sm opacity-80">$15.00</div>
                            </div>
                        </div>
                     </section>

                     {/* Step 4: Payment */}
                     <section className="bg-white border-4 border-black p-6 shadow-neo-sm">
                        <h3 className="text-2xl font-black uppercase mb-6 bg-primary w-fit px-2 border-2 border-black">Step 4: Payment Details</h3>
                        <div className="flex gap-2 mb-4">
                             <div className="border-2 border-black px-2 py-1 font-bold text-xs bg-gray-100">VISA</div>
                             <div className="border-2 border-black px-2 py-1 font-bold text-xs bg-gray-100">MASTERCARD</div>
                             <div className="border-2 border-black px-2 py-1 font-bold text-xs bg-gray-100">AMEX</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                            <div className="md:col-span-2">
                                <label className="block font-bold uppercase text-sm mb-1">Card Number</label>
                                <div className="relative">
                                    <input className="w-full h-12 bg-white border-4 border-black p-3 pl-10 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="0000 0000 0000 0000" />
                                    <CreditCard className="absolute left-3 top-3.5" size={20} />
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold uppercase text-sm mb-1">Expiry Date</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="MM / YY" />
                            </div>
                            <div>
                                <label className="block font-bold uppercase text-sm mb-1">CVC</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="123" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-bold uppercase text-sm mb-1">Name on Card</label>
                                <input className="w-full h-12 bg-white border-4 border-black p-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-primary/20 focus:shadow-neo transition-all" placeholder="ALEX DOE" />
                            </div>
                        </div>
                     </section>
                </div>

                {/* RIGHT COLUMN: SUMMARY */}
                <div className="lg:col-span-5">
                    <div className="bg-secondary border-4 border-black shadow-neo-lg sticky top-28">
                        <div className="bg-black text-white p-4 border-b-4 border-black">
                             <h3 className="text-3xl font-black uppercase tracking-tighter">Your Haul</h3>
                        </div>
                        
                        {/* Compact Item List */}
                        <div className="bg-white p-4 max-h-[300px] overflow-y-auto border-b-4 border-black no-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 mb-4 last:mb-0 border-b-2 border-dashed border-gray-300 pb-4 last:border-0 last:pb-0">
                                    <div className="w-16 h-16 border-2 border-black shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm uppercase leading-tight">{item.name}</p>
                                        <p className="text-xs text-gray-500 font-mono">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-black text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Cost Breakdown */}
                        <div className="p-6 bg-white flex flex-col gap-2">
                            <div className="flex justify-between font-bold text-gray-600 uppercase text-sm">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-600 uppercase text-sm">
                                <span>Shipping</span>
                                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-600 uppercase text-sm">
                                <span>Est. Tax (7%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Total & Pay */}
                        <div className="bg-accent p-6 border-t-4 border-black">
                            <div className="flex justify-between items-end mb-6">
                                <span className="font-black uppercase text-xl">Total Damage</span>
                                <span className="font-black text-4xl leading-none">${grandTotal.toFixed(2)}</span>
                            </div>
                            
                            <button 
                                onClick={handlePay}
                                disabled={isProcessing}
                                className={`w-full h-20 text-white text-3xl font-black uppercase tracking-wider border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-gray-800 cursor-not-allowed' : 'bg-black active:translate-x-[8px] active:translate-y-[8px]'}`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={32} />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>Pay Now <span className="material-symbols-outlined text-primary">➜</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------- SUCCESS ----------------
export const SuccessPage: React.FC<{ onViewOrder: () => void }> = ({ onViewOrder }) => {
    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px] opacity-10"></div>
             
             <div className="relative z-10 bg-white border-4 border-black p-8 md:p-12 shadow-neo-lg max-w-2xl transform rotate-1">
                 <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-500 border-4 border-black rounded-full flex items-center justify-center shadow-neo">
                        <Check size={48} strokeWidth={4} />
                    </div>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none tracking-tighter">Order<br/>Secured</h1>
                 <p className="font-bold text-xl mb-8">Your drip is officially secured. Prepare for arrival.</p>
                 
                 <div className="bg-gray-100 border-4 border-black p-4 mb-8 font-mono text-sm text-left">
                     <p className="mb-2">ORDER ID: <span className="font-bold">#AICE-9942</span></p>
                     <p>EST. DELIVERY: <span className="font-bold">3-5 BUSINESS DAYS</span></p>
                 </div>

                 <button 
                    onClick={onViewOrder}
                    className="w-full bg-black text-white px-8 py-4 text-xl font-black uppercase border-4 border-black shadow-neo hover:bg-white hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                 >
                    Track Order
                 </button>
             </div>
        </div>
    );
}