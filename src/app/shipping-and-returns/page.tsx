'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MaterialIcon } from '@/components/MaterialIcon';

export default function ShippingAndReturnsPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#568C42] tracking-wider uppercase block mb-1">
            {t('خدمات التوصيل والضمان', 'Delivery & Guarantees')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('الشحن والتوصيل وضمان الجودة', 'Shipping, Delivery & Quality Guarantee')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t('توصيل مبرد وسريع لجميع مناطق مدينة الرياض', 'Chilled and rapid delivery across Riyadh')}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8D1] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A] flex items-center gap-2">
              <span className="text-[#245A35]"><MaterialIcon name="local_shipping" size={20} /></span>
              <span>{t('1. نطاق ومواعيد التوصيل بالرياض', '1. Delivery Coverage & Timelines')}</span>
            </h2>
            <p>
              {t(
                'نغطي جميع أحياء مدينة الرياض. يتم تجهيز العصائر فورياً ونقلها بواسطة حقائب وحاويات عازلة للحرارة ومبردة لضمان وصول المنتج بأعلى معايير الانتعاش والجودة.',
                'We deliver across all Riyadh districts. Juices and ice creams are transported in thermal insulated containers to maintain optimal cold temperatures.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A] flex items-center gap-2">
              <span className="text-[#245A35]"><MaterialIcon name="payments" size={20} /></span>
              <span>{t('2. رسوم التوصيل والعروض المجانية', '2. Delivery Rates & Free Delivery')}</span>
            </h2>
            <p>
              {t(
                'رسوم التوصيل الموحدة هي 12 ريال سعودي فقط. ونقدم توصيلاً مجانياً بالكامل لكافة الطلبات التي تتجاوز قيمتها 60 ريالاً سعودياً.',
                'Standard delivery is 12 SAR. Orders exceeding 60 SAR qualify for 100% Free Delivery.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A] flex items-center gap-2">
              <span className="text-[#245A35]"><MaterialIcon name="verified_user" size={20} /></span>
              <span>{t('3. ضمان الجودة والاستبدال', '3. Freshness Guarantee & Replacements')}</span>
            </h2>
            <p>
              {t(
                'نحرص على رضاكم التام. في حال حدوث أي خلل في درجة حرارة المنتج أو انسكاب أثناء التوصيل، يرجى إبلاغنا فوراً عبر واتساب 966558184552+ وسنقوم باستبدال المنتج أو تعويضكم فورياً دون أي تأخير.',
                'If there is any issue with temperature or transit damage, contact us on WhatsApp at +966 55 818 4552 for immediate replacement or compensation.'
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
