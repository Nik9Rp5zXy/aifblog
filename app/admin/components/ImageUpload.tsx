"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Görsel Yükle" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Yükleme başarısız.");
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-neutral-400 mb-2">{label}</label>
      
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-video">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              title="Değiştir"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-full backdrop-blur-md transition-colors"
              title="Kaldır"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700 transition-colors flex flex-col items-center justify-center cursor-pointer group"
        >
          {uploading ? (
            <div className="flex flex-col items-center text-neutral-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="text-sm">Yükleniyor...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-neutral-500 group-hover:text-neutral-400 transition-colors">
              <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="font-medium">Tıklayın veya sürükleyin</span>
              <span className="text-xs mt-1">PNG, JPG, WEBP (Max 5MB)</span>
            </div>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
