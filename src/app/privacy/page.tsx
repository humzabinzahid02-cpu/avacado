'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-[#568C42] tracking-wider uppercase block mb-1">
            {t('السياسات والشروط', 'Policies & Legal')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('سياسة الخصوصية', 'Privacy Policy')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t('آخر تحديث: 2026', 'Last updated: 2026')}
          </p>
        </div>

        {/* Content Card with Verified Official Text */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8D1] shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('1. مقدمة ومعلومات عامة', '1. Introduction & Overview')}
            </h2>
            <p>
              {t(
                'نحرص في فن الأفوكادو للعصير والآيس كريم على حماية خصوصية عملائنا الكرام وزوار موقعنا الإلكتروني. توضح هذه السياسة كيفية جمع البيانات واستخدامها وحمايتها لضمان تجربة تسوق آمنة ومريحة.',
                'At Avocado Art for Juice & Ice Cream, we are committed to protecting the privacy of our valued customers and website visitors.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('2. جمع المعلومات الشخصية', '2. Personal Data Collection')}
            </h2>
            <p>
              {t(
                'قد تقوم فن الأفوكادو بجمع المعلومات المتعلقة بالطلبات السابقة، والمنتجات المفضلة لديك، واستفسارات خدمة العملاء، وعنوان التوصيل ورقم الهاتف لضمان دقة وسرعة توصيل الطلبات في مدينة الرياض.',
                'Avocado Art may collect information regarding order history, saved favorites, customer support inquiries, delivery addresses, and contact numbers to ensure accurate and fast fulfillment across Riyadh.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('3. استخدام ملفات تعريف الارتباط (Cookies)', '3. Cookies & Analytics')}
            </h2>
            <p>
              {t(
                'يستخدم الموقع ملفات تعريف الارتباط وتقنيات الويب الحديثة لتحسين تجربة التصفح، وحفظ المنتجات في سلة المشتريات وقائمة الرغبات، وتقديم عروض مخصصة تناسب تفضيلاتكم.',
                'The website uses cookies and modern web technologies to enhance user experience, persist items in the shopping cart and wishlist, and display relevant promotions.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('4. سرية وأمان البيانات', '4. Data Security & Confidentiality')}
            </h2>
            <p>
              {t(
                'نلتزم بأعلى معايير الأمان الرقمي والتشفير لحماية بياناتكم الشخصية، ولا نقوم ببيع أو تأجير أو مشاركة بياناتكم مع أي أطراف ثالثة غير مخولة.',
                'We adhere to the highest digital security and encryption standards to protect your personal data, and we do not sell or share information with unauthorized third parties.'
              )}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#EDF4E5]">
            <h2 className="text-base font-bold text-[#183C2A]">
              {t('5. التواصل معنا بشأن الخصوصية', '5. Privacy Contact')}
            </h2>
            <p>
              {t(
                'إذا كان لديكم أي استفسار أو طلب يتعلق ببياناتكم، يمكنكم مراسلتنا عبر البريد الإلكتروني: info@avocadojuiceksa.com أو عبر هاتف خدمة العملاء 966558184552+.',
                'If you have inquiries regarding privacy, email us at info@avocadojuiceksa.com or call customer support at +966 55 818 4552.'
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
