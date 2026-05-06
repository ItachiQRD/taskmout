'use client';

import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Plus, Pencil, Trash2 } from 'lucide-react';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formOrder, setFormOrder] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const startAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormOrder(categories.length);
    setShowForm(true);
  };

  const startEdit = (id: string) => {
    const c = categories.find((x) => x.id === id);
    if (!c) return;
    setEditingId(id);
    setFormName(c.name);
    setFormOrder(c.order);
    setShowForm(true);
  };

  const save = () => {
    if (!formName.trim()) return;
    if (editingId) {
      updateCategory(editingId, { name: formName.trim(), slug: slugify(formName.trim()), order: formOrder });
    } else {
      addCategory({ name: formName.trim(), slug: slugify(formName.trim()), order: formOrder });
    }
    setShowForm(false);
  };

  const remove = (id: string) => {
    const used = products.some((p) => p.categoryId === id);
    if (used) {
      if (!confirm('Des produits utilisent cette catégorie. Supprimer quand même ?')) return;
    }
    deleteCategory(id);
    setShowForm(false);
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Catégories</h1>
      <p className="text-ink/70 mt-1">Gérer les catégories de produits (filtrées sur la page Articles).</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button type="button" onClick={startAdd} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nouvelle catégorie
        </button>
      </div>

      {showForm && (
        <div className="mt-6 card p-6 max-w-md">
          <h2 className="font-display text-lg font-semibold text-ink">{editingId ? 'Modifier' : 'Nouvelle catégorie'}</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nom</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                placeholder="ex. Huiles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Ordre d'affichage</label>
              <input
                type="number"
                min={0}
                value={formOrder}
                onChange={(e) => setFormOrder(Number(e.target.value))}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={save} className="btn-primary">Enregistrer</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-2">
        {[...categories].sort((a, b) => a.order - b.order).map((c) => (
          <div key={c.id} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-ink">{c.name}</p>
              <p className="text-sm text-ink/60">{c.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => startEdit(c.id)} className="p-2 rounded-xl text-ink/70 hover:bg-argan-50 hover:text-argan-600">
                <Pencil className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => remove(c.id)} className="p-2 rounded-xl text-ink/70 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
