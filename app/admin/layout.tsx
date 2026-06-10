"use client";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, LogOut, Loader2 } from "lucide-react";
import clsx from "clsx";

function AdminSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex h-screen w-64 items-center justify-center bg-neutral-950 border-r border-neutral-800">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Yazılar", href: "/admin/posts", icon: FileText },
    { name: "Projeler", href: "/admin/projects", icon: Briefcase },
  ];

  return (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tighter text-white">AIFBlog Admin</h2>
        <p className="text-sm text-neutral-500 mt-1">{session?.user?.email}</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-neutral-800 text-white" 
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-red-400 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans">
        {!isLoginPage && <AdminSidebar />}
        <main className="flex-1 overflow-y-auto h-screen">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
