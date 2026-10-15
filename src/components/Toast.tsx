'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckIcon } from './Icons';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#163D29] text-white text-xs sm:text-sm font-bold shadow-2xl border border-[#A8D957]/40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-5 h-5 rounded-full bg-[#A8D957] text-[#163D29] flex items-center justify-center shrink-0">
        <CheckIcon size={12} />
      </div>
      <span>{toast}</span>
    </div>
  );
};
