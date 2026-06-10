import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import DeletePostButton from "./DeletePostButton";

const prisma = new PrismaClient();

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-space font-bold text-white tracking-tight">Yazılar</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Tüm içeriklerinizi buradan yönetin.</p>
        </div>
        <Link 
          href="/admin/yeni-yazi" 
          className="flex items-center gap-2 bg-[var(--color-brand-cyan)] text-black px-5 py-2.5 rounded-sm font-bold hover:bg-[#00d0e0] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Yazı
        </Link>
      </div>

      <div className="solid-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]/50">
              <th className="p-4 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Başlık & Link</th>
              <th className="p-4 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Kategori</th>
              <th className="p-4 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Durum</th>
              <th className="p-4 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Tarih</th>
              <th className="p-4 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[var(--color-bg-hover)] transition-colors group">
                <td className="p-4">
                  <div className="font-bold text-white mb-1 group-hover:text-[var(--color-brand-cyan)] transition-colors">{post.title}</div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-mono">/post/{post.slug}</div>
                </td>
                <td className="p-4 text-sm text-[var(--color-text-primary)]">
                  {post.category?.name || "-"}
                </td>
                <td className="p-4">
                  {post.is_published ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Yayında
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">
                      Taslak
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-[var(--color-text-secondary)]">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/yeni-yazi?id=${post.id}`}
                      className="p-2 text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-primary)] rounded-sm border border-transparent hover:border-[var(--color-border-subtle)] transition-all"
                      title="Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-[var(--color-text-secondary)]">
                  Henüz yazı bulunmuyor. Sağ üstten "Yeni Yazı" butonuna tıklayarak başlayın.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
