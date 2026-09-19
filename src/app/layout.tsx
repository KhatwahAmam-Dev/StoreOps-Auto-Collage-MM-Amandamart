import React from "react";

export const metadata = {
  title: "MM Amandamart - StoreOps Auto-Collage",
  description: "Aplikasi Laporan Foto Operasional Toko",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-100 min-h-screen text-slate-800">
        {children}
      </body>
    </html>
  );
}
