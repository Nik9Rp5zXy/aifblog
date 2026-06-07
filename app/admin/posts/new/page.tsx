"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import slugify from "slugify";
import { Loader2 } from "lucide-react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSlug(slugify(e.target.value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          meta_description: metaDescription,
          is_published: isPublished,
        }),
      });

      if (res.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        const data = await res.json();
        alert("Hata: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Yeni Yazı Ekle</h1>
          <p className="text-neutral-500 mt-1">Blog için yeni bir içerik oluşturun.</p>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded bg-neutral-900 border-neutral-800 text-blue-500 focus:ring-blue-500"
            />
            Yayınla (Publish)
          </label>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title || !content}
            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Kaydet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Başlık</label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-neutral-950 border border-neutral-800 text-white text-xl font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-700"
              placeholder="Muhteşem bir başlık girin..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">İçerik (Zengin Metin)</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">URL (Slug)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Meta Açıklama (SEO)</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 min-h-[100px]"
              placeholder="Arama motorları için kısa özet..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
