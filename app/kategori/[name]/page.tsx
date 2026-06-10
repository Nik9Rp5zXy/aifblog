import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BentoCard } from "@/components/ui/BentoCard";

const prisma = new PrismaClient();
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  return {
    title: `${decodedName} Yazıları | AIF Blog`,
    description: `${decodedName} kategorisindeki en güncel yapay zeka ve teknoloji yazıları.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // If "tumu" is passed, fetch all, otherwise filter by category slug or name
  let posts;
  if (decodedName.toLowerCase() === "tumu") {
    posts = await prisma.post.findMany({
      where: { is_published: true },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } else {
    // Try finding by category name
    const category = await prisma.category.findFirst({
      where: { name: { equals: decodedName } /* Note: Prisma SQLite case insensitive is tricky, assuming exact match for now */ }
    });
    
    if (!category) {
      // Also try fallback to search by slug
      const catBySlug = await prisma.category.findFirst({
        where: { slug: decodedName.toLowerCase() }
      });
      if (!catBySlug) {
        notFound();
      }
      
      posts = await prisma.post.findMany({
        where: { is_published: true, categoryId: catBySlug.id },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      });
    } else {
      posts = await prisma.post.findMany({
        where: { is_published: true, categoryId: category.id },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      });
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="w-full bg-[var(--color-bg-primary)] pt-32 min-h-screen">
        
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-space font-extrabold text-white tracking-tighter mb-4 capitalize">
              {decodedName === "tumu" ? "Tüm Yazılar" : decodedName}
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg">
              Bu kategoride toplam {posts.length} yazı bulunuyor.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {posts.map((post) => (
                <BentoCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="w-full py-24 flex flex-col items-center justify-center text-center bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-sm">
              <span className="text-4xl mb-4">🛸</span>
              <h3 className="text-xl font-space font-bold text-white mb-2">Henüz yazı yok</h3>
              <p className="text-[var(--color-text-secondary)]">Bu kategoriye henüz bir içerik eklenmemiş.</p>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </>
  );
}
