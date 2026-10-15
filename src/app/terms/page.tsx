'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#568C42] tracking-wider uppercase block mb-1">
            {t('السياسات والشروط', 'Policies & Legal')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('الشروط والأحكام', 'Terms & Conditions')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t('آخر تحديث: 2026', 'Last updated: 2026')}
          </p>
        </div>

        {/* Content Card with Verified Official Text */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8D1] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('1. قبول الشروط', '1. Acceptance of Terms')}
            </h2>
            <p>
              {t(
                'باستخدامك لموقع فن الأفوكادو للعصير والآيس كريم أو الشراء منه، فإنك توافق على الالتزام بكافة الشروط والأحكام الواردة هنا وفقاً للأنظمة واللوائح المعمول بها في المملكة العربية السعودية.',
                'By using or ordering from Avocado Art for Juice & Ice Cream, you agree to comply with all terms and conditions outlined here in accordance with Saudi Arabian regulations.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('2. الأسعار والضرائب', '2. Pricing & Taxes')}
            </h2>
            <p>
              {t(
                'جميع الأسعار المعروضة في المتجر هي بالريال السعودي (ر.س / SAR) وتشمل ضريبة القيمة المضافة (15%) وفقاً لأنظمة هيئة الزكاة والضريبة والجمارك.',
                'All prices displayed in the store are in Saudi Riyals (SAR) and inclusive of 15% Value Added Tax (VAT).'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('3. تجهيز الطلبات والتوصيل المبرد', '3. Order Fulfillment & Delivery')}
            </h2>
            <p>
              {t(
                'تُعصر العصائر وتُحضر المثلجات فور استلام الطلب لضمان أعلى درجات الطزاجة والانتعاش. يُنصح بحفظ العصائر والخلطات مبردة في درجة حرارة بين 2 إلى 4 درجات مئوية واستهلاكها خلال 48 ساعة من الاستلام.',
                'Juices and ice creams are prepared fresh upon order receipt. Chilled storage between 2°C and 4°C is recommended, and items should be consumed within 48 hours.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('4. الإلغاء والتعديل', '4. Cancellations & Modifications')}
            </h2>
            <p>
              {t(
                'نظراً لطبيعة المنتجات الغذائية الطازجة القابلة للتلف السريع، يمكن تعديل أو إلغاء الطلب خلال 10 دقائق فقط من إرسال الطلب قبل بدء مرحلة العصر والتحضير.',
                'Due to the perishable nature of fresh food and beverage products, cancellations or modifications are allowed within 10 minutes of order placement prior to blending.'
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
