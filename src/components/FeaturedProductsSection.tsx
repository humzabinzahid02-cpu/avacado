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
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: الأكثر مبيعاً - عرض الكل */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B] tracking-tight">
              {t('المنتجات الأكثر مبيعاً', 'Best Selling Products')}
            </h2>
            <p className="text-xs sm:text-sm text-[#4F8A3B] font-semibold mt-0.5">
              {t('أشهر وألذ إبداعات الأفوكادو والعصائر الأكثر طلباً', 'Our most popular and highest-rated avocado creations & juices')}
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#174C2B] hover:text-black bg-[#E8F5D8] hover:bg-[#DFFF00] px-4 py-2 rounded-full border border-[#DCEBD3] transition-colors"
          >
            <span>{t('عرض الكل', 'View All')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {/* 6 Products Grid (Responsive & roomier) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} priority={true} />
          ))}
        </div>

      </div>
    </section>
  );
};
