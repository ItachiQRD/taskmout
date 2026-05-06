'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Category, Product, Order } from '@/types/store';
import {
  loadCategories,
  saveCategories,
  loadProducts,
  saveProducts,
  loadOrders,
  saveOrders,
  generateId,
} from '@/lib/store';

type StoreContextValue = {
  categories: Category[];
  products: Product[];
  orders: Order[];
  setCategories: (categories: Category[] | ((prev: Category[]) => Category[])) => void;
  setProducts: (products: Product[] | ((prev: Product[]) => Product[])) => void;
  setOrders: (orders: Order[] | ((prev: Order[]) => Order[])) => void;
  addCategory: (c: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, c: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (p: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getCategoryById: (id: string) => Category | undefined;
  getProductsByCategory: (categoryId: string | null) => Product[];
  getActiveProducts: () => Product[];
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategoriesState] = useState<Category[]>([]);
  const [products, setProductsState] = useState<Product[]>([]);
  const [orders, setOrdersState] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCategoriesState(loadCategories());
    setProductsState(loadProducts());
    setOrdersState(loadOrders());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCategories(categories);
  }, [categories, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveProducts(products);
  }, [products, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveOrders(orders);
  }, [orders, hydrated]);

  const setCategories = useCallback((arg: Category[] | ((prev: Category[]) => Category[])) => {
    setCategoriesState(typeof arg === 'function' ? arg : () => arg);
  }, []);

  const setProducts = useCallback((arg: Product[] | ((prev: Product[]) => Product[])) => {
    setProductsState(typeof arg === 'function' ? arg : () => arg);
  }, []);

  const setOrders = useCallback((arg: Order[] | ((prev: Order[]) => Order[])) => {
    setOrdersState(typeof arg === 'function' ? arg : () => arg);
  }, []);

  const addCategory = useCallback((c: Omit<Category, 'id'>) => {
    const newCat: Category = { ...c, id: generateId() };
    setCategoriesState((prev) => [...prev, newCat].sort((a, b) => a.order - b.order));
    return newCat;
  }, []);

  const updateCategory = useCallback((id: string, c: Partial<Category>) => {
    setCategoriesState((prev) =>
      prev.map((x) => (x.id === id ? { ...x, ...c } : x)).sort((a, b) => a.order - b.order)
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategoriesState((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addProduct = useCallback((p: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProd: Product = {
      ...p,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setProductsState((prev) => [...prev, newProd]);
    return newProd;
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Product>) => {
    setProductsState((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, ...p, updatedAt: new Date().toISOString() } : x
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProductsState((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addOrder = useCallback((o: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newOrder: Order = { ...o, id: generateId(), createdAt: now, updatedAt: now };
    setOrdersState((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrdersState((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status, updatedAt: new Date().toISOString() } : x))
    );
  }, []);

  const getCategoryById = useCallback(
    (id: string) => categories.find((c) => c.id === id),
    [categories]
  );

  const getProductsByCategory = useCallback(
    (categoryId: string | null) => {
      const active = products.filter((p) => p.active);
      if (!categoryId) return active;
      return active.filter((p) => p.categoryId === categoryId);
    },
    [products]
  );

  const getActiveProducts = useCallback(
    () => products.filter((p) => p.active),
    [products]
  );

  const value: StoreContextValue = {
    categories,
    products,
    orders,
    setCategories,
    setProducts,
    setOrders,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrderStatus,
    getCategoryById,
    getProductsByCategory,
    getActiveProducts,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
