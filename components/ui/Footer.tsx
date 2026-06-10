import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-space font-bold text-xl text-white">
            AIF<span className="text-[var(--color-brand-cyan)]">BLOG</span>
          </Link>
          <p className="text-[var(--color-text-secondary)] text-sm">
            &copy; {currentYear} AIF Blog. Geleceği kodluyoruz.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand-cyan)] transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-[var(--color-text-secondary)] hover:text-white transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-brand-amber)] transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
