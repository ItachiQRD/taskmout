export type SumupCheckoutCreateBody = {
  amount: number;
  checkout_reference: string;
  currency: string;
  description: string;
  merchant_code: string;
  redirect_url?: string;
  /** URL appelée par SumUp lors d’un changement de statut (webhook checkout). */
  return_url?: string;
  hosted_checkout: { enabled: true };
};

export type SumupCheckoutResponse = {
  id: string;
  status?: string;
  checkout_reference?: string;
  amount?: number;
  currency?: string;
  hosted_checkout_url?: string;
};

export type SumupWebhookPayload = {
  event_type?: string;
  id?: string;
};
