'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const IceCreamSection: React.FC = () => {
  const { t, dir } = useLanguage();

  // Ice cream products
  const iceCreams = products
    .filter((p) => p.categorySlug === 'artisanal-ice-cream')
    .slice(0, 4);

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-white via-[#E8F5D8]/20 to-white border-b border-[#DCEBD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D8] text-[#174C2B] text-xs font-extrabold mb-2 border border-[#DCEBD3]">
              <MaterialIcon name="icecream" size={16} className="text-[#4F8A3B]" />
              <span>{t('آيس كريم طبيعي فاخر', 'Artisanal Ice Cream')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B] tracking-tight">
              {t('تشكيلة الآيس كريم الحرفي', 'Artisanal Ice Cream Collection')}
            </h2>
            <p className="text-xs sm:text-sm text-[#4F8A3B] font-semibold mt-1">
              {t(
                'نكهات غنية طبيعية 100% من المانجو، الفراولة، الشوكولاتة البلجيكية، والتوفي الفاخر',
                '100% natural mango, fresh strawberry, Belgian chocolate, and gourmet toffee scoops'
              )}
            </p>
          </div>

          <Link
            href="/shop?category=artisanal-ice-cream"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#174C2B] hover:text-black bg-[#E8F5D8] hover:bg-[#DFFF00] px-4 py-2 rounded-full border border-[#DCEBD3] transition-colors self-start sm:self-auto shrink-0"
          >
            <span>{t('عرض جميع أنواع الآيس كريم', 'View All Ice Creams')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {/* Ice Creams Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {iceCreams.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
