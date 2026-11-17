'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { branches } from '@/data/branches';
import { MapPinIcon, PhoneIcon, ClockIcon, NavigationIcon, WhatsAppIcon } from '@/components/Icons';

export default function BranchesPage() {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold">
            {t('المملكة العربية السعودية - الرياض', 'Kingdom of Saudi Arabia - Riyadh')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#174C2B] tracking-tight">
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
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCEBD3] shadow-xs hover:border-[#A8D900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5D8] text-[#287A3D] flex items-center justify-center mb-4">
                  <MapPinIcon size={24} />
                </div>

                <h3 className="text-lg font-bold text-[#174C2B] mb-2">
                  {language === 'ar' ? branch.nameAr : branch.nameEn}
                </h3>

                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  {language === 'ar' ? branch.addressAr : branch.addressEn}
                </p>

                {/* Services badge */}
                <div className="mt-3 mb-3">
                  <span className="inline-block px-2 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-[10px] font-semibold leading-snug">
                    {language === 'ar' ? branch.servicesAr : branch.servicesEn}
                  </span>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E8F5D8] text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <ClockIcon size={16} className="text-[#A8D900] shrink-0" />
                    <span>{language === 'ar' ? branch.openingHoursAr : branch.openingHoursEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={16} className="text-[#A8D900] shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="hover:text-[#287A3D] font-bold" dir="ltr">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon size={16} className="text-[#25D366] shrink-0" />
                    <a href={`https://wa.me/${branch.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#287A3D] font-bold" dir="ltr">
                      {branch.whatsappDisplay || branch.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 space-y-2">
                {/* Primary: Locate on Maps */}
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#287A3D] via-[#287A3D] to-[#287A3D] hover:from-[#A8D900] hover:via-[#DFFF00] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs font-bold shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300"
                >
                  <NavigationIcon size={16} />
                  {t('الموقع على الخريطة', 'Locate on Maps')}
                </a>
                {/* Secondary: WhatsApp + Call */}
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${branch.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 border-[#25D366] text-[#1a9e4a] hover:bg-[#f0fdf4] text-xs font-bold transition-colors"
                  >
                    <WhatsAppIcon size={14} />
                    {t('واتساب', 'WhatsApp')}
                  </a>
                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#DCEBD3] bg-[#FFFFFF] hover:bg-[#E8F5D8] text-[#287A3D] text-xs font-bold transition-colors"
                  >
                    <PhoneIcon size={14} />
                    {t('اتصال', 'Call')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Central Map Preview Banner */}
        <div className="rounded-3xl overflow-hidden bg-white p-6 sm:p-8 border border-[#DCEBD3] shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#174C2B]">
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
              className="py-3 px-8 rounded-full bg-gradient-to-r from-[#287A3D] via-[#287A3D] to-[#287A3D] hover:from-[#A8D900] hover:via-[#DFFF00] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300 whitespace-nowrap"
            >
              {t('تواصل مع خدمة العملاء', 'Contact Support')}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
