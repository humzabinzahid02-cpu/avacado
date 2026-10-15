export type Language = 'ar' | 'en';

export interface ProductSize {
  id: string;
  nameAr: string;
  nameEn: string;
  volume: string;
  price: number;
}

export interface Product {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categorySlug: string;
  categoryNameAr: string;
  categoryNameEn: string;
  price: number; // Base price for default size
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  sizes?: ProductSize[];
  ingredientsAr?: string[];
  ingredientsEn?: string[];
}

export interface Category {
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string; // unique item id (product id + size id)
  product: Product;
  selectedSize?: ProductSize;
  quantity: number;
  itemTotal: number;
}

export interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  cityEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
  openingHoursAr: string;
  openingHoursEn: string;
}
