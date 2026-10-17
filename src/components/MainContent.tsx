'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    // Scroll to top cleanly on route change
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Trigger subtle top loading progress bar
    setNavigating(true);
    const timer = setTimeout(() => {
      setNavigating(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* ───── Glowing Top Navigation Progress Bar ───── */}
      <div
        className={`fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none transition-opacity duration-300 ${
          navigating ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`h-full bg-gradient-to-r from-[#245A35] via-[#A8D957] to-[#d4f88e] shadow-[0_0_12px_rgba(168,217,87,0.9)] ${
            navigating ? 'animate-progress-fast' : 'w-0'
          }`}
        />
      </div>

      <main className={`flex-1 ${isHome ? '' : 'pt-16 sm:pt-20'}`}>
        {children}
      </main>
    </>
  );
};
