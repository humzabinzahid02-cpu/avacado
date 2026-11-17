'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { HeartIcon, ShoppingBagIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { t, language } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group flex flex-col justify-between bg-white hover:bg-[#E8F5D8]/40 rounded-2xl sm:rounded-3xl p-3 sm:p-4 transition-all duration-300 transform hover:-translate-y-1 shadow-2xs hover:shadow-lg relative border border-[#DCEBD3] hover:border-[#4F8A3B]">
      
      {/* Top Wishlist Heart Icon (Floating) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-2.5 sm:top-3 end-2.5 sm:end-3 z-10 p-2 rounded-full transition-all shadow-xs ${
          isFavorited
            ? 'text-red-500 bg-white/95'
            : 'text-gray-400 hover:text-[#174C2B] bg-white/90 hover:bg-[#DFFF00]'
        }`}
        title={isFavorited ? t('إزالة من المفضلة', 'Remove from wishlist') : t('إضافة للمفضلة', 'Add to wishlist')}
        aria-label="Wishlist toggle"
      >
        <HeartIcon size={16} filled={isFavorited} className="sm:w-4.5 sm:h-4.5" />
      </button>

      {/* Product Image (Direct, edge-to-edge inside card with no nested border/padding) */}
      <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-3">
        <Link href={`/product/${product.slug}`} className="w-full h-full block">
          <Image
            src={product.image}
            alt={product.nameAr}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            quality={90}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Title & Price */}
      <div className="text-center space-y-1.5 mb-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm sm:text-base font-extrabold text-[#174C2B] group-hover:text-[#4F8A3B] transition-colors line-clamp-1">
            {language === 'ar' ? product.nameAr : product.nameEn}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#DFFF00] text-black font-black text-xs sm:text-sm shadow-2xs">
            <span>{product.price.toFixed(2)}</span>
            <span className="text-[10px] sm:text-[11px] font-extrabold">{t('ر.س', 'SAR')}</span>
          </div>

          {product.calories && (
            <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-[#E8F5D8] text-[#174C2B] border border-[#DCEBD3] font-bold inline-flex items-center gap-1 shadow-2xs">
              <MaterialIcon name="local_fire_department" size={12} className="text-[#4F8A3B]" />
              <span>{product.calories} {t('سعرة', 'Cal')}</span>
            </span>
          )}
        </div>
      </div>

      {/* Add To Cart Button - Leaf Green to Lime Green base, Lime-Yellow hover */}
      <button
        onClick={() => addToCart(product)}
        className="w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#287A3D] to-[#A8D900] hover:from-[#A8D900] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md hover:shadow-[#A8D900]/30 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300 active:scale-95 whitespace-nowrap"
      >
        <span>{t('أضف إلى السلة', 'Add to Cart')}</span>
        <ShoppingBagIcon size={13} className="shrink-0" />
      </button>

    </div>
  );
};
