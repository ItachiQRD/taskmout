'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'taskmout_cart';

export type CartLine = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  hydrated: boolean;
  addProduct: (productId: string, qty?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CartLine =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as CartLine).productId === 'string' &&
        typeof (x as CartLine).quantity === 'number' &&
        (x as CartLine).quantity > 0
    );
  } catch {
    return [];
  }
}

function saveCart(lines: CartLine[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  } catch (_) {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCart(lines);
  }, [lines, hydrated]);

  const addProduct = useCallback((productId: string, qty: number = 1) => {
    const q = Math.max(1, Math.floor(qty));
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId);
      if (idx === -1) return [...prev, { productId, quantity: q }];
      const next = [...prev];
      next[idx] = { productId, quantity: next[idx].quantity + q };
      return next;
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.floor(quantity);
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.productId !== productId));
      return;
    }
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId);
      if (idx === -1) return [...prev, { productId, quantity: q }];
      const next = [...prev];
      next[idx] = { productId, quantity: q };
      return next;
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, hydrated, addProduct, setQuantity, removeProduct, clear }),
    [lines, hydrated, addProduct, setQuantity, removeProduct, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans CartProvider');
  return ctx;
}

export function cartItemCount(lines: CartLine[]): number {
  return lines.reduce((s, l) => s + l.quantity, 0);
}
