"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Copy, Image as ImageIcon, Loader2 } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/upload"); // Assuming GET /api/upload returns media list
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await fetchMedia();
      } else {
        alert("Yükleme başarısız oldu.");
      }
    } catch (err) {
      console.error(err);
      alert("Hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Görseli silmek istediğinize emin misiniz? (Not: DB'den silinir, dosyadan manuel silinmesi gerekebilir)")) return;
    try {
      const res = await fetch(`/api/upload?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMedia(media.filter(m => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Bağlantı kopyalandı!");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-space font-bold text-white tracking-tight">Medya Kütüphanesi</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Görsellerinizi yönetin ve yazılarınıza ekleyin.</p>
        </div>
        
        <div className="relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <button 
            disabled={uploading}
            className="flex items-center gap-2 bg-[var(--color-brand-cyan)] text-black px-5 py-2.5 rounded-sm font-bold hover:bg-[#00d0e0] transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            Yeni Görsel Yükle
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-24">
          <Loader2 className="w-8 h-8 text-[var(--color-brand-cyan)] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item.id} className="solid-card group overflow-hidden relative aspect-square flex flex-col">
              <div className="flex-1 bg-[var(--color-bg-primary)] p-2">
                <img 
                  src={item.url} 
                  alt={item.filename} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => copyToClipboard(item.url)}
                  className="p-2 bg-[var(--color-bg-surface)] hover:text-[var(--color-brand-cyan)] rounded-sm border border-[var(--color-border-subtle)] transition-colors"
                  title="Linki Kopyala"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-[var(--color-bg-surface)] hover:text-red-500 rounded-sm border border-[var(--color-border-subtle)] transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 text-xs truncate text-[var(--color-text-secondary)] border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]">
                {item.filename}
              </div>
            </div>
          ))}
          
          {media.length === 0 && (
            <div className="col-span-full p-24 text-center solid-card flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-[var(--color-border-subtle)] mb-4" />
              <p className="text-[var(--color-text-secondary)]">Kütüphanede henüz görsel bulunmuyor.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
