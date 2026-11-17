'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

export const PromoBanner: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#174C2B] text-white p-6 sm:p-8 shadow-md">
          
          {/* Subtle nature leaf texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#174C2B] via-[#287A3D] to-[#174C2B] pointer-events-none opacity-90" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Sliced Avocado on the side */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-start">
              <div className="relative w-32 h-28 sm:w-44 sm:h-32 flex items-center justify-center shrink-0">
                <Image
                  src="/assets/prod-avocado.jpg"
                  alt="نكهات تجمعنا"
                  width={180}
                  height={130}
                  sizes="(max-width: 640px) 130px, 180px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRThGNUQ4Ii8+PC9zdmc+"
                  className="object-cover w-full h-full rounded-2xl drop-shadow-xl"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t('نكهات تجمعنا', 'Flavors That Bring Us Together')}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8F5D8] max-w-md font-normal leading-relaxed">
                  {t(
                    'من الأفوكادو الطبيعي، إلى العصائر المنعشة.. كل لحظة معه أحلى',
                    'From natural avocado to refreshing juices.. every moment with it is sweeter'
                  )}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="shrink-0">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#DFFF00] hover:text-[#174C2B] border border-white/20 hover:border-[#DFFF00] text-white font-bold text-xs sm:text-sm transition-all duration-300"
              >
                <span>{t('اكتشف المزيد', 'Explore More')}</span>
                {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
