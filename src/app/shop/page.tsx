'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { SearchIcon } from '@/components/Icons';
import { MaterialIcon } from '@/components/MaterialIcon';

function ShopContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCat = searchParams.get('category') || searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Keep selectedCategory synced with URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat');
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      router.replace('/shop', { scroll: false });
    } else {
      router.replace(`/shop?category=${slug}`, { scroll: false });
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter: handles 'all', 'specials', and specific category slugs
    if (selectedCategory === 'specials') {
      list = list.filter(
        (p) =>
          p.categorySlug === 'arais-specials' ||
          p.categorySlug === 'avocado-specials' ||
          p.isFeatured ||
          p.isPopular
      );
    } else if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.descriptionAr.toLowerCase().includes(q) ||
          p.descriptionEn.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Specials count for badge
  const specialsCount = useMemo(() => {
    return products.filter(
      (p) =>
        p.categorySlug === 'arais-specials' ||
        p.categorySlug === 'avocado-specials' ||
        p.isFeatured ||
        p.isPopular
    ).length;
  }, []);

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#4F8A3B] mb-2 font-bold">
            <span>{t('الرئيسية', 'Home')}</span>
            <span>/</span>
            <span className="text-[#174C2B] font-extrabold">{t('جميع المنتجات', 'All Products')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#174C2B] tracking-tight">
            {t('قائمة المأكولات والعصائر', 'Food & Drinks Menu')}
          </h1>
          <p className="text-sm text-[#4F8A3B] font-semibold mt-1">
            {t(
              'استكشف كافة منتجاتنا الطبيعية الطازجة من العصائر، السموذي، الآيس كريم، وسلطات الفواكه',
              'Explore all our natural fresh juices, smoothies, artisanal ice creams, and fruit salads'
            )}
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#DCEBD3] mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={t('ابحث عن عصير أو حلوى...', 'Search for juice or dessert...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] text-sm text-[#174C2B] placeholder-gray-400 rounded-xl py-2.5 px-4 pe-10 border border-[#DCEBD3] focus:outline-hidden focus:border-[#4F8A3B]"
            />
            <span className="absolute top-1/2 -translate-y-1/2 end-3 text-[#4F8A3B]">
              <SearchIcon size={18} />
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
              {t('الترتيب حسب:', 'Sort by:')}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FFFFFF] text-xs sm:text-sm font-semibold text-[#174C2B] py-2 px-3 rounded-xl border border-[#DCEBD3] focus:outline-hidden focus:border-[#4F8A3B]"
            >
              <option value="featured">{t('المميز أولاً', 'Featured First')}</option>
              <option value="rating">{t('الأعلى تقييماً', 'Highest Rated')}</option>
              <option value="price-asc">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
              <option value="price-desc">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
            </select>
          </div>

        </div>

        {/* Category Pills Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {/* All Button */}
          <button
            onClick={() => handleSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#174C2B] text-[#DFFF00] border-2 border-[#4F8A3B] shadow-sm'
                : 'bg-white text-[#174C2B] border border-[#DCEBD3] hover:bg-[#E8F5D8]'
            }`}
          >
            {t('الكل', 'All')} ({products.length})
          </button>

          {/* Specials Button */}
          <button
            onClick={() => handleSelectCategory('specials')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'specials'
                ? 'bg-[#174C2B] text-[#DFFF00] border-2 border-[#DFFF00] shadow-sm'
                : 'bg-[#E8F5D8] text-[#174C2B] border border-[#DCEBD3] hover:bg-[#DFFF00] hover:text-black'
            }`}
          >
            <span className="inline-flex items-center gap-1">
              <MaterialIcon name="star" size={14} filled className={selectedCategory === 'specials' ? 'text-[#DFFF00]' : 'text-[#4F8A3B]'} />
              <span>{t('الخلطات الخاصة', 'Specials')}</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#DFFF00] text-black font-black">
              {specialsCount}
            </span>
          </button>

          {/* Category Tabs */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.slug}
                onClick={() => handleSelectCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#174C2B] text-[#DFFF00] border-2 border-[#4F8A3B] shadow-sm'
                    : 'bg-white text-[#174C2B] border border-[#DCEBD3] hover:bg-[#E8F5D8]'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameEn} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#DCEBD3] space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F5D8] flex items-center justify-center text-[#4F8A3B]">
              <SearchIcon size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#174C2B]">
              {t('لم نجد أي نتائج مطابقة', 'No products found')}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {t(
                'جرّب البحث باسم آخر أو اختر قسماً آخر من قائمة الفئات أعلاه.',
                'Try searching for something else or select another category from above.'
              )}
            </p>
            <button
              onClick={() => {
                handleSelectCategory('all');
                setSearchQuery('');
              }}
              className="py-2.5 px-6 rounded-full bg-[#4F8A3B] hover:bg-[#DFFF00] text-white hover:text-black font-extrabold text-xs sm:text-sm border border-[#4F8A3B] hover:border-[#DFFF00] transition-colors"
            >
              {t('عرض جميع المنتجات', 'Show All Products')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#4F8A3B]">جاري التحميل...</div>}>
      <ShopContent />
    </Suspense>
  );
}
