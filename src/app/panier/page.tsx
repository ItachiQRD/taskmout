import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function PanierPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-argan-600 hover:text-argan-700 font-medium mb-8">
        <ArrowLeft className="w-5 h-5" aria-hidden />
        Continuer mes achats
      </Link>
      <div className="card p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-argan-100 text-argan-600 mb-6">
          <ShoppingBag className="w-10 h-10" aria-hidden />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink">Votre panier est vide</h1>
        <p className="mt-2 text-ink/80">
          Ajoutez des huiles ou de l'amlou depuis le catalogue.
        </p>
        <Link href="/huiles" className="btn-primary mt-8 inline-flex">
          Voir le catalogue
        </Link>
      </div>
    </div>
  );
}
