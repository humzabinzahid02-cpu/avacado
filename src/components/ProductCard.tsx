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
    <div className="group flex flex-col justify-between bg-[#EDF4E5]/80 hover:bg-[#EDF4E5] rounded-3xl p-3.5 transition-all duration-300 transform hover:-translate-y-1 shadow-2xs hover:shadow-lg relative border border-[#DCE8D1]/60">
      
      {/* Top Wishlist Heart Icon */}
      <div className="flex justify-end w-full z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`p-1.5 rounded-full transition-colors ${
            isFavorited
              ? 'text-red-500 bg-white/80'
              : 'text-gray-400 hover:text-red-500 bg-white/40 hover:bg-white/80'
          }`}
          title={isFavorited ? t('إزالة من المفضلة', 'Remove from wishlist') : t('إضافة للمفضلة', 'Add to wishlist')}
          aria-label="Wishlist toggle"
        >
          <HeartIcon size={16} filled={isFavorited} />
        </button>
      </div>

      {/* Product Image on Rounded Soft Background */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 rounded-2xl bg-white p-2 flex items-center justify-center overflow-hidden mb-3 shadow-2xs">
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
            className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Title & Price */}
      <div className="text-center space-y-1 mb-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-bold text-[#183C2A] group-hover:text-[#245A35] transition-colors line-clamp-1">
            {language === 'ar' ? product.nameAr : product.nameEn}
          </h3>
        </Link>

        <div className="text-xs font-bold text-gray-700">
          <span>{product.price.toFixed(2)}</span>{' '}
          <span className="text-[11px] text-gray-500">{t('ر.س', 'SAR')}</span>
        </div>
      </div>

      {/* Add To Cart Button (Matching Mockup: Green with Shopping Cart) */}
      <button
        onClick={() => addToCart(product)}
        className="w-full py-2 px-3 rounded-full bg-[#245A35] hover:bg-[#163D29] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-98"
      >
        <span>{t('أضف إلى السلة', 'Add to Cart')}</span>
        <ShoppingBagIcon size={14} />
      </button>

    </div>
  );
};
