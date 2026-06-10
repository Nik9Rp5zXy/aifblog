import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// Revalidate her 1 saatte bir (veya yayina gore)
export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    where: { is_published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      meta_description: true,
      cover_image: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-neutral-950 pt-40 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-6 text-center tracking-tight">
          Düşünceler & <br className="md:hidden" /> Perspektifler
        </h1>
        <p className="text-neutral-400 text-center mb-20 text-lg md:text-xl max-w-2xl mx-auto">
          Teknoloji, tasarım ve dijital deneyimlerin kesişim noktasında yazdığım son makaleler ve notlar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id} 
              className="group flex flex-col bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
            >
              <div className="aspect-[16/10] w-full relative overflow-hidden bg-neutral-900">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-700 font-mono text-sm">
                    [Görsel Yok]
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <time className="text-xs font-mono text-neutral-500 mb-4 block uppercase tracking-wider">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {post.meta_description || "Bu makale için bir özet bulunmuyor..."}
                </p>
                
                <div className="mt-auto pt-8 flex items-center text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                  Yazıyı Oku 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <div className="col-span-full py-32 text-center border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20 backdrop-blur-sm">
              <p className="text-neutral-500 text-lg">Henüz hiç yazı yayımlanmamış.</p>
              <p className="text-neutral-600 text-sm mt-2">Admin panelinden yeni içerik ekleyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
