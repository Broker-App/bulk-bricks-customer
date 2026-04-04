'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

const WISHLIST_KEY = 'bb-wishlist';

interface WishlistContextValue {
  wishlist: string[];
  toggle: (propertyId: string) => void;
  isWishlisted: (propertyId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue>({
  wishlist: [],
  toggle: () => {},
  isWishlisted: () => false,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = useCallback((propertyId: string) => {
    setWishlist(prev => {
      const next = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (propertyId: string) => wishlist.includes(propertyId),
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
