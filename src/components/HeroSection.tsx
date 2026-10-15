'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[540px] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0a1a0f] text-white select-none">
      
      {/* ───── 1. Background Video (Starts Immediately, No Poster Image) ───── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient overlay for contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75 pointer-events-none" />
        
        {/* Radial vignette for focus on center text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>

      {/* ───── 2. Side Indicator Dots (Desktop) ───── */}
      <div
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2.5"
        style={{ [dir === 'rtl' ? 'left' : '24px']: dir === 'rtl' ? '24px' : 'auto' }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === 0
                ? 'w-2.5 h-2.5 bg-white shadow-lg shadow-white/40'
                : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* ───── 3. Top Spacer to clear Fixed Navbar ───── */}
      <div className="h-16 sm:h-20 shrink-0" />

      {/* ───── 4. Centered Hero Content (Sized to fit 100% in viewport without scrolling) ───── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 my-auto text-center flex flex-col items-center justify-center">

        {/* Tagline */}
        <div className="inline-flex items-center justify-center gap-2 mb-2 sm:mb-3">
          <span className="w-4 sm:w-6 h-px bg-[#A8D957]/70" />
          <span className="text-[#c5e98d] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
            {t('طبيعي • طازج • صحي', 'NATURAL • FRESH • HEALTHY')}
          </span>
          <span className="w-4 sm:w-6 h-px bg-[#A8D957]/70" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.12] tracking-tight mb-2 sm:mb-3 drop-shadow-2xl">
          <span className="block text-white">
            {t('خير الأفوكادو', 'The Best of Avocado')}
          </span>
          <span
            className="block text-[#A8D957]"
            style={{
              textShadow: '0 0 35px rgba(168, 217, 87, 0.35), 0 4px 16px rgba(0,0,0,0.6)',
            }}
          >
            {t('في كل كوب', 'In Every Cup')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-white/85 max-w-md mx-auto leading-relaxed font-medium mb-4 sm:mb-6 drop-shadow-md">
          {t(
            'مكونات طبيعية 100%.. مشروب صحي ولذيذ.',
            '100% natural ingredients.. a healthy & delicious drink.'
          )}
        </p>

        {/* CTA Button */}
        <div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#A8D957] hover:bg-[#bbf069] text-[#163D29] font-black text-xs sm:text-sm shadow-xl shadow-[#A8D957]/25 transition-all duration-300 transform hover:scale-105 active:scale-98"
          >
            <span>{t('اكتشف قائمتنا', 'Explore Our Menu')}</span>
            {dir === 'rtl' ? (
              <ArrowLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>

      {/* ───── 5. Bottom Trust Badges Bar (Pinned at bottom, fits inside screen) ───── */}
      <div className="relative z-10 w-full bg-black/45 backdrop-blur-md border-t border-white/10 shrink-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 grid grid-cols-3 gap-2 text-center">
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-white/80">
            <MaterialIcon name="eco" size={16} className="text-[#A8D957]" />
            <div>
              <span className="text-[10px] sm:text-xs font-bold block leading-tight">
                {t('مكونات طبيعية', 'Natural Ingredients')}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                {t('%100', '100%')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-white/80">
            <MaterialIcon name="eco" size={16} className="text-[#A8D957]" />
            <div>
              <span className="text-[10px] sm:text-xs font-bold block leading-tight">
                {t('غني بالعناصر', 'Rich in Nutrients')}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                {t('الغذائية', 'Essential')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-white/80">
            <MaterialIcon name="bolt" size={16} className="text-[#A8D957]" />
            <div>
              <span className="text-[10px] sm:text-xs font-bold block leading-tight">
                {t('يعزز الطاقة', 'Boosts Energy')}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/50 font-semibold">
                {t('والنشاط', '& Vitality')}
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
