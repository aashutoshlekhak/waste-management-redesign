"use client";

import type React from "react";

import { motion } from "framer-motion";
import { AlertTriangle, Zap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SkipCardImageProps {
  skip: {
    size: number;
    forbidden: boolean;
  };
  restrictions: string[];
  skipImage: string;
  index: number;
  isHovered: boolean;
  isFlipped: boolean;
  colorVariant: string;
  onFlipToBack: (e: React.MouseEvent) => void;
  onFlipToFront: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export default function SkipCardImage({
  skip,
  restrictions,
  skipImage,
  index,
  isHovered,
  isFlipped,
  colorVariant,
  onFlipToBack,
  onFlipToFront,
  children,
}: SkipCardImageProps) {
  return (
    <div
      className="image-area relative aspect-[4/3] overflow-hidden cursor-default rounded-t-xl"
      style={{ perspective: "1000px" }}
      onClick={(e) => e.stopPropagation()}
    >
      {isFlipped && (
        <div
          className="absolute top-3 right-3 z-[1000] cursor-pointer"
          style={{ pointerEvents: "all" }}
          onClick={onFlipToFront}
        >
          <div className="bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors w-7 h-7 flex items-center justify-center">
            <X className="h-4 w-4" />
          </div>
        </div>
      )}

      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.img
            src={skipImage}
            alt={`${skip.size} Yard Skip`}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered && !isFlipped ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            className="absolute top-3 left-3 z-10"
          >
            <Badge className="bg-[#1865f1] dark:bg-blue-600 text-white font-semibold text-sm px-3 py-1.5 shadow-sm rounded-full">
              {skip.size} Yards
            </Badge>
          </motion.div>

          {restrictions.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-3 left-3 bg-gray-800/90 backdrop-blur-sm text-white px-2 py-1 text-xs font-medium flex items-center z-10 rounded-md max-w-[180px]"
            >
              <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0 text-amber-400" />
              <span className="text-xs truncate">{restrictions[0]}</span>
            </motion.div>
          )}

          <div className="absolute bottom-3 right-3 z-20">
            <Button
              variant="secondary"
              size="sm"
              onClick={onFlipToBack}
              className="bg-white text-gray-800 hover:bg-white/90 font-medium px-3 py-1.5 text-xs shadow-sm border border-gray-200 pointer-events-auto rounded-md"
            >
              Know More
            </Button>
          </div>
        </div>

        {/* Back side */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-gradient-to-br",
            colorVariant
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
