'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { branches } from '@/data/branches';
import { MapPinIcon, PhoneIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const BranchSection: React.FC = () => {
  const { t, dir, language } = useLanguage();

  return (
    <section className="py-14 bg-[#FAF9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold mb-2">
              <MaterialIcon name="location_on" size={15} />
              <span>{t('فروعنا في المملكة العربية السعودية', 'Our Branches in Saudi Arabia')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#183C2A] tracking-tight">
              {t('مواقع الفروع وساعات العمل', 'Store Locations & Working Hours')}
            </h2>
            <p className="text-xs sm:text-sm text-[#568C42] mt-1">
              {t(
                'تفضلوا بزيارتنا في فروعنا بالرياض أو اطلبوا مباشرة عبر الموقع مع التوصيل السريع',
                'Visit our Riyadh branches or order online for fast direct delivery to your door'
              )}
            </p>
          </div>

          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#245A35] hover:text-[#568C42] transition-colors group"
          >
            <span>{t('عرض جميع الفروع على الخريطة', 'View All On Map')}</span>
            {dir === 'rtl' ? (
              <ArrowLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl p-6 border border-[#DCE8D1] hover:border-[#568C42] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center mb-4">
                  <MapPinIcon size={20} />
                </div>

                <h3 className="text-base font-bold text-[#183C2A] mb-2">
                  {language === 'ar' ? branch.nameAr : branch.nameEn}
                </h3>

                <p className="text-xs text-gray-600 mb-4 leading-relaxed flex items-start gap-1.5">
                  <span className="shrink-0 text-[#568C42] mt-0.5">•</span>
                  <span>{language === 'ar' ? branch.addressAr : branch.addressEn}</span>
                </p>

                <div className="space-y-2 pt-2 border-t border-[#EDF4E5] text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <ClockIcon size={14} className="text-[#568C42] shrink-0" />
                    <span>{language === 'ar' ? branch.openingHoursAr : branch.openingHoursEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={14} className="text-[#568C42] shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-[#245A35] font-semibold" dir="ltr">
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 flex items-center gap-2">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 text-center rounded-xl bg-[#FAF9F2] hover:bg-[#EDF4E5] text-[#163D29] text-xs font-bold border border-[#DCE8D1] transition-colors"
                >
                  {t('اتجاهات الخريطة', 'Get Directions')}
                </a>
                <a
                  href={`https://wa.me/${branch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#245A35] hover:bg-[#163D29] text-white text-xs font-bold transition-colors"
                  title="WhatsApp"
                >
                  {t('واتساب', 'WhatsApp')}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
