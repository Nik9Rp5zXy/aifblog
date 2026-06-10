import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Arkaplan parlaması */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-900/40 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-sm font-mono tracking-widest uppercase">
            Hata 404
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-6">
          Kayıp.
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
          Aradığınız sayfa uzayın derinliklerinde kaybolmuş olabilir veya URL'yi yanlış yazmış olabilirsiniz.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}
