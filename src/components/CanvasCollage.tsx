"use client";

import React, { useEffect, useRef } from "react";
import { tenantConfig } from "@/config/tenant.config";

interface PhotoData {
  url: string;
  timestamp: string;
}

interface CanvasCollageProps {
  photos: PhotoData[];
  shift: string;
  category: string;
  onRendered: (dataUrl: string) => void;
}

export const CanvasCollage: React.FC<CanvasCollageProps> = ({
  photos,
  shift,
  category,
  onRendered,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dimensi Canvas
    const width = 1080;
    const headerHeight = 180;
    const photoSize = 340;
    const padding = 20;
    
    const cols = 3;
    const rows = Math.ceil(photos.length / cols);
    const height = headerHeight + rows * (photoSize + padding) + padding;

    canvas.width = width;
    canvas.height = height;

    // Background Utama
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(0, 0, width, height);

    // Header Box
    ctx.fillStyle = "#1E3A8A"; // Blue header
    ctx.fillRect(0, 0, width, headerHeight);

    // Teks Header
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText(tenantConfig.name, 40, 65);

    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#E2E8F0";
    ctx.fillText(
      `Laporan: ${category} | ${shift} | ${new Date().toLocaleDateString("id-ID")}`,
      40,
      115
    );

    // Render Gambar
    let loadedCount = 0;
    photos.forEach((photo, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = photo.url;

      img.onload = () => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        const x = padding + col * (photoSize + padding);
        const y = headerHeight + padding + row * (photoSize + padding);

        // Frame Foto
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, y, photoSize, photoSize);

        // Crop & Draw Image (Center Crop)
        const scale = Math.max(photoSize / img.width, photoSize / img.height);
        const nw = img.width * scale;
        const nh = img.height * scale;
        const nx = x + (photoSize - nw) / 2;
        const ny = y + (photoSize - nh) / 2;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, photoSize, photoSize);
        ctx.clip();
        ctx.drawImage(img, nx, ny, nw, nh);
        ctx.restore();

        // Watermark Jam/Tanggal di atas foto
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(x, y + photoSize - 35, photoSize, 35);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "16px sans-serif";
        ctx.fillText(photo.timestamp, x + 10, y + photoSize - 12);

        loadedCount++;
        if (loadedCount === photos.length) {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          onRendered(dataUrl);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === photos.length) {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          onRendered(dataUrl);
        }
      };
    });
  }, [photos, shift, category, onRendered]);

  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-md border bg-white p-2">
      <canvas ref={canvasRef} className="w-full h-auto rounded-xl" />
    </div>
  );
};
