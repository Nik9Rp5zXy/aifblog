import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import clsx from "clsx";

interface BentoCardProps {
  post: {
    slug: string;
    title: string;
    cover_image?: string | null;
    createdAt: Date;
    reading_time?: number | null;
    category?: { name: string } | null;
  };
  featured?: boolean;
}

export function BentoCard({ post, featured = false }: BentoCardProps) {
  return (
    <Link 
      href={`/post/${post.slug}`}
      className={clsx(
        "group solid-card flex flex-col relative overflow-hidden",
        featured ? "md:col-span-2 md:row-span-2 min-h-[400px]" : "col-span-1 min-h-[300px]"
      )}
    >
      {/* Background Image Wrapper */}
      {post.cover_image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={post.cover_image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          {post.category && (
            <span className="inline-block px-3 py-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-[var(--color-brand-cyan)] text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm">
              {post.category.name}
            </span>
          )}
          
          <div className="w-8 h-8 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-[var(--color-brand-cyan)]" />
          </div>
        </div>

        {/* Bottom Details */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-text-secondary)] mb-3">
            <time dateTime={post.createdAt.toISOString()}>
              {new Date(post.createdAt).toLocaleDateString("tr-TR", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            <div className="w-1 h-1 rounded-full bg-[var(--color-border-subtle)]" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {post.reading_time || 5} dk okuma
            </span>
          </div>
          
          <h3 className={clsx(
            "text-white group-hover:text-[var(--color-brand-cyan)] transition-colors leading-tight",
            featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
          )}>
            {post.title}
          </h3>
        </div>

      </div>
    </Link>
  );
}
