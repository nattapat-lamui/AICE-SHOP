import React from 'react';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            <div className="relative z-10 text-center">
                 <h1 className="text-[10rem] md:text-[15rem] leading-none font-black tracking-tighter text-black drop-shadow-[8px_8px_0px_#fff]">4<span className="text-secondary">0</span>4</h1>
                 
                 <div className="bg-black text-white p-8 border-4 border-white shadow-neo transform -rotate-2 max-w-lg mx-auto">
                    <h2 className="text-4xl font-black uppercase mb-2">Lost? <br/> Get out of here.</h2>
                    <p className="font-mono text-gray-300">The page you are looking for has been moved, deleted, or perhaps never existed in this dimension.</p>
                 </div>
                 
                 <div className="mt-12 flex justify-center gap-4">
                    <button onClick={onGoHome} className="bg-secondary border-4 border-black px-8 py-4 font-black text-xl uppercase tracking-widest text-white shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                        Go Home <ArrowRight className="stroke-[3]" />
                    </button>
                 </div>
            </div>
        </div>
    );
}