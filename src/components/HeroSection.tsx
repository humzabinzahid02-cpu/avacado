'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { MaterialIcon } from './MaterialIcon';

export const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted and playsinline settings required by iOS Safari & Android Chrome
    video.muted = true;
    (video as HTMLVideoElement & { defaultMuted: boolean }).defaultMuted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Attempt direct autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled gracefully: poster remains visible if low-power mode blocks autoplay
      });
    }

    // On mobile devices where autoplay is blocked until first gesture, start on first touch
    const handleTouch = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener('touchstart', handleTouch, { passive: true, once: true });

    // Resume video playback when tab becomes visible again
    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <section
      className="relative w-full h-[88dvh] sm:h-[100dvh] min-h-[500px] flex flex-col justify-between overflow-hidden bg-[#0a1a0f] text-white select-none"
      style={{
        backgroundImage: "url('/assets/hero-poster.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ───── 1. Background Video with Instant Poster ───── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
          disablePictureInPicture
          suppressHydrationWarning
          className="w-full h-full object-cover object-[center_35%] md:object-center"
        />

        {/* Cinematic gradient overlay for perfect readability across all viewports */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80 pointer-events-none" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* ───── 2. Side Indicator Dots (Desktop) ───── */}
      <div
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2.5"
        style={{
          left: dir === 'rtl' ? '24px' : 'auto',
          right: dir !== 'rtl' ? '24px' : 'auto',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === 0 ? 'w-2.5 h-2.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* ───── 3. Navbar Clear Spacer ───── */}
      <div className="h-16 sm:h-20 shrink-0" />

      {/* ───── 4. Centered Hero Content (Engineered for Phone, Laptop & Desktop) ───── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 my-auto text-center flex flex-col items-center justify-center">

        {/* Tagline Badge — all dots: lime-yellow (#DFFF00), lines: lime-yellow (#DFFF00), text: leaf green (#4F8A3B) */}
        <div className="inline-flex items-center justify-center gap-2 mb-2 sm:mb-3">
          <span className="w-3 sm:w-6 h-px bg-[#DFFF00]" />
          <div className="text-[#4F8A3B] text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.2em] uppercase flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] shrink-0" />
            <span>{t('طبيعي', 'NATURAL')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] shrink-0" />
            <span>{t('طازج', 'FRESH')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] shrink-0" />
            <span>{t('صحي', 'HEALTHY')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] shrink-0" />
          </div>
          <span className="w-3 sm:w-6 h-px bg-[#DFFF00]" />
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight sm:leading-[1.12] tracking-tight mb-2 sm:mb-3">
          <span className="block text-white">
            {t('خير الأفوكادو', 'The Best of Avocado')}
          </span>
          <span className="block text-[#DFFF00]">
            {t('في كل كوب', 'In Every Cup')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xs sm:max-w-md mx-auto leading-relaxed font-medium mb-5 sm:mb-7">
          {t(
            'مكونات طبيعية 100%.. مشروب صحي ولذيذ.',
            '100% natural ingredients.. a healthy & delicious drink.'
          )}
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Primary CTA: Pure Leaf Green background, white text -> Hover: Lime Yellow background, black text */}
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#4F8A3B] hover:bg-[#DFFF00] text-white hover:text-black font-black text-xs sm:text-sm transition-colors duration-200 border border-[#4F8A3B] hover:border-[#DFFF00]"
          >
            <span>{t('اكتشف قائمة المنيو', 'Explore Our Menu')}</span>
            {dir === 'rtl' ? (
              <ArrowLeftIcon size={16} className="text-white group-hover:text-black transition-colors" />
            ) : (
              <ArrowRightIcon size={16} className="text-white group-hover:text-black transition-colors" />
            )}
          </Link>

          {/* Secondary CTA: Transparent dark background, lime-yellow border, white text -> Hover: Pure Leaf Green background, white text */}
          <Link
            href="/branches"
            className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/40 hover:bg-[#4F8A3B] text-white hover:text-white border border-[#DFFF00] hover:border-[#4F8A3B] font-bold text-xs sm:text-sm backdrop-blur-md transition-colors duration-200"
          >
            <span>{t('فروعنا للطلب المسبق', 'Branch Locations')}</span>
            <MaterialIcon name="storefront" size={16} className="text-[#DFFF00] group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

      {/* ───── 5. Bottom Trust Badges Bar ───── */}
      <div className="relative z-10 w-full bg-black/50 backdrop-blur-md border-t border-white/10 shrink-0">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 grid grid-cols-3 gap-1 sm:gap-2 text-center">

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 group">
            <MaterialIcon name="eco" size={16} className="text-[#DFFF00] shrink-0" />
            <div>
              <span className="text-[10px] sm:text-xs font-bold block leading-tight text-white">
                {t('مكونات طبيعية', 'Natural Ingredients')}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#DFFF00] font-semibold">
                {t('%100', '100%')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 group">
            <MaterialIcon name="eco" size={16} className="text-[#DFFF00] shrink-0" />
            <div>
              <span className="text-[10px] sm:text-xs font-bold block leading-tight text-white">
                {t('غني بالعناصر', 'Rich in Nutrients')}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#DFFF00] font-semibold">
                {t('الغذائية', 'Essential')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 group">
            <MaterialIcon name="bolt" size={16} className="text-[#DFFF00] shrink-0" />
            <div>
              <span className="text-[10px] sm:text-xs font-bold block leading-tight text-white">
                {t('يعزز الطاقة', 'Boosts Energy')}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#DFFF00] font-semibold">
                {t('والنشاط', '& Vitality')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
