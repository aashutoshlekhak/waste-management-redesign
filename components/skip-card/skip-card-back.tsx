"use client";

import { motion } from "framer-motion";

interface SkipCardBackProps {
  skip: {
    size: number;
    hire_period_days: number;
    allows_heavy_waste: boolean;
    allowed_on_road: boolean;
  };
  showBulletPoints: boolean;
}

export default function SkipCardBack({
  skip,
  showBulletPoints,
}: SkipCardBackProps) {
  const skipInfo = [
    `Perfect for ${
      skip.size === 4
        ? "small home projects"
        : skip.size <= 8
        ? "medium renovations"
        : skip.size <= 12
        ? "large construction jobs"
        : "commercial projects"
    }`,
    `Holds approximately ${Math.round(skip.size * 1.5)} tonnes of waste`,
    `${skip.hire_period_days} day hire period included`,
    skip.allows_heavy_waste
      ? "Suitable for heavy materials like concrete and bricks"
      : "Ideal for general household and garden waste",
    skip.allowed_on_road
      ? "Can be placed on public roads with permit"
      : "Private property placement only",
  ];

  return (
    <div className="p-8 h-full flex flex-col justify-center text-white">
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: showBulletPoints ? 1 : 0,
          y: showBulletPoints ? 0 : -20,
        }}
        transition={{ duration: 0.4 }}
        className="text-lg font-semibold mb-6 text-center"
      >
        Skip Details
      </motion.h4>
      <ul className="space-y-4 flex-1 flex flex-col justify-center">
        {skipInfo.map((info, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: showBulletPoints ? 1 : 0,
              x: showBulletPoints ? 0 : -20,
            }}
            transition={{
              duration: 0.4,
              delay: showBulletPoints ? idx * 0.1 : 0,
            }}
            className="flex items-start gap-3 text-sm leading-relaxed"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
            <span>{info}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
