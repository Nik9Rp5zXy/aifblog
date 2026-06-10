import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "Hakkımda | AIF Blog",
  description: "AIF Blog kurucusu hakkında bilgiler ve vizyon.",
};

export default function AboutPage() {
  const skills = [
    "Yapay Zeka (AI) & Makine Öğrenimi",
    "Next.js & React Ekosistemi",
    "Modern Web Mimarlığı (Solid Dark)",
    "Performans Optimizasyonu",
    "UI/UX Araştırmaları"
  ];

  return (
    <>
      <Navbar />
      
      <main className="w-full min-h-screen bg-[var(--color-bg-primary)] pt-32 px-6">
        <article className="max-w-2xl mx-auto py-12">
          
          <header className="mb-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-sm border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] overflow-hidden relative group">
              {/* Profil Placeholder - Gerçekte DB'den veya Asset'ten gelir */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-cyan)] to-[var(--color-brand-amber)] opacity-20 group-hover:opacity-40 transition-opacity" />
              <img 
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=AIF" 
                alt="Profile"
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-screen"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-space font-extrabold text-white tracking-tighter mb-4">
              Kurucu & Araştırmacı
            </h1>
            <p className="text-[var(--color-brand-cyan)] font-medium">
              İstanbul, Türkiye
            </p>
          </header>

          <div className="prose prose-invert prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed max-w-none mb-16">
            <p>
              Merhaba, ben AIF Blog'un arkasındaki zihin. Teknolojinin, özellikle de yapay zekanın 
              insanlık tarihini nasıl şekillendirdiğini anlamaya ve anlatmaya tutkuyla bağlı bir geliştiriciyim.
            </p>
            <p>
              Bu platformu inşa ederken temel amacım; "noise" (gürültü) ile dolu dijital dünyada, 
              sadece saf bilgiye, net koda ve pürüzsüz bir performansa odaklanmaktı. 
              Glassmorphism veya göz yoran gereksiz renk cümbüşleri yerine, 
              içeriğin kendisini ön plana çıkaran "Solid Dark" brutalist bir mimariyi benimsedim.
            </p>
            <p>
              Geleceği sadece okumakla kalmıyoruz, aynı zamanda kodluyoruz.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-space font-bold text-white mb-6 flex items-center gap-4">
              Odak Alanları
              <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-sm rounded-sm hover:border-[var(--color-brand-cyan)] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

        </article>
      </main>

      <Footer />
    </>
  );
}
