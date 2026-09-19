"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { compressImage } from "@/lib/imageCompressor";
import { savePhotoToDB } from "@/lib/indexedDB";

export default function CameraPage() {
  const [photoCount, setPhotoCount] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const compressedUrl = await compressImage(file);
      const photoObj = {
        id: Date.now().toString(),
        blob: new Blob([compressedUrl]),
        timestamp: new Date().toLocaleString("id-ID"),
      };
      await savePhotoToDB(photoObj);
      setPhotoCount((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <BrandHeader />
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border text-center flex flex-col gap-4">
        <h2 className="font-bold text-slate-800">Kamera & Upload Foto</h2>
        <div className="border-2 border-dashed border-slate-300 p-8 rounded-xl bg-slate-50">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            id="camera-input"
            className="hidden"
          />
          <label
            htmlFor="camera-input"
            className="bg-blue-900 text-white px-4 py-2 rounded-xl font-bold cursor-pointer inline-block shadow"
          >
            📷 Ambil Foto Lapangan
          </label>
        </div>
        <p className="text-sm font-semibold text-slate-600">Foto Tersimpan: {photoCount} Foto</p>
        <Link
          href="/preview"
          className="bg-emerald-600 text-white font-bold py-3 rounded-xl shadow active:scale-95 transition"
        >
          Lanjut ke Preview Collage ➔
        </Link>
      </div>
    </main>
  );
}
