'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { CheckIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons';
import { MaterialIcon } from '@/components/MaterialIcon';

function OrderConfirmationContent() {
  const { t, dir, language } = useLanguage();
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId') || 'AVO-100245';

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('avocado_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const orderId = order?.orderId || orderIdParam;

  return (
    <div className="py-16 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE8D1] shadow-lg text-center space-y-6">
          
          {/* Success Check Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[#EDF4E5] border-4 border-[#A8D957] flex items-center justify-center text-[#245A35] shadow-inner animate-in zoom-in-75 duration-300">
            <CheckIcon size={36} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#568C42] tracking-wider uppercase">
              {t('تم تسجيل طلبك بنجاح', 'Order Successfully Received')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#183C2A]">
              {t('شكراً لاختيارك فن الأفوكادو!', 'Thank You for Choosing Avocado Art!')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              {t(
                `رقم طلبك هو #${orderId}. سنقوم بتحضير طلبك من أجود المكونات الطبيعية وتسليمه إليك طازجاً في أقرب وقت.`,
                `Your order number is #${orderId}. We are preparing your order using top natural ingredients for immediate chilled delivery.`
              )}
            </p>
          </div>

          {/* Order Summary Box */}
          <div className="p-6 rounded-2xl bg-[#FAF9F2] border border-[#DCE8D1] text-start space-y-4 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-[#EDF4E5]">
              <span className="font-bold text-gray-600">{t('رقم الطلب:', 'Order ID:')}</span>
              <span className="font-mono font-black text-[#163D29] text-base">#{orderId}</span>
            </div>

            {order?.customer && (
              <div className="flex justify-between items-center pb-3 border-b border-[#EDF4E5]">
                <span className="font-bold text-gray-600">{t('اسم العميل:', 'Customer Name:')}</span>
                <span className="font-bold text-[#183C2A]">{order.customer.fullName} ({order.customer.phone})</span>
              </div>
            )}

            <div className="flex justify-between items-center pb-3 border-b border-[#EDF4E5]">
              <span className="font-bold text-gray-600">{t('نوع الطلب:', 'Order Type:')}</span>
              <span className="font-bold text-[#245A35]">
                {order?.fulfillmentType === 'pickup'
                  ? t('استلام من الفرع بالرياض', 'Pickup from Branch (Riyadh)')
                  : t('توصيل مبرد إلى العنوان بالرياض', 'Chilled Delivery to Address (Riyadh)')}
              </span>
            </div>

            {order?.items && order.items.length > 0 && (
              <div className="py-2 space-y-1.5">
                <span className="font-bold text-gray-700 block mb-1">{t('المنتجات المطلوبة:', 'Ordered Items:')}</span>
                {order.items.map((it: any) => (
                  <div key={it.id} className="flex justify-between text-xs text-gray-600">
                    <span>
                      {it.quantity}x {language === 'ar' ? it.product.nameAr : it.product.nameEn}
                      {it.selectedSize ? ` (${language === 'ar' ? it.selectedSize.nameAr : it.selectedSize.nameEn})` : ''}
                    </span>
                    <span className="font-bold">{it.itemTotal?.toFixed(2)} {t('ر.س', 'SAR')}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-[#EDF4E5] text-base font-black text-[#163D29]">
              <span>{t('المبلغ الإجمالي:', 'Total Paid:')}</span>
              <span>{(order?.total || 42.00).toFixed(2)} {t('ر.س', 'SAR')}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/966558184552?text=${encodeURIComponent(
                `مرحباً، أود الاستفسار عن طلبي رقم #${orderId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#245A35] hover:bg-[#163D29] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MaterialIcon name="chat" size={16} />
              <span>{t('متابعة الطلب عبر واتساب', 'Track Order via WhatsApp')}</span>
            </a>

            <Link
              href="/shop"
              className="w-full sm:w-auto py-3 px-6 rounded-full bg-white hover:bg-[#EDF4E5] text-[#183C2A] text-xs sm:text-sm font-bold border border-[#DCE8D1] transition-all flex items-center justify-center gap-1.5"
            >
              <span>{t('العودة للتسوق', 'Continue Shopping')}</span>
              {dir === 'rtl' ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#245A35]">جاري التحميل...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
