import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { Order } from '@/types/store';
import { formatPriceFrEUR, parsePriceFr } from '@/lib/price';

type CompanyInfo = {
  name: string;
  address: string;
  siret?: string;
  vat?: string;
  email?: string;
  phone?: string;
};

function getCompanyInfo(): CompanyInfo {
  return {
    name: process.env.COMPANY_NAME?.trim() || 'Taskmout',
    address:
      process.env.COMPANY_ADDRESS?.trim() ||
      "12 rue de l'Argan, 51100 Reims, France",
    siret: process.env.COMPANY_SIRET?.trim() || undefined,
    vat: process.env.COMPANY_VAT?.trim() || undefined,
    email: process.env.COMPANY_EMAIL?.trim() || undefined,
    phone: process.env.COMPANY_PHONE?.trim() || undefined,
  };
}

/** Stripe pdf-lib character set is WinAnsi : convertit caractères « hors plage » en équivalents ASCII. */
function safeText(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u00A0/g, ' ')
    .replace(/\u20AC/g, 'EUR ')
    .replace(/[^\x20-\x7E\n]/g, '');
}

type DrawState = {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  y: number;
  margin: number;
  pageWidth: number;
  pageHeight: number;
};

function newPage(doc: PDFDocument, font: PDFFont, fontBold: PDFFont): DrawState {
  const page = doc.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page.getSize();
  return {
    page,
    font,
    fontBold,
    y: height - 50,
    margin: 50,
    pageWidth: width,
    pageHeight: height,
  };
}

function drawText(
  state: DrawState,
  text: string,
  options: {
    bold?: boolean;
    size?: number;
    x?: number;
    color?: { r: number; g: number; b: number };
  } = {}
): void {
  const size = options.size ?? 10;
  const font = options.bold ? state.fontBold : state.font;
  const color = options.color
    ? rgb(options.color.r, options.color.g, options.color.b)
    : rgb(0.1, 0.1, 0.1);
  state.page.drawText(safeText(text), {
    x: options.x ?? state.margin,
    y: state.y,
    size,
    font,
    color,
  });
}

function moveDown(state: DrawState, amount = 14): void {
  state.y -= amount;
}

function drawLine(state: DrawState): void {
  state.page.drawLine({
    start: { x: state.margin, y: state.y },
    end: { x: state.pageWidth - state.margin, y: state.y },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });
}

function drawHeader(state: DrawState, title: string, reference: string, company: CompanyInfo): void {
  drawText(state, company.name.toUpperCase(), { bold: true, size: 18 });
  moveDown(state, 20);
  for (const line of company.address.split(',')) {
    drawText(state, line.trim(), { size: 9, color: { r: 0.35, g: 0.35, b: 0.35 } });
    moveDown(state, 11);
  }
  const meta: string[] = [];
  if (company.siret) meta.push(`SIRET : ${company.siret}`);
  if (company.vat) meta.push(`TVA : ${company.vat}`);
  if (meta.length > 0) {
    drawText(state, meta.join('  -  '), { size: 9, color: { r: 0.35, g: 0.35, b: 0.35 } });
    moveDown(state, 11);
  }
  const contact: string[] = [];
  if (company.email) contact.push(company.email);
  if (company.phone) contact.push(company.phone);
  if (contact.length > 0) {
    drawText(state, contact.join('  -  '), { size: 9, color: { r: 0.35, g: 0.35, b: 0.35 } });
    moveDown(state, 11);
  }

  moveDown(state, 14);
  drawText(state, title, { bold: true, size: 20, color: { r: 0.4, g: 0.25, b: 0.05 } });
  moveDown(state, 22);
  drawText(state, `Référence : ${reference}`, { size: 10 });
  moveDown(state, 24);
  drawLine(state);
  moveDown(state, 18);
}

function drawCustomer(state: DrawState, order: Order, sectionLabel: string): void {
  drawText(state, sectionLabel, { bold: true, size: 11 });
  moveDown(state, 14);
  drawText(state, order.name, { size: 10 });
  moveDown(state, 12);
  for (const line of order.address.split('\n')) {
    if (!line.trim()) continue;
    drawText(state, line.trim(), { size: 10 });
    moveDown(state, 12);
  }
  drawText(state, order.email, { size: 10, color: { r: 0.35, g: 0.35, b: 0.35 } });
  moveDown(state, 20);
}

function drawItemsTable(
  state: DrawState,
  items: Order['items'],
  options: { withPrices: boolean }
): void {
  const cols = options.withPrices
    ? [
        { label: 'Désignation', x: state.margin, w: 260 },
        { label: 'Qté', x: state.margin + 270, w: 40 },
        { label: 'PU TTC', x: state.margin + 320, w: 80 },
        { label: 'Total TTC', x: state.margin + 405, w: 90 },
      ]
    : [
        { label: 'Désignation', x: state.margin, w: 360 },
        { label: 'Qté', x: state.margin + 380, w: 40 },
      ];

  state.page.drawRectangle({
    x: state.margin - 4,
    y: state.y - 4,
    width: state.pageWidth - 2 * state.margin + 8,
    height: 18,
    color: rgb(0.95, 0.93, 0.88),
  });
  for (const c of cols) {
    state.page.drawText(safeText(c.label), {
      x: c.x,
      y: state.y,
      size: 10,
      font: state.fontBold,
      color: rgb(0.2, 0.15, 0.05),
    });
  }
  moveDown(state, 22);

  let total = 0;
  for (const item of items) {
    if (state.y < 80) {
      // Pagination basique : on s'arrête si plus de place. Pour un MVP de bons,
      // une seule page suffit (limité par le panier moyen) ; à étendre si besoin.
      break;
    }
    const unit = parsePriceFr(item.price);
    const lineTotal = unit * item.quantity;
    total += lineTotal;

    state.page.drawText(safeText(item.productName), {
      x: cols[0].x,
      y: state.y,
      size: 10,
      font: state.font,
      color: rgb(0.1, 0.1, 0.1),
      maxWidth: cols[0].w,
    });
    state.page.drawText(String(item.quantity), {
      x: cols[1].x,
      y: state.y,
      size: 10,
      font: state.font,
      color: rgb(0.1, 0.1, 0.1),
    });
    if (options.withPrices && cols[2] && cols[3]) {
      state.page.drawText(safeText(`${formatPriceFrEUR(unit)} EUR`), {
        x: cols[2].x,
        y: state.y,
        size: 10,
        font: state.font,
        color: rgb(0.1, 0.1, 0.1),
      });
      state.page.drawText(safeText(`${formatPriceFrEUR(lineTotal)} EUR`), {
        x: cols[3].x,
        y: state.y,
        size: 10,
        font: state.font,
        color: rgb(0.1, 0.1, 0.1),
      });
    }
    moveDown(state, 18);
  }

  moveDown(state, 6);
  drawLine(state);
  moveDown(state, 18);

  if (options.withPrices) {
    drawText(state, 'Total TTC', {
      bold: true,
      size: 12,
      x: state.margin + 320,
    });
    state.page.drawText(safeText(`${formatPriceFrEUR(total)} EUR`), {
      x: state.margin + 405,
      y: state.y,
      size: 12,
      font: state.fontBold,
      color: rgb(0.4, 0.25, 0.05),
    });
    moveDown(state, 18);
  }
}

function drawFooter(state: DrawState, lines: string[]): void {
  let y = 60;
  for (const line of lines) {
    state.page.drawText(safeText(line), {
      x: state.margin,
      y,
      size: 9,
      font: state.font,
      color: rgb(0.4, 0.4, 0.4),
    });
    y -= 12;
  }
}

/** Génère le bon de commande (PDF, A4) — destiné au client (récap avec prix). */
export async function buildPurchaseOrderPdf(order: Order, reference: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const state = newPage(doc, font, fontBold);
  const company = getCompanyInfo();

  drawHeader(state, 'BON DE COMMANDE', reference, company);

  drawText(state, `Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`, { size: 10 });
  moveDown(state, 14);
  drawText(state, `Commande n° ${order.id}`, { size: 10, color: { r: 0.4, g: 0.4, b: 0.4 } });
  moveDown(state, 22);

  drawCustomer(state, order, 'Facturé à');

  drawItemsTable(state, order.items, { withPrices: true });

  if (order.note?.trim()) {
    moveDown(state, 10);
    drawText(state, 'Note :', { bold: true, size: 10 });
    moveDown(state, 12);
    for (const line of order.note.split('\n')) {
      drawText(state, line, { size: 10 });
      moveDown(state, 12);
    }
  }

  drawFooter(state, [
    `Paiement : Stripe Checkout - règlement validé (${order.total} EUR TTC)`,
    `${company.name} - document généré automatiquement, ne nécessite pas de signature.`,
  ]);

  return doc.save();
}

/** Génère le bon de livraison (PDF, A4) — destiné au transporteur (sans prix). */
export async function buildDeliveryNotePdf(order: Order, reference: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const state = newPage(doc, font, fontBold);
  const company = getCompanyInfo();

  drawHeader(state, 'BON DE LIVRAISON', reference, company);

  drawText(state, `Date d'édition : ${new Date().toLocaleDateString('fr-FR')}`, { size: 10 });
  moveDown(state, 14);
  drawText(state, `Commande associée : ${order.id}`, { size: 10, color: { r: 0.4, g: 0.4, b: 0.4 } });
  moveDown(state, 6);
  if (order.purchaseOrderNumber) {
    drawText(state, `Bon de commande : ${order.purchaseOrderNumber}`, {
      size: 10,
      color: { r: 0.4, g: 0.4, b: 0.4 },
    });
    moveDown(state, 16);
  } else {
    moveDown(state, 16);
  }

  drawCustomer(state, order, 'Livrer à');

  drawItemsTable(state, order.items, { withPrices: false });

  if (order.note?.trim()) {
    moveDown(state, 10);
    drawText(state, 'Instructions de livraison :', { bold: true, size: 10 });
    moveDown(state, 12);
    for (const line of order.note.split('\n')) {
      drawText(state, line, { size: 10 });
      moveDown(state, 12);
    }
  }

  drawFooter(state, [
    'Signature du destinataire : ____________________________',
    `${company.name} - merci de présenter ce document au moment de la livraison.`,
  ]);

  return doc.save();
}
