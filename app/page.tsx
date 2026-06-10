import { HeroParallax } from "@/components/sections/HeroParallax";
import { BentoPortfolio } from "@/components/sections/BentoPortfolio";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Revalidate every hour for ISR (Incremental Static Regeneration)
export const revalidate = 3600;

export default async function Home() {
  // Fetch published projects from Prisma DB
  const projects = await prisma.project.findMany({
    where: { is_published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
    },
  });

  return (
    <main className="min-h-screen bg-neutral-950">
      <HeroParallax />
      <BentoPortfolio projects={projects} />
      <LatestPosts />
      
      {/* Basic Interactive Timeline Placeholder for CV */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-neutral-900 mt-24">
        <h2 className="text-4xl font-bold tracking-tight text-white mb-12 text-center">Geliştirme & Araştırma</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-700 bg-neutral-950 text-neutral-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 bg-neutral-400 rounded-full" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
              <time className="text-sm font-medium text-neutral-500 mb-2 block">2026 - Günümüz</time>
              <h3 className="text-xl font-bold text-white mb-1">AIFBlog Kurucusu & AI Araştırmacısı</h3>
              <p className="text-neutral-400 text-sm">Yapay zeka modelleri eğitiliyor ve vizyoner içerikler üretiliyor.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
