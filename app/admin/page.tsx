import { PrismaClient } from "@prisma/client";
import { FileText, Briefcase, TrendingUp } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const postsCount = await prisma.post.count();
  const projectsCount = await prisma.project.count();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Sitenizin genel durumu ve istatistikleri.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-neutral-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500">Toplam Yazı</p>
            <p className="text-3xl font-bold text-white mt-1">{postsCount}</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-neutral-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500">Toplam Proje</p>
            <p className="text-3xl font-bold text-white mt-1">{projectsCount}</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-neutral-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500">Ziyaretçi</p>
            <p className="text-3xl font-bold text-white mt-1">Google Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
