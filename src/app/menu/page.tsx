'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import { products, extraAddOns } from '@/data/products';
import { branches, managementContact } from '@/data/branches';
import { Product, ProductSize } from '@/types';
import {
  ShoppingBagIcon,
  SearchIcon,
  CheckIcon,
  PhoneIcon,
  MapPinIcon,
  ChevronRightIcon,
  FileTextIcon,
  NavigationIcon,
  WhatsAppIcon,
} from '@/components/Icons';
import { MaterialIcon } from '@/components/MaterialIcon';

export default function MenuPage() {
  const { t, language, dir } = useLanguage();
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<number, ProductSize>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSizeSelect = (productId: number, size: ProductSize) => {
    setSelectedProductSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCartWithSize = (product: Product) => {
    const chosenSize = selectedProductSizes[product.id] || (product.sizes && product.sizes[product.sizes.length - 1]);
    addToCart(product, chosenSize);
    
    const name = language === 'ar' ? product.nameAr : product.nameEn;
    const sizeName = chosenSize ? ` (${language === 'ar' ? chosenSize.nameAr : chosenSize.nameEn})` : '';
    setToastMessage(`${name}${sizeName} ${t('أضيف إلى السلة!', 'added to cart!')}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter products by category and search
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .map((cat) => {
        let items = products.filter((p) => p.categorySlug === cat.slug);
        if (query) {
          items = items.filter(
            (p) =>
              p.nameAr.toLowerCase().includes(query) ||
              p.nameEn.toLowerCase().includes(query) ||
              p.descriptionAr.toLowerCase().includes(query) ||
              p.descriptionEn.toLowerCase().includes(query) ||
              (p.ingredientsAr && p.ingredientsAr.some((i) => i.toLowerCase().includes(query))) ||
              (p.ingredientsEn && p.ingredientsEn.some((i) => i.toLowerCase().includes(query)))
          );
        }
        return {
          ...cat,
          products: items,
        };
      })
      .filter((cat) => (activeCategory === 'all' || cat.slug === activeCategory) && cat.products.length > 0);
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 start-1/2 -translate-x-1/2 z-50 bg-[#174C2B] text-white text-sm font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 border border-[#A8D900]/40 transition-all animate-bounce">
          <CheckIcon size={18} className="text-[#A8D900]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-[#174C2B] to-[#287A3D] text-white pt-24 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A8D900_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#A8D900] text-xs font-bold mb-4 border border-white/15">
            <MaterialIcon name="restaurant_menu" size={16} />
            <span>{t('القائمة الرسمية المعتمدة', 'Official Verified Menu')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            {t('قائمة فن الأفوكادو', 'Avocado Art Menu')}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-200 leading-relaxed mb-6 font-normal">
            {t(
              'استكشف كافة خلطات العرايسي الخاصة، مشروبات الأفوكادو الملكية، الكوكتيلات الطبيعية، أطباق الفواكه، والآيس كريم الأصيل مع حساب السعرات الحرارية والأسعار الدقيقة لكل حجم.',
              'Explore all our signature Arais mixes, royal avocado blends, natural layered cocktails, fresh fruit platters, and artisanal ice cream with exact calorie counts and transparent sizing.'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/Avocado_Art_Menu_English_Final_300dpi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#287A3D] to-[#A8D900] hover:from-[#A8D900] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300 active:scale-95"
            >
              <FileTextIcon size={16} />
              <span>{t('تحميل / استعراض المنيو PDF (300 DPI)', 'Download / View PDF Menu (300 DPI)')}</span>
            </a>

            <a
              href="#branches-order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#DFFF00]/20 text-white hover:text-[#DFFF00] text-xs sm:text-sm font-bold backdrop-blur-md border border-white/20 hover:border-[#DFFF00] transition-all duration-300"
            >
              <PhoneIcon size={16} />
              <span>{t('ارقام الفروع للطلب المسبق', 'Call Ahead for Pickup')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Categories & Search Bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCEBD3] shadow-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 justify-between">
          
          {/* Category Filter Pills (Horizontal scrollable) */}
          <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#287A3D] to-[#287A3D] text-white shadow-xs'
                  : 'bg-[#E8F5D8] text-[#174C2B] hover:bg-[#A8D900]/25 hover:text-[#174C2B]'
              }`}
            >
              {t('جميع الأقسام', 'All Sections')}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-gradient-to-r from-[#287A3D] to-[#287A3D] text-white shadow-xs'
                    : 'bg-[#E8F5D8] text-[#174C2B] hover:bg-[#A8D900]/25 hover:text-[#174C2B]'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <input
              type="text"
              placeholder={t('ابحث في المنيو...', 'Search menu...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] text-xs text-[#174C2B] placeholder-gray-400 rounded-full py-2 px-3 pe-8 border border-[#DCEBD3] focus:outline-hidden focus:border-[#287A3D]"
            />
            <span className="absolute top-1/2 -translate-y-1/2 end-2.5 text-gray-400 pointer-events-none">
              <SearchIcon size={14} />
            </span>
          </div>

        </div>
      </div>

      {/* Main Menu Sections List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-14">
        {filteredCategories.map((section) => (
          <section
            key={section.slug}
            id={section.slug}
            className="bg-white rounded-3xl p-5 sm:p-8 border border-[#DCEBD3] shadow-xs scroll-mt-36"
          >
            {/* Section Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8F5D8] mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#DCEBD3] shadow-2xs">
                  <Image
                    src={section.image}
                    alt={section.nameAr}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#174C2B] tracking-tight">
                    {language === 'ar' ? section.nameAr : section.nameEn}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A8D900] mt-1 max-w-2xl">
                    {language === 'ar' ? section.descriptionAr : section.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold self-end sm:self-center">
                <span>{section.products.length} {t('صنف', 'items')}</span>
              </div>
            </div>

            {/* Products Grid in Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {section.products.map((item) => {
                const currentChosenSize =
                  selectedProductSizes[item.id] ||
                  (item.sizes && item.sizes.length > 0 ? item.sizes[item.sizes.length - 1] : undefined);
                const displayPrice = currentChosenSize ? currentChosenSize.price : item.price;

                return (
                  <div
                    key={item.id}
                    className="group bg-[#FFFFFF] hover:bg-[#E8F5D8] rounded-2xl p-4 border border-[#E8F5D8] hover:border-[#DCEBD3] transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Name, Calories, Price */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Link href={`/product/${item.slug}`} className="hover:underline">
                            <h3 className="text-base font-black text-[#174C2B] group-hover:text-[#4F8A3B] transition-colors">
                              {language === 'ar' ? item.nameAr : item.nameEn}
                            </h3>
                          </Link>
                          {item.calories && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#174C2B] bg-[#E8F5D8] px-2 py-0.5 rounded-md mt-1 border border-[#DCEBD3] shadow-2xs">
                              <MaterialIcon name="local_fire_department" size={12} className="text-[#4F8A3B]" />
                              <span>{item.calories} {t('سعرة حرارية', 'Cal')}</span>
                            </span>
                          )}
                        </div>

                        <div className="text-end shrink-0">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DFFF00] text-black font-black text-sm sm:text-base shadow-2xs">
                            <span>{displayPrice.toFixed(2)}</span>
                            <span className="text-[10px] font-extrabold">{t('ر.س', 'SAR')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                        {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                      </p>

                      {/* Ingredients Tags if available */}
                      {item.ingredientsAr && item.ingredientsAr.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {(language === 'ar' ? item.ingredientsAr : item.ingredientsEn || item.ingredientsAr).map((ing, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gray-600 border border-[#E8F5D8]"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Size Selection & Add to Cart */}
                    <div className="pt-3 border-t border-[#E8F5D8]/80 space-y-2">
                      {item.sizes && item.sizes.length > 1 && (
                        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                          <span className="text-[10px] font-bold text-gray-400 me-1 uppercase">
                            {t('الحجم:', 'Size:')}
                          </span>
                          {item.sizes.map((sz) => {
                            const isSelected = currentChosenSize?.id === sz.id;
                            return (
                              <button
                                key={sz.id}
                                onClick={() => handleSizeSelect(item.id, sz)}
                                className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-all shrink-0 ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-[#287A3D] to-[#287A3D] text-white shadow-2xs'
                                    : 'bg-white text-gray-700 hover:bg-[#A8D900]/20 hover:text-[#174C2B] border border-gray-200'
                                }`}
                                title={`${sz.price} SAR`}
                              >
                                {language === 'ar' ? sz.nameAr.split(' ')[0] : sz.nameEn.split(' ')[0]}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCartWithSize(item)}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#287A3D] via-[#287A3D] to-[#287A3D] hover:from-[#A8D900] hover:via-[#DFFF00] hover:to-[#DFFF00] text-white hover:text-[#174C2B] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md hover:shadow-[#A8D900]/25 border border-[#287A3D] hover:border-[#A8D900] transition-all duration-300 active:scale-95"
                        >
                          <ShoppingBagIcon size={14} />
                          <span>{t('أضف للطلب', 'Add to Order')}</span>
                        </button>

                        <Link
                          href={`/product/${item.slug}`}
                          className="p-2 rounded-xl bg-white hover:bg-[#E8F5D8] text-gray-600 hover:text-[#287A3D] border border-gray-200 transition-colors"
                          title={t('تفاصيل الصنف', 'Item Details')}
                        >
                          <ChevronRightIcon size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Extras / Add-ons Section */}
        <section className="bg-gradient-to-br from-[#174C2B] to-[#287A3D] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#A8D900] tracking-wider uppercase">
                  {t('إضافات لجميع العصائر', 'Extras / Add-Ons')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  {t('الإضافات الفاخرة المتاحة', 'Available Gourmet Extras')}
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 mt-1">
                  {t('حسب حجم العلبة: كبير 7 ر.س | وسط 3 ر.س | صغير 2 ر.س', 'By container size: Large 7 SAR | Medium 3 SAR | Small 2 SAR')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {extraAddOns.map((extra) => (
                <div
                  key={extra.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center flex flex-col justify-between"
                >
                  <div className="mb-2 flex flex-col items-center">
                    <MaterialIcon name="auto_awesome" size={20} className="text-[#A8D900] mb-1" />
                    <h4 className="text-xs font-bold text-white">
                      {language === 'ar' ? extra.nameAr : extra.nameEn}
                    </h4>
                  </div>
                  <div className="text-[11px] font-bold text-[#A8D900] bg-white/10 rounded-lg py-1 px-1.5">
                    7 / 3 / 2 {t('ر.س', 'SAR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order Ahead by Phone / Branches Hotline Bar */}
        <section id="branches-order" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCEBD3] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D8] text-[#287A3D] text-xs font-bold mb-2">
              <PhoneIcon size={14} />
              <span>{t('اطلب قبل وصولك', 'Order Before You Arrive')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#174C2B]">
              {t('أرقام الاتصال المباشر بالفروع', 'Direct Branch Phone Lines')}
            </h2>
            <p className="text-xs sm:text-sm text-[#A8D900] mt-1">
              {t('اتصل بفرعك المفضل لاستلام طلبك طازجاً وبارداً فور وصولك دون انتظار', 'Call your local branch to have your fresh juices ready for instant pickup')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((b) => (
              <div
                key={b.id}
                className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#DCEBD3] flex flex-col justify-between hover:border-[#287A3D] transition-all"
              >
                <div>
                  <h3 className="text-base font-black text-[#174C2B] mb-1">
                    {language === 'ar' ? b.nameAr : b.nameEn}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 flex items-start gap-1">
                    <MapPinIcon size={14} className="shrink-0 text-[#287A3D] mt-0.5" />
                    <span>{language === 'ar' ? b.addressAr : b.addressEn}</span>
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1" dir="ltr">
                    <PhoneIcon size={12} className="text-[#A8D900] shrink-0" />
                    <span className="font-bold">{b.phone}</span>
                  </div>
                  {b.whatsappDisplay && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3" dir="ltr">
                      <WhatsAppIcon size={12} className="text-[#25D366] shrink-0" />
                      <span>{b.whatsappDisplay}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 mt-2">
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#287A3D] hover:bg-[#174C2B] text-white text-xs font-black flex items-center justify-center gap-2 shadow-2xs transition-colors"
                  >
                    <NavigationIcon size={13} />
                    {t('الموقع على الخريطة', 'Locate on Maps')}
                  </a>
                  <div className="flex gap-1.5">
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, '')}`}
                      className="flex-1 py-2 px-2 rounded-xl border border-[#DCEBD3] bg-white hover:bg-[#E8F5D8] text-[#287A3D] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <PhoneIcon size={12} />
                      {t('اتصال', 'Call')}
                    </a>
                    <a
                      href={`https://wa.me/${b.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-2 rounded-xl border border-[#25D366] text-[#1a9e4a] hover:bg-[#f0fdf4] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <WhatsAppIcon size={12} />
                      {t('واتساب', 'WA')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#E8F5D8] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <span>
              {t('الإدارة العامة / خدمة العملاء:', 'Management & Customer Service:')}{' '}
              <a href={`tel:${managementContact.phone}`} className="font-bold text-[#174C2B]" dir="ltr">
                {managementContact.phone}
              </a>
            </span>
            <span className="text-[11px] text-gray-400">
              {t('الأسعار شاملة ضريبة القيمة المضافة | كمية السكر القياسية: 2 جم', 'All prices in SAR | Sugar amount: 2g')}
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
