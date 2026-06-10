import { PrismaClient } from "@prisma/client";
import { FileText, ImageIcon, Tags } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const postCount = await prisma.post.count();
  const mediaCount = await prisma.media.count();
  const categoryCount = await prisma.category.count();

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-space font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="solid-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-[var(--color-brand-cyan)]/10 border border-[var(--color-brand-cyan)]/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[var(--color-brand-cyan)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Toplam Yazı</p>
            <p className="text-3xl font-bold text-white">{postCount}</p>
          </div>
        </div>

        <div className="solid-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-[var(--color-brand-amber)]/10 border border-[var(--color-brand-amber)]/20 flex items-center justify-center">
            <Tags className="w-6 h-6 text-[var(--color-brand-amber)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Kategoriler</p>
            <p className="text-3xl font-bold text-white">{categoryCount}</p>
          </div>
        </div>

        <div className="solid-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Medya Dosyası</p>
            <p className="text-3xl font-bold text-white">{mediaCount}</p>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="solid-card overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
          <h2 className="text-xl font-space font-bold text-white">Son Eklenen Yazılar</h2>
          <Link href="/admin/yazilar" className="text-sm text-[var(--color-brand-cyan)] hover:underline">
            Tümünü Gör
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-primary)]/50 border-b border-[var(--color-border-subtle)]">
                <th className="p-4 text-xs font-medium text-[var(--color-text-secondary)] uppercase">Başlık</th>
                <th className="p-4 text-xs font-medium text-[var(--color-text-secondary)] uppercase">Kategori</th>
                <th className="p-4 text-xs font-medium text-[var(--color-text-secondary)] uppercase">Durum</th>
                <th className="p-4 text-xs font-medium text-[var(--color-text-secondary)] uppercase text-right">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {recentPosts.map(post => (
                <tr key={post.id} className="hover:bg-[var(--color-bg-hover)] transition-colors">
                  <td className="p-4">
                    <Link href={`/admin/yeni-yazi?id=${post.id}`} className="font-medium text-white hover:text-[var(--color-brand-cyan)] transition-colors line-clamp-1">
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-[var(--color-text-primary)]">
                    {post.category?.name || "-"}
                  </td>
                  <td className="p-4">
                    {post.is_published ? (
                      <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-sm">Yayında</span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-medium bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] rounded-sm">Taslak</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-[var(--color-text-secondary)] text-right">
                    {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-[var(--color-text-secondary)]">
            Henüz hiç yazı eklenmemiş.
          </div>
        )}
      </div>

    </div>
  );
}
