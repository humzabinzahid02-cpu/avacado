'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { SearchIcon } from '@/components/Icons';

function ShopContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  const initialCat = searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
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

  return (
    <div className="py-10 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#568C42] mb-2">
            <span>{t('الرئيسية', 'Home')}</span>
            <span>/</span>
            <span className="text-[#183C2A] font-bold">{t('جميع المنتجات', 'All Products')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('قائمة المأكولات والعصائر', 'Food & Drinks Menu')}
          </h1>
          <p className="text-sm text-[#568C42] mt-1">
            {t(
              'استكشف كافة منتجاتنا الطبيعية الطازجة من العصائر، السموذي، الآيس كريم، الكريب والوافل، وسلطات الفواكه',
              'Explore all our natural fresh juices, smoothies, artisanal ice creams, waffles, and fruit salads'
            )}
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#DCE8D1] mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={t('ابحث عن عصير أو حلوى...', 'Search for juice or dessert...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F2] text-sm text-[#183C2A] placeholder-gray-400 rounded-xl py-2.5 px-4 pe-10 border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
            />
            <span className="absolute top-1/2 -translate-y-1/2 end-3 text-[#245A35]">
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
              className="bg-[#FAF9F2] text-xs sm:text-sm font-semibold text-[#183C2A] py-2 px-3 rounded-xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35]"
            >
              <option value="featured">{t('المميز أولاً', 'Featured First')}</option>
              <option value="rating">{t('الأعلى تقييماً', 'Highest Rated')}</option>
              <option value="price-asc">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
              <option value="price-desc">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
            </select>
          </div>

        </div>

        {/* Category Pills Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#245A35] text-white shadow-md'
                : 'bg-white text-[#183C2A] border border-[#DCE8D1] hover:bg-[#EDF4E5]'
            }`}
          >
            {t('الكل', 'All')} ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#245A35] text-white shadow-md'
                  : 'bg-white text-[#183C2A] border border-[#DCE8D1] hover:bg-[#EDF4E5]'
              }`}
            >
              {language === 'ar' ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#DCE8D1] space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EDF4E5] flex items-center justify-center text-[#245A35]">
              <SearchIcon size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#183C2A]">
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
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="py-2 px-5 rounded-full bg-[#245A35] text-white text-xs font-bold hover:bg-[#163D29]"
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
    <Suspense fallback={<div className="p-12 text-center text-[#245A35]">جاري التحميل...</div>}>
      <ShopContent />
    </Suspense>
  );
}
