"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculatePricingBreakdown, hasTransportCosts } from "@/lib/utils";
import type { SkipData } from "@/lib/types";

interface BottomSheetProps {
  isOpen: boolean;
  skip: SkipData | null;
  onClose: () => void;
}

export default function BottomSheet({
  isOpen,
  skip,
  onClose,
}: BottomSheetProps) {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  if (!skip) return null;

  const pricing = calculatePricingBreakdown(skip);
  const hasAdditionalCosts =
    hasTransportCosts(skip) || (skip.per_tonne_cost && skip.per_tonne_cost > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-t-xl p-6"
          >
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6" />

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {skip.size} Yard Skip Selected
                </h3>
                <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-300">
                  <span className="text-3xl font-bold text-[#1865f1] dark:text-blue-400">
                    £{pricing.total}
                  </span>
                  <span className="text-lg">
                    {skip.hire_period_days} days hire
                  </span>
                  {hasAdditionalCosts && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                      className="flex items-center gap-1 text-[#40b9fd] dark:text-blue-400 p-1 h-auto"
                    >
                      <Info className="h-5 w-5" />
                      {showPriceBreakdown ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {showPriceBreakdown && hasAdditionalCosts && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 space-y-1 overflow-hidden"
                    >
                      <div className="flex justify-between">
                        <span>Base price:</span>
                        <span className="font-medium">
                          £{pricing.basePrice}
                        </span>
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
                          <span className="font-medium">
                            £{pricing.perTonneCost}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-blue-200 dark:border-blue-700 pt-1 font-medium">
                        <span>VAT ({pricing.vat}%):</span>
                        <span>£{pricing.vatAmount}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Available in {skip.postcode}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={onClose}
                >
                  Back
                </Button>
                <Button size="lg" className="flex-1">
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
