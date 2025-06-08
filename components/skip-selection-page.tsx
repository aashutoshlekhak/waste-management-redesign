"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkipCard from "@/components/skip-card";
import ProgressSteps from "@/components/progress-steps";
import BottomSheet from "@/components/bottom-sheet";
import ThemeToggle from "@/components/theme-toggle";
import { skipData } from "@/lib/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import BackgroundAnimations from "@/components/background-animations";

export default function SkipSelectionPage() {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const handleSelectSkip = (id: number) => {
    setSelectedSkipId(selectedSkipId === id ? null : id);
  };

  const selectedSkip = skipData.find((skip) => skip.id === selectedSkipId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative transition-colors duration-300">
      <ThemeToggle />

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <ProgressSteps currentStep={3} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16 relative"
          >
            {/* Background animations only in the hero section */}
            <div className="absolute inset-0 h-full w-full -z-10">
              <BackgroundAnimations />
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-6 py-2 mb-8">
              <span className="text-[#1865f1] dark:text-blue-400 text-sm font-medium">
                Choose Your Perfect Skip
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your Skip Size
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Select the skip size that best suits your needs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
              selectedSkip && !isMobile ? "mb-16" : "mb-32"
            }`}
          >
            <AnimatePresence>
              {skipData.map((skip, index) => (
                <motion.div
                  key={skip.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <SkipCard
                    skip={skip}
                    isSelected={selectedSkipId === skip.id}
                    onSelect={() => handleSelectSkip(skip.id)}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {selectedSkip && !isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl p-8"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col lg:flex-row items-center gap-6"
                  >
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {selectedSkip.size} Yard Skip Selected
                      </h3>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                        <span className="text-3xl font-bold text-[#1865f1] dark:text-blue-400">
                          £
                          {Math.round(
                            selectedSkip.price_before_vat *
                              (1 + selectedSkip.vat / 100)
                          )}
                        </span>
                        <span className="text-lg">
                          {selectedSkip.hire_period_days} days hire
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg">
                      Back
                    </Button>
                    <Button size="lg" className="px-8">
                      Continue <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 bg-transparent dark:bg-transparent"
          >
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm max-w-4xl mx-auto leading-relaxed">
              Imagery and information shown throughout this website may not
              reflect the exact shape or size specification, colours may vary,
              options and/or accessories may be featured at additional cost.
            </p>
          </motion.div>
        </div>
      </div>

      {isMobile && (
        <BottomSheet
          isOpen={!!selectedSkip}
          skip={selectedSkip}
          onClose={() => setSelectedSkipId(null)}
        />
      )}
    </div>
  );
}
