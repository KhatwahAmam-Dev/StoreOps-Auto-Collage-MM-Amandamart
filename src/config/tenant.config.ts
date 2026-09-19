export interface TenantConfig {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  shifts: string[];
  categories: {
    shiftPagi: string[];
    shiftSiang: string[];
  };
}

export const tenantConfig: TenantConfig = {
  id: "mm-amandamart",
  name: "MM Amandamart",
  tagline: "Midi Market Operasional",
  logoUrl: "/icons/logo.png",
  primaryColor: "#1e3a8a", // Navy Blue
  shifts: ["Shift Pagi", "Shift Siang"],
  categories: {
    shiftPagi: [
      "Buka Toko",
      "KWH Listrik Pagi",
      "Store Ready Concept",
      "Kebersihan Rak",
      "Briefing Pagi",
      "Cek Expired",
      "Aktivitas Harian",
    ],
    shiftSiang: [
      "Serah Terima Tugas",
      "Briefing Siang",
      "Aktivitas Harian",
      "Cek Expired",
      "Kebersihan Rak",
      "Implementasi Promo",
      "KWH Listrik Malam",
      "Closing",
    ],
  },
};
