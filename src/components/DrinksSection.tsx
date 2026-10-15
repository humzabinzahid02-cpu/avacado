'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const DrinksSection: React.FC = () => {
  const { t, dir } = useLanguage();

  // Fresh drinks products
  const drinks = products.filter(
    (p) =>
      p.categorySlug === 'avocado-drinks' ||
      p.categorySlug === 'natural-juices' ||
      p.categorySlug === 'mixes' ||
      p.categorySlug === 'milkshakes' ||
      p.categorySlug === 'smoothies'
  ).slice(0, 4);

  return (
    <section className="py-14 bg-[#FAF9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold mb-2">
              <MaterialIcon name="local_bar" size={16} />
              <span>{t('مشروبات وعصائر طبيعية', 'Fresh & Natural Drinks')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#183C2A] tracking-tight">
              {t('تشكيلة العصائر المنعشة', 'Refreshing Drinks Collection')}
            </h2>
            <p className="text-xs sm:text-sm text-[#568C42] mt-1">
              {t(
                'عصائر طبيعية 100%، خلطات طبقات فريدة، وميلك شيك غني بالنكهات الاستثنائية',
                '100% natural juices, signature layered drinks, and gourmet milkshakes'
              )}
            </p>
          </div>

          <Link
            href="/shop?cat=natural-juices"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#245A35] hover:text-[#568C42] transition-colors group"
          >
            <span>{t('استكشف المشروبات', 'Explore All Drinks')}</span>
            {dir === 'rtl' ? (
              <ArrowLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drinks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
