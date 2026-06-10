import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BentoCard } from "@/components/ui/BentoCard";
import { Clock, Calendar, User } from "lucide-react";

const prisma = new PrismaClient();
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, is_published: true },
  });
  if (!post) return { title: "Yazı Bulunamadı | AIF Blog" };
  return {
    title: `${post.title} | AIF Blog`,
    description: post.meta_description || post.content.substring(0, 160),
  };
}

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug, is_published: true },
    include: { category: true },
  });

  if (!post) {
    notFound();
  }

  // Fetch 3 related or latest posts
  const morePosts = await prisma.post.findMany({
    where: { 
      is_published: true,
      id: { not: post.id }
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return (
    <>
      <Navbar />
      
      <main className="w-full bg-[var(--color-bg-primary)]">
        
        {/* Full width cover image area */}
        <header className="relative w-full h-[60vh] md:h-[80vh] flex items-end pb-12 md:pb-24 pt-32 px-6">
          {post.cover_image && (
            <div className="absolute inset-0 z-0">
              <img 
                src={post.cover_image} 
                alt={post.title}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/50 to-transparent" />
            </div>
          )}

          <div className="relative z-10 w-full max-w-4xl mx-auto">
            {post.category && (
              <span className="inline-block px-3 py-1 mb-6 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-[var(--color-brand-cyan)] text-sm font-bold uppercase tracking-wider rounded-sm">
                {post.category.name}
              </span>
            )}
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-space font-extrabold text-white leading-[1.1] tracking-tighter mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[var(--color-text-secondary)] text-sm font-medium">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>AIFBlog Editör</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.createdAt.toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", { month: "long", day: "numeric", year: "numeric" })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.reading_time || 5} dk okuma</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="w-full max-w-[720px] mx-auto px-6 py-12 md:py-20 text-[var(--color-text-primary)] text-lg leading-relaxed prose prose-invert prose-p:text-[#d4d4d4] prose-headings:font-space prose-headings:text-white prose-a:text-[var(--color-brand-cyan)] prose-a:no-underline hover:prose-a:underline prose-code:text-[var(--color-brand-amber)] prose-code:bg-[var(--color-bg-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-[var(--color-border-subtle)]">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* More Posts */}
        {morePosts.length > 0 && (
          <section className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-[var(--color-border-subtle)]">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-space font-bold text-white tracking-tight">Diğer Yazılar</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {morePosts.map(p => (
                <BentoCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}
