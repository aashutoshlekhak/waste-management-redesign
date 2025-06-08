"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SelectButtonProps {
  isSelected: boolean;
  onClick: () => void;
}

export default function SelectButton({
  isSelected,
  onClick,
}: SelectButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        variant={isSelected ? "default" : "outline"}
        className={cn(
          "w-full font-medium text-sm py-5 transition-all duration-300 rounded-md",
          isSelected && "shadow-md"
        )}
        onClick={onClick}
      >
        {isSelected ? (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" /> Selected
          </span>
        ) : (
          "Select This Skip"
        )}
      </Button>
    </motion.div>
  );
}
