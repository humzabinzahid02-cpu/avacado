'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, deliveryFee, total } = useCart();
  const { t, language, dir } = useLanguage();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'AVO10') {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setCouponSuccess(t('تم تطبيق خصم 10% بنجاح!', '10% discount applied successfully!'));
      setCouponError('');
    } else {
      setCouponError(t('كود الخصم غير صالح. جرّب AVO10', 'Invalid coupon code. Try AVO10'));
      setCouponSuccess('');
    }
  };

  const finalTotal = Math.max(0, total - discount);

  return (
    <div className="py-12 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#174C2B] tracking-tight">
            {t('سلة المشتريات', 'Your Shopping Cart')}
          </h1>
          <p className="text-sm text-[#A8D900] mt-1">
            {t('راجع عناصر طلبيتك وتأكد من المقاسات والكميات قبل الدفع', 'Review your selected items and quantities before checkout')}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#DCEBD3] shadow-xs space-y-4 max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F5D8] flex items-center justify-center text-[#287A3D]">
              <ShoppingBagIcon size={36} />
            </div>
            <h2 className="text-xl font-bold text-[#174C2B]">
              {t('سلة المشتريات فارغة', 'Your cart is empty')}
            </h2>
            <p className="text-xs text-gray-500">
              {t(
                'لم تقم بإضافة أي منتجات بعد. استكشف العصائر الطبيعية والمأكولات والحلويات في متجرنا الآن.',
                'You have not added any items yet. Discover our fresh juices and desserts now.'
              )}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-gradient-to-r from-[#287A3D] via-[#287A3D] to-[#287A3D] hover:from-[#A8D900] hover:via-[#DFFF00] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-sm font-bold shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300"
              >
                <span>{t('تصفح المتجر الآن', 'Browse Shop Now')}</span>
                {dir === 'rtl' ? <ArrowLeftIcon size={16} /> : <ArrowRightIcon size={16} />}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCEBD3] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8F5D8]">
                <span className="text-sm font-bold text-[#174C2B]">
                  {t('المنتجات المحددة', 'Selected Products')} ({items.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:underline font-semibold"
                >
                  {t('إفراغ السلة بالكامل', 'Clear Entire Cart')}
                </button>
              </div>

              <div className="divide-y divide-[#E8F5D8]">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-20 h-20 rounded-2xl bg-[#FFFFFF] p-2 shrink-0 border border-[#DCEBD3] flex items-center justify-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.nameAr}
                          width={75}
                          height={75}
                          sizes="75px"
                          quality={80}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUiIGhlaWdodD0iNzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0VERjRFNSIvPjwvc3ZnPg=="
                          className="object-contain max-h-16 w-auto"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#174C2B]">
                          {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                        </h3>
                        {item.selectedSize && (
                          <span className="text-xs text-[#A8D900] block font-semibold mt-0.5">
                            {language === 'ar' ? item.selectedSize.nameAr : item.selectedSize.nameEn}
                          </span>
                        )}
                        <span className="text-xs font-bold text-gray-500 block mt-1">
                          {t('سعر الوحدة:', 'Unit price:')} {(item.selectedSize ? item.selectedSize.price : item.product.price).toFixed(2)} {t('ر.س', 'SAR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 bg-[#FFFFFF] rounded-xl border border-[#DCEBD3] px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#174C2B] hover:bg-gray-100 rounded-md"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-[#174C2B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#174C2B] hover:bg-gray-100 rounded-md"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="min-w-24 text-end">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#DFFF00] text-black text-sm font-black shadow-2xs">
                          {item.itemTotal.toFixed(2)} {t('ر.س', 'SAR')}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title={t('حذف', 'Remove')}
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary & Coupon (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Coupon Form */}
              <div className="bg-white rounded-3xl p-6 border border-[#DCEBD3] shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-[#174C2B]">
                  {t('هل لديك كود خصم؟', 'Have a promo coupon?')}
                </h3>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="AVO10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 uppercase bg-[#FFFFFF] text-xs font-bold py-2.5 px-3 rounded-xl border border-[#DCEBD3] focus:outline-hidden focus:border-[#287A3D]"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-[#287A3D] hover:bg-[#174C2B] text-white text-xs font-bold transition-colors"
                  >
                    {t('تطبيق', 'Apply')}
                  </button>
                </form>
                {couponSuccess && <p className="text-xs text-[#287A3D] font-bold">{couponSuccess}</p>}
                {couponError && <p className="text-xs text-red-500 font-bold">{couponError}</p>}
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#DCEBD3] shadow-xs space-y-4">
                <h3 className="text-base font-black text-[#174C2B] pb-3 border-b border-[#E8F5D8]">
                  {t('ملخص الطلبية', 'Order Summary')}
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('المجموع الفرعي', 'Subtotal')}</span>
                    <span className="font-bold text-[#174C2B]">{subtotal.toFixed(2)} {t('ر.س', 'SAR')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#287A3D] font-bold">
                      <span>{t('خصم الكوبون (10%)', 'Coupon Discount (10%)')}</span>
                      <span>-{discount.toFixed(2)} {t('ر.س', 'SAR')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>{t('رسوم التوصيل المبرد', 'Chilled Delivery')}</span>
                    <span className="font-bold text-[#174C2B]">
                      {deliveryFee === 0 ? (
                        <span className="text-[#287A3D] font-black">{t('مجاني للطلبات فوق 60 ر.س', 'FREE (Orders > 60 SAR)')}</span>
                      ) : (
                        `${deliveryFee.toFixed(2)} ${t('ر.س', 'SAR')}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-[#E8F5D8] text-[#174C2B]">
                    <span className="text-base font-black">{t('الإجمالي للدفع', 'Total Due')}</span>
                    <span className="text-2xl font-black text-[#174C2B]">
                      {finalTotal.toFixed(2)} {t('ر.س', 'SAR')}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block text-end">
                    {t('شامل ضريبة القيمة المضافة 15%', 'Includes 15% VAT')}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full inline-block py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#287A3D] via-[#287A3D] to-[#287A3D] hover:from-[#A8D900] hover:via-[#DFFF00] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-center font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300"
                  >
                    {t('متابعة إلى الدفع وإتمام الطلب', 'Proceed to Checkout')}
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
