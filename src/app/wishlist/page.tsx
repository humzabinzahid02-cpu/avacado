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
    <div className="py-12 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#174C2B] tracking-tight">
            {t('قائمة الرغبات والمفضلة', 'My Wishlist')}
          </h1>
          <p className="text-sm text-[#A8D900] mt-1">
            {t('المنتجات المفضلة التي قمت بحفظها للرجوع إليها وطلبها بسهولة', 'Saved favorite juices and desserts for fast ordering')}
          </p>
        </div>

        {favoritedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#DCEBD3] shadow-xs space-y-4 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <HeartIcon size={36} filled />
            </div>
            <h2 className="text-xl font-bold text-[#174C2B]">
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
                className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-gradient-to-r from-[#287A3D] via-[#287A3D] to-[#287A3D] hover:from-[#A8D900] hover:via-[#DFFF00] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300"
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
