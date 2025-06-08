"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PricingBreakdown } from "@/lib/types";

interface PriceBreakdownProps {
  pricing: PricingBreakdown;
  hasAdditionalCosts: boolean;
}

export default function PriceBreakdown({
  pricing,
  hasAdditionalCosts,
}: PriceBreakdownProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-baseline gap-2 relative">
      <span className="text-3xl font-bold text-[#1865f1] dark:text-blue-400">
        £{pricing.total}
      </span>
      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        inc. VAT
      </span>

      {hasAdditionalCosts && (
        <div
          className="relative z-50"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(!showTooltip);
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 h-auto w-auto"
          >
            <Info className="h-4 w-4" />
          </Button>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute z-[100] bottom-full right-0 mb-2 w-48 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 space-y-1 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -bottom-2 right-4 w-4 h-4 rotate-45 bg-blue-50 dark:bg-blue-900/30 border-r border-b border-blue-100 dark:border-blue-800"></div>
                <div className="flex justify-between">
                  <span>Base price:</span>
                  <span className="font-medium">£{pricing.basePrice}</span>
                </div>
                {pricing.transportCost > 0 && (
                  <div className="flex justify-between">
                    <span>Transport:</span>
                    <span className="font-medium">
                      £{pricing.transportCost}
                    </span>
                  </div>
                )}
                {pricing.perTonneCost > 0 && (
                  <div className="flex justify-between">
                    <span>Per tonne:</span>
                    <span className="font-medium">£{pricing.perTonneCost}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-blue-200 dark:border-blue-700 pt-1 font-medium">
                  <span>VAT ({pricing.vat}%):</span>
                  <span>£{pricing.vatAmount}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
