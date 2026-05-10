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
  /** Moyen de paiement ; les commandes en ligne utilisent SumUp. */
  paymentMethod?: 'sumup';
  /** Identifiant checkout SumUp (session de paiement). */
  sumupCheckoutId?: string;
  /** Référence bon de commande générée après paiement validé. */
  purchaseOrderNumber?: string;
  /** Référence bon de livraison générée après paiement validé. */
  deliveryNoteNumber?: string;
  /** Horodatage de l’envoi automatique vers les systèmes / webhooks configurés. */
  fulfillmentDispatchedAt?: string;
  /** E-mail « lien de paiement SumUp » envoyé au client. */
  emailPaymentLinkSentAt?: string;
  /** E-mail de confirmation de paiement (BC/BL) envoyé au client. */
  emailPaidConfirmationSentAt?: string;
  /** E-mail « commande expédiée » après passage au statut expédié en admin. */
  emailShippedNoticeSentAt?: string;
};
