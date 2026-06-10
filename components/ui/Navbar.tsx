"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User } from "lucide-react";
import clsx from "clsx";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Blog", href: "/kategori/tumu" },
    { name: "Hakkımda", href: "/hakkimda" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-4 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-sm shadow-2xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[var(--color-brand-cyan)] group-hover:bg-[var(--color-brand-amber)] transition-colors" />
          <span className="font-space font-bold text-xl tracking-tight text-white group-hover:text-[var(--color-brand-cyan)] transition-colors">
            AIF
          </span>
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  isActive 
                    ? "text-[var(--color-brand-cyan)]" 
                    : "text-[var(--color-text-secondary)] hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-cyan)] transition-colors" aria-label="Ara">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="w-px h-5 bg-[var(--color-border-subtle)] hidden md:block" />
          
          <Link 
            href="/login"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-[var(--color-bg-primary)] bg-white px-4 py-2 rounded-sm hover:bg-[var(--color-brand-cyan)] transition-colors"
          >
            <User className="w-4 h-4" />
            Giriş
          </Link>
        </div>
        
      </nav>
    </header>
  );
}
