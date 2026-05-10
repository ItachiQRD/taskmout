import type { Category, Product, Order } from '@/types/store';

const STORAGE_KEYS = {
  categories: 'taskmout_categories',
  products: 'taskmout_products',
  orders: 'taskmout_orders',
} as const;

export const SEED_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Huiles', slug: 'huiles', order: 0 },
  { id: 'cat-2', name: 'Amlou & tartinables', slug: 'amlou', order: 1 },
  { id: 'cat-3', name: 'Beurres', slug: 'beurres', order: 2 },
];

export const SEED_PRODUCTS: Product[] = [
  { id: '1', name: 'Huile d\'argan pure', slug: 'huile-argan-pure', description: 'Huile d\'argan 100 % pure.', price: '24,90', categoryId: 'cat-1', stock: 50, image: null, active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'Huile d\'olive extra vierge', slug: 'huile-olive', description: 'Huile d\'olive extra vierge.', price: '18,90', categoryId: 'cat-1', stock: 40, image: null, active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'Amlou — pâte à tartiner', slug: 'amlou', description: 'Pâte à tartiner amlou.', price: '14,90', categoryId: 'cat-2', stock: 30, image: null, active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const defaultCategories = SEED_CATEGORIES;
const defaultProducts = SEED_PRODUCTS;

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
}

export function loadCategories(): Category[] {
  const data = loadJson<Category[]>(STORAGE_KEYS.categories, defaultCategories);
  if (!data.length) return defaultCategories;
  return data;
}

export function saveCategories(categories: Category[]): void {
  saveJson(STORAGE_KEYS.categories, categories);
}

export function loadProducts(): Product[] {
  return loadJson<Product[]>(STORAGE_KEYS.products, defaultProducts);
}

export function saveProducts(products: Product[]): void {
  saveJson(STORAGE_KEYS.products, products);
}

export function loadOrders(): Order[] {
  return loadJson<Order[]>(STORAGE_KEYS.orders, []);
}

export function saveOrders(orders: Order[]): void {
  saveJson(STORAGE_KEYS.orders, orders);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
