import { PrismaClient } from "@prisma/client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BentoCard } from "@/components/ui/BentoCard";

const prisma = new PrismaClient();
export const revalidate = 3600;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { is_published: true },
    orderBy: { createdAt: "desc" },
    take: 7, // 1 featured + 6 normal
    include: { category: true },
  });

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <>
      <Navbar />
      
      <main className="w-full">
        {/* CSS Mesh Gradient Hero */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          
          {/* Animated Mesh Gradient Background (CSS only approach using radial gradients) */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_var(--color-brand-cyan)_0%,_transparent_70%)] blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_var(--color-brand-amber)_0%,_transparent_70%)] blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto mt-20">
            <h1 className="text-[clamp(4rem,10vw,8rem)] font-space font-extrabold leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e8e8e8] to-[#666666] mb-8">
              AIF BLOG
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-inter font-light tracking-wide">
              Yapay zeka, teknoloji ve geleceğin kesiştiği nokta.
            </p>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-space font-bold text-white uppercase tracking-tight">Son Yazılar</h2>
            <div className="h-px flex-1 bg-[var(--color-border-subtle)] ml-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
            {featuredPost && (
              <BentoCard post={featuredPost} featured={true} />
            )}
            
            {regularPosts.map((post) => (
              <BentoCard key={post.id} post={post} featured={false} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
