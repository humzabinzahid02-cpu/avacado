'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const FoodDessertsSection: React.FC = () => {
  const { t, dir } = useLanguage();

  // 4 Featured dishes across Fruit Salads, Platters & Ice Cream
  const featuredFoodSlugs = [
    'salad-with-clotted-cream-honey',
    'fakhfakhina',
    'mango-ice-cream',
    'fruit-salad',
  ];
  const foods = featuredFoodSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  return (
    <section className="py-14 bg-white border-y border-[#DCEBD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold mb-2 border border-[#DCEBD3]">
              <MaterialIcon name="cake" size={16} />
              <span>{t('حلويات وسلطات فواكه وآيس كريم', 'Desserts, Fruit Salads & Ice Cream')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B] tracking-tight">
              {t('قائمة المأكولات والحلويات الفاخرة', 'Gourmet Food & Desserts Menu')}
            </h2>
            <p className="text-xs sm:text-sm text-[#365B40] mt-1 font-medium">
              {t(
                'وافل مقرمش بالنوتيلا، كريب ساخن، سلطات فواكه بالعسل والقشطة، وآيس كريم أفوكادو مميز',
                'Crispy Nutella waffles, delicate crepes, honey clotted-cream fruit bowls, and avocado ice cream'
              )}
            </p>
          </div>

          <Link
            href="/menu#fruit-salads"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#287A3D] hover:text-[#A8D900] transition-colors group"
          >
            <span>{t('استكشف المنيو والأطباق', 'Explore Full Menu')}</span>
            {dir === 'rtl' ? (
              <ArrowLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* 4 Cards Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {foods.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
