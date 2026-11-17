import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedProductsSection } from '@/components/FeaturedProductsSection';
import { IceCreamSection } from '@/components/IceCreamSection';
import { FruitPlattersSection } from '@/components/FruitPlattersSection';
import { DrinksSection } from '@/components/DrinksSection';
import { PromoBanner } from '@/components/PromoBanner';
import { BranchSection } from '@/components/BranchSection';
import { FeatureBadges } from '@/components/FeatureBadges';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Carousel with direct /shop?category= filters */}
      <CategorySection />

      {/* 3. Best Selling Products (Most popular creations) */}
      <FeaturedProductsSection />

      {/* 4. Artisanal Ice Cream (Featured from the end of the menu in reverse) */}
      <IceCreamSection />

      {/* 5. Fresh Fruit Platters & Salads (From the end of the menu in reverse) */}
      <FruitPlattersSection />

      {/* 6. Promotional Green Banner */}
      <PromoBanner />

      {/* 7. Fresh Drinks Collection */}
      <DrinksSection />

      {/* 8. Saudi Branch Locator */}
      <BranchSection />

      {/* 9. Trust Feature Badges */}
      <FeatureBadges />
    </>
  );
}
