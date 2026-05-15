'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { FrenchAddressSuggestion, FrenchAddressValue } from '@/lib/french-address';
import { suggestionToValue, validateFrenchAddressManual } from '@/lib/french-address';

type FrenchAddressInputProps = {
  value: FrenchAddressValue | null;
  onChange: (value: FrenchAddressValue | null) => void;
  disabled?: boolean;
  required?: boolean;
};

export function FrenchAddressInput({ value, onChange, disabled, required }: FrenchAddressInputProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(value?.label ?? '');
  const [suggestions, setSuggestions] = useState<FrenchAddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value?.label) {
      setQuery(value.label);
    }
  }, [value?.label]);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/address/search?q=${encodeURIComponent(q.trim())}`);
      const data = (await res.json()) as { suggestions?: FrenchAddressSuggestion[] };
      setSuggestions(data.suggestions ?? []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open || value?.validated) return;
    const t = window.setTimeout(() => fetchSuggestions(query), 280);
    return () => window.clearTimeout(t);
  }, [query, open, fetchSuggestions, value?.validated]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selectSuggestion = (s: FrenchAddressSuggestion) => {
    const v = suggestionToValue(s);
    onChange(v);
    setQuery(s.label);
    setOpen(false);
    setSuggestions([]);
    setTouched(true);
  };

  const manualCheck = touched && !value?.validated ? validateFrenchAddressManual(query) : null;

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={`${listId}-input`} className="block text-sm font-medium text-maison-cacao mb-1.5">
        Adresse de livraison (France)
      </label>
      <p className="text-xs text-maison-cacao/55 mb-2">
        Commencez à taper votre adresse — nous proposons des adresses vérifiées en France.
      </p>

      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-maison-brun/50"
          aria-hidden
        />
        <input
          ref={inputRef}
          id={`${listId}-input`}
          type="text"
          autoComplete="off"
          required={required}
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${listId}-listbox`}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            const next = e.target.value;
            setQuery(next);
            onChange(null);
            setOpen(true);
            setHighlight(-1);
            setTouched(false);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open || !suggestions.length) return;
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlight((h) => (h + 1) % suggestions.length);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
            } else if (e.key === 'Enter' && highlight >= 0) {
              e.preventDefault();
              selectSuggestion(suggestions[highlight]);
            } else if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
          onBlur={() => {
            setTouched(true);
            window.setTimeout(() => setOpen(false), 150);
          }}
          placeholder="Ex. 12 rue de Rivoli, Paris"
          className={`w-full rounded-2xl border pl-11 pr-10 py-3 focus:border-maison-brun outline-none bg-white text-maison-cacao transition-colors ${
            value?.validated
              ? 'border-emerald-400/60 ring-1 ring-emerald-400/20'
              : 'border-maison-brun/15'
          }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="size-4 text-maison-brun/50 animate-spin" aria-hidden />
          ) : value?.validated ? (
            <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
          ) : null}
        </div>
      </div>

      {open && suggestions.length > 0 && !value?.validated && (
        <ul
          id={`${listId}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto rounded-2xl border border-maison-brun/15 bg-white shadow-maison py-1"
        >
          {suggestions.map((s, i) => (
            <li key={s.id} role="option" aria-selected={highlight === i}>
              <button
                type="button"
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  highlight === i ? 'bg-maison-sable/40 text-maison-brun' : 'text-maison-cacao hover:bg-maison-sable/30'
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(s)}
              >
                <span className="font-medium block">{s.label}</span>
                <span className="text-xs text-maison-cacao/55">{s.context}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {value?.validated && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
          <CheckCircle2 className="size-3.5 shrink-0" />
          Adresse vérifiée — {value.postcode} {value.city}
        </p>
      )}

      {touched && !value?.validated && manualCheck && !manualCheck.valid && query.length > 0 && (
        <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-800">
          <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
          {manualCheck.error ?? 'Sélectionnez une adresse dans la liste.'}
        </p>
      )}

      {!value?.validated && (
        <details className="mt-3 group">
          <summary className="text-xs text-maison-brun cursor-pointer hover:underline list-none flex items-center gap-1">
            <span className="group-open:hidden">Saisir l&apos;adresse manuellement</span>
            <span className="hidden group-open:inline">Masquer la saisie manuelle</span>
          </summary>
          <textarea
            rows={3}
            disabled={disabled}
            placeholder={'12 rue de Rivoli\n75001 Paris'}
            className="mt-2 w-full rounded-2xl border border-maison-brun/15 px-4 py-3 text-sm bg-white text-maison-cacao focus:border-maison-brun outline-none resize-y"
            onChange={(e) => {
              const text = e.target.value;
              setQuery(text);
              const check = validateFrenchAddressManual(text);
              if (check.valid) {
                const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
                const last = lines[lines.length - 1];
                const m = last.match(/^(\d{5})\s+(.+)$/)!;
                const street = lines.slice(0, -1).join(', ');
                onChange({
                  label: text.replace(/\n/g, ', '),
                  street,
                  postcode: m[1],
                  city: m[2],
                  formatted: `${street}\n${m[1]} ${m[2]}`,
                  validated: false,
                });
              } else {
                onChange(null);
              }
            }}
          />
        </details>
      )}
    </div>
  );
}
