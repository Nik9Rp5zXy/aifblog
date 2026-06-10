import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";

const prisma = new PrismaClient();

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Projeler & Portfolyo</h1>
          <p className="text-neutral-500 mt-1">Vitrin projelerinizi yönetin.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Proje
        </Link>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/50">
              <th className="p-4 text-sm font-medium text-neutral-400">Proje Adı</th>
              <th className="p-4 text-sm font-medium text-neutral-400">Durum</th>
              <th className="p-4 text-sm font-medium text-neutral-400">Tarih</th>
              <th className="p-4 text-sm font-medium text-neutral-400 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-neutral-900/30 transition-colors group">
                <td className="p-4">
                  <div className="font-medium text-white">{project.title}</div>
                  <div className="text-xs text-neutral-500 mt-1">/{project.slug}</div>
                </td>
                <td className="p-4">
                  {project.is_published ? (
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Yayında
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span> Taslak
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-neutral-400">
                  {new Date(project.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/admin/projects/${project.id}`}
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={project.id} type="projects" />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500">
                  Henüz proje bulunmuyor. Yeni bir proje ekleyerek başlayın.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
