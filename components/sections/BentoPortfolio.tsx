"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
};

export function BentoPortfolio({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(item, 
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" ref={containerRef} className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Seçili Projeler</h2>
        <p className="text-xl text-neutral-500">En son çalışmalarım ve dijital deneyimler.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4">
        {projects.map((project, i) => {
          // Dinamik bento grid boyutlandırması
          const isLarge = i % 4 === 0 || i % 4 === 3;
          
          return (
            <div
              key={project.id}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={clsx(
                "group relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 overflow-hidden hover:border-neutral-600 transition-colors cursor-pointer",
                isLarge ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/80 z-10" />
              
              {/* Vurgu / Glow Efekti (CSS tabanlı) */}
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

              <div className="relative z-30 h-full flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-neutral-400 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
