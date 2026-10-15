'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

export const CategorySection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#183C2A] tracking-tight">
            {t('تسوق حسب الفئة', 'Shop by Category')}
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#183C2A] hover:text-[#568C42] transition-colors"
          >
            <span>{t('عرض الكل', 'View All')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {/* 9 Category Cards Row (Matching Mockup input_file_0.png) */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5 sm:gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center justify-between bg-[#EDF4E5]/80 hover:bg-[#EDF4E5] rounded-2xl p-2.5 transition-all duration-300 transform hover:-translate-y-1 text-center shadow-2xs hover:shadow-md"
            >
              {/* Circular Food Photo */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 shadow-2xs bg-white/60 p-1 flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.nameAr}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs font-bold text-[#183C2A] group-hover:text-[#245A35] transition-colors leading-tight line-clamp-1">
                {t(category.nameAr, category.nameEn)}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
