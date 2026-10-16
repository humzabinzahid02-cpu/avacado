'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { XIcon, PlusIcon, MinusIcon, TrashIcon, ShoppingBagIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, deliveryFee, total, clearCart } = useCart();
  const { t, dir, language } = useLanguage();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 60;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 ${
          dir === 'rtl' ? 'left-0' : 'right-0'
        } max-w-full w-full sm:w-[440px] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-${
          dir === 'rtl' ? 'left' : 'right'
        } duration-300`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#DCE8D1] flex items-center justify-between bg-[#FAF9F2]">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon size={22} className="text-[#245A35]" />
            <h2 className="text-lg font-black text-[#183C2A]">
              {t('سلة المشتريات', 'Shopping Cart')}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold">
              {items.length} {t('عناصر', 'items')}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Free Delivery Banner Progress */}
        <div className="p-4 bg-[#EDF4E5]/60 border-b border-[#DCE8D1]">
          {remainingForFreeDelivery > 0 ? (
            <p className="text-xs text-[#183C2A] font-semibold mb-2">
              {t(
                `أضف ${remainingForFreeDelivery.toFixed(2)} ر.س إضافية للحصول على توصيل مجاني!`,
                `Add ${remainingForFreeDelivery.toFixed(2)} SAR more for free delivery!`
              )}
            </p>
          ) : (
            <p className="text-xs text-[#245A35] font-bold mb-2 flex items-center gap-1.5">
              <MaterialIcon name="celebration" size={16} />
              <span>{t('تهانينا! طلبيتك مؤهلة للتوصيل المجاني بالكامل.', 'Congratulations! You qualify for Free Delivery.')}</span>
            </p>
          )}
          <div className="w-full bg-[#DCE8D1] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#245A35] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EDF4E5] flex items-center justify-center text-[#245A35]">
                <ShoppingBagIcon size={36} />
              </div>
              <h3 className="text-lg font-bold text-[#183C2A]">
                {t('سلتك فارغة حالياً', 'Your cart is empty')}
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                {t(
                  'استكشف قائمتنا المتنوعة من العصائر الطبيعية والمثلجات والحلويات الشهية وأضف ما يعجبك.',
                  'Explore our delicious juices, artisanal ice cream, and desserts and add your favorites.'
                )}
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-block py-2.5 px-6 rounded-full bg-[#245A35] text-white text-xs font-bold hover:bg-[#163D29] transition-colors"
              >
                {t('تسوق الآن', 'Shop Now')}
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF9F2] border border-[#DCE8D1] relative"
              >
                {/* Thumbnail */}
                <div className="relative w-18 h-18 rounded-xl bg-white p-1 shrink-0 border border-[#DCE8D1] overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.product.image}
                    alt={item.product.nameAr}
                    width={70}
                    height={70}
                    sizes="70px"
                    quality={80}
                    className="object-contain max-h-16 w-auto"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#183C2A] truncate">
                    {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                  </h4>
                  {item.selectedSize && (
                    <span className="text-[11px] text-[#568C42] block">
                      {language === 'ar' ? item.selectedSize.nameAr : item.selectedSize.nameEn}
                    </span>
                  )}
                  <span className="text-xs font-black text-[#163D29] block mt-1">
                    {item.itemTotal.toFixed(2)} {t('ر.س', 'SAR')}
                  </span>
                </div>

                {/* Counter & Delete */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title={t('حذف', 'Remove')}
                  >
                    <TrashIcon size={14} />
                  </button>

                  <div className="flex items-center gap-1.5 bg-white rounded-lg border border-[#DCE8D1] px-1.5 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-[#183C2A] hover:bg-gray-100 rounded-md"
                    >
                      <MinusIcon size={12} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-[#183C2A]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-[#183C2A] hover:bg-gray-100 rounded-md"
                    >
                      <PlusIcon size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#DCE8D1] bg-[#FAF9F2] space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{t('المجموع الفرعي', 'Subtotal')}</span>
                <span className="font-bold text-[#183C2A]">{subtotal.toFixed(2)} {t('ر.س', 'SAR')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('رسوم التوصيل', 'Delivery Fee')}</span>
                <span className="font-bold text-[#183C2A]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#245A35] font-black">{t('مجاني', 'FREE')}</span>
                  ) : (
                    `${deliveryFee.toFixed(2)} ${t('ر.س', 'SAR')}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[#DCE8D1] text-[#183C2A]">
                <span className="font-black text-base">{t('الإجمالي النهائي', 'Total')}</span>
                <span className="font-black text-base text-[#163D29]">
                  {total.toFixed(2)} {t('ر.س', 'SAR')}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 block">
                {t('* شامل ضريبة القيمة المضافة 15%', '* Includes 15% VAT')}
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#245A35] hover:bg-[#163D29] text-white text-center font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                {t('متابعة الطلب والدفع', 'Proceed to Checkout')}
              </Link>
              <button
                onClick={clearCart}
                className="p-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold"
                title={t('إفراغ السلة', 'Clear Cart')}
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
