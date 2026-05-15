import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import type { Order } from '@/types/store';

type StoreFile = {
  orders: Order[];
};

/** Vercel / AWS Lambda : seul /tmp est inscriptible. */
function isServerlessEnv(): boolean {
  return Boolean(
    process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT,
  );
}

function defaultStorePath(): string {
  if (process.env.ORDER_STORE_PATH?.trim()) {
    return process.env.ORDER_STORE_PATH.trim();
  }
  if (isServerlessEnv()) {
    return path.join(os.tmpdir(), 'taskmout-order-store.json');
  }
  return path.join(process.cwd(), 'data', 'order-store.json');
}

let storeFilePath: string | null = null;

function getPath(): string {
  if (!storeFilePath) {
    storeFilePath = defaultStorePath();
  }
  return storeFilePath;
}

function isReadOnlyFsError(err: unknown): boolean {
  const code = err && typeof err === 'object' && 'code' in err ? String((err as NodeJS.ErrnoException).code) : '';
  return code === 'EROFS' || code === 'EPERM' || code === 'EACCES';
}

async function ensureDir(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  if (dir && dir !== '.' && dir !== '/') {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readFrom(filePath: string): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as StoreFile;
    if (!parsed || !Array.isArray(parsed.orders)) return { orders: [] };
    return { orders: parsed.orders };
  } catch {
    return { orders: [] };
  }
}

async function writeTo(filePath: string, data: StoreFile): Promise<void> {
  await ensureDir(filePath);
  const tmp = `${filePath}.${Date.now()}.tmp`;
  const payload = JSON.stringify(data, null, 2);
  await fs.writeFile(tmp, payload, 'utf8');
  await fs.rename(tmp, filePath);
}

async function readStore(): Promise<StoreFile> {
  return readFrom(getPath());
}

async function writeStore(data: StoreFile): Promise<void> {
  const primary = getPath();
  try {
    await writeTo(primary, data);
  } catch (err) {
    if (!isReadOnlyFsError(err)) throw err;
    const fallback = path.join(os.tmpdir(), 'taskmout-order-store.json');
    storeFilePath = fallback;
    await writeTo(fallback, data);
  }
}

export async function listOrdersDescending(): Promise<Order[]> {
  const { orders } = await readStore();
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
