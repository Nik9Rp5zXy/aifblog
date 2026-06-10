"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import { Loader2, Save, Send } from "lucide-react";

function PostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setCategories(data);
      });

    // If edit mode, fetch post
    if (editId) {
      fetch(`/api/posts/${editId}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setTitle(data.title || "");
            setSlug(data.slug || "");
            setCoverImage(data.cover_image || "");
            setContent(data.content || "");
            setCategoryId(data.categoryId || "");
            setReadingTime(data.reading_time || 5);
            setIsPublished(data.is_published || false);
          }
        });
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent, publishStatus: boolean) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      content,
      cover_image: coverImage,
      categoryId: categoryId || null,
      reading_time: Number(readingTime),
      is_published: publishStatus,
    };

    try {
      const url = editId ? `/api/posts/${editId}` : "/api/posts";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/yazilar");
        router.refresh();
      } else {
        alert("İşlem başarısız.");
      }
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <h1 className="text-3xl font-space font-bold text-white mb-8">
        {editId ? "Yazıyı Düzenle" : "Yeni Yazı Oluştur"}
      </h1>

      <form className="flex flex-col md:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          <div className="solid-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Başlık</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="input-field text-xl font-bold font-space"
                placeholder="Yazı Başlığı..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Kalıcı Bağlantı (Slug)</label>
              <input 
                type="text" 
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="input-field font-mono text-sm"
                placeholder="yazi-basligi (Opsiyonel, otomatik oluşturulur)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">İçerik</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="w-full md:w-80 space-y-6">
          <div className="solid-card p-6 space-y-4 sticky top-6">
            
            {/* Actions */}
            <div className="flex flex-col gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-cyan)] hover:bg-[#00d0e0] text-black font-bold py-3 px-4 rounded-sm transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {editId ? "Güncelle ve Yayınla" : "Hemen Yayınla"}
              </button>
              
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border-subtle)] text-white font-bold py-3 px-4 rounded-sm transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 text-[var(--color-text-secondary)]" />}
                Taslak Olarak Kaydet
              </button>
            </div>

            {/* Category */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Kategori</label>
              <select 
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="input-field"
              >
                <option value="">Seçiniz...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Okunma Süresi (Dk)</label>
              <input 
                type="number" 
                value={readingTime}
                onChange={e => setReadingTime(Number(e.target.value))}
                className="input-field"
                min="1"
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Kapak Görseli URL</label>
              <input 
                type="url" 
                value={coverImage}
                onChange={e => setCoverImage(e.target.value)}
                className="input-field text-sm"
                placeholder="https://..."
              />
              {coverImage && (
                <div className="mt-3 aspect-video rounded-sm overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
                  <img src={coverImage} alt="Kapak Önizleme" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}

export default function YeniYaziPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <PostForm />
    </Suspense>
  );
}
