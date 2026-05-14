'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { readAdminSessionToken } from '@/lib/admin-client';
import { Plus, Pencil, Trash2, ArrowRight, Upload, X } from 'lucide-react';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const MAX_IMG_WIDTH = 800;
const IMG_QUALITY = 0.85;

function resizeImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }
    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.width <= MAX_IMG_WIDTH) {
        resolve(file);
        return;
      }
      const ratio = MAX_IMG_WIDTH / img.width;
      const canvas = document.createElement('canvas');
      canvas.width = MAX_IMG_WIDTH;
      canvas.height = Math.round(img.height * ratio);
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(file); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }));
        },
        'image/jpeg',
        IMG_QUALITY,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

type Form = {
  name: string;
  slug: string;
  description: string;
  price: string;
  categoryId: string;
  stock: number;
  active: boolean;
  image: string | null;
};

const emptyForm = (catId: string): Form => ({
  name: '',
  slug: '',
  description: '',
  price: '',
  categoryId: catId,
  stock: 0,
  active: true,
  image: null,
});

export default function AdminProduitsPage() {
  const { products, categories, getCategoryById, addProduct, updateProduct, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm(categories[0]?.id ?? ''));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm(categories[0]?.id ?? ''));
    setShowForm(true);
  };

  const startEdit = (p: (typeof products)[0]) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      categoryId: p.categoryId,
      stock: p.stock,
      active: p.active,
      image: p.image,
    });
    setShowForm(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    const slug = form.slug.trim() || slugify(form.name);
    if (editingId) {
      updateProduct(editingId, { ...form, slug });
    } else {
      addProduct({ ...form, slug });
    }
    setShowForm(false);
  };

  const uploadImage = useCallback(async (rawFile: File) => {
    setUploadError(null);
    setUploading(true);

    const token = readAdminSessionToken();
    if (!token) {
      setUploadError('Session expirée.');
      setUploading(false);
      return;
    }

    try {
      const file = await resizeImage(rawFile);
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-token': token },
        body: fd,
      });
      const data = (await res.json()) as { url?: string; error?: string; storage?: string };
      if (!res.ok || !data.url) {
        setUploadError(data.error ?? 'Erreur upload.');
      } else {
        setForm((f) => ({ ...f, image: data.url! }));
      }
    } catch {
      setUploadError('Erreur réseau.');
    } finally {
      setUploading(false);
    }
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) uploadImage(f);
    e.target.value = '';
  };

  return (
    <div className="p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Produits</h1>
      <p className="text-ink/70 mt-1">Gérer le catalogue, les descriptions et les images.</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button type="button" onClick={startAdd} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nouveau produit
        </button>
      </div>

      {showForm && (
        <div className="mt-6 card p-6 max-w-xl">
          <h2 className="font-display text-lg font-semibold text-ink">
            {editingId ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Nom</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                placeholder="ex. Huile d'argan culinaire"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                placeholder="huile-argan-culinaire"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-ink/20 focus:border-argan-500 resize-y"
                placeholder="Description visible sur la fiche produit et la boutique"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Image</label>
              {form.image ? (
                <div className="relative inline-block">
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-ink/10">
                    <Image src={form.image} alt="Aperçu" fill className="object-cover" sizes="160px" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: null }))}
                    className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600"
                    aria-label="Supprimer l'image"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex flex-col items-center justify-center w-40 h-40 rounded-xl border-2 border-dashed border-ink/20 hover:border-argan-400 text-ink/50 hover:text-argan-600 transition-colors"
                >
                  <Upload className="size-8 mb-2" />
                  <span className="text-xs">{uploading ? 'Envoi…' : 'Choisir une image'}</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={onFileChange}
                className="hidden"
              />
              {uploadError && <p className="mt-2 text-sm text-rose-600">{uploadError}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Prix (€)</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full min-h-[44px] px-4 rounded-xl border border-ink/20 focus:border-argan-500"
                  placeholder="22,90"
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
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
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
              <button type="button" onClick={save} className="btn-primary">
                Enregistrer
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ink/10 text-left">
              <th className="pb-3 pr-4 font-medium text-ink/70">Image</th>
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
                <td className="py-3 pr-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-ink/10 bg-dune-100">
                    {p.image ? (
                      <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-xl opacity-30">🫒</span>
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <p className="font-medium text-ink">{p.name}</p>
                  {p.description && (
                    <p className="text-xs text-ink/55 mt-0.5 max-w-[16rem] truncate">{p.description}</p>
                  )}
                  {!p.active && <span className="text-xs text-ink/60">(masqué)</span>}
                </td>
                <td className="py-3 pr-4 text-ink/80">{getCategoryById(p.categoryId)?.name ?? '—'}</td>
                <td className="py-3 pr-4">{p.price} €</td>
                <td className="py-3 pr-4">{p.stock}</td>
                <td className="py-3 flex items-center gap-2">
                  <Link
                    href={`/produit/${p.id}`}
                    className="text-sm text-argan-600 hover:underline flex items-center gap-1"
                  >
                    Voir <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="p-2 rounded-xl text-ink/70 hover:bg-argan-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 rounded-xl text-ink/70 hover:bg-red-50 hover:text-red-600"
                  >
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
