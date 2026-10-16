'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons';

export function CategoryView({ slug }: { slug: string }) {
  const { t, language, dir } = useLanguage();

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.categorySlug === slug);

  return (
    <div className="py-10 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#568C42] mb-6">
          <Link href="/" className="hover:underline">
            {t('الرئيسية', 'Home')}
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:underline">
            {t('الأقسام', 'Categories')}
          </Link>
          <span>/</span>
          <span className="text-[#183C2A] font-bold">
            {language === 'ar' ? category.nameAr : category.nameEn}
          </span>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#163D29] via-[#245A35] to-[#163D29] text-white p-6 sm:p-10 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-[#568C42]/30">
          <div className="max-w-xl space-y-3 text-center md:text-start">
            <span className="inline-block px-3 py-1 rounded-full bg-[#A8D957]/20 border border-[#A8D957]/40 text-[#A8D957] text-xs font-bold">
              {categoryProducts.length} {t('منتجات متوفرة', 'available products')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {language === 'ar' ? category.nameAr : category.nameEn}
            </h1>
            <p className="text-sm text-[#DCE8D1] leading-relaxed">
              {language === 'ar' ? category.descriptionAr : category.descriptionEn}
            </p>
          </div>

          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/10 p-4 border border-white/20 flex items-center justify-center shrink-0">
            <Image
              src={category.image}
              alt={category.nameAr}
              width={160}
              height={160}
              sizes="(max-width: 640px) 140px, 180px"
              quality={85}
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRURGNEU1Ii8+PC9zdmc+"
              className="object-contain w-full h-full drop-shadow-xl"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#183C2A]">
            {t('قائمة المنتجات', 'Products List')}
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#245A35] hover:text-[#568C42]"
          >
            <span>{t('عرض جميع الفئات', 'Browse All Categories')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#DCE8D1]">
            <p className="text-gray-500 text-sm">
              {t('لا توجد منتجات حالياً في هذا القسم', 'No products currently in this category')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
