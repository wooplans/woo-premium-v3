"use client";

import { useState, useRef } from "react";

export default function ImageUpload({
  images,
  onImagesChange,
  thumbnail,
  onThumbnailChange,
}: {
  images: string[];
  onImagesChange: (images: string[]) => void;
  thumbnail: string;
  onThumbnailChange: (thumbnail: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [...images];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data: { url?: string } = await res.json();
        if (data.url) {
          newImages.push(data.url);
        }
      } catch (err) {
        console.error("Erreur upload:", err);
      }
    }

    onImagesChange(newImages);
    if (!thumbnail && newImages.length > 0) {
      onThumbnailChange(newImages[0]);
    }
    setUploading(false);
  }

  async function handleRemove(index: number) {
    const img = images[index];
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);

    if (img) {
      const key = img.split("/").pop();
      if (key) {
        try {
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key }),
          });
        } catch {}
      }
    }

    if (thumbnail === img) {
      onThumbnailChange(newImages[0] || "");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors disabled:opacity-50"
        >
          {uploading ? "Upload en cours..." : "+ Ajouter des images"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img
                src={img}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => onThumbnailChange(img)}
                  className={`p-1.5 rounded-full text-xs font-medium ${
                    thumbnail === img
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-white text-gray-700"
                  }`}
                >
                  ★
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="p-1.5 rounded-full bg-red-500 text-white text-xs"
                >
                  ✕
                </button>
              </div>
              {thumbnail === img && (
                <span className="absolute top-1 left-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded">
                  Vignette
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
