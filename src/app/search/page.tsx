'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SearchIcon } from '@/components/Icons';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('s') || '';
  const { t } = useLanguage();

  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q) ||
        p.descriptionEn.toLowerCase().includes(q) ||
        p.categoryNameAr.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="py-12 bg-[#FAF9F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#183C2A] tracking-tight">
            {t('نتائج البحث', 'Search Results')}
          </h1>
          <p className="text-sm text-[#568C42] mt-1">
            {t(
              `تم العثور على ${results.length} نتيجة بحث عن: "${query}"`,
              `Found ${results.length} results for: "${query}"`
            )}
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('ابحث عن عصير، آيس كريم، وافل...', 'Search for juices, ice cream, waffles...')}
            className="w-full bg-white text-sm py-3 px-4 pe-12 rounded-2xl border border-[#DCE8D1] focus:outline-hidden focus:border-[#245A35] shadow-xs"
          />
          <span className="absolute top-1/2 -translate-y-1/2 end-4 text-[#245A35]">
            <SearchIcon size={20} />
          </span>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#DCE8D1] space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EDF4E5] flex items-center justify-center text-[#245A35]">
              <SearchIcon size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#183C2A]">
              {t('لا توجد نتائج مطابقة لبحثك', 'No matching results found')}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {t('تأكد من كتابة الكلمة بشكل صحيح أو جرّب كلمات مثل "أفوكادو"، "مانجو"، "وافل"', 'Try searching for terms like "Avocado", "Mango", or "Waffle"')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#245A35]">جاري البحث...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
