// Pricing engine for Moreland Window Cleaning
// Based on the JSON rule sets from the project scope

export interface PricingInputs {
  // Residential inputs
  windows?: {
    ground: number
    second: number
    third: number
  }
  addOns?: {
    screens: boolean
    tracks_sills: boolean
    hard_water: boolean
    skylight: number
  }
  access?: 'normal' | 'hard'
  frequency?: 'one_time' | 'quarterly' | 'biannual'
  travel_miles?: number
  
  // Commercial inputs
  panels?: number
  height_tier?: 'ground' | 'low' | 'medium' | 'high'
  frequency_com?: 'weekly' | 'bi_weekly' | 'monthly'
}

export interface PricingResult {
  priceMin: number
  priceMax: number
  breakdown: {
    base: number
    addOns: number
    travel: number
    total: number
  }
}

// Residential pricing rules
const residentialRules = {
  base: {
    per_window: {
      ground: [8, 10],
      second: [10, 12],
      third: [14, 16]
    }
  },
  addOns: {
    screens: { per_unit: [1.5, 2.5] },
    tracks_sills: { per_window: [1, 2] },
    hard_water: { per_window: [3, 6] },
    skylight: { per_unit: [8, 12] }
  },
  multipliers: {
    access_hard: 1.15,
    frequency_quarterly: 0.9,
    frequency_biannual: 0.95
  },
  travel: {
    base_miles: 20,
    per_mile: [0.5, 0.75]
  }
}

// Commercial pricing rules (simplified)
const commercialRules = {
  base: {
    per_panel: {
      ground: [2, 3],
      low: [3, 4],
      medium: [4, 6],
      high: [6, 10]
    }
  },
  multipliers: {
    frequency_weekly: 0.8,
    frequency_bi_weekly: 0.9,
    frequency_monthly: 1.0
  },
  travel: {
    base_miles: 20,
    per_mile: [0.5, 0.75]
  }
}

export function calculateResidentialPricing(inputs: PricingInputs): PricingResult {
  if (!inputs.windows) {
    throw new Error('Window counts are required for residential pricing')
  }

  const { windows, addOns = {}, access = 'normal', frequency = 'one_time', travel_miles = 0 } = inputs

  // Calculate base pricing
    const baseMin = 0
    const baseMax = 0

  baseMin += windows.ground * residentialRules.base.per_window.ground[0]
  baseMax += windows.ground * residentialRules.base.per_window.ground[1]

  baseMin += windows.second * residentialRules.base.per_window.second[0]
  baseMax += windows.second * residentialRules.base.per_window.second[1]

  baseMin += windows.third * residentialRules.base.per_window.third[0]
  baseMax += windows.third * residentialRules.base.per_window.third[1]

  // Calculate add-ons
  let addOnsMin = 0
  let addOnsMax = 0

  if (addOns.screens) {
    const screenCount = (windows.ground + windows.second + windows.third)
    addOnsMin += screenCount * residentialRules.addOns.screens.per_unit[0]
    addOnsMax += screenCount * residentialRules.addOns.screens.per_unit[1]
  }

  if (addOns.tracks_sills) {
    const windowCount = (windows.ground + windows.second + windows.third)
    addOnsMin += windowCount * residentialRules.addOns.tracks_sills.per_window[0]
    addOnsMax += windowCount * residentialRules.addOns.tracks_sills.per_window[1]
  }

  if (addOns.hard_water) {
    const windowCount = (windows.ground + windows.second + windows.third)
    addOnsMin += windowCount * residentialRules.addOns.hard_water.per_window[0]
    addOnsMax += windowCount * residentialRules.addOns.hard_water.per_window[1]
  }

  if (addOns.skylight > 0) {
    addOnsMin += addOns.skylight * residentialRules.addOns.skylight.per_unit[0]
    addOnsMax += addOns.skylight * residentialRules.addOns.skylight.per_unit[1]
  }

  // Calculate travel costs
  let travelMin = 0
  let travelMax = 0
  if (travel_miles > residentialRules.travel.base_miles) {
    const extraMiles = travel_miles - residentialRules.travel.base_miles
    travelMin = extraMiles * residentialRules.travel.per_mile[0]
    travelMax = extraMiles * residentialRules.travel.per_mile[1]
  }

  // Apply multipliers
  let multiplier = 1
  if (access === 'hard') {
    multiplier *= residentialRules.multipliers.access_hard
  }
  if (frequency === 'quarterly') {
    multiplier *= residentialRules.multipliers.frequency_quarterly
  } else if (frequency === 'biannual') {
    multiplier *= residentialRules.multipliers.frequency_biannual
  }

  const totalMin = Math.round((baseMin + addOnsMin + travelMin) * multiplier)
  const totalMax = Math.round((baseMax + addOnsMax + travelMax) * multiplier)

  return {
    priceMin: totalMin,
    priceMax: totalMax,
    breakdown: {
      base: Math.round((baseMin + baseMax) / 2 * multiplier),
      addOns: Math.round((addOnsMin + addOnsMax) / 2 * multiplier),
      travel: Math.round((travelMin + travelMax) / 2 * multiplier),
      total: Math.round((totalMin + totalMax) / 2)
    }
  }
}

export function calculateCommercialPricing(inputs: PricingInputs): PricingResult {
  if (!inputs.panels || !inputs.height_tier || !inputs.frequency_com) {
    throw new Error('Panel count, height tier, and frequency are required for commercial pricing')
  }

  const { panels, height_tier, frequency_com, travel_miles = 0 } = inputs

  // Calculate base pricing
  const baseRate = commercialRules.base.per_panel[height_tier]
  let baseMin = panels * baseRate[0]
  let baseMax = panels * baseRate[1]

  // Apply frequency multiplier
  let multiplier = 1
  if (frequency_com === 'weekly') {
    multiplier = commercialRules.multipliers.frequency_weekly
  } else if (frequency_com === 'bi_weekly') {
    multiplier = commercialRules.multipliers.frequency_bi_weekly
  } else if (frequency_com === 'monthly') {
    multiplier = commercialRules.multipliers.frequency_monthly
  }

  // Calculate travel costs
  let travelMin = 0
  let travelMax = 0
  if (travel_miles > commercialRules.travel.base_miles) {
    const extraMiles = travel_miles - commercialRules.travel.base_miles
    travelMin = extraMiles * commercialRules.travel.per_mile[0]
    travelMax = extraMiles * commercialRules.travel.per_mile[1]
  }

  const totalMin = Math.round((baseMin + travelMin) * multiplier)
  const totalMax = Math.round((baseMax + travelMax) * multiplier)

  return {
    priceMin: totalMin,
    priceMax: totalMax,
    breakdown: {
      base: Math.round((baseMin + baseMax) / 2 * multiplier),
      addOns: 0,
      travel: Math.round((travelMin + travelMax) / 2 * multiplier),
      total: Math.round((totalMin + totalMax) / 2)
    }
  }
}

export function calculatePricing(variant: 'res' | 'com', inputs: PricingInputs): PricingResult {
  if (variant === 'res') {
    return calculateResidentialPricing(inputs)
  } else {
    return calculateCommercialPricing(inputs)
  }
}
