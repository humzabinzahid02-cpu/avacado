'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { UserIcon, ShoppingBagIcon, HeartIcon, MapPinIcon } from '@/components/Icons';

export default function AccountPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#EDF4E5] border-2 border-[#568C42] flex items-center justify-center text-[#245A35] shrink-0">
            <UserIcon size={36} />
          </div>
          <div className="text-center sm:text-start flex-1">
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold mb-1">
              {t('عضوية مميزة | VIP Member', 'VIP Member')}
            </div>
            <h1 className="text-2xl font-black text-[#183C2A]">
              {t('أهلاً بك، ضيف فن الأفوكادو', 'Welcome, Avocado Art Guest')}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {t('رقم الجوال: 0558184552 | الرياض، المملكة العربية السعودية', 'Mobile: +966 55 818 4552 | Riyadh, KSA')}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF9F2] border border-[#DCE8D1] text-center min-w-36">
            <span className="text-xs text-gray-500 font-semibold block">{t('نقاط المكافآت', 'Loyalty Points')}</span>
            <span className="text-2xl font-black text-[#245A35]">150</span>
            <span className="text-[10px] text-[#568C42] font-bold block">{t('نقطة أفوكادو', 'Avocado Points')}</span>
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/cart"
            className="p-6 bg-white rounded-2xl border border-[#DCE8D1] hover:border-[#568C42] shadow-xs transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center shrink-0">
              <ShoppingBagIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#183C2A] text-sm">{t('سلة المشتريات', 'Shopping Cart')}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{t('عرض العناصر الحالية', 'View current cart')}</p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="p-6 bg-white rounded-2xl border border-[#DCE8D1] hover:border-[#568C42] shadow-xs transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <HeartIcon size={24} filled />
            </div>
            <div>
              <h3 className="font-bold text-[#183C2A] text-sm">{t('قائمة المفضلة', 'My Wishlist')}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{t('المنتجات المحفوظة', 'Saved favorite items')}</p>
            </div>
          </Link>

          <Link
            href="/branches"
            className="p-6 bg-white rounded-2xl border border-[#DCE8D1] hover:border-[#568C42] shadow-xs transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center shrink-0">
              <MapPinIcon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#183C2A] text-sm">{t('فروعنا بالرياض', 'Riyadh Branches')}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{t('مواقع الفروع وساعات العمل', 'Locations & hours')}</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-4">
          <h2 className="text-lg font-black text-[#183C2A] pb-3 border-b border-[#EDF4E5]">
            {t('سجل الطلبات السابقة', 'Order History')}
          </h2>

          <div className="divide-y divide-[#EDF4E5] text-xs sm:text-sm">
            {[
              {
                id: 'AVO-892110',
                date: '2026-10-12',
                itemsText: 'أفوكادو فن الأفوكادو الخاص (كبير) + سلطة فواكه ملكية',
                total: 32.0,
                status: 'تم التسليم بنجاح',
                statusEn: 'Delivered',
              },
              {
                id: 'AVO-742901',
                date: '2026-10-04',
                itemsText: 'بوكس الجمعات الفاخر (6 قوارير عصير مشكل)',
                total: 85.0,
                status: 'تم التسليم بنجاح',
                statusEn: 'Delivered',
              },
            ].map((ord) => (
              <div key={ord.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#163D29]">#{ord.id}</span>
                    <span className="text-gray-400 text-xs">• {ord.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EDF4E5] text-[#245A35] text-[11px] font-bold">
                      {t(ord.status, ord.statusEn)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{ord.itemsText}</p>
                </div>
                <div className="font-black text-[#163D29] text-base shrink-0">
                  {ord.total.toFixed(2)} {t('ر.س', 'SAR')}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
