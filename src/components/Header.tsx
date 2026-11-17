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
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparent mode: homepage + not scrolled + mobile menu closed
  const isTransparent = isHome && !scrolled && !mobileMenuOpen;
  // Pill mode: homepage + scrolled (desktop only)
  const isPillMode = isHome && scrolled;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  // Dynamic classes using global design tokens
  const headerBg = isTransparent
    ? 'bg-transparent border-transparent'
    : 'bg-[#FFFFFF]/95 backdrop-blur-md border-[#DCEBD3] shadow-sm';

  const textColor = isTransparent ? 'text-white' : 'text-[#174C2B]';
  const hoverColor = isTransparent ? 'hover:text-[#DFFF00]' : 'hover:text-[#4F8A3B]';
  const activeColor = isTransparent ? 'text-[#DFFF00]' : 'text-[#4F8A3B]';
  const chevronColor = isTransparent ? 'text-white/70' : 'text-[#68816D]';
  const langColor = isTransparent ? 'text-white hover:text-[#DFFF00]' : 'text-[#174C2B] hover:text-[#4F8A3B]';
  const iconColor = isTransparent ? 'text-white hover:text-[#DFFF00]' : 'text-[#174C2B] hover:text-[#4F8A3B]';
  const cartBadgeBg = 'bg-[#DFFF00] text-[#000000] font-black shadow-xs';
  const searchBg = isTransparent
    ? 'bg-[#174C2B]/60 border-[#4F8A3B] text-white placeholder-white/70 focus:bg-[#174C2B]/90 focus:border-[#DFFF00]'
    : 'bg-[#E8F5D8]/60 border-[#DCEBD3] text-[#174C2B] placeholder-[#68816D] focus:border-[#4F8A3B] focus:bg-white';
  const searchIconColor = isTransparent ? 'text-[#DFFF00] hover:text-white' : 'text-[#68816D] hover:text-[#4F8A3B]';
  const underlineColor = 'bg-[#DFFF00]';

  const navItems = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/menu', label: t('المنيو', 'Menu'), badge: t('جديد', 'NEW') },
    { href: '/shop', label: t('المنتجات', 'Products') },
    { href: '/offers', label: t('العروض', 'Offers') },
    { href: '/branches', label: t('الفروع', 'Branches') },
    { href: '/about', label: t('من نحن', 'About') },
    { href: '/contact', label: t('اتصل بنا', 'Contact') },
  ];

  return (
    <>
      {/* ── Full Header: visible on homepage (not scrolled) + all other pages ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          isPillMode
            ? 'opacity-0 pointer-events-none -translate-y-full'
            : `opacity-100 translate-y-0 ${headerBg}`
        }`}
        style={{ transitionProperty: 'opacity, transform, background-color, border-color' }}
      >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-4">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative w-32 sm:w-36 lg:w-36 xl:w-44 2xl:w-52 h-10 sm:h-12 flex items-center">
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
          <nav className={`hidden lg:flex items-center gap-3 lg:gap-3.5 xl:gap-6 2xl:gap-7 text-xs xl:text-sm font-bold whitespace-nowrap ${textColor}`}>
            
            {/* Home */}
            <Link
              href="/"
              className={`py-2 transition-colors relative flex flex-col items-center ${
                isHome ? activeColor : `${textColor} ${hoverColor}`
              }`}
            >
              <span>{t('الرئيسية', 'Home')}</span>
              {isHome && (
                <span className={`w-5 xl:w-6 h-0.5 xl:h-1 rounded-full ${underlineColor} mt-0.5 xl:mt-1`} />
              )}
            </Link>

            {/* Menu (Official PDF Menu) */}
            <Link
              href="/menu"
              className={`py-2 transition-colors relative flex flex-col items-center ${
                pathname === '/menu' ? activeColor : `${textColor} ${hoverColor}`
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{t('المنيو', 'Menu')}</span>
                <span className="text-[9px] xl:text-[10px] px-1.5 py-0.2 bg-[#DFFF00] text-[#000000] rounded-full font-extrabold uppercase">
                  {t('جديد', 'NEW')}
                </span>
              </div>
              {pathname === '/menu' && (
                <span className={`w-5 xl:w-6 h-0.5 xl:h-1 rounded-full ${underlineColor} mt-0.5 xl:mt-1`} />
              )}
            </Link>

            {/* Products & Categories Dropdown */}
            <div
              className="relative py-2 group"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                href="/shop"
                className={`flex items-center gap-1 ${
                  productsDropdownOpen ? 'text-[#DFFF00]' : `${textColor} ${hoverColor}`
                } transition-colors duration-200`}
              >
                <span>{t('المنتجات', 'Products')}</span>
                <ChevronDownIcon
                  size={13}
                  className={`transition-colors duration-200 ${
                    productsDropdownOpen ? 'text-[#DFFF00]' : chevronColor
                  }`}
                />
              </Link>
              {productsDropdownOpen && (
                <div
                  className={`absolute top-full ${
                    dir === 'rtl' ? 'right-0' : 'left-0'
                  } w-64 bg-[#FFFFFF] rounded-2xl shadow-lg border border-[#DCEBD3] py-2 z-50`}
                >
                  <Link
                    href="/shop"
                    className="block px-4 py-2.5 text-xs font-black text-[#4F8A3B] hover:bg-[#DFFF00] hover:text-black hover:font-black transition-colors duration-200"
                  >
                    {t('جميع المنتجات والمتجر', 'All Products & Shop')}
                  </Link>
                  <Link
                    href="/shop?category=specials"
                    className="block px-4 py-2 text-xs font-black text-[#174C2B] hover:bg-[#DFFF00] hover:text-black transition-colors duration-200"
                  >
                    {t('الخلطات الخاصة (سبيشال)', 'Signature Specials')}
                  </Link>
                  <div className="h-px bg-[#90C978] my-1" />
                  <div className="max-h-80 overflow-y-auto">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop?category=${cat.slug}`}
                        className="block px-4 py-2 text-xs font-medium text-[#174C2B] hover:bg-[#DFFF00] hover:text-black hover:font-bold transition-colors duration-200"
                      >
                        {language === 'ar' ? cat.nameAr : cat.nameEn}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/offers"
              className={`py-2 ${
                pathname === '/offers' ? activeColor : `${textColor} ${hoverColor}`
              } transition-colors whitespace-nowrap`}
            >
              {t('العروض', 'Offers')}
            </Link>

            <Link
              href="/branches"
              className={`py-2 ${
                pathname === '/branches' ? activeColor : `${textColor} ${hoverColor}`
              } transition-colors whitespace-nowrap`}
            >
              {t('الفروع', 'Branches')}
            </Link>

            <Link
              href="/about"
              className={`py-2 ${
                pathname === '/about' ? activeColor : `${textColor} ${hoverColor}`
              } transition-colors whitespace-nowrap`}
            >
              {t('من نحن', 'About')}
            </Link>

            <Link
              href="/contact"
              className={`py-2 ${
                pathname === '/contact' ? activeColor : `${textColor} ${hoverColor}`
              } transition-colors whitespace-nowrap`}
            >
              {t('اتصل بنا', 'Contact')}
            </Link>
          </nav>

          {/* 3. SEARCH & ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Pill Input */}
            <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-36 lg:w-36 xl:w-48 2xl:w-56">
              <input
                type="text"
                placeholder={t('ابحث عن منتج...', 'Search product...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs rounded-full py-1.5 xl:py-2 px-3 pe-8 border focus:outline-hidden transition-all text-start ${searchBg}`}
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
              className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-black transition-all border ${
                isTransparent
                  ? 'bg-[#4F8A3B] border-[#DFFF00] text-white hover:bg-[#DFFF00] hover:text-black hover:border-[#DFFF00] shadow-xs'
                  : 'bg-[#E8F5D8] border-[#4F8A3B]/40 text-[#174C2B] hover:bg-[#DFFF00] hover:text-black hover:border-[#DFFF00]'
              }`}
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label="Toggle Language"
            >
              <span className="tracking-wider uppercase text-[11px]">
                {language === 'ar' ? 'English' : 'العربية'}
              </span>
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
                <span className="absolute -top-1 -end-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
              <span className={`absolute -top-1.5 -end-1.5 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${cartBadgeBg}`}>
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
        <div className="lg:hidden bg-white border-b border-[#DCEBD3] px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder={t('ابحث عن منتجك المفضل...', 'Search product...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-full py-2.5 px-4 pe-9 bg-[#E8F5D8] border border-[#DCEBD3] text-[#174C2B] placeholder-[#68816D] focus:outline-hidden focus:border-[#A8D900] text-start"
            />
            <button
              type="submit"
              aria-label="Search"
              className={`absolute top-1/2 -translate-y-1/2 ${
                dir === 'rtl' ? 'left-3' : 'right-3'
              } text-[#68816D] hover:text-[#287A3D]`}
            >
              <SearchIcon size={16} />
            </button>
          </form>

          <nav className="flex flex-col space-y-2 text-sm font-bold text-[#174C2B]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3]">
              {t('الرئيسية', 'Home')}
            </Link>
            <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3] text-[#287A3D] flex items-center justify-between">
              <span>{t('قائمة المنيو الرسمية', 'Official Menu')}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#DFFF00] text-[#000000] rounded-full font-bold">
                {t('جديد', 'NEW')}
              </span>
            </Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3]">
              {t('جميع المنتجات (المتجر)', 'Shop')}
            </Link>
            <Link href="/offers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3]">
              {t('العروض', 'Offers')}
            </Link>
            <Link href="/branches" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3]">
              {t('الفروع', 'Branches')}
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3]">
              {t('من نحن', 'About')}
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#DCEBD3]">
              {t('اتصل بنا', 'Contact')}
            </Link>
            <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#287A3D] flex items-center gap-2">
              <UserIcon size={18} />
              <span>{t('حسابي الشخصي', 'My Account')}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>

    {/* ── Floating Pill Navbar — always mounted, CSS transition in/out ── */}
    <div
      className={`hidden lg:flex fixed top-4 left-1/2 -translate-x-1/2 z-[60] items-center gap-0.5
        bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 shadow-sm
        transition-all duration-500 ease-in-out ${
          isPillMode
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold
            transition-colors duration-200 whitespace-nowrap ${
            pathname === item.href
              ? 'bg-[#DFFF00] text-black'
              : 'text-white hover:text-[#DFFF00]'
          }`}
        >
          {item.label}
          {item.badge && (
            <span className="text-[8px] px-1 py-0 bg-[#DFFF00] text-black rounded-full font-extrabold uppercase leading-tight">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  </>
  );
};
