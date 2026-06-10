"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    url: "",
    cover_image: "",
    is_published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch(`/api/admin/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Oluşturma başarısız oldu.");
      }
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-800">
            <ArrowLeft className="w-5 h-5 text-neutral-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Yeni Proje Ekle</h1>
            <p className="text-neutral-500 mt-1">Portfolyonuz için yeni bir vitrin projesi oluşturun.</p>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-70"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Kaydediliyor..." : "Projeyi Oluştur"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Proje Adı</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Kısa Açıklama (Bento Grid'de Görünür)</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors resize-none"
            />
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Detaylı İçerik (Opsiyonel)</label>
            <textarea 
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors font-mono text-sm resize-y"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Yayın Durumu</label>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                className="w-5 h-5 rounded border-neutral-800 bg-neutral-900 text-white focus:ring-0 focus:ring-offset-0"
              />
              <label htmlFor="is_published" className="text-white cursor-pointer select-none">
                Yayında (Herkese Açık)
              </label>
            </div>
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">URL (Slug)</label>
            <input 
              type="text" 
              required
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Dış Link (Canlı Site URL)</label>
            <input 
              type="url" 
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder="https://"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Kapak Görseli URL</label>
            <input 
              type="text" 
              value={formData.cover_image}
              onChange={(e) => setFormData({...formData, cover_image: e.target.value})}
              placeholder="https://... veya /uploads/..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
            {formData.cover_image && (
              <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900">
                <img src={formData.cover_image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
