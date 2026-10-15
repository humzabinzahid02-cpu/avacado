'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { FeatureBadges } from '@/components/FeatureBadges';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@/components/Icons';

export default function AboutPage() {
  const { t, dir } = useLanguage();

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#163D29] via-[#245A35] to-[#163D29] text-white p-8 sm:p-16 shadow-xl border border-[#568C42]/30 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#A8D957]/20 border border-[#A8D957]/40 text-[#A8D957] text-xs font-bold">
            {t('قصتنا ورؤيتنا', 'Our Story & Vision')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('فن الأفوكادو للعصير والآيس كريم', 'Avocado Art for Juice & Ice Cream')}
          </h1>
          <p className="text-base sm:text-lg text-[#DCE8D1] max-w-2xl mx-auto leading-relaxed font-normal">
            {t(
              'نضبط جوك ونعرف له - أشهى العصيرات والسلطات والآيس كريم نحضرها لكم بالفواكه الطبيعية ١٠٠٪؜',
              'Setting the mood right with the tastiest juices, salads, and artisanal ice cream prepared 100% naturally'
            )}
          </p>
        </div>

        {/* Brand Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#568C42] tracking-wider uppercase">
              {t('من نحن', 'Who We Are')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#183C2A] tracking-tight">
              {t('سر القوام الكريمي الفريد والطعم الاستثنائي', 'The Secret Behind Our Velvet Texture')}
            </h2>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                {t(
                  'ينفرد فن الأفوكادو بطريقة خاصة ومبتكرة في صناعة الآيس كريم والعصائر الطبيعية والخلطات والوافل والكريب. تتكون هذه الطريقة من جمع العناصر والمواد الطبيعية بعناية فائقة لتكوين قوام كريمي متجانس وتركيبة مذاق لا تُنسى.',
                  'Avocado Art stands apart through our proprietary method of making artisanal ice cream, cold-pressed juices, layered shakes, and fresh desserts. We carefully handpick seasonal fruits to achieve a harmonious, velvety consistency.'
                )}
              </p>
              <p>
                {t(
                  'نحن نؤمن بأن العصير الحقيقي يبدأ من حبة الفاكهة الطازجة الناضجة تماماً، بدون إضافة مواد حافظة أو نكهات أو ملونات صناعية. كل كوب يُحضر بكل حب وعناية ليكون مصدراً للانتعاش والصحة والطاقة.',
                  'We believe true beverage excellence begins with perfectly ripe, whole fruits without artificial additives or preservatives. Every cup is blended with passion to energize your body.'
                )}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#245A35] hover:bg-[#163D29] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <span>{t('استكشف قائمتنا الآن', 'Explore Menu Now')}</span>
                {dir === 'rtl' ? <ArrowLeftIcon size={16} /> : <ArrowRightIcon size={16} />}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-8 border border-[#DCE8D1] shadow-xl text-center space-y-6">
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Avocado Art"
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-[#FAF9F2] border border-[#EDF4E5]">
                  <span className="text-2xl font-black text-[#245A35] block">+100</span>
                  <span className="text-xs text-gray-500 font-semibold">{t('صنف طبيعي طازج', 'Fresh Natural Items')}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9F2] border border-[#EDF4E5]">
                  <span className="text-2xl font-black text-[#245A35] block">4</span>
                  <span className="text-xs text-gray-500 font-semibold">{t('فروع رئيسية بالرياض', 'Branches in Riyadh')}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9F2] border border-[#EDF4E5]">
                  <span className="text-2xl font-black text-[#245A35] block">100%</span>
                  <span className="text-xs text-gray-500 font-semibold">{t('فواكه طبيعية', 'Natural Fruit')}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9F2] border border-[#EDF4E5]">
                  <span className="text-2xl font-black text-[#245A35] flex items-center justify-center gap-1">
                    <span>5.0</span>
                    <StarIcon size={18} filled className="text-amber-400" />
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">{t('تقييم العملاء', 'Customer Rating')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Badges */}
        <FeatureBadges />

      </div>
    </div>
  );
}
