'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size?: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  wishlistIds: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toast: string | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('avocado_cart');
      if (savedCart) setItems(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('avocado_wishlist');
      if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('avocado_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('avocado_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product: Product, size?: ProductSize, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    const itemPrice = selectedSize ? selectedSize.price : product.price;
    const cartItemId = `${product.id}-${selectedSize ? selectedSize.id : 'default'}`;

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === cartItemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                itemTotal: (item.quantity + quantity) * itemPrice,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            product,
            selectedSize,
            quantity,
            itemTotal: quantity * itemPrice,
          },
        ];
      }
    });

    showToast(`تمت إضافة ${product.nameAr} إلى السلة!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const itemPrice = item.selectedSize ? item.selectedSize.price : item.product.price;
          return {
            ...item,
            quantity,
            itemTotal: quantity * itemPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('تمت الإزالة من قائمة الرغبات');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('تمت الإضافة إلى قائمة الرغبات');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlistIds.includes(productId);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  // Free delivery for orders over 60 SAR, otherwise flat 12 SAR
  const deliveryFee = subtotal > 0 && subtotal >= 60 ? 0 : subtotal > 0 ? 12 : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
