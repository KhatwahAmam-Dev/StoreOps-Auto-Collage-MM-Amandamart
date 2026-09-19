"use client";

import React, { useRef, useEffect } from "react";
import { tenantConfig } from "@/config/tenant.config";

interface PhotoData {
  url: string;
  timestamp: string; // misal: "19/09/2026 07:15:22"
  label?: string;
}

interface CanvasCollageProps {
  photos: PhotoData[];
  shift: string;
  category: string;
  durationText: string;
  onRendered?: (dataUrl: string) => void;
}

export const CanvasCollage: React.FC<CanvasCollageProps> = ({
  photos,
  shift,
  category,
  durationText,
  onRendered,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || photos.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setting Ukuran Canvas Output (High-Res 1080px width)
    const canvasWidth = 1080;
    const headerHeight = 160;
    const padding = 20;
    const gap = 15;

    // Tentukan jumlah kolom berdasarkan jumlah foto
    const cols = photos.length <= 4 ? 2 : 3;
    const rows = Math.ceil(photos.length / cols);

    const cellWidth = (canvasWidth - padding * 2 - gap * (cols - 1)) / cols;
    const cellHeight = cellWidth * 0.75; // Aspect Ratio 4:3

    const canvasHeight = headerHeight + padding * 2 + rows * cellHeight + (rows - 1) * gap;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 1. Draw Background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Draw Header Banner MM Amandamart
    ctx.fillStyle = tenantConfig.primaryColor;
    ctx.fillRect(0, 0, canvasWidth, headerHeight);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Sans-Serif";
    ctx.fillText(tenantConfig.name.toUpperCase(), padding, 50);

    ctx.font = "20px Sans-Serif";
    ctx.fillText(`${shift.toUpperCase()} - LAPORAN: ${category.toUpperCase()}`, padding, 88);

    ctx.font = "italic 18px Sans-Serif";
    ctx.fillStyle = "#e0f2fe";
    ctx.fillText(`⏱️ Rentang Waktu: ${durationText}`, padding, 125);

    // 3. Render Fotos & Watermark
    let loadedImages = 0;

    photos.forEach((photo, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = photo.url;

      img.onload = () => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = padding + col * (cellWidth + gap);
        const y = headerHeight + padding + row * (cellHeight + gap);

        // Draw Image
        ctx.drawImage(img, x, y, cellWidth, cellHeight);

        // Draw Watermark Overlay Box (Black Semi-Transparent)
        const watermarkHeight = 35;
        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(x, y + cellHeight - watermarkHeight, cellWidth, watermarkHeight);

        // Draw Watermark Text (Tanggal & Jam)
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Sans-Serif";
        ctx.fillText(`🕒 ${photo.timestamp}`, x + 10, y + cellHeight - 11);

        loadedImages++;
        // Kirim hasil akhir dataUrl jika semua foto selesai dirender
        if (loadedImages === photos.length && onRendered) {
          onRendered(canvas.toDataURL("image/jpeg", 0.85));
        }
      };
    });
  }, [photos, shift, category, durationText, onRendered]);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className="w-full max-w-md rounded-lg shadow-md border" />
    </div>
  );
};
