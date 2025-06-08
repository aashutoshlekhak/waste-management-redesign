"use client";

import { motion } from "framer-motion";
import { Zap, Truck, Recycle, Leaf, Package, Trash2 } from "lucide-react";

const floatingIcons = [
  { Icon: Zap, delay: 0, x: "15%", y: "20%" },
  { Icon: Truck, delay: 2, x: "80%", y: "30%" },
  { Icon: Recycle, delay: 4, x: "25%", y: "70%" },
  { Icon: Leaf, delay: 1, x: "70%", y: "50%" },
  { Icon: Package, delay: 3, x: "60%", y: "80%" },
  { Icon: Trash2, delay: 5, x: "40%", y: "40%" },
];

export default function BackgroundAnimations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-[0.12] dark:opacity-[0.07]"
          style={{ left: x, top: y }}
          animate={{
            x: [
              `${Number.parseInt(x as string) - 15}%`,
              `${Number.parseInt(x as string) + 15}%`,
              `${Number.parseInt(x as string) - 15}%`,
            ],
            y: [
              `${Number.parseInt(y as string) - 20}%`,
              `${Number.parseInt(y as string) + 20}%`,
              `${Number.parseInt(y as string) - 20}%`,
            ],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 10 + index * 0.8,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Icon
            className="w-8 h-8 md:w-10 md:h-10 text-gray-500 dark:text-blue-400"
            strokeWidth={1}
          />
        </motion.div>
      ))}

      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          className="absolute w-1.5 h-1.5 bg-gray-400 dark:bg-blue-300 rounded-full opacity-40 dark:opacity-30"
          style={{
            left: `${15 + index * 15}%`,
            top: `${20 + index * 12}%`,
          }}
          animate={{
            x: [
              `${-20 - index * 8}px`,
              `${20 + index * 8}px`,
              `${-20 - index * 8}px`,
            ],
            y: [
              `${-25 - index * 5}px`,
              `${25 + index * 5}px`,
              `${-25 - index * 5}px`,
            ],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7 + index,
            delay: index * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
