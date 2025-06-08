import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SkipData, PricingBreakdown } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotalPrice(priceBeforeVat: number, vat: number): number {
  return Math.round(priceBeforeVat * (1 + vat / 100))
}

export function calculatePricingBreakdown(skip: SkipData): PricingBreakdown {
  const basePrice = skip.price_before_vat
  const transportCost = skip.transport_cost || 0
  const perTonneCost = skip.per_tonne_cost || 0
  const subtotal = basePrice + transportCost + perTonneCost
  const vatAmount = Math.round(subtotal * (skip.vat / 100))
  const total = subtotal + vatAmount

  return {
    basePrice,
    transportCost,
    perTonneCost,
    subtotal,
    vat: skip.vat,
    vatAmount,
    total,
  }
}

export function formatPrice(price: number): string {
  return `£${price}`
}

export function getSkipById(skipData: SkipData[], id: number): SkipData | undefined {
  return skipData.find((skip) => skip.id === id)
}

export function isSkipForbidden(skip: SkipData): boolean {
  return skip.forbidden
}

export function hasTransportCosts(skip: SkipData): boolean {
  return skip.transport_cost !== null && skip.transport_cost > 0
}

export function hasPerTonneCosts(skip: SkipData): boolean {
  return skip.per_tonne_cost !== null && skip.per_tonne_cost > 0
}

export function getSkipRestrictions(skip: SkipData): string[] {
  const restrictions: string[] = []

  if (!skip.allowed_on_road) {
    restrictions.push("Not allowed on road")
  }

  if (!skip.allows_heavy_waste) {
    restrictions.push("No heavy waste")
  }

  if (skip.forbidden) {
    restrictions.push("Currently unavailable")
  }

  return restrictions
}

export function getSkipFeatures(skip: SkipData): string[] {
  const features: string[] = []

  if (skip.allowed_on_road) {
    features.push("Road placement available")
  }

  if (skip.allows_heavy_waste) {
    features.push("Heavy waste compatible")
  }

  if (hasTransportCosts(skip)) {
    features.push("Includes transport")
  }

  return features
}
