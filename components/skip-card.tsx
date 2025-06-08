"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  calculatePricingBreakdown,
  getSkipRestrictions,
  getSkipFeatures,
  hasTransportCosts,
} from "@/lib/utils";
import type { SkipData } from "@/lib/types";
import SkipCardImage from "@/components/skip-card/skip-card-image";
import SkipCardBack from "@/components/skip-card/skip-card-back";
import PriceBreakdown from "@/components/skip-card/price-breakdown";
import SkipFeatures from "@/components/skip-card/skip-features";
import SelectButton from "@/components/skip-card/select-button";

interface SkipCardProps {
  skip: SkipData;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const colorVariants = [
  "from-[#1865f1] to-[#0d47a1]",
  "from-[#40b9fd] to-[#1e88e5]",
  "from-[#1865f1] to-[#1e88e5]",
  "from-[#40b9fd] to-[#0d47a1]",
];

const skipImages = [
  "/trashcan.jpg",
  "/trashcan2.webp",
  "/trashcan3.jpg",
  "/trashcan4.jpg",
  "/trashcan6.jpeg",
  "/trashcan7.webp",
  "trashcan10.jpg",
  "/trashcan.jpg",
  "/trashcan3.jpg",
];

export default function SkipCard({
  skip,
  isSelected,
  onSelect,
  index,
}: SkipCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBulletPoints, setShowBulletPoints] = useState(false);

  const pricing = calculatePricingBreakdown(skip);
  const restrictions = getSkipRestrictions(skip);
  const features = getSkipFeatures(skip);
  const colorVariant = colorVariants[index % colorVariants.length];
  const skipImage = skipImages[index % skipImages.length];
  const hasAdditionalCosts = hasTransportCosts(skip) || skip.per_tonne_cost;

  if (skip.forbidden) {
    return null;
  }

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isImageArea = target.closest(".image-area");

    if (!isImageArea) {
      onSelect();
    }
  };

  const handleFlipToBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped(true);
    setTimeout(() => {
      setShowBulletPoints(true);
    }, 800);
  };

  const handleFlipToFront = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBulletPoints(false);
    setIsFlipped(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        className={cn(
          "overflow-visible h-full transition-all duration-500 cursor-pointer group",
          "bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-md rounded-xl",
          isSelected
            ? "ring-2 ring-[#1865f1] dark:ring-blue-400 border-[#40b9fd] dark:border-blue-500 shadow-lg"
            : ""
        )}
        onClick={handleCardClick}
      >
        <SkipCardImage
          skip={skip}
          restrictions={restrictions}
          skipImage={skipImage}
          index={index}
          isHovered={isHovered}
          isFlipped={isFlipped}
          colorVariant={colorVariant}
          onFlipToBack={handleFlipToBack}
          onFlipToFront={handleFlipToFront}
        >
          <SkipCardBack skip={skip} showBulletPoints={showBulletPoints} />
        </SkipCardImage>

        <CardContent className="p-8 space-y-4 relative overflow-visible">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {skip.size} Yard Skip
            </h3>
            <div className="relative">
              <PriceBreakdown
                pricing={pricing}
                hasAdditionalCosts={!!hasAdditionalCosts}
              />
            </div>
          </div>

          <SkipFeatures
            hirePeriod={skip.hire_period_days}
            features={features}
            restrictions={restrictions}
            postcode={skip.postcode}
          />

          <SelectButton isSelected={isSelected} onClick={onSelect} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
