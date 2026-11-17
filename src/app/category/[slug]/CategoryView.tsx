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
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#68816D] mb-6">
          <Link href="/" className="hover:text-[#287A3D] hover:underline">
            {t('الرئيسية', 'Home')}
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#287A3D] hover:underline">
            {t('الأقسام', 'Categories')}
          </Link>
          <span>/</span>
          <span className="text-[#174C2B] font-bold">
            {language === 'ar' ? category.nameAr : category.nameEn}
          </span>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#174C2B] via-[#287A3D] to-[#174C2B] text-white p-6 sm:p-10 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-[#A8D900]/30">
          <div className="max-w-xl space-y-3 text-center md:text-start">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5D8]/20 border border-[#A8D900]/40 text-[#DFFF00] text-xs font-bold">
              {categoryProducts.length} {t('منتجات متوفرة', 'available products')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {language === 'ar' ? category.nameAr : category.nameEn}
            </h1>
            <p className="text-sm text-[#E8F5D8] leading-relaxed">
              {language === 'ar' ? category.descriptionAr : category.descriptionEn}
            </p>
          </div>

          {/* Circular Category Photo */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 sm:p-2 bg-white/20 border-2 border-white/40 shadow-2xl flex items-center justify-center shrink-0 backdrop-blur-xs">
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner">
              <Image
                src={category.image}
                alt={category.nameAr}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                quality={90}
                priority
                className="object-cover object-center w-full h-full transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#174C2B]">
            {t('قائمة المنتجات', 'Products List')}
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#287A3D] hover:text-[#A8D900] transition-colors"
          >
            <span>{t('عرض جميع الفئات', 'Browse All Categories')}</span>
            {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#DCEBD3]">
            <p className="text-[#68816D] text-sm">
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
