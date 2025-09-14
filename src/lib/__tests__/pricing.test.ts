import { calculateResidentialPrice, calculateCommercialPrice } from '../pricing'

describe('Pricing Engine', () => {
  describe('Residential Pricing', () => {
    it('should calculate basic residential price correctly', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: [],
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result).toEqual({
        basePrice: 100, // 10 windows * $10
        addOnPrice: 0,
        frequencyMultiplier: 1,
        accessMultiplier: 1,
        travelCost: 0,
        totalPrice: 100
      })
    })

    it('should apply add-ons correctly', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: ['screens', 'tracks'],
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result.addOnPrice).toBe(30) // $15 + $15
      expect(result.totalPrice).toBe(130) // $100 + $30
    })

    it('should apply frequency discounts correctly', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: [],
        frequency: 'monthly',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result.frequencyMultiplier).toBe(0.8) // 20% discount
      expect(result.totalPrice).toBe(80) // $100 * 0.8
    })

    it('should apply access difficulty multipliers correctly', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: [],
        frequency: 'one-time',
        accessDifficulty: 'difficult',
        travelDistance: 5
      })

      expect(result.accessMultiplier).toBe(1.5) // 50% increase
      expect(result.totalPrice).toBe(150) // $100 * 1.5
    })

    it('should apply travel costs correctly', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: [],
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 25
      })

      expect(result.travelCost).toBe(25) // $1 per mile over 20
      expect(result.totalPrice).toBe(125) // $100 + $25
    })

    it('should handle complex pricing scenarios', () => {
      const result = calculateResidentialPrice({
        windows: 20,
        addOns: ['screens', 'tracks', 'gutters'],
        frequency: 'bi-weekly',
        accessDifficulty: 'moderate',
        travelDistance: 30
      })

      expect(result.basePrice).toBe(200) // 20 windows * $10
      expect(result.addOnPrice).toBe(45) // $15 + $15 + $15
      expect(result.frequencyMultiplier).toBe(0.9) // 10% discount
      expect(result.accessMultiplier).toBe(1.25) // 25% increase
      expect(result.travelCost).toBe(10) // $1 per mile over 20
      
      // Total: (200 + 45) * 0.9 * 1.25 + 10 = 245 * 0.9 * 1.25 + 10 = 275.625 + 10 = 285.625
      expect(result.totalPrice).toBe(286) // Rounded up
    })
  })

  describe('Commercial Pricing', () => {
    it('should calculate basic commercial price correctly', () => {
      const result = calculateCommercialPrice({
        panels: 50,
        height: 'ground',
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result).toEqual({
        basePrice: 250, // 50 panels * $5
        heightMultiplier: 1,
        frequencyMultiplier: 1,
        accessMultiplier: 1,
        travelCost: 0,
        totalPrice: 250
      })
    })

    it('should apply height multipliers correctly', () => {
      const result = calculateCommercialPrice({
        panels: 50,
        height: 'high',
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result.heightMultiplier).toBe(2) // 100% increase
      expect(result.totalPrice).toBe(500) // $250 * 2
    })

    it('should apply frequency discounts correctly', () => {
      const result = calculateCommercialPrice({
        panels: 50,
        height: 'ground',
        frequency: 'weekly',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result.frequencyMultiplier).toBe(0.7) // 30% discount
      expect(result.totalPrice).toBe(175) // $250 * 0.7
    })

    it('should handle complex commercial pricing scenarios', () => {
      const result = calculateCommercialPrice({
        panels: 100,
        height: 'medium',
        frequency: 'monthly',
        accessDifficulty: 'difficult',
        travelDistance: 40
      })

      expect(result.basePrice).toBe(500) // 100 panels * $5
      expect(result.heightMultiplier).toBe(1.5) // 50% increase
      expect(result.frequencyMultiplier).toBe(0.8) // 20% discount
      expect(result.accessMultiplier).toBe(1.5) // 50% increase
      expect(result.travelCost).toBe(20) // $1 per mile over 20
      
      // Total: 500 * 1.5 * 0.8 * 1.5 + 20 = 500 * 1.8 + 20 = 900 + 20 = 920
      expect(result.totalPrice).toBe(920)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero windows/panels', () => {
      const residentialResult = calculateResidentialPrice({
        windows: 0,
        addOns: [],
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      const commercialResult = calculateCommercialPrice({
        panels: 0,
        height: 'ground',
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(residentialResult.totalPrice).toBe(0)
      expect(commercialResult.totalPrice).toBe(0)
    })

    it('should handle maximum travel distance', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: [],
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 100
      })

      expect(result.travelCost).toBe(80) // $1 per mile over 20
      expect(result.totalPrice).toBe(180) // $100 + $80
    })

    it('should handle all add-ons', () => {
      const result = calculateResidentialPrice({
        windows: 10,
        addOns: ['screens', 'tracks', 'gutters', 'pressure-wash'],
        frequency: 'one-time',
        accessDifficulty: 'easy',
        travelDistance: 5
      })

      expect(result.addOnPrice).toBe(60) // $15 + $15 + $15 + $15
      expect(result.totalPrice).toBe(160) // $100 + $60
    })
  })
})
