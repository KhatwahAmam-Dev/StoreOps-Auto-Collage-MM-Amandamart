"use client";

import React, { useState, useEffect } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { StorageWarning } from "@/components/StorageWarning";
import { CanvasCollage } from "@/components/CanvasCollage";
import { tenantConfig } from "@/config/tenant.config";

interface PhotoData {
  url: string;
  timestamp: string;
}

export default function PreviewPage() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [copied, setCopied] = useState(false);
  const [renderedImageUrl, setRenderedImageUrl] = useState<string>("");

  useEffect(() => {
    // Ambil foto yang baru dijepret dari IndexedDB HP
    const request = indexedDB.open("StoreOpsDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      if (db.objectStoreNames.contains("photos")) {
        const tx = db.transaction("photos", "readonly");
        const store = tx.objectStore("photos");
        const getAll = store.getAll();

        getAll.onsuccess = () => {
          const result = getAll.result || [];
          const formattedPhotos = result.map((item: any) => {
            let imgUrl = "";
            if (item.blob instanceof Blob) {
              imgUrl = URL.createObjectURL(item.blob);
            } else if (typeof item.blob === "string") {
              imgUrl = item.blob;
            }
            return {
              url: imgUrl,
              timestamp: item.timestamp || new Date().toLocaleString("id-ID"),
            };
          });
          setPhotos(formattedPhotos);
        };
      }
    };
  }, []);

  const generateCaption = () => {
    return (
      `📌 *LAPORAN OPERASIONAL TOKO*\n` +
      `🏬 *Toko:* ${tenantConfig.name}\n` +
      `📅 *Tanggal:* ${new Date().toLocaleDateString("id-ID")}\n` +
      `☀️ *Shift:* Shift Pagi\n` +
      `🏷️ *Kategori:* Store Ready Concept\n` +
      `📸 *Jumlah Foto:* ${photos.length} Foto\n\n` +
      `*Gambar collage terlampir.*`
    );
  };

  const handleShareWA = async () => {
    const caption = generateCaption();
    await navigator.clipboard.writeText(caption);
    setCopied(true);

    // Buka WhatsApp
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(caption)}`,
      "_blank"
    );
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadCollage = () => {
    if (!renderedImageUrl) return;
    const link = document.createElement("a");
    link.href = renderedImageUrl;
    link.download = `Collage-${tenantConfig.id}-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-slate-100">
      <BrandHeader />
      <div className="w-full max-w-md flex flex-col gap-3">
        <StorageWarning />

        <h2 className="text-center font-bold text-slate-800 text-lg">
          Preview Laporan Operasional
        </h2>

        {photos.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow text-center border">
            <p className="text-slate-500 text-sm mb-4">
              Belum ada foto yang dijepret.
            </p>
            <a
              href="/camera"
              className="inline-block bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-bold"
            >
              📷 Ambil Foto Dulu
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            {/* Engine Canvas Collage */}
            <CanvasCollage
              photos={photos}
              shift="Shift Pagi"
              category="Store Ready Concept"
              onRendered={(dataUrl) => setRenderedImageUrl(dataUrl)}
            />

            {/* Tombol Simpan Gambar */}
            {renderedImageUrl && (
              <button
                onClick={handleDownloadCollage}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-sm shadow flex items-center justify-center gap-2 active:scale-95 transition"
              >
                💾 Simpan / Download Gambar Collage
              </button>
            )}

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-blue-900 w-full text-center">
              💡 Tekan tombol di bawah untuk menyalin teks & buka WhatsApp. Tempel (*paste*) teks dan lampirkan gambar collage dari galeri!
            </div>

            <button
              onClick={handleShareWA}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow active:scale-95 transition text-base"
            >
              {copied ? "✓ Teks Copied! Membuka WA..." : "🟢 Kirim Laporan ke WA"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
