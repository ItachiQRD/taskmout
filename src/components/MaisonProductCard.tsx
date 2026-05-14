'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { StarRating } from '@/components/StarRating';

export type MaisonProduct = {
  id: string;
  name: string;
  price: string;
  categoryLabel: string;
  image: string | null;
  stock?: number;
  description?: string;
  weight?: string;
};

export function MaisonProductCard({ product }: { product: MaisonProduct }) {
  const { addProduct } = useCart();
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <article className="group flex flex-col">
      {/* Image */}
      <Link
        href={`/produit/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden rounded-sm border border-maison-brun/8 bg-maison-sable/25"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-maison-sable/40">
            <span className="text-7xl opacity-30" aria-hidden>
              🫒
            </span>
          </div>
        )}
      </Link>

      {/* Infos */}
      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/produit/${product.id}`}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-maison-cacao group-hover:text-maison-brun transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {product.weight && (
          <p className="text-[11px] text-maison-cacao/55">{product.weight}</p>
        )}

        {product.description && (
          <p className="mt-1 text-sm leading-relaxed text-maison-cacao/70 line-clamp-2">
            {product.description}
          </p>
        )}

        <p className="mt-2 text-lg font-semibold text-maison-cacao">
          {product.price}&nbsp;€
        </p>

        <StarRating rating={5} reviewCount={Math.floor(50 + product.name.length * 7)} size="sm" />

        <button
          type="button"
          disabled={outOfStock}
          onClick={() => addProduct(product.id, 1)}
          className="btn-maison-primary mt-3 text-[11px]"
        >
          {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
        </button>
      </div>
    </article>
  );
}
