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

  // 4 Featured signature drinks across distinct menu categories
  const featuredDrinkSlugs = ['special-avocado', 'arais-ice-cream', 'fresh-cocktail', 'galaxy-shake'];
  const drinks = featuredDrinkSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  return (
    <section className="py-14 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold mb-2 border border-[#DCEBD3]">
              <MaterialIcon name="local_bar" size={16} />
              <span>{t('مشروبات وعصائر طبيعية', 'Fresh & Natural Drinks')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B] tracking-tight">
              {t('تشكيلة العصائر المنعشة', 'Refreshing Drinks Collection')}
            </h2>
            <p className="text-xs sm:text-sm text-[#365B40] mt-1 font-medium">
              {t(
                'عصائر طبيعية 100%، خلطات طبقات فريدة، وميلك شيك غني بالنكهات الاستثنائية',
                '100% natural juices, signature layered drinks, and gourmet milkshakes'
              )}
            </p>
          </div>

          <Link
            href="/shop?category=cocktails"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#174C2B] hover:text-black bg-[#E8F5D8] hover:bg-[#DFFF00] px-4 py-2 rounded-full border border-[#DCEBD3] transition-colors self-start sm:self-auto shrink-0"
          >
            <span>{t('عرض جميع العصائر والكوكتيلات', 'View All Drinks & Cocktails')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {/* 4 Cards Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {drinks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
