"use client";

import React from "react";
import { clearPhotoCache } from "@/lib/indexedDB";

export const StorageWarning = () => {
  const handleClear = async () => {
    await clearPhotoCache();
    alert("Cache foto lokal berhasil dibersihkan!");
  };

  return (
    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs text-amber-800 my-2">
      <span>💾 Memori HP Terjaga (Auto-Purge Active)</span>
      <button 
        onClick={handleClear}
        className="bg-amber-600 text-white px-2 py-1 rounded font-bold hover:bg-amber-700"
      >
        Bersihkan
      </button>
    </div>
  );
};
