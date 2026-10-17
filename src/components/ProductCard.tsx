'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { HeartIcon, ShoppingBagIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { t, language } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group flex flex-col justify-between bg-[#EDF4E5]/80 hover:bg-[#EDF4E5] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 transition-all duration-300 transform hover:-translate-y-1 shadow-2xs hover:shadow-lg relative border border-[#DCE8D1]/60">
      
      {/* Top Wishlist Heart Icon (Floating) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-2 sm:top-2.5 end-2 sm:end-2.5 z-10 p-1.5 rounded-full transition-colors shadow-2xs ${
          isFavorited
            ? 'text-red-500 bg-white/95'
            : 'text-gray-400 hover:text-red-500 bg-white/70 hover:bg-white/95'
        }`}
        title={isFavorited ? t('إزالة من المفضلة', 'Remove from wishlist') : t('إضافة للمفضلة', 'Add to wishlist')}
        aria-label="Wishlist toggle"
      >
        <HeartIcon size={14} filled={isFavorited} className="sm:w-4 sm:h-4" />
      </button>

      {/* Product Image on Rounded Soft Background (Aspect Square, object-contain so drinks aren't cropped) */}
      <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3.5 flex items-center justify-center overflow-hidden mb-2.5 sm:mb-3 shadow-2xs">
        <Link href={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.nameAr}
            width={320}
            height={320}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 200px, 240px"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRURGNEU1Ii8+PC9zdmc+"
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Title & Price */}
      <div className="text-center space-y-1 mb-2.5 sm:mb-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-bold text-[#183C2A] group-hover:text-[#245A35] transition-colors line-clamp-1">
            {language === 'ar' ? product.nameAr : product.nameEn}
          </h3>
        </Link>

        <div className="text-xs font-bold text-gray-700">
          <span>{product.price.toFixed(2)}</span>{' '}
          <span className="text-[10px] sm:text-[11px] text-gray-500">{t('ر.س', 'SAR')}</span>
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-full bg-[#245A35] hover:bg-[#163D29] text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-colors active:scale-98 whitespace-nowrap"
      >
        <span>{t('أضف إلى السلة', 'Add to Cart')}</span>
        <ShoppingBagIcon size={13} className="shrink-0" />
      </button>

    </div>
  );
};
