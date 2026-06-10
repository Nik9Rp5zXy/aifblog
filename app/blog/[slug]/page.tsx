import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, is_published: true },
  });

  if (!post) return { title: "Yazı Bulunamadı" };

  return {
    title: `${post.title} | m4u.pro`,
    description: post.meta_description || post.title,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, is_published: true },
  });

  if (!post || !post.is_published) {
    notFound();
  }

  // Calculate estimated reading time
  const wordCount = post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <ReadingProgress />
      <article className="min-h-screen bg-neutral-950 py-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-neutral-500 font-medium">
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </time>
              <span>•</span>
              <span>{readingTime} dk okuma süresi</span>
            </div>
          </header>

          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-blue-400 hover:prose-a:text-blue-300
              prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
