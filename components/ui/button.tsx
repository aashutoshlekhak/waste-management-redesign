import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold",
  {
    variants: {
      variant: {
        default: cn(
          "border border-[#1865f1] bg-gradient-to-b from-[#1865f1] to-[#0d47a1] text-white",
          "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.2)_inset]",
          "hover:border-[#40b9fd] hover:from-[#40b9fd] hover:to-[#1e88e5]",
        ),
        destructive: cn(
          "border border-red-500 bg-gradient-to-b from-[#EF4444] to-[#CE2121] text-white",
          "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.2)_inset]",
          "hover:border-red-400 hover:from-[#F87171] hover:to-[#EE3A3A]",
        ),
        outline: cn(
          "border border-gray-300 bg-gradient-to-b from-[#FFFFFF] to-[#F9FAFB] text-gray-900",
          "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.6)_inset]",
          "hover:from-[#F9FAFB] hover:to-[#F3F4F6] hover:border-[#1865f1] hover:text-[#1865f1]",
        ),
        secondary: cn(
          "border border-[#40b9fd] bg-gradient-to-b from-[#FFFFFF] to-[#F3F4F6] text-[#1865f1]",
          "shadow-[0px_0px_0px_1px_rgba(255,255,255,0.6)_inset]",
          "hover:from-[#F9FAFB] hover:to-[#E5E7EB] hover:border-[#1865f1]",
        ),
        ghost: cn("text-gray-900", "hover:bg-gradient-to-b hover:from-[#F9FAFB] hover:to-[#F3F4F6]"),
        link: cn("text-[#1865f1] underline underline-offset-4 hover:text-[#40b9fd]"),
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, loading, disabled, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        type={type ?? "button"}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
