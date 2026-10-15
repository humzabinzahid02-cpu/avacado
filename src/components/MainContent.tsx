'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main className={`flex-1 ${isHome ? '' : 'pt-16 sm:pt-20'}`}>
      {children}
    </main>
  );
};
