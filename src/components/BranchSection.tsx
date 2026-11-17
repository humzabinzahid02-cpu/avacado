'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { branches, businessInfo } from '@/data/branches';
import { MapPinIcon, PhoneIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon, NavigationIcon, WhatsAppIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const BranchSection: React.FC = () => {
  const { t, dir, language } = useLanguage();

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold mb-2 border border-[#DCEBD3]">
              <MaterialIcon name="location_on" size={15} />
              <span>{t(`فروع ${businessInfo.nameAr} بالرياض`, `${businessInfo.nameEn} Branches in Riyadh`)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B] tracking-tight">
              {t('مواقع الفروع وساعات العمل', 'Store Locations & Working Hours')}
            </h2>
            <p className="text-xs sm:text-sm text-[#365B40] mt-1 font-medium">
              {language === 'ar' ? businessInfo.servicesAr : businessInfo.servicesEn}
            </p>
          </div>

          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#287A3D] hover:text-[#A8D900] transition-colors group"
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
              className="bg-white rounded-3xl p-6 border border-[#DCEBD3] hover:border-[#A8D900] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Name */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#E8F5D8] text-[#287A3D] flex items-center justify-center group-hover:bg-[#287A3D] group-hover:text-white transition-colors">
                    <MapPinIcon size={22} />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E8F5D8] text-[#174C2B] border border-[#DCEBD3]">
                    {language === 'ar' ? branch.cityAr : branch.cityEn}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#174C2B] mb-1.5">
                  {language === 'ar' ? branch.nameAr : branch.nameEn}
                </h3>

                <p className="text-xs text-[#365B40] mb-3 leading-relaxed flex items-start gap-1.5">
                  <span className="shrink-0 text-[#287A3D] mt-0.5">•</span>
                  <span>{language === 'ar' ? branch.addressAr : branch.addressEn}</span>
                </p>

                {/* Services badge */}
                <div className="mb-4 p-2 rounded-xl bg-[#E8F5D8]/50 border border-[#DCEBD3] text-[11px] text-[#174C2B] font-semibold leading-relaxed">
                  {language === 'ar' ? branch.servicesAr : branch.servicesEn}
                </div>

                {/* Contact & Hours Info */}
                <div className="space-y-2 pt-3 border-t border-[#DCEBD3] text-xs text-[#365B40]">
                  <div className="flex items-center gap-2">
                    <ClockIcon size={14} className="text-[#287A3D] shrink-0" />
                    <span className="text-[11px]">{language === 'ar' ? branch.openingHoursAr : branch.openingHoursEn}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <PhoneIcon size={14} className="text-[#287A3D] shrink-0" />
                      <span className="text-[11px] text-[#68816D]">{t('هاتف:', 'Phone:')}</span>
                    </div>
                    <a
                      href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                      className="hover:text-[#287A3D] text-[#174C2B] font-bold text-xs"
                      dir="ltr"
                    >
                      {branch.phone}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <WhatsAppIcon size={14} className="text-[#25D366] shrink-0" />
                      <span className="text-[11px] text-gray-500">{t('واتساب:', 'WhatsApp:')}</span>
                    </div>
                    <a
                      href={`https://wa.me/${branch.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#25D366] font-bold text-xs text-[#287A3D]"
                      dir="ltr"
                    >
                      {branch.whatsappDisplay || branch.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Locate Button + WhatsApp / Call */}
              <div className="mt-5 pt-4 border-t border-[#DCEBD3] space-y-2">
                {/* 📍 Primary Locate Button */}
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#287A3D] to-[#A8D900] hover:from-[#A8D900] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs font-black shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <NavigationIcon size={15} />
                  <span>{t('تحديد الموقع على الخريطة', 'Locate on Maps')}</span>
                </a>

                {/* Secondary: Quick WhatsApp & Call row */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${branch.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#166534] border border-[#25D366]/30 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon size={14} className="text-[#25D366]" />
                    <span>{t('واتساب', 'WhatsApp')}</span>
                  </a>

                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-white hover:bg-[#E8F5D8] text-[#174C2B] border border-[#DCEBD3] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    title="Call"
                  >
                    <PhoneIcon size={14} className="text-[#287A3D]" />
                    <span>{t('اتصال', 'Call')}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
