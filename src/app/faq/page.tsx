'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDownIcon } from '@/components/Icons';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqs = [
    {
      qAr: 'هل جميع العصائر طبيعية 100%؟',
      qEn: 'Are all juices 100% natural?',
      aAr: 'نعم بكل تأكيد. نحرص في فن الأفوكادو على عصر الفواكه الطازجة المختارة يومياً بدون إضافة أي مواد حافظة أو نكهات أو ملونات صناعية.',
      aEn: 'Yes, absolutely. At Avocado Art, we squeeze fresh hand-picked fruits daily without any preservatives, artificial flavorings, or coloring.',
    },
    {
      qAr: 'ما هي مناطق التوصيل المتاحة بالرياض؟',
      qEn: 'What delivery areas are covered in Riyadh?',
      aAr: 'نوصل طلباتنا المبردة إلى جميع أحياء مدينة الرياض شمالاً، جنوباً، شرقاً، وغرباً مع ضمان وصول العصير والمثلجات بأفضل درجة برودة وانتعاش.',
      aEn: 'We deliver chilled orders to all districts across Riyadh ensuring juices and ice creams arrive cold and fresh.',
    },
    {
      qAr: 'هل يتوفر لديكم بوكسات للمناسبات والجمعات؟',
      qEn: 'Do you offer gathering and party boxes?',
      aAr: 'نعم، يتوفر لدينا بوكسات الجمعات الفاخرة (6 قوارير و 12 قارورة) وبوكسات الجوالين الكبيرة (2 لتر و 3.5 لتر) بتغليف حراري أنيق ومناسب للحفلات.',
      aEn: 'Yes, we provide luxury gathering packs (6 and 12 bottles) and large 2L / 3.5L gallons packaged in insulated thermal boxes.',
    },
    {
      qAr: 'ما هي مواعيد عمل الفروع؟',
      qEn: 'What are branch operating hours?',
      aAr: 'نستقبلكم يومياً في فروعنا من الساعة 8:00 صباحاً وحتى الساعة 2:00 بعد منتصف الليل.',
      aEn: 'We welcome you daily at our branches from 8:00 AM until 2:00 AM past midnight.',
    },
    {
      qAr: 'هل يمكن الدفع عند الاستلام؟',
      qEn: 'Is Cash on Delivery available?',
      aAr: 'نعم، نوفر خيارات دفع متعددة تشمل مدى (Mada)، أبل باي (Apple Pay)، البطاقات الائتمانية، وكذلك الدفع نقداً أو بالشبكة عند الاستلام.',
      aEn: 'Yes, we offer multiple payment options including Mada, Apple Pay, credit cards, and cash on delivery.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold">
            {t('المساعدة والأسئلة', 'Help & Questions')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('الأسئلة الشائعة', 'Frequently Asked Questions')}
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            {t(
              'إليك إجابات على أبرز الأسئلة المتكررة حول منتجاتنا، التوصيل، والمكونات.',
              'Here are answers to the most common questions about our products, delivery, and ingredients.'
            )}
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs divide-y divide-[#EDF4E5]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-start gap-4 font-bold text-sm sm:text-base text-[#183C2A] hover:text-[#245A35] transition-colors"
              >
                <span>{t(faq.qAr, faq.qEn)}</span>
                <span
                  className={`transition-transform duration-200 text-[#568C42] ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDownIcon size={18} />
                </span>
              </button>

              {openIndex === idx && (
                <div className="pt-3 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in duration-200">
                  {t(faq.aAr, faq.aEn)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="rounded-2xl bg-[#EDF4E5] p-6 text-center border border-[#DCE8D1] space-y-2">
          <h3 className="text-sm font-bold text-[#183C2A]">
            {t('هل لديك سؤال آخر؟', 'Have another question?')}
          </h3>
          <p className="text-xs text-gray-600">
            {t('تواصل مباشرة مع فريق خدمة العملاء عبر واتساب 966558184552+', 'Contact our customer service team on WhatsApp at +966 55 818 4552')}
          </p>
        </div>

      </div>
    </div>
  );
}
