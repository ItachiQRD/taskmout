export type Category = {
  id: string;
  name: string;
  slug: string;
  order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  categoryId: string;
  stock: number;
  image: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  price: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  email: string;
  name: string;
  address: string;
  items: OrderItem[];
  total: string;
  note?: string;
};
