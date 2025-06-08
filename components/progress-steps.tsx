"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Trash2,
  Truck,
  ClipboardCheck,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProgressStepsProps {
  currentStep: number;
}

const steps = [
  { icon: MapPin, label: "Postcode" },
  { icon: Trash2, label: "Waste Type" },
  { icon: Truck, label: "Select Skip" },
  { icon: ClipboardCheck, label: "Permit Check" },
  { icon: Calendar, label: "Choose Date" },
  { icon: CreditCard, label: "Payment" },
];

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="hidden lg:flex justify-center">
        <div className="flex items-center justify-between max-w-4xl w-full px-6 py-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      isCompleted || isActive
                        ? "bg-[#1865f1] dark:bg-blue-600 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400",
                      isActive && "animate-blip"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 whitespace-nowrap",
                      isCompleted || isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-gray-300 dark:bg-gray-600 relative overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-[#1865f1] dark:bg-blue-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width: isCompleted ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden relative">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 overflow-x-auto scrollbar-hide px-6 py-4"
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={index}
                className="flex items-center gap-6 flex-shrink-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      isCompleted || isActive
                        ? "bg-[#1865f1] dark:bg-blue-600 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400",
                      isActive && "animate-blip"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 whitespace-nowrap",
                      isCompleted || isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {!isLast && (
                  <div className="w-12">
                    <div className="h-0.5 bg-gray-300 dark:bg-gray-600 relative overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-[#1865f1] dark:bg-blue-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width: isCompleted ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {canScrollRight && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-gray-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
