'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const CategorySection: React.FC = () => {
  const { t, dir } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 340;
    // Account for RTL direction
    const multiplier = dir === 'rtl' ? (direction === 'left' ? 1 : -1) : direction === 'left' ? -1 : 1;
    carouselRef.current.scrollBy({ left: scrollAmount * multiplier, behavior: 'smooth' });
  };

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-[#DCEBD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B] tracking-tight">
              {t('الأقسام', 'Categories')}
            </h2>
            <p className="text-xs sm:text-sm text-[#4F8A3B] font-semibold mt-1">
              {t('تصفح كافة الأقسام بالنقر للانتقال للمتجر مباشرة', 'Swipe through categories — tap any to open in shop')}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#174C2B] hover:text-black bg-[#E8F5D8] hover:bg-[#DFFF00] px-4 py-2 rounded-full border border-[#DCEBD3] transition-colors self-start sm:self-auto shrink-0"
          >
            <span>{t('عرض الكل بالمتجر', 'View All in Shop')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {/* Categories Carousel Track with Floating Corner Arrows */}
        <div className="relative group/carousel">
          {/* Left Corner Floating Arrow (aligned to center of circle images) */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-14 sm:top-[72px] md:top-20 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#DFFF00] text-[#174C2B] hover:text-black border-2 border-[#DCEBD3] hover:border-[#4F8A3B] flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
            aria-label="Previous categories"
            title={t('السابق', 'Previous')}
          >
            <ChevronLeftIcon size={22} />
          </button>

          {/* Right Corner Floating Arrow (aligned to center of circle images) */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-14 sm:top-[72px] md:top-20 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#DFFF00] text-[#174C2B] hover:text-black border-2 border-[#DCEBD3] hover:border-[#4F8A3B] flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
            aria-label="Next categories"
            title={t('التالي', 'Next')}
          >
            <ChevronRightIcon size={22} />
          </button>

          {/* Horizontal Scroll Track - No scrollbar, clean modern circular categories */}
          <div
            ref={carouselRef}
            className="flex items-start gap-5 sm:gap-7 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-3 sm:px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* 1. Specials Dedicated Item */}
            <Link
              href="/shop?category=specials"
              className="group flex flex-col items-center text-center w-28 sm:w-36 md:w-40 shrink-0 snap-start cursor-pointer focus:outline-none transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md group-hover:shadow-xl border-4 border-[#DFFF00] group-hover:border-[#4F8A3B] transition-all duration-300 bg-[#174C2B] shrink-0 p-0.5">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/assets/products/arais-ice-cream.jpg"
                    alt="Specials"
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    priority={true}
                    className="object-cover object-center w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#DFFF00] text-black text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-xs whitespace-nowrap z-10">
                  {t('مميز', 'SPECIAL')}
                </span>
              </div>

              {/* Text underneath - clickable with Link */}
              <h3 className="mt-3 text-xs sm:text-sm md:text-base font-extrabold text-[#174C2B] group-hover:text-[#4F8A3B] transition-colors leading-tight line-clamp-2 px-1 flex items-center justify-center gap-1 group-hover:underline">
                <MaterialIcon name="star" size={15} filled className="text-[#4F8A3B] shrink-0" />
                <span>{t('الخلطات الخاصة', 'Signature Specials')}</span>
              </h3>
            </Link>

            {/* 2. All 11 Categories Items */}
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${encodeURIComponent(category.slug)}`}
                className="group flex flex-col items-center text-center w-28 sm:w-36 md:w-40 shrink-0 snap-start cursor-pointer focus:outline-none transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md group-hover:shadow-xl border-4 border-[#DCEBD3] group-hover:border-[#4F8A3B] transition-all duration-300 bg-white shrink-0 p-0.5">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.nameAr}
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                      priority={true}
                      loading="eager"
                      quality={90}
                      className="object-cover object-center w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Text underneath - clickable with Link */}
                <h3 className="mt-3 text-xs sm:text-sm md:text-base font-extrabold text-[#174C2B] group-hover:text-[#4F8A3B] transition-colors leading-tight line-clamp-2 px-1 group-hover:underline">
                  {t(category.nameAr, category.nameEn)}
                </h3>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
