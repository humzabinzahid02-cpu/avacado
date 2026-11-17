'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { ProductSize } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import {
  StarIcon,
  ShoppingBagIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
} from '@/components/Icons';
import { MaterialIcon } from '@/components/MaterialIcon';

export function ProductDetailView({ id }: { id: string }) {
  const { t, language } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  // Find product by slug or id
  const product = products.find((p) => p.slug === id || p.id.toString() === id);

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = selectedSize ? selectedSize.price : product.price;

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#68816D] mb-8">
          <Link href="/" className="hover:text-[#287A3D] hover:underline">
            {t('الرئيسية', 'Home')}
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#287A3D] hover:underline">
            {t('المتجر', 'Shop')}
          </Link>
          <span>/</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-[#287A3D] hover:underline">
            {language === 'ar' ? product.categoryNameAr : product.categoryNameEn}
          </Link>
          <span>/</span>
          <span className="text-[#174C2B] font-bold">
            {language === 'ar' ? product.nameAr : product.nameEn}
          </span>
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCEBD3] shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#E8F5D8]/20 p-6 flex items-center justify-center border border-[#DCEBD3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.nameAr}
                  width={550}
                  height={550}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 550px"
                  quality={85}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUwIiBoZWlnaHQ9IjU1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRThGNUQ4Ii8+PC9zdmc+"
                  className="object-cover w-full h-full rounded-xl transition-transform duration-500 hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 start-4 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold shadow-xs border border-[#DCEBD3]">
                    {t('طازج 100%', '100% Fresh')}
                  </span>
                  {product.isPopular && (
                    <span className="px-3 py-1 rounded-full bg-[#DFFF00] text-[#174C2B] text-xs font-bold shadow-xs">
                      {t('الأكثر طلباً', 'Best Seller')}
                    </span>
                  )}
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 end-4 p-2.5 rounded-full shadow-md transition-colors ${
                    isFavorited
                      ? 'bg-red-50 text-red-500'
                      : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <HeartIcon size={20} filled={isFavorited} />
                </button>
              </div>

              {/* Quality Guarantee Mini-Bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-[#68816D] py-2">
                <div className="p-2 rounded-xl bg-[#E8F5D8]/30 border border-[#DCEBD3] flex flex-col items-center">
                  <span className="flex items-center gap-1 font-bold text-[#287A3D]">
                    <MaterialIcon name="eco" size={14} />
                    <span>{t('طبيعي', 'Natural')}</span>
                  </span>
                  <span className="text-[10px] text-[#68816D]">{t('بدون سكر مضاف', 'No sugar added')}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#E8F5D8]/30 border border-[#DCEBD3] flex flex-col items-center">
                  <span className="flex items-center gap-1 font-bold text-[#287A3D]">
                    <MaterialIcon name="bolt" size={14} />
                    <span>{t('طازج', 'Freshly Made')}</span>
                  </span>
                  <span className="text-[10px] text-[#68816D]">{t('يُعصر فور الطلب', 'Pressed to order')}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#E8F5D8]/30 border border-[#DCEBD3] flex flex-col items-center">
                  <span className="flex items-center gap-1 font-bold text-[#287A3D]">
                    <MaterialIcon name="local_shipping" size={14} />
                    <span>{t('سريع', 'Fast Delivery')}</span>
                  </span>
                  <span className="text-[10px] text-[#68816D]">{t('تبريد مضمون', 'Chilled transit')}</span>
                </div>
              </div>
            </div>

            {/* Product Info & Action Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-[#287A3D] tracking-wider uppercase block mb-1">
                  {language === 'ar' ? product.categoryNameAr : product.categoryNameEn}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#174C2B] tracking-tight">
                  {language === 'ar' ? product.nameAr : product.nameEn}
                </h1>

                {/* Rating & Availability */}
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <StarIcon size={16} filled />
                    <span className="font-bold text-gray-800 text-sm">{product.rating.toFixed(1)}</span>
                    <span className="text-[#68816D]">({product.reviewsCount} {t('تقييم عميل', 'customer reviews')})</span>
                  </div>

                  <span className="text-gray-300">|</span>

                  <span className="flex items-center gap-1 text-[#287A3D] font-bold">
                    <CheckIcon size={14} />
                    <span>{t('متوفر للطلب الفوري', 'In Stock & Ready')}</span>
                  </span>

                  {product.calories && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="inline-flex items-center gap-1.5 text-[#174C2B] bg-[#E8F5D8] px-2.5 py-0.5 rounded-full font-bold border border-[#DCEBD3] shadow-2xs">
                        <MaterialIcon name="local_fire_department" size={14} className="text-[#A8D900]" />
                        <span>{product.calories} {t('سعرة حرارية', 'Calories')}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-[#E8F5D8]/40 border border-[#DCEBD3] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#68816D] block mb-1">{t('السعر الحالي', 'Current Price')}</span>
                  <div className="inline-flex items-baseline gap-2 px-4 py-1.5 rounded-2xl bg-[#DFFF00] text-black font-black text-2xl sm:text-3xl shadow-2xs">
                    <span>{(currentPrice * quantity).toFixed(2)}</span>
                    <span className="text-sm font-extrabold text-black">{t('ر.س', 'SAR')}</span>
                  </div>
                </div>

                {product.originalPrice && (
                  <div className="text-end">
                    <span className="text-xs text-red-500 font-bold block">{t('وفر الآن', 'Save now')}</span>
                    <span className="text-sm text-gray-400 line-through">
                      {(product.originalPrice * quantity).toFixed(2)} {t('ر.س', 'SAR')}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#174C2B] uppercase tracking-wider">
                  {t('وصف المنتج', 'Product Description')}
                </h3>
                <p className="text-sm text-[#365B40] leading-relaxed font-normal">
                  {language === 'ar' ? product.descriptionAr : product.descriptionEn}
                </p>
              </div>

              {/* Sizes / Variants Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-[#174C2B] block">
                    {t('اختر الحجم والسعة:', 'Select Size / Volume:')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-3.5 rounded-xl text-xs font-bold border transition-all text-start flex flex-col justify-between ${
                          selectedSize?.id === size.id
                            ? 'border-[#287A3D] bg-[#E8F5D8] text-[#174C2B] ring-2 ring-[#287A3D]'
                            : 'border-[#DCEBD3] bg-white text-[#365B40] hover:border-[#A8D900]'
                        }`}
                      >
                        <span className="line-clamp-1">{language === 'ar' ? size.nameAr : size.nameEn}</span>
                        <span className="text-[#287A3D] font-black text-sm mt-1">{size.price.toFixed(2)} {t('ر.س', 'SAR')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients List */}
              {product.ingredientsAr && product.ingredientsAr.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-[#174C2B] uppercase tracking-wider">
                    {t('المكونات الطبيعية', 'Natural Ingredients')}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'ar' ? product.ingredientsAr : product.ingredientsEn || product.ingredientsAr).map((ing, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#E8F5D8]/40 text-[#174C2B] text-xs font-medium border border-[#DCEBD3]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter & Add to Cart Action */}
              <div className="pt-4 border-t border-[#DCEBD3] flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 bg-[#E8F5D8]/30 rounded-xl border border-[#DCEBD3] p-1.5 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-xs font-bold text-[#68816D] ps-2">{t('الكمية:', 'Qty:')}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#174C2B] hover:bg-[#E8F5D8]"
                    >
                      <MinusIcon size={14} />
                    </button>
                    <span className="w-10 text-center font-black text-base text-[#174C2B]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#174C2B] hover:bg-[#E8F5D8]"
                    >
                      <PlusIcon size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="flex-1 w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#287A3D] to-[#A8D900] hover:from-[#A8D900] hover:to-[#DFFF00] text-white hover:text-[#174C2B] font-black text-base shadow-lg hover:shadow-xl hover:shadow-[#A8D900]/20 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingBagIcon size={20} />
                  <span>{t('أضف إلى سلة المشتريات', 'Add to Shopping Cart')}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#174C2B]">
              {t('منتجات قد تعجبك أيضاً', 'You May Also Like')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
