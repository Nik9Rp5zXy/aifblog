"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });

      gsap.from(subRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.4
      });

      // Parallax Scroll
      gsap.to(containerRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 -z-10" />
      
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <h1 
          ref={textRef}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-6"
        >
          Yapay Zeka ile<br />Geleceği Kodluyoruz.
        </h1>
        
        <p 
          ref={subRef}
          className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mb-12"
        >
          Yapay zeka teknolojileri, derinlemesine analizler ve sınırları zorlayan projeler.
        </p>

        <MagneticButton>
          <a href="#portfolio" className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-neutral-200 transition-colors">
            Projeleri Keşfet
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
