import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-8 px-8 py-4 bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-full shadow-2xl">
        <Link href="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300">
          Ana Sayfa
        </Link>
        <Link href="/blog" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300">
          Blog
        </Link>
        <Link href="/admin" className="text-sm font-medium text-neutral-600 hover:text-neutral-300 transition-colors duration-300 ml-4 border-l border-neutral-800 pl-4">
          Admin
        </Link>
      </div>
    </nav>
  );
}
