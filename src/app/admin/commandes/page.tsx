'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatDistanceToNow } from '@/lib/date';
import type { Order } from '@/types/store';
import { readAdminSessionToken } from '@/lib/admin-client';

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  paid: 'Payée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  paid: 'bg-argan-100 text-argan-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-olive-100 text-olive-800',
  cancelled: 'bg-ink/10 text-ink/70',
};

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const token = readAdminSessionToken();
    if (!token) {
      setLoadError('Session expirée.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/orders', { headers: { 'x-admin-token': token } });
      const data = (await res.json()) as { orders?: Order[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setOrders(data.orders ?? []);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Chargement impossible.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const token = readAdminSessionToken();
    if (!token) return;
    const res = await fetch(`/api/orders/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ status }),
    });
    const data = (await res.json()) as { order?: Order; error?: string };
    if (!res.ok) {
      alert(data.error ?? 'Mise à jour impossible.');
      return;
    }
    if (data.order) {
      setOrders((prev) => prev.map((o) => (o.id === id ? data.order! : o)));
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Commandes</h1>
      <p className="text-ink/70 mt-1">
        Commandes enregistrées côté serveur (paiement SumUp). Les anciennes entrées uniquement localStorage ne
        s&apos;affichent plus ici.
      </p>

      {loadError ? (
        <p className="mt-4 text-sm text-rose-600">{loadError}</p>
      ) : null}

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-ink/10 text-left">
              <th className="pb-3 pr-4 font-medium text-ink/70">Date</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Client</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Total</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">BC / BL</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Mails client</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Statut</th>
              <th className="pb-3 font-medium text-ink/70">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink/60">
                  Chargement…
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink/60">
                  Aucune commande serveur pour le moment.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-ink/5 hover:bg-ink/[0.02]">
                  <td className="py-4 pr-4 text-sm text-ink/80 align-top">
                    {formatDistanceToNow(order.createdAt)} — {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <p className="font-medium text-ink">{order.name}</p>
                    <p className="text-sm text-ink/70">{order.email}</p>
                    <p className="text-xs text-ink/55 mt-1 max-w-[14rem]">{order.address}</p>
                  </td>
                  <td className="py-4 pr-4 font-medium align-top">{order.total} €</td>
                  <td className="py-4 pr-4 text-xs text-ink/70 align-top">
                    {order.purchaseOrderNumber ? <div>BC {order.purchaseOrderNumber}</div> : <span>—</span>}
                    {order.deliveryNoteNumber ? <div className="mt-1">BL {order.deliveryNoteNumber}</div> : null}
                    {order.fulfillmentDispatchedAt ? (
                      <div className="mt-1 text-olive-700">Webhook OK</div>
                    ) : order.status === 'paid' ? (
                      <div className="mt-1 text-amber-700">Webhook en attente</div>
                    ) : null}
                  </td>
                  <td className="py-4 pr-4 text-xs text-ink/70 align-top">
                    <div>Lien paiement : {order.emailPaymentLinkSentAt ? <span className="text-emerald-700">envoyé</span> : <span>—</span>}</div>
                    <div className="mt-1">
                      Confirmation :{' '}
                      {order.emailPaidConfirmationSentAt ? (
                        <span className="text-emerald-700">envoyé</span>
                      ) : (
                        <span>{order.status === 'paid' ? <span className="text-amber-700">en attente</span> : '—'}</span>
                      )}
                    </div>
                    <div className="mt-1">
                      Expédition :{' '}
                      {order.emailShippedNoticeSentAt ? (
                        <span className="text-emerald-700">notifié</span>
                      ) : order.status === 'shipped' ? (
                        <span className="text-amber-700">en attente</span>
                      ) : (
                        '—'
                      )}
                    </div>
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${
                        statusColors[order.status] || ''
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td className="py-4 align-top">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="text-sm border border-ink/20 rounded-xl px-3 py-2 focus:border-argan-500"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
