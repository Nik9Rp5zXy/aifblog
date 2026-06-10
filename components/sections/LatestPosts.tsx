import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function LatestPosts() {
  const posts = await prisma.post.findMany({
    where: { is_published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      meta_description: true,
      createdAt: true,
    },
  });

  if (posts.length === 0) return null;

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto border-t border-neutral-900 mt-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-white">Son Yazılar</h2>
        <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium border border-neutral-800 px-4 py-2 rounded-full hover:border-neutral-700">
          Tümünü Gör →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.id} 
            className="group flex flex-col bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <time className="text-xs font-mono text-neutral-500 mb-4 block uppercase tracking-wider">
              {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
              {post.meta_description || "Bu makale için bir özet bulunmuyor..."}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
