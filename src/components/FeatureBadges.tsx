'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const FeatureBadges: React.FC = () => {
  const { t } = useLanguage();

  const badges = [
    {
      titleAr: 'مكونات طبيعية',
      titleEn: 'Natural Ingredients',
      descAr: 'نختار الأفضل دائماً',
      descEn: 'We always choose the best',
      icon: (
        <svg className="w-5 h-5 text-[#245A35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      titleAr: 'جودة عالية',
      titleEn: 'High Quality',
      descAr: 'تجربة طعم استثنائية',
      descEn: 'Exceptional taste experience',
      icon: (
        <svg className="w-5 h-5 text-[#245A35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      titleAr: 'تجربة مريحة',
      titleEn: 'Convenient Experience',
      descAr: 'تسوق بسهولة وأمان',
      descEn: 'Shop easily and securely',
      icon: (
        <svg className="w-5 h-5 text-[#245A35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      titleAr: 'دعم العملاء',
      titleEn: 'Customer Support',
      descAr: 'نحن دائماً هنا لمساعدتك',
      descEn: 'We are always here to help',
      icon: (
        <svg className="w-5 h-5 text-[#245A35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-6 bg-white border-t border-[#EDF4E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#EDF4E5]">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-3 py-3 px-4 text-center sm:text-start"
            >
              <div className="w-9 h-9 rounded-full bg-[#EDF4E5] flex items-center justify-center shrink-0">
                {b.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#183C2A]">
                  {t(b.titleAr, b.titleEn)}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {t(b.descAr, b.descEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
