'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import type { Order } from '@/types/store';
import { CheckCircle2 } from 'lucide-react';

function MerciInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref) {
      setOrder(null);
      return;
    }

    let cancelled = false;
    fetch('/api/checkout/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: ref }),
    })
      .then(async (r) => {
        const data = (await r.json()) as { order?: Order | null; paid?: boolean; error?: string };
        if (!r.ok && !data.order) throw new Error(data.error ?? `HTTP ${r.status}`);
        if (!cancelled) setOrder(data.order ?? null);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erreur');
          setOrder(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [ref]);

  if (!ref) {
    return (
      <div className="min-h-screen bg-maison-creme">
        <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
          <p className="text-maison-cacao/70">Référence de commande manquante dans l&apos;URL.</p>
          <Link href="/" className="btn-maison-primary !w-auto inline-flex px-8">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  if (order === undefined && !error) {
    return (
      <div className="min-h-screen bg-maison-creme">
        <div className="max-w-xl mx-auto px-4 py-16 text-center text-maison-cacao/60">
          Vérification de votre paiement…
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-maison-creme">
        <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
          <p className="text-maison-cacao/80">{error ?? 'Commande introuvable ou paiement encore en cours de traitement.'}</p>
          <p className="text-sm text-maison-cacao/60">
            Si vous avez payé, le statut se met à jour automatiquement en quelques instants ; vous pouvez aussi contacter{' '}
            <a href="mailto:contact@taskmout.fr" className="text-maison-brun underline">
              contact@taskmout.fr
            </a>
            .
          </p>
          <Link href="/" className="btn-maison-primary !w-auto inline-flex px-8">
            Accueil
          </Link>
        </div>
      </div>
    );
  }

  const paid = order.status === 'paid';

  return (
    <div className="min-h-screen bg-maison-creme">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-maison-brun mb-6">
          <CheckCircle2 className="size-10" aria-hidden />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-maison-cacao">
          {paid ? 'Merci pour votre commande !' : 'Paiement en traitement'}
        </h1>
        {!paid && (
          <p className="mt-3 text-sm text-maison-cacao/70 max-w-md mx-auto">
            La banque ou SumUp peuvent encore finaliser l&apos;autorisation. Réessayez dans quelques secondes ou
            vérifiez vos emails.
          </p>
        )}
        <p className="mt-3 text-maison-cacao/75">
          Référence : <strong>{order.id}</strong>
        </p>
        {paid && order.purchaseOrderNumber && (
          <p className="mt-2 text-sm text-maison-cacao/70">
            Bon de commande <strong>{order.purchaseOrderNumber}</strong>
            {order.deliveryNoteNumber ? (
              <>
                {' '}
                · Bon de livraison <strong>{order.deliveryNoteNumber}</strong>
              </>
            ) : null}
          </p>
        )}
        <p className="mt-4 text-sm text-maison-cacao/60">
          Conservez la référence ci‑dessus. Pour toute question :{' '}
          <a href="mailto:contact@taskmout.fr" className="text-maison-brun underline">
            contact@taskmout.fr
          </a>
          .
        </p>
        <Link href="/articles" className="btn-maison-primary !w-auto mt-10 inline-flex px-8">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

export default function CommandeMerciPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-maison-creme">
          <div className="max-w-xl mx-auto px-4 py-16 text-center text-maison-cacao/60">Chargement…</div>
        </div>
      }
    >
      <MerciInner />
    </Suspense>
  );
}
