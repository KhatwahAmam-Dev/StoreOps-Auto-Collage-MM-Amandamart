"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandHeader } from "@/components/BrandHeader";
import { tenantConfig } from "@/config/tenant.config";

export default function HomePage() {
  const [pin, setPin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("PIN Salah! Gunakan PIN default: 1234");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <BrandHeader />
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border mt-4">
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-center">
            <h2 className="font-semibold text-slate-700">Masukan PIN Staf (4 Digit)</h2>
            <input
              type="password"
              maxLength={4}
              placeholder="****"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-2xl tracking-widest p-3 border rounded-xl font-bold focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-900 text-white font-bold py-3 rounded-xl shadow active:scale-95 transition"
            >
              Masuk Aplikasi
            </button>
            <p className="text-xs text-slate-400">PIN Simulasi: <b>1234</b></p>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-emerald-600 text-center">✓ Login Staf Berhasil</p>
            <div className="flex flex-col gap-2">
              <Link
                href="/camera"
                className="bg-blue-900 text-white font-bold py-3 px-4 rounded-xl text-center shadow active:scale-95 transition"
              >
                📸 Ambil Foto Laporan
              </Link>
              <Link
                href="/preview"
                className="bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-center shadow active:scale-95 transition"
              >
                🖼️ Lihat Preview Collage & Kirim WA
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
