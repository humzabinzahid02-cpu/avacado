'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { MapPinIcon, PhoneIcon, ClockIcon } from './Icons';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#174C2B] text-[#E8F5D8] pt-16 pb-12 border-t border-[#287A3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* 1. Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo-horizontal-light.png"
                alt="فن الأفوكادو - Avocado Art"
                width={190}
                height={55}
                sizes="190px"
                className="object-contain h-12 w-auto"
              />
            </Link>

            <p className="text-sm text-[#E8F5D8] leading-relaxed max-w-sm font-normal">
              {t(
                'ينفرد فن الأفوكادو بطريقة خاصة ومميزة في صناعة الآيس كريم الطبيعي والعصائر الطازجة والخلطات والكريب والوافل بقوام كريمي متجانس وتركيبة استثنائية.',
                'Avocado Art is distinguished by a signature method in crafting natural ice creams, cold-pressed juices, blended layers, crepes, and waffles with exceptional creamy consistency.'
              )}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/avocadojuiceksa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#A8D900] hover:text-[#174C2B] flex items-center justify-center transition-colors text-xs font-bold"
                title="Instagram @avocadojuiceksa"
              >
                IG
              </a>
              <a
                href="https://www.tiktok.com/@avocadoartksa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#A8D900] hover:text-[#174C2B] flex items-center justify-center transition-colors text-xs font-bold"
                title="TikTok @avocadoartksa"
              >
                TT
              </a>
              <a
                href="https://www.snapchat.com/add/avocadoartksa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#A8D900] hover:text-[#174C2B] flex items-center justify-center transition-colors text-xs font-bold"
                title="Snapchat @avocadoartksa"
              >
                SC
              </a>
              <a
                href="https://x.com/AvocadoJuiceKSA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#A8D900] hover:text-[#174C2B] flex items-center justify-center transition-colors text-xs font-bold"
                title="X @AvocadoJuiceKSA"
              >
                X
              </a>
              <a
                href="https://wa.me/966558184552"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#287A3D] hover:bg-[#A8D900] hover:text-[#174C2B] flex items-center justify-center transition-colors text-xs font-bold"
                title="WhatsApp 966558184552"
              >
                WA
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-sm text-[#E8F5D8]">
              <li>
                <Link href="/" className="hover:text-[#A8D900] transition-colors">
                  {t('الرئيسية', 'Home')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#A8D900] transition-colors">
                  {t('جميع المنتجات (المتجر)', 'Shop All')}
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#A8D900] transition-colors">
                  {t('العروض والبوكسات', 'Offers & Bundles')}
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-[#A8D900] transition-colors">
                  {t('فروعنا بالرياض', 'Our Branches')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#A8D900] transition-colors">
                  {t('من نحن', 'About')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#A8D900] transition-colors">
                  {t('اتصل بنا', 'Contact Us')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Categories */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              {t('أقسام القائمة', 'Menu Categories')}
            </h4>
            <ul className="space-y-2 text-sm text-[#E8F5D8]">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-[#A8D900] transition-colors">
                    {language === 'ar' ? cat.nameAr : cat.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Branches Info */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              {t('خدمة العملاء والفروع', 'Customer Support & Branches')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#E8F5D8]">
              <li className="flex items-start gap-2.5">
                <MapPinIcon size={16} className="text-[#A8D900] shrink-0 mt-0.5" />
                <span>{t('4 فروع في الرياض: الصحافة، العزيزية، الروضة، لبن', '4 Branches in Riyadh: Al Sahafa, Al Aziziyah, Al Rawdah, Laban')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon size={16} className="text-[#A8D900] shrink-0" />
                <a href="tel:+966112765666" className="hover:text-[#A8D900]" dir="ltr">
                  +966 11 276 5666 {t('(الصحافة)', '(Al Sahafa)')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon size={16} className="text-[#A8D900] shrink-0" />
                <a href="tel:+966114445333" className="hover:text-[#A8D900]" dir="ltr">
                  +966 11 444 5333 {t('(العزيزية)', '(Al Aziziyah)')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon size={16} className="text-[#A8D900] shrink-0" />
                <a href="tel:+966112081116" className="hover:text-[#A8D900]" dir="ltr">
                  +966 11 208 1116 {t('(الروضة)', '(Al Rawdah)')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon size={16} className="text-[#A8D900] shrink-0" />
                <a href="tel:0553010143" className="hover:text-[#A8D900]" dir="ltr">
                  055 301 0143 {t('(لبن)', '(Laban)')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon size={16} className="text-[#A8D900] shrink-0" />
                <span>{t('يومياً: 8:00 ص – 2:00 ص', 'Daily: 8:00 AM – 2:00 AM')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Policies, Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E8F5D8]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link href="/privacy" className="hover:text-[#A8D900] transition-colors">
              {t('سياسة الخصوصية', 'Privacy Policy')}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#A8D900] transition-colors">
              {t('الشروط والأحكام', 'Terms & Conditions')}
            </Link>
            <span>•</span>
            <Link href="/shipping-and-returns" className="hover:text-[#A8D900] transition-colors">
              {t('الشحن والتوصيل', 'Shipping & Delivery')}
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-[#A8D900] transition-colors">
              {t('الأسئلة الشائعة', 'FAQ')}
            </Link>
          </div>

          <div className="text-center">
            <p>
              © 2026 {t('فن الأفوكادو للعصير والآيس كريم. جميع الحقوق محفوظة.', 'Avocado Juice & Ice Cream KSA. All rights reserved.')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-white/70">
            <span className="px-2 py-1 bg-white/10 rounded-md">مدى Mada</span>
            <span className="px-2 py-1 bg-white/10 rounded-md">Visa</span>
            <span className="px-2 py-1 bg-white/10 rounded-md">Apple Pay</span>
            <span className="px-2 py-1 bg-white/10 rounded-md">{t('الدفع عند الاستلام', 'COD')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
