import React, { useState } from 'react';
import { ArrowLeft, Package, User as UserIcon, LogOut, CheckCircle, Truck, MapPin, CreditCard, Save } from 'lucide-react';
import { User, Product } from '../types';

// ---------------- LOGIN ----------------
export const LoginPage: React.FC<{ onLogin: () => void, onSwitchToRegister: () => void, onBack: () => void }> = ({ onLogin, onSwitchToRegister, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Branding Side - Polished */}
      <div className="w-full md:w-1/2 bg-primary border-r-4 border-black relative flex flex-col justify-center p-12 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px] opacity-10"></div>
         
         {/* Decorative Elements */}
         <div className="absolute top-10 left-10 w-16 h-16 border-4 border-black bg-transparent rotate-12"></div>
         <div className="absolute bottom-32 right-20 w-24 h-24 bg-black rounded-full mix-blend-overlay opacity-20"></div>
         <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-black opacity-5 rotate-90 whitespace-nowrap pointer-events-none">
            AREA 51
         </div>

         <div className="relative z-10">
            <div className="border-4 border-black bg-white p-2 shadow-neo-lg rotate-[-2deg] mb-8 w-fit">
                <span className="text-xs font-bold bg-black text-white px-2 py-1 uppercase">Official Store</span>
            </div>
            <h1 className="text-8xl font-black leading-[0.85] tracking-tighter mix-blend-hard-light mb-6">AICE<br/>SHOP</h1>
         </div>

         {/* Marquee Strip */}
         <div className="absolute bottom-0 left-0 w-full bg-black text-white py-2 overflow-hidden">
             <div className="whitespace-nowrap animate-marquee text-sm font-mono font-bold">
                 MEMBERS ONLY /// MEMBERS ONLY /// MEMBERS ONLY /// MEMBERS ONLY /// MEMBERS ONLY /// MEMBERS ONLY ///
             </div>
         </div>
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-24 relative">
         <div className="max-w-md w-full mx-auto">
            <button onClick={onBack} className="absolute top-8 right-8 flex items-center gap-2 font-bold uppercase hover:text-primary transition-colors">
               Back to Store <ArrowLeft size={20} />
            </button>

            <h2 className="text-5xl font-black mb-2 uppercase">Welcome <span className="bg-primary px-2">Back</span></h2>
            <p className="text-lg font-bold border-l-4 border-primary pl-4 mb-10">Enter your details to raid the shop.</p>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                <div>
                    <label className="block font-bold uppercase mb-2">Email</label>
                    <input type="email" className="w-full h-14 border-4 border-black p-4 font-bold shadow-neo focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all" placeholder="NAME@EXAMPLE.COM" />
                </div>
                <div>
                    <label className="block font-bold uppercase mb-2">Password</label>
                    <input type="password" className="w-full h-14 border-4 border-black p-4 font-bold shadow-neo focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all" placeholder="********" />
                </div>
                <button type="submit" className="w-full h-16 bg-black text-white text-xl font-black uppercase border-4 border-black shadow-neo-lg hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mt-8">
                    Log In
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="font-bold text-gray-500">New here?</p>
                <button onClick={onSwitchToRegister} className="text-black font-black uppercase underline decoration-4 decoration-primary underline-offset-4 hover:text-primary hover:decoration-black hover:bg-black px-1 transition-all">
                    [ CREATE ACCOUNT ]
                </button>
            </div>
            
            <div className="mt-8 text-center md:hidden">
               <button onClick={onBack} className="text-sm font-bold uppercase border-b-2 border-black pb-1">Continue Shopping</button>
            </div>
         </div>
      </div>
    </div>
  );
};

// ---------------- REGISTER ----------------
export const RegisterPage: React.FC<{ onRegister: () => void, onSwitchToLogin: () => void, onBack: () => void }> = ({ onRegister, onSwitchToLogin, onBack }) => {
    const [password, setPassword] = useState('');
    
    // Simple password strength logic
    const getStrength = (pass: string) => {
        if (pass.length === 0) return 0;
        if (pass.length < 5) return 1;
        if (pass.length < 8) return 2;
        return 3;
    };
    
    const strength = getStrength(password);
    const strengthColor = ['bg-gray-200', 'bg-red-500', 'bg-yellow-400', 'bg-green-500'][strength];
    const strengthWidth = ['w-0', 'w-1/3', 'w-2/3', 'w-full'][strength];

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Branding Side - Polished */}
            <div className="w-full md:w-1/2 bg-secondary border-r-4 border-black relative flex flex-col justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px] opacity-10"></div>
                
                 {/* Decorative Elements */}
                 <div className="absolute top-20 right-20 w-32 h-32 border-8 border-black rounded-full opacity-20"></div>
                 <div className="absolute bottom-1/4 left-10 w-20 h-20 bg-black rotate-45 opacity-10"></div>
                 <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white opacity-20 -rotate-90 whitespace-nowrap pointer-events-none mix-blend-difference">
                    JOIN US
                 </div>

                <div className="relative z-10">
                     <h1 className="text-7xl md:text-8xl font-black leading-[0.85] tracking-tighter text-white drop-shadow-[4px_4px_0px_#000] mb-6">INITIATE<br/>SEQUENCE</h1>
                     <p className="font-mono font-bold bg-black text-white inline-block px-4 py-2 border-2 border-white transform rotate-1">
                        Secure your spot in the future.
                     </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12 relative overflow-y-auto">
                <div className="max-w-md w-full mx-auto py-8">
                    <button onClick={onBack} className="absolute top-8 right-8 flex items-center gap-2 font-bold uppercase hover:text-secondary transition-colors">
                       Back to Store <ArrowLeft size={20} />
                    </button>

                    <h2 className="text-4xl font-black mb-8 uppercase">Create Account</h2>
                    
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block font-bold uppercase mb-2 text-sm">First Name</label>
                                <input type="text" className="w-full h-12 border-4 border-black p-3 font-bold shadow-neo focus:outline-none focus:bg-light" placeholder="ALEX" />
                            </div>
                            <div className="w-1/2">
                                <label className="block font-bold uppercase mb-2 text-sm">Last Name</label>
                                <input type="text" className="w-full h-12 border-4 border-black p-3 font-bold shadow-neo focus:outline-none focus:bg-light" placeholder="DOE" />
                            </div>
                        </div>

                        <div>
                             <label className="block font-bold uppercase mb-2 text-sm">Date of Birth</label>
                             <input type="date" className="w-full h-12 border-4 border-black p-3 font-bold shadow-neo focus:outline-none focus:bg-light" />
                        </div>

                        <div>
                            <label className="block font-bold uppercase mb-2 text-sm">Email</label>
                            <input type="email" className="w-full h-12 border-4 border-black p-3 font-bold shadow-neo focus:outline-none focus:bg-light" placeholder="NAME@EXAMPLE.COM" />
                        </div>
                        
                        <div>
                            <label className="block font-bold uppercase mb-2 text-sm">Password</label>
                            <input 
                                type="password" 
                                className="w-full h-12 border-4 border-black p-3 font-bold shadow-neo focus:outline-none focus:bg-light" 
                                placeholder="********" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Strength Meter */}
                            <div className="mt-2 h-2 w-full bg-gray-200 border-2 border-black overflow-hidden">
                                <div className={`h-full ${strengthColor} ${strengthWidth} transition-all duration-300`}></div>
                            </div>
                            <p className="text-xs font-mono mt-1 text-gray-500 text-right">
                                {strength === 0 ? 'ENTER PASSWORD' : strength === 1 ? 'TOO WEAK' : strength === 2 ? 'GETTING THERE' : 'STRONG'}
                            </p>
                        </div>

                        <div>
                            <label className="block font-bold uppercase mb-2 text-sm">Confirm Password</label>
                            <input type="password" className="w-full h-12 border-4 border-black p-3 font-bold shadow-neo focus:outline-none focus:bg-light" placeholder="********" />
                        </div>

                        <button type="submit" className="w-full h-16 bg-black text-white text-xl font-black uppercase border-4 border-black shadow-neo-lg hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-2 mt-8">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="font-bold text-gray-500">Already have an account?</p>
                        <button onClick={onSwitchToLogin} className="text-black font-black uppercase underline decoration-4 decoration-secondary underline-offset-4 hover:text-secondary hover:decoration-black hover:bg-black px-1 transition-all">
                            [ LOGIN HERE ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---------------- PROFILE ----------------
export const ProfilePage: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        address: '123 Cyberpunk Avenue, Neo-Tokyo, 9991'
    });

    const toggleTrack = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div className="p-4 md:p-12 font-sans text-black">
            <div className="max-w-6xl mx-auto flex flex-col gap-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black pb-8 gap-4">
                    <div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-2">My HQ</h1>
                        <div className="flex gap-2">
                             <span className="bg-black text-white px-3 py-1 font-bold font-mono">ID: {user.id}</span>
                             <span className="bg-primary text-black border-2 border-black px-3 py-1 font-bold font-mono">LEVEL 4 MEMBER</span>
                        </div>
                    </div>
                    <button onClick={onLogout} className="flex items-center gap-2 bg-white border-4 border-black px-6 py-3 font-black uppercase shadow-neo hover:bg-black hover:text-white transition-all">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* SECTION 1: IDENTITY EDITOR */}
                    <section className="flex flex-col gap-6">
                         <div className="flex items-center gap-4 border-b-4 border-dashed border-black pb-2">
                            <div className="w-12 h-12 bg-secondary border-4 border-black flex items-center justify-center text-white">
                                <UserIcon size={24} />
                            </div>
                            <h2 className="text-3xl font-black uppercase">My Identity</h2>
                         </div>

                         <div className="bg-white border-4 border-black p-8 shadow-neo-lg">
                            <form className="flex flex-col gap-4">
                                <div>
                                    <label className="block font-black uppercase mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full h-12 border-4 border-black p-3 font-bold focus:bg-primary focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-black uppercase mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full h-12 border-4 border-black p-3 font-bold focus:bg-primary focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-black uppercase mb-2">Shipping Address</label>
                                    <div className="flex items-start gap-2 h-24 border-4 border-black p-3 bg-white focus-within:bg-primary transition-colors">
                                        <MapPin className="shrink-0 mt-1" size={20} />
                                        <textarea 
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            className="w-full h-full bg-transparent font-bold resize-none focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <button type="button" className="mt-4 bg-primary text-black h-14 border-4 border-black font-black uppercase flex items-center justify-center gap-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-neo transition-all">
                                    <Save size={20} /> Save Changes
                                </button>
                            </form>
                         </div>
                    </section>

                    {/* SECTION 2: ORDER HISTORY */}
                    <section className="flex flex-col gap-6">
                         <div className="flex items-center gap-4 border-b-4 border-dashed border-black pb-2">
                            <div className="w-12 h-12 bg-accent border-4 border-black flex items-center justify-center text-black">
                                <Package size={24} />
                            </div>
                            <h2 className="text-3xl font-black uppercase">Order History</h2>
                         </div>

                         <div className="flex flex-col gap-4">
                            {[ 
                                { id: 'AICE-8821', date: '2023-10-24', total: 450.00, status: 'DELIVERED', active: false },
                                { id: 'AICE-8899', date: '2023-10-26', total: 120.00, status: 'SHIPPED', active: true },
                                { id: 'AICE-9002', date: '2023-10-28', total: 85.00, status: 'PROCESSING', active: true }
                            ].map((order, i) => (
                                <div key={i} className={`bg-white border-4 border-black transition-all ${expandedOrder === order.id ? 'shadow-neo-lg' : 'shadow-neo hover:translate-x-1'}`}>
                                    <div className="p-4 flex flex-wrap justify-between items-center gap-4">
                                        <div>
                                            <p className="font-black text-xl">{order.id}</p>
                                            <p className="font-mono text-sm text-gray-500">{order.date}</p>
                                        </div>
                                        <div>
                                            <span className={`px-2 py-1 border-2 border-black font-bold text-xs ${order.active ? 'bg-primary' : 'bg-gray-200'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="font-black text-lg">${order.total.toFixed(2)}</div>
                                        
                                        {order.active && (
                                            <button 
                                                onClick={() => toggleTrack(order.id)}
                                                className="bg-black text-white px-4 py-2 font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-colors"
                                            >
                                                {expandedOrder === order.id ? 'Close' : 'Track'}
                                            </button>
                                        )}
                                    </div>

                                    {/* Tracking Timeline */}
                                    {expandedOrder === order.id && (
                                        <div className="border-t-4 border-black bg-gray-50 p-6">
                                            <div className="relative flex justify-between items-center">
                                                {/* Connecting Line */}
                                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-0"></div>
                                                <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-black -z-0"></div>

                                                <div className="relative z-10 flex flex-col items-center gap-2">
                                                    <div className="w-8 h-8 bg-black border-2 border-black rounded-full flex items-center justify-center text-white"><CheckCircle size={14} /></div>
                                                    <span className="text-xs font-bold uppercase">Ordered</span>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center gap-2">
                                                    <div className="w-8 h-8 bg-black border-2 border-black rounded-full flex items-center justify-center text-white"><CheckCircle size={14} /></div>
                                                    <span className="text-xs font-bold uppercase">Packed</span>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center gap-2">
                                                    <div className="w-10 h-10 bg-primary border-4 border-black rounded-full flex items-center justify-center animate-pulse"><Truck size={20} /></div>
                                                    <span className="text-xs font-black uppercase">Shipped</span>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center gap-2 opacity-50">
                                                    <div className="w-8 h-8 bg-white border-4 border-gray-300 rounded-full"></div>
                                                    <span className="text-xs font-bold uppercase text-gray-400">Delivered</span>
                                                </div>
                                            </div>
                                            <div className="mt-6 bg-white border-2 border-black p-3 font-mono text-sm text-center">
                                                LATEST UPDATE: ARRIVED AT DISTRIBUTION CENTER (NEO-TOKYO WEST) - 08:42 AM
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>
                    </section>
                </div>
            </div>
        </div>
    );
}