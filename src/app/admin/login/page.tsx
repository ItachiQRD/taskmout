'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Lock, ShieldCheck, ArrowLeft, Loader2, Check } from 'lucide-react';

const ADMIN_SESSION_KEY = 'taskmout_admin';

function getAdminPassword(): string {
  if (typeof window === 'undefined') return '';
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'taskmout';
}

type Status = 'idle' | 'loading' | 'success';

export default function AdminLoginPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setError('');

    if (!password.trim()) {
      setError('Veuillez saisir votre mot de passe.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus('loading');
    await new Promise((r) => setTimeout(r, 500));

    if (password === getAdminPassword()) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, password);
      setStatus('success');
      setTimeout(() => router.push('/admin'), 700);
    } else {
      setStatus('idle');
      setError('Mot de passe incorrect. Réessayez.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-cream relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Halo dégradé en fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(214,139,42,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(140,160,60,0.12),_transparent_55%)]"
      />
      {/* Grid décorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      {/* Lien retour */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 text-sm text-cream/70 hover:text-argan-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au site
      </Link>

      <div
        className={`relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-[#141414]/90 backdrop-blur shadow-[0_40px_100px_-30px_rgba(214,139,42,0.25)] ${
          shake ? 'animate-[shake_0.45s_ease]' : ''
        }`}
      >
        {/* Panneau gauche — identité */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#1a1a1a] via-[#171717] to-[#0d0d0d]">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,139,42,0.22),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(140,160,60,0.18),transparent_55%)]"
          />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-argan-400/30 bg-white/5">
                <Image src="/logo.png" alt="Taskmout" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-oriental text-2xl text-cream">Taskmout</p>
                <p className="text-xs text-cream/60 tracking-widest uppercase">Espace réservé</p>
              </div>
            </div>

            <h1 className="mt-12 font-oriental text-4xl xl:text-5xl font-bold leading-tight bg-gradient-to-r from-argan-300 via-argan-400 to-olive-400 bg-clip-text text-transparent">
              Bienvenue,
              <br />
              gardien de l&apos;atelier.
            </h1>
            <p className="mt-6 text-cream/75 max-w-sm leading-relaxed">
              Connectez-vous pour gérer vos articles, vos catégories et vos commandes.
              Cette zone est réservée à l&apos;équipe Taskmout.
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-3 mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="w-5 h-5 text-argan-300" />
              <p className="mt-2 text-cream/90 text-sm font-medium">Accès sécurisé</p>
              <p className="text-cream/55 text-xs">Session locale, jamais transmise.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Lock className="w-5 h-5 text-argan-300" />
              <p className="mt-2 text-cream/90 text-sm font-medium">Confidentiel</p>
              <p className="text-cream/55 text-xs">Réservé aux administrateurs.</p>
            </div>
          </div>
        </div>

        {/* Panneau droite — formulaire */}
        <div className="relative p-6 sm:p-10 lg:p-12">
          {/* Mini brand mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-argan-400/30 bg-white/5">
              <Image src="/logo.png" alt="Taskmout" fill className="object-contain p-1" />
            </div>
            <div>
              <p className="font-oriental text-xl text-cream">Taskmout</p>
              <p className="text-[10px] text-cream/60 tracking-widest uppercase">Espace réservé</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-argan-400/25 bg-white/5 text-xs text-cream/85">
            <Lock className="w-3.5 h-3.5 text-argan-300" />
            Connexion administrateur
          </div>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-cream tracking-tight">
            Identifiez-vous
          </h2>
          <p className="mt-2 text-cream/65 text-sm">
            Saisissez votre mot de passe pour accéder au tableau de bord.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cream/90 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/45" />
                <input
                  ref={inputRef}
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full min-h-[52px] pl-11 pr-12 rounded-2xl border border-white/15 bg-black/30 text-cream placeholder-cream/40 focus:outline-none focus:border-argan-500 focus:ring-2 focus:ring-argan-500/25 transition-colors"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={status !== 'idle'}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full text-cream/70 hover:text-cream hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  tabIndex={-1}
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`relative w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-5 rounded-2xl font-medium text-white transition-all overflow-hidden ${
                status === 'idle'
                  ? 'bg-argan-500 hover:bg-argan-600 shadow-warm'
                  : status === 'loading'
                    ? 'bg-argan-500/80 cursor-wait'
                    : 'bg-emerald-500'
              }`}
            >
              {status === 'idle' && (
                <>
                  <Lock className="w-4 h-4" />
                  Se connecter
                </>
              )}
              {status === 'loading' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Vérification…
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="w-4 h-4" />
                  Connecté !
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-xs text-cream/45 text-center">
            Vous n&apos;êtes pas administrateur&nbsp;?{' '}
            <Link href="/" className="text-argan-300 hover:text-argan-200 underline decoration-dotted underline-offset-2">
              Revenir au site
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}
