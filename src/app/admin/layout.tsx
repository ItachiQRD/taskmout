'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Layers,
  FolderTree,
  LogOut,
  Droplets,
} from 'lucide-react';

import { ADMIN_SESSION_KEY, getAdminPassword } from '@/lib/admin-client';

const nav = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { label: 'Commandes', href: '/admin/commandes', icon: ShoppingCart },
  { label: 'Produits', href: '/admin/produits', icon: Package },
  { label: 'Stocks', href: '/admin/stocks', icon: Layers },
  { label: 'Catégories', href: '/admin/categories', icon: FolderTree },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    const isLoginPage = pathname === '/admin/login';
    if (isLoginPage) {
      setAllowed(true);
      setChecking(false);
      return;
    }
    if (session === getAdminPassword()) {
      setAllowed(true);
    } else {
      router.replace('/admin/login');
    }
    setChecking(false);
  }, [pathname, router]);

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    router.push('/admin/login');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dune-100">
        <p className="text-ink/60">Chargement...</p>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-dune-50">
      <aside className="w-64 shrink-0 bg-ink text-cream flex flex-col">
        <Link href="/admin" className="flex items-center gap-2 p-6 font-display text-xl font-semibold border-b border-cream/10">
          <Droplets className="w-7 h-7 text-argan-300" />
          Admin Taskmout
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === href ? 'bg-argan-600 text-white' : 'text-cream/80 hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-cream/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/80 hover:bg-white/10 mb-2">
            Voir le site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/80 hover:bg-white/10 w-full text-left"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            Déconnexion
          </button>
        </div>
      </aside>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
