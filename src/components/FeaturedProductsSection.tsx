'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

export const FeaturedProductsSection: React.FC = () => {
  const { t, dir } = useLanguage();

  // Exactly the 6 products from the mockup
  const featured = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: منتجات مميزة - عرض الكل */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#183C2A] tracking-tight">
            {t('منتجات مميزة', 'Featured Products')}
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#183C2A] hover:text-[#568C42] transition-colors"
          >
            <span>{t('عرض الكل', 'View All')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {/* 6 Products Grid (Matching Mockup input_file_0.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
