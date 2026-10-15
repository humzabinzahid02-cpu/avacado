'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { HeartIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons';

export default function WishlistPage() {
  const { wishlistIds } = useCart();
  const { t, dir } = useLanguage();

  const favoritedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('قائمة الرغبات والمفضلة', 'My Wishlist')}
          </h1>
          <p className="text-sm text-[#568C42] mt-1">
            {t('المنتجات المفضلة التي قمت بحفظها للرجوع إليها وطلبها بسهولة', 'Saved favorite juices and desserts for fast ordering')}
          </p>
        </div>

        {favoritedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#DCE8D1] shadow-xs space-y-4 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <HeartIcon size={36} filled />
            </div>
            <h2 className="text-xl font-bold text-[#183C2A]">
              {t('قائمة الرغبات فارغة حالياً', 'Your wishlist is currently empty')}
            </h2>
            <p className="text-xs text-gray-500">
              {t(
                'انقر على علامة القلب في أي بطاقة منتج لحفظه في هذه القائمة والرجوع إليه لاحقاً.',
                'Click the heart icon on any product card to save it to your wishlist.'
              )}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#245A35] hover:bg-[#163D29] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <span>{t('تصفح المتجر الآن', 'Browse Menu Now')}</span>
                {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
