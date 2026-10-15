'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { branches } from '@/data/branches';
import { MapPinIcon, PhoneIcon, ClockIcon } from '@/components/Icons';

export default function BranchesPage() {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold">
            {t('المملكة العربية السعودية - الرياض', 'Kingdom of Saudi Arabia - Riyadh')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('فروع فن الأفوكادو بالرياض', 'Avocado Art Branches in Riyadh')}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">
            {t(
              'نرحب بكم يومياً في كافة فروعنا بالرياض لتجربة أشهى العصائر الطبيعية والمثلجات والحلويات الطازجة.',
              'Welcome daily to our Riyadh branches to taste our fresh juices, artisanal ice creams, and desserts.'
            )}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE8D1] shadow-xs hover:border-[#568C42] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center mb-4">
                  <MapPinIcon size={24} />
                </div>

                <h3 className="text-lg font-bold text-[#183C2A] mb-2">
                  {language === 'ar' ? branch.nameAr : branch.nameEn}
                </h3>

                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  {language === 'ar' ? branch.addressAr : branch.addressEn}
                </p>

                <div className="space-y-3 pt-3 border-t border-[#EDF4E5] text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <ClockIcon size={16} className="text-[#568C42] shrink-0" />
                    <span>{language === 'ar' ? branch.openingHoursAr : branch.openingHoursEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={16} className="text-[#568C42] shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-[#245A35] font-bold" dir="ltr">
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EDF4E5] flex items-center gap-2">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 text-center rounded-xl bg-[#FAF9F2] hover:bg-[#EDF4E5] text-[#163D29] text-xs font-bold border border-[#DCE8D1] transition-colors"
                >
                  {t('الموقع على الخريطة', 'Google Maps')}
                </a>
                <a
                  href={`https://wa.me/${branch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#245A35] hover:bg-[#163D29] text-white text-xs font-bold transition-colors"
                >
                  {t('واتساب', 'WhatsApp')}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Central Map Preview Banner */}
        <div className="rounded-3xl overflow-hidden bg-white p-6 sm:p-8 border border-[#DCE8D1] shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#183C2A]">
                {t('هل تبحث عن أقرب فرع إليك؟', 'Looking for the closest branch?')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-lg">
                {t(
                  'يمكنك دائماً الطلب مباشرة من المتجر وسيقوم فريقنا بتوصيل طلبك مبرداً ومحكماً إلى باب منزلك في أي حي من أحياء مدينة الرياض.',
                  'You can always order online and our chilled delivery fleet will deliver right to your doorstep anywhere in Riyadh.'
                )}
              </p>
            </div>
            <a
              href="https://wa.me/966558184552"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-8 rounded-full bg-[#245A35] hover:bg-[#163D29] text-white text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap"
            >
              {t('تواصل مع خدمة العملاء', 'Contact Support')}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
