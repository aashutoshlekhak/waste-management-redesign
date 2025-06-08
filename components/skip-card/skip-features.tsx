"use client";

import { Clock, Truck, Weight, Ban } from "lucide-react";

interface SkipFeaturesProps {
  hirePeriod: number;
  features: string[];
  restrictions: string[];
  postcode: string;
}

export default function SkipFeatures({
  hirePeriod,
  features,
  restrictions,
  postcode,
}: SkipFeaturesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
        <Clock className="h-4 w-4 text-[#1865f1] dark:text-blue-400" />
        <span className="text-sm">{hirePeriod} day hire period</span>
      </div>

      {features.map((feature, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
        >
          {feature.includes("Heavy waste") && (
            <Weight className="h-4 w-4 text-[#1865f1] dark:text-blue-400" />
          )}
          {feature.includes("Road placement") && (
            <Truck className="h-4 w-4 text-[#1865f1] dark:text-blue-400" />
          )}
          {feature.includes("transport") && (
            <Truck className="h-4 w-4 text-[#1865f1] dark:text-blue-400" />
          )}
          <span className="text-sm">{feature}</span>
        </div>
      ))}

      {restrictions.map((restriction, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
        >
          <Ban className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm">{restriction}</span>
        </div>
      ))}

      <div className="text-gray-500 dark:text-gray-400 text-xs">
        Available in {postcode}
      </div>
    </div>
  );
}
