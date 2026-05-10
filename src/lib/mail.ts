import nodemailer from 'nodemailer';
import type { Order } from '@/types/store';
import { getSiteBaseUrl } from '@/lib/site-url';

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST?.trim() && process.env.MAIL_FROM?.trim());
}

function getTransporter(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      ...(user || pass ? { auth: { user: user ?? '', pass: pass ?? '' } } : {}),
    });
  }
  return transporter;
}

type SendOpts = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendTransactionalMail(opts: SendOpts): Promise<void> {
  const from = process.env.MAIL_FROM?.trim();
  if (!from) {
    console.warn('MAIL_FROM absent : e-mail client non envoyé.');
    return;
  }

  const t = getTransporter();
  if (!t) {
    console.warn('SMTP_HOST absent : e-mail client non envoyé.');
    return;
  }

  const replyTo = process.env.MAIL_REPLY_TO?.trim();

  await t.sendMail({
    from,
    to: opts.to,
    replyTo: replyTo || undefined,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

function orderLinesText(order: Order): string {
  return order.items
    .map((i) => `  - ${i.productName} × ${i.quantity} — ${i.price} € / unité`)
    .join('\n');
}

function orderLinesHtml(order: Order): string {
  const rows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(
          i.productName
        )}</td><td style="padding:8px;border-bottom:1px solid #eee">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${escapeHtml(
          i.price
        )} €</td></tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" style="border-collapse:collapse">${rows}</table>`;
}

/** Juste après création du checkout SumUp : lien pour payer. */
export async function sendCustomerPaymentLinkEmail(order: Order, paymentUrl: string): Promise<void> {
  if (!isMailConfigured()) return;

  const site = getSiteBaseUrl();
  const subject = `Taskmout — Finalisez votre commande (${order.total} € TTC)`;
  const text = `Bonjour ${order.name},

Merci pour votre commande sur Taskmout.

Référence commande : ${order.id}
Montant TTC : ${order.total} €

Payez en sécurité par SumUp en ouvrant ce lien (valide environ 30 minutes) :
${paymentUrl}

Après paiement, vous serez renvoyé vers notre site : ${site}/commande/merci?ref=${encodeURIComponent(order.id)}

Adresse de livraison indiquée :
${order.address}

Détail :
${orderLinesText(order)}
${order.note ? `\nNote : ${order.note}\n` : ''}
—
Taskmout
`;

  const html = `
<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a">
  <p>Bonjour ${escapeHtml(order.name)},</p>
  <p>Merci pour votre commande sur <strong>Taskmout</strong>.</p>
  <p><strong>Référence</strong> : ${escapeHtml(order.id)}<br/>
  <strong>Montant TTC</strong> : ${escapeHtml(order.total)} €</p>
  <p><a href="${escapeHtml(paymentUrl)}" style="display:inline-block;padding:12px 20px;background:#c97a1a;color:#fff;text-decoration:none;border-radius:10px;font-weight:600">Payer avec SumUp</a></p>
  <p style="font-size:14px;color:#555">Lien direct :<br/><a href="${escapeHtml(paymentUrl)}">${escapeHtml(paymentUrl)}</a></p>
  <p><strong>Livraison</strong><br/>${escapeHtml(order.address).replace(/\n/g, '<br/>')}</p>
  <h3 style="margin-top:24px">Détail</h3>
  ${orderLinesHtml(order)}
  ${order.note ? `<p><em>Note : ${escapeHtml(order.note)}</em></p>` : ''}
  <p style="margin-top:32px;font-size:14px;color:#666">— Taskmout</p>
</body></html>`;

  await sendTransactionalMail({ to: order.email, subject, text, html });
}

/** Après paiement SumUp confirmé : récap + références BC/BL. */
export async function sendCustomerPaidConfirmationEmail(order: Order): Promise<void> {
  if (!isMailConfigured()) return;

  const site = getSiteBaseUrl();
  const po = order.purchaseOrderNumber ?? '';
  const bl = order.deliveryNoteNumber ?? '';
  const subject = `Taskmout — Paiement reçu — commande ${order.id.slice(0, 8)}`;
  const text = `Bonjour ${order.name},

Nous avons bien reçu votre paiement SumUp. Merci !

Référence commande : ${order.id}
${po ? `Bon de commande : ${po}\n` : ''}${bl ? `Bon de livraison : ${bl}\n` : ''}
Montant TTC : ${order.total} €

Livraison prévue à l'adresse :
${order.address}

Détail :
${orderLinesText(order)}
${order.note ? `\nNote : ${order.note}\n` : ''}

Suivi : ${site}/commande/merci?ref=${encodeURIComponent(order.id)}

—
Taskmout
`;

  const html = `
<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a">
  <p>Bonjour ${escapeHtml(order.name)},</p>
  <p>Nous avons bien reçu votre <strong>paiement SumUp</strong>. Merci&nbsp;!</p>
  <p><strong>Référence commande</strong> : ${escapeHtml(order.id)}</p>
  ${po ? `<p><strong>Bon de commande</strong> : ${escapeHtml(po)}</p>` : ''}
  ${bl ? `<p><strong>Bon de livraison</strong> : ${escapeHtml(bl)}</p>` : ''}
  <p><strong>Montant TTC</strong> : ${escapeHtml(order.total)} €</p>
  <p><strong>Livraison</strong><br/>${escapeHtml(order.address).replace(/\n/g, '<br/>')}</p>
  <h3 style="margin-top:24px">Détail</h3>
  ${orderLinesHtml(order)}
  ${order.note ? `<p><em>Note : ${escapeHtml(order.note)}</em></p>` : ''}
  <p style="margin-top:24px"><a href="${escapeHtml(`${site}/commande/merci?ref=${encodeURIComponent(order.id)}`)}">Voir le récapitulatif sur le site</a></p>
  <p style="margin-top:32px;font-size:14px;color:#666">— Taskmout</p>
</body></html>`;

  await sendTransactionalMail({ to: order.email, subject, text, html });
}

/** Après mise à jour admin → expédiée. */
export async function sendCustomerShippedEmail(order: Order): Promise<void> {
  if (!isMailConfigured()) return;

  const site = getSiteBaseUrl();
  const reply = process.env.MAIL_REPLY_TO?.trim() ?? '';
  const subject = `Taskmout — Votre commande ${order.id.slice(0, 8)} est en route`;
  const text = `Bonjour ${order.name},

Bonne nouvelle : votre commande a été expédiée.

Référence : ${order.id}
Montant : ${order.total} € TTC

Livraison à l’adresse :
${order.address}

Merci encore pour votre confiance.
${reply ? `Une question ? Répondez à : ${reply}\n\n` : ''}— Taskmout
${site}
`;

  const html = `
<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a">
  <p>Bonjour ${escapeHtml(order.name)},</p>
  <p>Votre commande <strong>${escapeHtml(order.id)}</strong> a été <strong>expédiée</strong>.</p>
  <p><strong>Livraison</strong><br/>${escapeHtml(order.address).replace(/\n/g, '<br/>')}</p>
  <p>Montant : <strong>${escapeHtml(order.total)} €</strong> TTC</p>
  ${reply ? `<p style="margin-top:24px;font-size:14px;color:#444">Une question&nbsp;? <a href="mailto:${escapeHtml(reply)}">${escapeHtml(reply)}</a></p>` : ''}
  <p style="margin-top:32px;font-size:14px;color:#666"><a href="${escapeHtml(site)}">Taskmout</a></p>
</body></html>`;

  await sendTransactionalMail({ to: order.email, subject, text, html });
}
