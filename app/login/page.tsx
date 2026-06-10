"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Hatalı e-posta veya şifre.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[var(--color-brand-cyan)]/10 rounded-sm flex items-center justify-center mx-auto mb-4 border border-[var(--color-brand-cyan)]/20">
            <Lock className="w-6 h-6 text-[var(--color-brand-cyan)]" />
          </div>
          <h1 className="text-3xl font-space font-bold text-white tracking-tight">Giriş Yap</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">Sisteme erişmek için bilgilerinizi girin.</p>
        </div>

        <form onSubmit={handleSubmit} className="solid-card p-8">
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">E-posta</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@aifblog.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Şifre</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-brand-cyan)] hover:bg-[#00d0e0] text-black font-bold py-3 px-4 rounded-sm transition-colors mt-4 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Giriş Yap
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
