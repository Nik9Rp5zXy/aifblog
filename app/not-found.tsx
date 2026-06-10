import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
           <h1 className="text-[30vw] font-space font-bold text-[var(--color-brand-cyan)] select-none">
             404
           </h1>
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <h2 className="text-4xl md:text-5xl font-space font-extrabold text-white mb-6">
            Sinyal Kayboldu
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-10">
            Aradığınız sayfa derin uzayda kaybolmuş veya hiç var olmamış olabilir. Lütfen güvenli rotaya geri dönün.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[var(--color-brand-amber)] hover:bg-[#ff854d] text-black font-bold px-8 py-4 rounded-sm transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}
