import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, PlusSquare, Image as ImageIcon, LogOut, LayoutDashboard } from "lucide-react";
import LogoutButton from "./components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-subtle)] flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-[var(--color-border-subtle)]">
          <Link href="/admin" className="font-space font-bold text-xl text-white tracking-tight">
            AIF<span className="text-[var(--color-brand-cyan)]">ADMIN</span>
          </Link>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 truncate">
            {session.user?.email}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-brand-cyan)] transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          <Link href="/admin/yazilar" className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-brand-cyan)] transition-colors">
            <FileText className="w-5 h-5" />
            <span>Yazılar</span>
          </Link>

          <Link href="/admin/yeni-yazi" className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-brand-cyan)] transition-colors">
            <PlusSquare className="w-5 h-5" />
            <span>Yeni Yazı</span>
          </Link>

          <Link href="/admin/medya" className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-brand-cyan)] transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span>Medya</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--color-border-subtle)]">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-8">
        {children}
      </main>

    </div>
  );
}
