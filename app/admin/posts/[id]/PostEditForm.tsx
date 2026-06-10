"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Post } from "@prisma/client";
import { ImageUpload } from "@/app/admin/components/ImageUpload";

export function PostEditForm({ post }: { post: Post }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    content: post.content,
    meta_description: post.meta_description || "",
    cover_image: post.cover_image || "",
    is_published: post.is_published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Güncelleme başarısız oldu.");
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
          <Link href="/admin/posts" className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-800">
            <ArrowLeft className="w-5 h-5 text-neutral-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Yazıyı Düzenle</h1>
            <p className="text-neutral-500 mt-1">ID: {post.id}</p>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-70"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Başlık</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">İçerik (Markdown / HTML)</label>
            <textarea 
              required
              rows={15}
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
            <ImageUpload 
              label="Kapak Görseli"
              value={formData.cover_image}
              onChange={(url) => setFormData({...formData, cover_image: url})}
            />
          </div>

          <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-2xl">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Meta Açıklama (SEO)</label>
            <textarea 
              rows={4}
              value={formData.meta_description}
              onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
