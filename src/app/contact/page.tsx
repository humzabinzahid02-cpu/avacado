'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@/components/Icons';
import { MaterialIcon } from '@/components/MaterialIcon';

export default function ContactPage() {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF4E5] text-[#245A35] text-xs font-bold">
            {t('تواصل معنا', 'Get in Touch')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('يسعدنا تواصلكم وخدمتكم دائماً', 'We Are Always Happy to Assist You')}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t(
              'للاستفسارات، طلبات الحفلات والمناسبات الخاصة، أو الاقتراحات والملاحظات، فريقنا في خدمتكم طوال اليوم.',
              'For inquiries, event catering, suggestions or feedback, our team is at your service.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-[#183C2A] pb-3 border-b border-[#EDF4E5]">
              {t('معلومات التواصل الرسمية', 'Official Contact Details')}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center shrink-0">
                  <MapPinIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#183C2A]">{t('المقر الرئيسي بالرياض', 'Riyadh Headquarters')}</h3>
                  <p className="text-gray-500 mt-0.5 leading-relaxed">
                    {t('حي الصحافة، شارع أنس بن مالك، الرياض، المملكة العربية السعودية', 'Anas Ibn Malik St, Al Sahafa, Riyadh, Saudi Arabia')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center shrink-0">
                  <PhoneIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#183C2A]">{t('أرقام الهواتف وخدمة العملاء', 'Phone Numbers')}</h3>
                  <div className="space-y-1 mt-1 text-gray-600" dir="ltr">
                    <a href="tel:0558184552" className="block hover:text-[#245A35] font-bold">
                      +966 55 818 4552 (WhatsApp)
                    </a>
                    <a href="tel:0559460516" className="block hover:text-[#245A35]">
                      +966 55 946 0516
                    </a>
                    <a href="tel:0112765666" className="block hover:text-[#245A35]">
                      +966 11 276 5666
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDF4E5] text-[#245A35] flex items-center justify-center shrink-0">
                  <ClockIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#183C2A]">{t('أوقات العمل واستقبال الطلبات', 'Operating Hours')}</h3>
                  <p className="text-gray-500 mt-0.5">
                    {t('يومياً: 8:00 صباحاً – 2:00 بعد منتصف الليل', 'Daily: 8:00 AM – 2:00 AM')}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-[#EDF4E5]">
              <a
                href="https://wa.me/966558184552"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl bg-[#245A35] hover:bg-[#163D29] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MaterialIcon name="chat" size={18} />
                <span>{t('مراسلة عبر واتساب فوراً', 'Instant WhatsApp Chat')}</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8D1] shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-[#183C2A] pb-3 border-b border-[#EDF4E5]">
              {t('أرسل لنا رسالة', 'Send Us a Message')}
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-[#EDF4E5] rounded-2xl border border-[#DCE8D1] space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-[#245A35] shadow-xs">
                  <MaterialIcon name="check_circle" size={36} />
                </div>
                <h3 className="text-lg font-bold text-[#183C2A]">
                  {t('تم إرسال رسالتك بنجاح!', 'Message Sent Successfully!')}
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  {t(
                    'شكراً لتواصلك مع فن الأفوكادو. سيقوم أحد ممثلي خدمة العملاء بالرد عليك في أقرب وقت.',
                    'Thank you for contacting Avocado Art. A customer support representative will reach out soon.'
                  )}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 py-2 px-5 rounded-full bg-[#245A35] text-white text-xs font-bold"
                >
                  {t('إرسال رسالة أخرى', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#183C2A] block mb-1">
                      {t('الاسم الكريم *', 'Your Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('محمد علي', 'Mohammed Ali')}
                      className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#183C2A] block mb-1">
                      {t('رقم الجوال *', 'Phone Number *')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35] text-start"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#183C2A] block mb-1">
                    {t('البريد الإلكتروني', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    dir="ltr"
                    className="w-full bg-[#FAF9F2] text-sm py-2.5 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35] text-start"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#183C2A] block mb-1">
                    {t('نص الرسالة أو الاستفسار *', 'Your Message / Inquiry *')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('اكتب استفسارك أو طلبك هنا...', 'Write your inquiry or request here...')}
                    className="w-full bg-[#FAF9F2] text-sm py-2 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#245A35] hover:bg-[#163D29] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {t('إرسال الرسالة الآن', 'Send Message Now')}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
