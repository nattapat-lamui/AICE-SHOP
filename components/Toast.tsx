import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div 
      className={`fixed bottom-8 right-4 md:right-8 z-[100] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
    >
      <div className="bg-[#00FF00] border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 min-w-[300px]">
        <div className="bg-black text-white p-1">
          <Check size={20} strokeWidth={4} />
        </div>
        <span className="text-black font-black uppercase text-lg tracking-wide">
          {message || 'Action Successful'}
        </span>
      </div>
    </div>
  );
};