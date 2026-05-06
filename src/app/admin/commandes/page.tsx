'use client';

import { useStore } from '@/context/StoreContext';
import { formatDistanceToNow } from '@/lib/date';

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
  const { orders, updateOrderStatus } = useStore();

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Commandes</h1>
      <p className="text-ink/70 mt-1">Liste des commandes et suivi du statut.</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ink/10 text-left">
              <th className="pb-3 pr-4 font-medium text-ink/70">Date</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Client</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Total</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Statut</th>
              <th className="pb-3 font-medium text-ink/70">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-ink/60">
                  Aucune commande pour le moment.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-ink/5 hover:bg-ink/[0.02]">
                  <td className="py-4 pr-4 text-sm text-ink/80">
                    {formatDistanceToNow(order.createdAt)} — {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 pr-4">
                    <p className="font-medium text-ink">{order.name}</p>
                    <p className="text-sm text-ink/70">{order.email}</p>
                  </td>
                  <td className="py-4 pr-4 font-medium">{order.total} €</td>
                  <td className="py-4 pr-4">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[order.status] || ''}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as typeof order.status)}
                      className="text-sm border border-ink/20 rounded-xl px-3 py-2 focus:border-argan-500"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
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
