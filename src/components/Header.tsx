'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import {
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
} from './Icons';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t, dir } = useLanguage();
  const { totalItems, wishlistIds, setIsCartOpen } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  // Track scroll to switch from transparent → solid on homepage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparent mode: homepage + not scrolled + mobile menu closed
  const isTransparent = isHome && !scrolled && !mobileMenuOpen;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  // Dynamic classes
  const headerBg = isTransparent
    ? 'bg-transparent border-transparent'
    : 'bg-[#FAF9F2]/95 backdrop-blur-md border-[#DCE8D1] shadow-sm';

  const textColor = isTransparent ? 'text-white' : 'text-[#183C2A]';
  const hoverColor = isTransparent ? 'hover:text-[#A8D957]' : 'hover:text-[#245A35]';
  const activeColor = isTransparent ? 'text-[#A8D957]' : 'text-[#245A35]';
  const chevronColor = isTransparent ? 'text-white/60' : 'text-gray-500';
  const langColor = isTransparent ? 'text-white/90 hover:text-[#A8D957]' : 'text-[#183C2A] hover:text-[#245A35]';
  const iconColor = isTransparent ? 'text-white hover:text-[#A8D957]' : 'text-[#183C2A] hover:text-[#245A35]';
  const cartBadgeBg = isTransparent ? 'bg-[#A8D957] text-[#163D29]' : 'bg-[#245A35] text-white';
  const searchBg = isTransparent
    ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40'
    : 'bg-[#EDF4E5]/60 border-[#DCE8D1] text-[#183C2A] placeholder-gray-400 focus:border-[#245A35] focus:bg-white';
  const searchIconColor = isTransparent ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-[#245A35]';
  const underlineColor = isTransparent ? 'bg-[#A8D957]' : 'bg-[#245A35]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-4">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative w-32 sm:w-44 2xl:w-52 h-10 sm:h-12 flex items-center">
              <Image
                src="/assets/logo-horizontal-light.png"
                alt="فن الأفوكادو - Avocado Art"
                width={200}
                height={55}
                sizes="(max-width: 640px) 130px, (max-width: 1536px) 180px, 210px"
                priority
                className={`object-contain h-full w-auto transition-opacity duration-300 absolute inset-0 ${
                  isTransparent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
              <Image
                src="/assets/logo-horizontal-dark.png"
                alt="فن الأفوكادو - Avocado Art"
                width={200}
                height={55}
                sizes="(max-width: 640px) 130px, (max-width: 1536px) 180px, 210px"
                priority
                className={`object-contain h-full w-auto transition-opacity duration-300 ${
                  !isTransparent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </div>
          </Link>

          {/* 2. NAVIGATION LINKS (Center) */}
          <nav className={`hidden lg:flex items-center gap-4 xl:gap-7 text-sm font-bold whitespace-nowrap ${textColor}`}>
            
            {/* Home */}
            <Link
              href="/"
              className={`py-2 transition-colors relative flex flex-col items-center ${
                isHome ? activeColor : `${textColor} ${hoverColor}`
              }`}
            >
              <span>{t('الرئيسية', 'Home')}</span>
              {isHome && (
                <span className={`w-6 h-1 rounded-full ${underlineColor} mt-1`} />
              )}
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                href="/shop"
                className={`flex items-center gap-1 ${hoverColor} transition-colors`}
              >
                <span>{t('المنتجات', 'Products')}</span>
                <ChevronDownIcon size={14} className={chevronColor} />
              </Link>
              {productsDropdownOpen && (
                <div
                  className={`absolute top-full ${
                    dir === 'rtl' ? 'right-0' : 'left-0'
                  } w-60 bg-white rounded-2xl shadow-xl border border-[#DCE8D1] py-2 z-50`}
                >
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-xs font-bold text-[#163D29] hover:bg-[#EDF4E5]"
                  >
                    {t('جميع المنتجات', 'All Products')}
                  </Link>
                  <div className="h-px bg-[#EDF4E5] my-1" />
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-xs text-[#183C2A] hover:bg-[#EDF4E5] hover:text-[#245A35]"
                    >
                      {language === 'ar' ? cat.nameAr : cat.nameEn}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <Link
                href="/shop"
                className={`flex items-center gap-1 ${hoverColor} transition-colors`}
              >
                <span>{t('الفئات', 'Categories')}</span>
                <ChevronDownIcon size={14} className={chevronColor} />
              </Link>
              {categoriesDropdownOpen && (
                <div
                  className={`absolute top-full ${
                    dir === 'rtl' ? 'right-0' : 'left-0'
                  } w-60 bg-white rounded-2xl shadow-xl border border-[#DCE8D1] py-2 z-50`}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-xs text-[#183C2A] hover:bg-[#EDF4E5] hover:text-[#245A35]"
                    >
                      {language === 'ar' ? cat.nameAr : cat.nameEn}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/offers" className={`py-2 ${hoverColor} transition-colors whitespace-nowrap`}>
              {t('العروض', 'Offers')}
            </Link>

            <Link href="/branches" className={`py-2 ${hoverColor} transition-colors whitespace-nowrap`}>
              {t('الفروع', 'Branches')}
            </Link>

            <Link href="/about" className={`py-2 ${hoverColor} transition-colors whitespace-nowrap`}>
              {t('من نحن', 'About')}
            </Link>

            <Link href="/contact" className={`py-2 ${hoverColor} transition-colors whitespace-nowrap`}>
              {t('اتصل بنا', 'Contact')}
            </Link>
          </nav>

          {/* 3. SEARCH & ACTIONS */}
          <div className="flex items-center gap-3">
            
            {/* Search Pill Input */}
            <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-44 xl:w-56">
              <input
                type="text"
                placeholder={t('ابحث عن منتجك المفضل...', 'Search product...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs rounded-full py-2 px-3 pe-8 border focus:outline-hidden transition-all text-start ${searchBg}`}
              />
              <button
                type="submit"
                aria-label="Search"
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === 'rtl' ? 'left-2.5' : 'right-2.5'
                } ${searchIconColor}`}
              >
                <SearchIcon size={14} />
              </button>
            </form>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`text-xs font-bold transition-colors px-1 ${langColor}`}
            >
              {language === 'ar' ? 'عربي | EN' : 'English | AR'}
            </button>

            {/* Wishlist Heart Icon */}
            <Link
              href="/wishlist"
              className={`relative p-1.5 transition-colors ${
                wishlistIds.length > 0 ? 'text-red-500' : iconColor
              }`}
              title={t('المفضلة', 'Wishlist')}
            >
              <HeartIcon size={20} filled={wishlistIds.length > 0} className={wishlistIds.length > 0 ? 'text-red-500' : ''} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <Link
              href="/account"
              className={`p-1.5 transition-colors hidden sm:block ${iconColor}`}
              title={t('حسابي', 'Account')}
            >
              <UserIcon size={20} />
            </Link>

            {/* Shopping Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-1.5 transition-colors flex items-center ${iconColor}`}
              title={t('السلة', 'Cart')}
            >
              <ShoppingBagIcon size={20} />
              <span className={`absolute -top-1.5 -right-1.5 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${cartBadgeBg}`}>
                {totalItems}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 ${textColor}`}
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE8D1] px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder={t('ابحث عن منتجك المفضل...', 'Search product...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-full py-2.5 px-4 pe-9 bg-[#EDF4E5] border border-[#DCE8D1] text-[#183C2A] placeholder-gray-500 focus:outline-hidden focus:border-[#245A35] text-start"
            />
            <button
              type="submit"
              aria-label="Search"
              className={`absolute top-1/2 -translate-y-1/2 ${
                dir === 'rtl' ? 'left-3' : 'right-3'
              } text-gray-500 hover:text-[#245A35]`}
            >
              <SearchIcon size={16} />
            </button>
          </form>

          <nav className="flex flex-col space-y-2 text-sm font-bold text-[#183C2A]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              {t('الرئيسية', 'Home')}
            </Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              {t('جميع المنتجات (المتجر)', 'Shop')}
            </Link>
            <Link href="/offers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              {t('العروض', 'Offers')}
            </Link>
            <Link href="/branches" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              {t('الفروع', 'Branches')}
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              {t('من نحن', 'About')}
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">
              {t('اتصل بنا', 'Contact')}
            </Link>
            <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#245A35] flex items-center gap-2">
              <UserIcon size={18} />
              <span>{t('حسابي الشخصي', 'My Account')}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
