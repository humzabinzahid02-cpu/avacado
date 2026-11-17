'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#174C2B] text-[#E8F5D8] text-xs sm:text-sm py-2 px-4 border-b border-[#287A3D]">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse"></span>
          <span className="font-medium">
            {t(
              'توصيل سريع لكافة أحياء الرياض | عصيرات طبيعية 100% يومياً | توصيل مجاني للطلبات فوق 60 ر.س',
              'Fast delivery across Riyadh | 100% Natural Fresh Juices | Free Delivery above 60 SAR'
            )}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs text-[#E8F5D8]">
          <a
            href="https://wa.me/966558184552"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#A8D900] transition-colors flex items-center gap-1"
          >
            <span>واتساب: 966558184552+</span>
          </a>
          <span>|</span>
          <span>{t('ساعات العمل: 8 ص - 2 ص', 'Hours: 8 AM - 2 AM')}</span>
        </div>
      </div>
    </div>
  );
};
