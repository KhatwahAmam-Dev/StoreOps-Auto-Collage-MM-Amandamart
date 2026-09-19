import React from "react";
import { tenantConfig } from "@/config/tenant.config";

export const BrandHeader = () => {
  return (
    <div className="w-full bg-blue-900 text-white p-4 text-center rounded-b-2xl shadow-md mb-4">
      <h1 className="text-xl font-bold tracking-wide">{tenantConfig.name}</h1>
      <p className="text-xs text-blue-200">{tenantConfig.tagline}</p>
    </div>
  );
};
