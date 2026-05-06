'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Plus, Pencil, Trash2, ArrowRight } from 'lucide-react';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminProduitsPage() {
  const { products, categories, getCategoryById, addProduct, updateProduct, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', price: '', categoryId: categories[0]?.id ?? '', stock: 0, active: true });

  const startAdd = () => {
    setEditingId(null);
    setForm({ name: '', slug: '', description: '', price: '', categoryId: categories[0]?.id ?? '', stock: 0, active: true });
    setShowForm(true);
  };

  const startEdit = (p: typeof products[0]) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      categoryId: p.categoryId,
      stock: p.stock,
      active: p.active,
    });
    setShowForm(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    const slug = form.slug.trim() || slugify(form.name);
    if (editingId) {
      updateProduct(editingId, { ...form, slug });
    } else {
      addProduct({ ...form, slug, image: null });
    }
    setShowForm(false);
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Produits</h1>
      <p className="text-ink/70 mt-1">Gérer le catalogue et les fiches produits.</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button type="button" onClick={startAdd} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nouveau produit
        </button>
      </div>

      {showForm && (
        <div className="mt-6 card p-6 max-w-lg">
          <h2 className="font-display text-lg font-semibold text-ink">{editingId ? 'Modifier le produit' : 'Nouveau produit'}</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nom</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                placeholder="ex. Huile d'argan pure"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                placeholder="huile-argan-pure"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-ink/20 focus:border-argan-500 resize-y"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Prix (€)</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                  placeholder="24,90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Stock</label>
                <input
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Catégorie</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                className="rounded border-ink/20"
              />
              <span className="text-sm text-ink">Produit visible en boutique</span>
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={save} className="btn-primary">Enregistrer</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ink/10 text-left">
              <th className="pb-3 pr-4 font-medium text-ink/70">Produit</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Catégorie</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Prix</th>
              <th className="pb-3 pr-4 font-medium text-ink/70">Stock</th>
              <th className="pb-3 font-medium text-ink/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-ink/5 hover:bg-ink/[0.02]">
                <td className="py-4 pr-4">
                  <p className="font-medium text-ink">{p.name}</p>
                  {!p.active && <span className="text-xs text-ink/60">(masqué)</span>}
                </td>
                <td className="py-4 pr-4 text-ink/80">{getCategoryById(p.categoryId)?.name ?? '—'}</td>
                <td className="py-4 pr-4">{p.price} €</td>
                <td className="py-4 pr-4">{p.stock}</td>
                <td className="py-4 flex items-center gap-2">
                  <Link href={`/produit/${p.id}`} className="text-sm text-argan-600 hover:underline flex items-center gap-1">
                    Voir <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button type="button" onClick={() => startEdit(p)} className="p-2 rounded-xl text-ink/70 hover:bg-argan-50">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => deleteProduct(p.id)} className="p-2 rounded-xl text-ink/70 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
