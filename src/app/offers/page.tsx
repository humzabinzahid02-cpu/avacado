'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function OffersPage() {
  const { t } = useLanguage();

  // Gift boxes, bundles, and special items
  const offerProducts = products.filter(
    (p) => p.categorySlug === 'gift-boxes' || p.originalPrice || p.categorySlug === 'energy-detox'
  );

  return (
    <div className="py-12 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#174C2B] via-[#287A3D] to-[#174C2B] text-white p-8 sm:p-14 text-center space-y-4 shadow-xl border border-[#A8D900]/30">
          <span className="inline-block px-3 py-1 rounded-full bg-[#A8D900]/20 border border-[#A8D900]/40 text-[#A8D900] text-xs font-bold">
            {t('عروض وتجمعات فن الأفوكادو', 'Avocado Art Gathering Specials')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('بوكسات الجمعات والمناسبات العائلية', 'Gathering Boxes & Family Packs')}
          </h1>
          <p className="text-sm sm:text-base text-[#DCEBD3] max-w-xl mx-auto leading-relaxed">
            {t(
              'استمتع بأشهى العصائر الطبيعية في بوكسات حرارية أنيقة تحافظ على برودتها وانتعاشها لكافة مناسباتكم واجتماعاتكم.',
              'Enjoy chilled natural juices in insulated luxury gift boxes designed to keep every bottle fresh for your celebrations.'
            )}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#174C2B]">
            {t('البوكسات والمجموعات المتوفرة', 'Available Packs & Bundles')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
