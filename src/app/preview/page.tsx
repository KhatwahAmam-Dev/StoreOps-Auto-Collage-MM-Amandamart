"use client";

import React, { useState } from "react";
import { tenantConfig } from "@/config/tenant.config";

export default function PreviewPage() {
  const [copied, setCopied] = useState(false);

  // Data Dummy Laporan
  const reportData = {
    storeName: tenantConfig.name,
    shift: "Shift Pagi",
    category: "Store Ready Concept",
    duration: "06:45 - 07:15 WIB (Durasi: 30 menit)",
    officer: "Budi",
    date: "19 September 2026",
  };

  const generateCaption = () => {
    return `📌 *LAPORAN OPERASIONAL TOKO*\n` +
           `🏬 *Toko:* ${reportData.storeName}\n` +
           `📅 *Tanggal:* ${reportData.date}\n` +
           `☀️ *Shift:* ${reportData.shift}\n` +
           `🏷️ *Kategori:* ${reportData.category}\n` +
           `⏱️ *Rentang Waktu:* ${reportData.duration}\n` +
           `👤 *Petugas:* ${reportData.officer}\n\n` +
           `*Gambar collage terlampir.*`;
  };

  const handleShareToWA = async () => {
    const caption = generateCaption();
    
    // Copy caption ke clipboard
    await navigator.clipboard.writeText(caption);
    setCopied(true);

    // Buka WA Native
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(caption)}`;
    window.open(waUrl, "_blank");

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold text-slate-800">Preview Laporan Operasional</h1>
      
      {/* Box Petunjuk */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-900 w-full max-w-md">
        💡 Teks caption laporan akan otomatis ter-copy. Tinggal <b>Paste</b> saat WhatsApp terbuka!
      </div>

      {/* Tombol Share WA */}
      <button
        onClick={handleShareToWA}
        className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <span>🟢</span> {copied ? "Teks Copied! Membuka WA..." : "Kirim Laporan ke WA"}
      </button>
    </div>
  );
}
