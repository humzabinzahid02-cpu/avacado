'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ProductSize } from '@/types';
import { XIcon, PlusIcon, MinusIcon, ShoppingBagIcon, StarIcon, CheckIcon } from './Icons';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { t, language } = useLanguage();

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      if (quickViewProduct.sizes && quickViewProduct.sizes.length > 0) {
        setSelectedSize(quickViewProduct.sizes[0]);
      } else {
        setSelectedSize(undefined);
      }
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentPrice = selectedSize ? selectedSize.price : quickViewProduct.price;

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#DCE8D1] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Image */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-[#FAF9F2] p-2 flex items-center justify-center border border-[#EDF4E5] overflow-hidden">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.nameAr}
              width={400}
              height={400}
              sizes="(max-width: 768px) 90vw, 400px"
              quality={85}
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRURGNEU1Ii8+PC9zdmc+"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          {/* Product Details Form */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#568C42] block mb-1">
                {language === 'ar' ? quickViewProduct.categoryNameAr : quickViewProduct.categoryNameEn}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#183C2A]">
                {language === 'ar' ? quickViewProduct.nameAr : quickViewProduct.nameEn}
              </h2>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-500">
                <StarIcon size={14} filled />
                <span className="font-bold text-gray-700">{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-gray-400">({quickViewProduct.reviewsCount} {t('تقييم', 'reviews')})</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {language === 'ar' ? quickViewProduct.descriptionAr : quickViewProduct.descriptionEn}
            </p>

            {/* Size Selector if available */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#183C2A] block">
                  {t('اختر الحجم / السعة:', 'Select Size / Volume:')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-start flex items-center justify-between ${
                        selectedSize?.id === size.id
                          ? 'border-[#245A35] bg-[#EDF4E5] text-[#163D29] ring-1 ring-[#245A35]'
                          : 'border-[#DCE8D1] bg-white text-gray-700 hover:border-[#568C42]'
                      }`}
                    >
                      <span>{language === 'ar' ? size.nameAr : size.nameEn}</span>
                      <span className="text-[#245A35] font-black">{size.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Quantity & Add to Cart */}
            <div className="pt-4 border-t border-[#EDF4E5] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">{t('السعر الإجمالي', 'Total Price')}</span>
                  <div className="flex items-baseline gap-1 text-2xl font-black text-[#163D29]">
                    <span>{(currentPrice * quantity).toFixed(2)}</span>
                    <span className="text-xs font-bold text-[#568C42]">{t('ر.س', 'SAR')}</span>
                  </div>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-2 bg-[#FAF9F2] rounded-xl border border-[#DCE8D1] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#183C2A] hover:bg-gray-100"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-[#183C2A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#183C2A] hover:bg-gray-100"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-3.5 px-6 rounded-xl bg-[#245A35] hover:bg-[#163D29] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <ShoppingBagIcon size={18} />
                <span>{t('أضف إلى السلة', 'Add to Cart')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
