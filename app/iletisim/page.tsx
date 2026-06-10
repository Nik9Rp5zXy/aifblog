"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      <main className="w-full min-h-screen bg-[var(--color-bg-primary)] pt-32 px-6">
        <section className="max-w-xl mx-auto py-12">
          
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-space font-extrabold text-white tracking-tighter mb-4">
              İletişim
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Bir proje fikriniz mi var veya sadece merhaba mı demek istiyorsunuz? Bana ulaşın.
            </p>
          </header>

          {success ? (
            <div className="solid-card p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[var(--color-brand-cyan)]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-[var(--color-brand-cyan)]" />
              </div>
              <h3 className="text-2xl font-space font-bold text-white mb-2">Mesaj Gönderildi</h3>
              <p className="text-[var(--color-text-secondary)]">
                En kısa sürede size dönüş yapacağım.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="solid-card p-6 md:p-10 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-primary)]">İsim</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-primary)]">E-posta</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-text-primary)]">Mesaj</label>
                <textarea 
                  id="message"
                  required
                  rows={5}
                  placeholder="Harika bir fikrim var..."
                  className="input-field resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-amber)] hover:bg-[#ff854d] text-black font-bold py-4 px-6 rounded-sm transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Gönderiliyor..." : (
                  <>
                    <Send className="w-5 h-5" />
                    Gönder
                  </>
                )}
              </button>

            </form>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}
