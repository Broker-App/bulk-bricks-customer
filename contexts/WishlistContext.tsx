'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Property } from '@/types';

const WISHLIST_KEY = 'bb-wishlist';

interface WishlistContextValue {
  wishlist: Property[];
  toggle: (property: Property) => void;
  isWishlisted: (propertyId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue>({
  wishlist: [],
  toggle: () => {},
  isWishlisted: () => false,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Property[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = useCallback((property: Property) => {
    setWishlist(prev => {
      const next = prev.some(p => p.id === property.id)
        ? prev.filter(p => p.id !== property.id)
        : [...prev, property];
      try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (propertyId: string) => wishlist.some(p => p.id === propertyId),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
