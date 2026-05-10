import { promises as fs } from 'fs';
import path from 'path';
import type { Order } from '@/types/store';

const STORE_PATH = path.join(process.cwd(), 'data', 'order-store.json');

type StoreFile = {
  orders: Order[];
};

async function ensureDir(): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
}

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as StoreFile;
    if (!parsed || !Array.isArray(parsed.orders)) return { orders: [] };
    return { orders: parsed.orders };
  } catch {
    return { orders: [] };
  }
}

async function writeStore(data: StoreFile): Promise<void> {
  await ensureDir();
  const tmp = `${STORE_PATH}.${Date.now()}.tmp`;
  const payload = JSON.stringify(data, null, 2);
  await fs.writeFile(tmp, payload, 'utf8');
  await fs.rename(tmp, STORE_PATH);
}

export async function listOrdersDescending(): Promise<Order[]> {
  const { orders } = await readStore();
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const { orders } = await readStore();
  return orders.find((o) => o.id === id);
}

export async function upsertOrder(order: Order): Promise<void> {
  const { orders } = await readStore();
  const idx = orders.findIndex((o) => o.id === order.id);
  if (idx === -1) orders.unshift(order);
  else orders[idx] = order;
  await writeStore({ orders });
}

export async function updateOrderPartial(id: string, patch: Partial<Order>): Promise<Order | null> {
  const { orders } = await readStore();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  const updated: Order = { ...orders[idx], ...patch, updatedAt: new Date().toISOString() };
  orders[idx] = updated;
  await writeStore({ orders });
  return updated;
}
