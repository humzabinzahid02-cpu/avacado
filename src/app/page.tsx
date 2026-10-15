import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedProductsSection } from '@/components/FeaturedProductsSection';
import { DrinksSection } from '@/components/DrinksSection';
import { FoodDessertsSection } from '@/components/FoodDessertsSection';
import { PromoBanner } from '@/components/PromoBanner';
import { BranchSection } from '@/components/BranchSection';
import { FeatureBadges } from '@/components/FeatureBadges';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section matching mockup */}
      <HeroSection />

      {/* 2. Shop by Category matching mockup */}
      <CategorySection />

      {/* 3. Featured Products matching mockup */}
      <FeaturedProductsSection />

      {/* 4. Promotional Green Banner matching mockup */}
      <PromoBanner />

      {/* 5. Fresh Drinks Collection */}
      <DrinksSection />

      {/* 6. Food and Desserts Collection (Equal visual importance) */}
      <FoodDessertsSection />

      {/* 7. Saudi Branch Locator */}
      <BranchSection />

      {/* 8. Trust Feature Badges matching mockup */}
      <FeatureBadges />
    </>
  );
}
