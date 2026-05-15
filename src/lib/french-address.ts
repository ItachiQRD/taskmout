/** Types et utilitaires — Base Adresse Nationale (data.gouv.fr) */

export type FrenchAddressSuggestion = {
  id: string;
  label: string;
  street: string;
  postcode: string;
  city: string;
  context: string;
};

export type FrenchAddressValue = {
  label: string;
  street: string;
  postcode: string;
  city: string;
  /** Adresse formatée pour la commande (multiligne) */
  formatted: string;
  validated: boolean;
};

type BanFeature = {
  properties: {
    id: string;
    label: string;
    name: string;
    postcode: string;
    city: string;
    context: string;
    type: string;
  };
};

type BanResponse = {
  features: BanFeature[];
};

const BAN_SEARCH = 'https://api-adresse.data.gouv.fr/search/';

/** Recherche d'adresses en France (API officielle, gratuite). */
export async function searchFrenchAddresses(
  query: string,
  limit = 6,
): Promise<FrenchAddressSuggestion[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const params = new URLSearchParams({
    q,
    limit: String(limit),
    autocomplete: '1',
  });

  const res = await fetch(`${BAN_SEARCH}?${params}`);
  if (!res.ok) return [];

  const data = (await res.json()) as BanResponse;
  return (data.features ?? []).map((f) => ({
    id: f.properties.id,
    label: f.properties.label,
    street: f.properties.name,
    postcode: f.properties.postcode,
    city: f.properties.city,
    context: f.properties.context,
  }));
}

export function formatFrenchAddress(street: string, postcode: string, city: string): string {
  return `${street.trim()}\n${postcode.trim()} ${city.trim()}`;
}

export function suggestionToValue(s: FrenchAddressSuggestion): FrenchAddressValue {
  return {
    label: s.label,
    street: s.street,
    postcode: s.postcode,
    city: s.city,
    formatted: formatFrenchAddress(s.street, s.postcode, s.city),
    validated: true,
  };
}

/** Code postal français métropole + DOM */
const POSTCODE_RE = /^(?:0[1-9]|[1-8]\d|9[0-5]|97[1-6]|98[4-9])\d{3}$/;

export function isValidFrenchPostcode(postcode: string): boolean {
  return POSTCODE_RE.test(postcode.replace(/\s/g, ''));
}

/** Vérifie qu'une adresse semble complète (rue + CP + ville). */
export function validateFrenchAddressManual(text: string): {
  valid: boolean;
  error?: string;
} {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return { valid: false, error: 'Indiquez la rue sur une ligne, puis le code postal et la ville.' };
  }

  const lastLine = lines[lines.length - 1];
  const match = lastLine.match(/^(\d{5})\s+(.+)$/);
  if (!match) {
    return {
      valid: false,
      error: 'Dernière ligne : code postal (5 chiffres) puis la ville, ex. « 75001 Paris ».',
    };
  }

  const [, postcode, city] = match;
  if (!isValidFrenchPostcode(postcode)) {
    return { valid: false, error: 'Code postal français invalide.' };
  }
  if (city.length < 2) {
    return { valid: false, error: 'Nom de ville trop court.' };
  }

  const street = lines.slice(0, -1).join(', ');
  if (street.length < 5) {
    return { valid: false, error: 'Adresse postale incomplète (numéro et nom de rue).' };
  }

  return { valid: true };
}

export function manualTextToValue(text: string): FrenchAddressValue | null {
  const check = validateFrenchAddressManual(text);
  if (!check.valid) return null;

  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const lastLine = lines[lines.length - 1];
  const match = lastLine.match(/^(\d{5})\s+(.+)$/)!;
  const postcode = match[1];
  const city = match[2];
  const street = lines.slice(0, -1).join(', ');

  return {
    label: `${street}, ${postcode} ${city}`,
    street,
    postcode,
    city,
    formatted: formatFrenchAddress(street, postcode, city),
    validated: false,
  };
}
