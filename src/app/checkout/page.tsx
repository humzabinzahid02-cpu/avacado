'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { branches } from '@/data/branches';
import { ShoppingBagIcon, CheckIcon } from '@/components/Icons';
import { MaterialIcon } from '@/components/MaterialIcon';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Form State
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'card' | 'applepay' | 'cod'>('mada');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-[#FAF9F2] min-h-screen">
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-[#DCE8D1] space-y-4">
          <ShoppingBagIcon size={40} className="mx-auto text-gray-400" />
          <h2 className="text-xl font-bold text-[#183C2A]">
            {t('سلتك فارغة', 'Your cart is empty')}
          </h2>
          <p className="text-xs text-gray-500">
            {t('الرجاء إضافة منتجات إلى السلة قبل التوجه إلى صفحة الدفع.', 'Please add items to your cart before proceeding to checkout.')}
          </p>
          <Link
            href="/shop"
            className="inline-block py-2.5 px-6 rounded-full bg-[#245A35] text-white text-xs font-bold"
          >
            {t('تصفح المتجر', 'Browse Shop')}
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(t('يرجى إدخال الاسم الكريم', 'Please enter your full name'));
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setErrorMessage(t('يرجى إدخال رقم هاتف سعودي صحيح', 'Please enter a valid phone number'));
      return;
    }
    if (fulfillmentType === 'delivery' && !district.trim()) {
      setErrorMessage(t('يرجى تحديد الحي بالرياض', 'Please enter your district in Riyadh'));
      return;
    }

    setIsSubmitting(true);

    const orderId = `AVO-${Date.now().toString().slice(-6)}`;
    const orderData = {
      orderId,
      date: new Date().toISOString(),
      fulfillmentType,
      selectedBranch,
      customer: { fullName, phone, city, district, streetAddress, notes },
      paymentMethod,
      items,
      subtotal,
      deliveryFee: fulfillmentType === 'delivery' ? deliveryFee : 0,
      total: fulfillmentType === 'delivery' ? total : subtotal,
      isDemo: true,
    };

    try {
      localStorage.setItem('avocado_last_order', JSON.stringify(orderData));
      clearCart();
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${orderId}`);
      }, 800);
    } catch {
      setIsSubmitting(false);
    }
  };

  const calculatedDelivery = fulfillmentType === 'delivery' ? deliveryFee : 0;
  const calculatedTotal = subtotal + calculatedDelivery;

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('إتمام الطلب', 'Checkout')}
          </h1>
          <p className="text-sm text-[#568C42] mt-1">
            {t('أدخل بيانات التوصيل واختر وسيلة الدفع المفضلة لتأكيد طلبك', 'Enter your delivery details and choose a payment method')}
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <span className="text-amber-700 shrink-0"><MaterialIcon name="info" size={18} /></span>
          <span>
            {t(
              'وضع الطلب التجريبي (Demo Mode): لن يتم خصم مبالغ مالية حقيقية من بطاقتك. سيتم تسجيل الطلب وتجهيزه وتأكيد استلامه فورياً.',
              'Demo Mode Active: No real money will be charged. Your order will be placed and confirmed immediately.'
            )}
          </span>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Fields (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Fulfillment Type (Delivery vs Pickup) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-4">
              <h2 className="text-base font-black text-[#183C2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#EDF4E5] text-[#245A35] flex items-center justify-center text-xs font-bold">1</span>
                <span>{t('طريقة الاستلام', 'Fulfillment Method')}</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`py-4 px-4 rounded-2xl border text-center font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                    fulfillmentType === 'delivery'
                      ? 'border-[#245A35] bg-[#EDF4E5] text-[#163D29] ring-2 ring-[#245A35]'
                      : 'border-[#DCE8D1] bg-[#FAF9F2] text-gray-600 hover:border-[#568C42]'
                  }`}
                >
                  <MaterialIcon name="local_shipping" size={24} className="text-[#245A35]" />
                  <span>{t('توصيل إلى العنوان بالرياض', 'Home Delivery (Riyadh)')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-4 px-4 rounded-2xl border text-center font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                    fulfillmentType === 'pickup'
                      ? 'border-[#245A35] bg-[#EDF4E5] text-[#163D29] ring-2 ring-[#245A35]'
                      : 'border-[#DCE8D1] bg-[#FAF9F2] text-gray-600 hover:border-[#568C42]'
                  }`}
                >
                  <MaterialIcon name="storefront" size={24} className="text-[#245A35]" />
                  <span>{t('استلام من الفرع', 'Pickup from Branch')}</span>
                </button>
              </div>

              {/* Branch Selection for Pickup */}
              {fulfillmentType === 'pickup' && (
                <div className="pt-3 space-y-2">
                  <label className="text-xs font-bold text-[#183C2A] block">
                    {t('اختر الفرع للاستلام:', 'Select Pickup Branch:')}
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full bg-[#FAF9F2] text-sm text-[#183C2A] py-3 px-4 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {language === 'ar' ? b.nameAr : b.nameEn} ({language === 'ar' ? b.addressAr : b.addressEn})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 2. Customer Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-4">
              <h2 className="text-base font-black text-[#183C2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#EDF4E5] text-[#245A35] flex items-center justify-center text-xs font-bold">2</span>
                <span>{t('بيانات العميل', 'Customer Details')}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#183C2A] block mb-1">
                    {t('الاسم الكريم *', 'Full Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('محمد عبدالله', 'Mohammed Abdullah')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#183C2A] block mb-1">
                    {t('رقم الجوال السعودي *', 'Saudi Mobile Number *')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35] text-start"
                  />
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
                <div className="space-y-4 pt-2 border-t border-[#EDF4E5]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#183C2A] block mb-1">
                        {t('المدينة', 'City')}
                      </label>
                      <input
                        type="text"
                        disabled
                        value={city}
                        className="w-full bg-gray-100 text-gray-600 text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2A] block mb-1">
                        {t('الحي *', 'District in Riyadh *')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('حي الصحافة / الملقا / النرجس...', 'Al Sahafa / Al Malqa...')}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#183C2A] block mb-1">
                      {t('تفاصيل العنوان والشارع', 'Street Address & Details')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('اسم الشارع، رقم المبنى أو الشقة', 'Street name, building number')}
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[#183C2A] block mb-1">
                  {t('ملاحظات خاصة بالطلب (اختياري)', 'Special Delivery Notes (Optional)')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('أي ملاحظات على التحضير أو التوصيل...', 'Any preparation notes...')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF9F2] text-sm py-2 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-4">
              <h2 className="text-base font-black text-[#183C2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#EDF4E5] text-[#245A35] flex items-center justify-center text-xs font-bold">3</span>
                <span>{t('طريقة الدفع', 'Payment Method')}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'mada', label: 'مدى Mada', icon: 'credit_card' },
                  { id: 'applepay', label: 'Apple Pay', icon: 'apple' },
                  { id: 'card', label: 'بطاقة ائتمان', icon: 'credit_card' },
                  { id: 'cod', label: 'عند الاستلام', icon: 'payments' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`py-3 px-3 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === pm.id
                        ? 'border-[#245A35] bg-[#EDF4E5] text-[#163D29] ring-2 ring-[#245A35]'
                        : 'border-[#DCE8D1] bg-[#FAF9F2] text-gray-700 hover:border-[#568C42]'
                    }`}
                  >
                    <span className="text-[#245A35]">
                      <MaterialIcon name={pm.icon} size={22} />
                    </span>
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Order Summary Column (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-4 sticky top-28">
            <h3 className="text-base font-black text-[#183C2A] pb-3 border-b border-[#EDF4E5]">
              {t('موجز الطلبية', 'Order Breakdown')}
            </h3>

            {/* Items mini list */}
            <div className="max-h-56 overflow-y-auto divide-y divide-[#EDF4E5] text-xs">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-[#183C2A] truncate">
                      {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </p>
                    <span className="text-gray-500 text-[11px]">
                      {item.quantity}x {item.selectedSize ? (language === 'ar' ? item.selectedSize.nameAr : item.selectedSize.nameEn) : ''}
                    </span>
                  </div>
                  <span className="font-bold text-[#163D29] shrink-0">
                    {item.itemTotal.toFixed(2)} {t('ر.س', 'SAR')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-[#EDF4E5] space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{t('المجموع الفرعي', 'Subtotal')}</span>
                <span className="font-bold text-[#183C2A]">{subtotal.toFixed(2)} {t('ر.س', 'SAR')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('التوصيل', 'Delivery')}</span>
                <span className="font-bold text-[#183C2A]">
                  {calculatedDelivery === 0 ? (
                    <span className="text-[#245A35] font-black">{t('مجاني', 'FREE')}</span>
                  ) : (
                    `${calculatedDelivery.toFixed(2)} ${t('ر.س', 'SAR')}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#EDF4E5] text-[#183C2A]">
                <span className="text-base font-black">{t('المبلغ الإجمالي', 'Total Amount')}</span>
                <span className="text-2xl font-black text-[#163D29]">
                  {calculatedTotal.toFixed(2)} {t('ر.س', 'SAR')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-[#245A35] hover:bg-[#163D29] disabled:bg-gray-300 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              {isSubmitting ? t('جاري تأكيد الطلب...', 'Confirming Order...') : t('تأكيد الطلب الآن', 'Confirm Order Now')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
