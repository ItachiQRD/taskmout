'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Order } from '@/types/store';
import { readAdminSessionToken } from '@/lib/admin-client';
import { parsePriceFr } from '@/lib/price';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

type Period = 'all' | 'year' | 'month' | 'week';

const PERIOD_LABELS: Record<Period, string> = {
  all: 'Tout',
  year: 'Cette année',
  month: 'Ce mois',
  week: 'Cette semaine',
};

function startOfPeriod(period: Period): Date {
  const now = new Date();
  switch (period) {
    case 'week': {
      const d = new Date(now);
      d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1));
      d.setHours(0, 0, 0, 0);
      return d;
    }
    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case 'year':
      return new Date(now.getFullYear(), 0, 1);
    default:
      return new Date(0);
  }
}

function fmtEur(n: number) {
  return n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function getMonthLabel(d: Date) {
  return d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
}

type Stats = {
  totalRevenue: number;
  paidCount: number;
  avgOrder: number;
  cancelledCount: number;
  cancelledRevenue: number;
  pendingRevenue: number;
  pendingCount: number;
  topProducts: { name: string; qty: number; revenue: number }[];
  monthlyData: { label: string; revenue: number; orders: number }[];
};

function computeStats(orders: Order[], period: Period): Stats {
  const cutoff = startOfPeriod(period);
  const filtered = orders.filter((o) => new Date(o.createdAt) >= cutoff);

  const paid = filtered.filter((o) => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered');
  const cancelled = filtered.filter((o) => o.status === 'cancelled');
  const pending = filtered.filter((o) => o.status === 'pending');

  const totalRevenue = paid.reduce((s, o) => s + parsePriceFr(o.total), 0);
  const paidCount = paid.length;
  const avgOrder = paidCount > 0 ? totalRevenue / paidCount : 0;

  const cancelledRevenue = cancelled.reduce((s, o) => s + parsePriceFr(o.total), 0);
  const pendingRevenue = pending.reduce((s, o) => s + parsePriceFr(o.total), 0);

  const productMap = new Map<string, { qty: number; revenue: number }>();
  for (const o of paid) {
    for (const item of o.items) {
      const prev = productMap.get(item.productName) ?? { qty: 0, revenue: 0 };
      prev.qty += item.quantity;
      prev.revenue += parsePriceFr(item.price) * item.quantity;
      productMap.set(item.productName, prev);
    }
  }
  const topProducts = Array.from(productMap.entries())
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);

  const monthMap = new Map<string, { revenue: number; orders: number }>();
  for (const o of paid) {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = getMonthLabel(d);
    const prev = monthMap.get(key) ?? { revenue: 0, orders: 0 };
    prev.revenue += parsePriceFr(o.total);
    prev.orders += 1;
    monthMap.set(key, { ...prev, label } as never);
  }

  const monthlyDataRaw = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12);

  const monthlyData = monthlyDataRaw.map(([key, v]) => {
    const [y, m] = key.split('-');
    const d = new Date(Number(y), Number(m) - 1, 1);
    return { label: getMonthLabel(d), revenue: v.revenue, orders: v.orders };
  });

  return {
    totalRevenue,
    paidCount,
    avgOrder,
    cancelledCount: cancelled.length,
    cancelledRevenue,
    pendingRevenue,
    pendingCount: pending.length,
    topProducts,
    monthlyData,
  };
}

function exportCSV(orders: Order[]) {
  const paid = orders.filter((o) => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered');
  const header = 'Date;Commande;Client;Email;Total;Statut;BC;BL\n';
  const rows = paid.map((o) => {
    const d = new Date(o.createdAt).toLocaleDateString('fr-FR');
    return `${d};${o.id};${o.name};${o.email};${o.total};${o.status};${o.purchaseOrderNumber ?? ''};${o.deliveryNoteNumber ?? ''}`;
  });
  const csv = header + rows.join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `comptabilite-taskmout-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function KPICard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: typeof DollarSign;
  color: string;
  trend?: 'up' | 'down' | null;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-ink/70">{label}</p>
          <p className="text-2xl font-semibold text-ink mt-1">{value}</p>
          {sub && <p className="text-xs text-ink/55 mt-1">{sub}</p>}
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {trend === 'up' ? 'En hausse' : 'En baisse'}
        </div>
      )}
    </div>
  );
}

function MiniBar({ data, maxVal }: { data: { label: string; revenue: number; orders: number }[]; maxVal: number }) {
  if (data.length === 0) return <p className="text-sm text-ink/50 text-center py-8">Aucune donnée.</p>;
  return (
    <div className="flex items-end gap-1.5 h-40">
      {data.map((d, i) => {
        const h = maxVal > 0 ? (d.revenue / maxVal) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <div className="w-full relative group">
              <div
                className="w-full bg-argan-400/80 rounded-t-sm transition-all hover:bg-argan-500"
                style={{ height: `${Math.max(h, 4)}%`, minHeight: '4px' }}
              />
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {fmtEur(d.revenue)} — {d.orders} cmd
              </div>
            </div>
            <span className="text-[10px] text-ink/55 truncate w-full text-center">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminComptabilitePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('all');

  const fetchOrders = useCallback(async () => {
    const token = readAdminSessionToken();
    if (!token) {
      setError('Session expirée.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/orders', { headers: { 'x-admin-token': token } });
      const data = (await res.json()) as { orders?: Order[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setOrders(data.orders ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chargement impossible.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const stats = useMemo(() => computeStats(orders, period), [orders, period]);
  const maxMonthly = useMemo(
    () => Math.max(...stats.monthlyData.map((d) => d.revenue), 0),
    [stats.monthlyData]
  );

  if (loading) {
    return (
      <div className="p-6 sm:p-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Comptabilité</h1>
        <p className="text-ink/60 mt-6">Chargement des données…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 sm:p-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Comptabilité</h1>
        <p className="text-rose-600 mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Comptabilité</h1>
          <p className="text-ink/70 mt-1">Suivi des revenus, commandes et performances produits.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-ink/15 overflow-hidden">
            {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${
                  period === p ? 'bg-argan-500 text-white' : 'text-ink/70 hover:bg-ink/5'
                }`}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => exportCSV(orders)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink/70 border border-ink/15 rounded-xl hover:bg-ink/5 transition-colors"
            title="Exporter en CSV"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Chiffre d'affaires"
          value={fmtEur(stats.totalRevenue)}
          sub={`${stats.paidCount} commande${stats.paidCount > 1 ? 's' : ''} payée${stats.paidCount > 1 ? 's' : ''}`}
          icon={DollarSign}
          color="bg-emerald-100 text-emerald-700"
          trend={stats.totalRevenue > 0 ? 'up' : null}
        />
        <KPICard
          label="Panier moyen"
          value={fmtEur(stats.avgOrder)}
          icon={ShoppingCart}
          color="bg-argan-100 text-argan-700"
        />
        <KPICard
          label="En attente"
          value={fmtEur(stats.pendingRevenue)}
          sub={`${stats.pendingCount} commande${stats.pendingCount > 1 ? 's' : ''}`}
          icon={Calendar}
          color="bg-amber-100 text-amber-700"
        />
        <KPICard
          label="Annulées"
          value={fmtEur(stats.cancelledRevenue)}
          sub={`${stats.cancelledCount} commande${stats.cancelledCount > 1 ? 's' : ''}`}
          icon={TrendingDown}
          color="bg-rose-100 text-rose-700"
          trend={stats.cancelledCount > 0 ? 'down' : null}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-ink">Revenus mensuels</h2>
            <TrendingUp className="w-5 h-5 text-ink/40" />
          </div>
          <MiniBar data={stats.monthlyData} maxVal={maxMonthly} />
        </div>

        {/* Top products */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-ink">Produits les plus vendus</h2>
            <Package className="w-5 h-5 text-ink/40" />
          </div>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-ink/50 text-center py-4">Aucune vente enregistrée.</p>
          ) : (
            <ul className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-argan-100 text-argan-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                    <p className="text-xs text-ink/55">{p.qty} vendu{p.qty > 1 ? 's' : ''}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink">{fmtEur(p.revenue)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent paid orders */}
      <div className="mt-6 card p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Dernières ventes</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-ink/10 text-left">
                <th className="pb-2 pr-4 text-xs font-medium text-ink/60">Date</th>
                <th className="pb-2 pr-4 text-xs font-medium text-ink/60">Client</th>
                <th className="pb-2 pr-4 text-xs font-medium text-ink/60">Produits</th>
                <th className="pb-2 pr-4 text-xs font-medium text-ink/60 text-right">Total</th>
                <th className="pb-2 text-xs font-medium text-ink/60">Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((o) => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered')
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 15)
                .map((o) => (
                  <tr key={o.id} className="border-b border-ink/5 hover:bg-ink/[0.02]">
                    <td className="py-3 pr-4 text-sm text-ink/70">
                      {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-sm font-medium text-ink">{o.name}</p>
                      <p className="text-xs text-ink/55">{o.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-xs text-ink/70">
                      {o.items.map((it) => `${it.productName} ×${it.quantity}`).join(', ')}
                    </td>
                    <td className="py-3 pr-4 text-sm font-semibold text-ink text-right">{o.total} €</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[11px] font-medium ${
                        o.status === 'delivered' ? 'bg-olive-100 text-olive-800' :
                        o.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-argan-100 text-argan-800'
                      }`}>
                        {o.status === 'paid' ? 'Payée' : o.status === 'shipped' ? 'Expédiée' : 'Livrée'}
                      </span>
                    </td>
                  </tr>
                ))}
              {orders.filter((o) => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered').length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-ink/50 text-sm">Aucune vente enregistrée.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
