'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { calculatePricing, PricingInputs } from '@/lib/pricing'
import { QuoteRequestForm } from '@/components/quote-request-form'
import { Calculator, DollarSign, X } from 'lucide-react'

interface QuoteCalculatorModalProps {
  children: React.ReactNode
}

export function QuoteCalculatorModal({ children }: QuoteCalculatorModalProps) {
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<'res' | 'com'>('res')
  const [inputs, setInputs] = useState<PricingInputs>({})
  const [result, setResult] = useState<{ priceMin: number; priceMax: number } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async () => {
    setIsCalculating(true)
    try {
      const pricing = calculatePricing(variant, inputs)
      setResult(pricing)
    } catch (error) {
      console.error('Error calculating pricing:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleWindowCountChange = (floor: string, value: string) => {
    const count = parseInt(value) || 0
    setInputs(prev => ({
      ...prev,
      windows: {
        ...prev.windows,
        [floor]: count
      }
    }))
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form when closing
    setTimeout(() => {
      setResult(null)
      setInputs({})
      setVariant('res')
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6" />
            Get Your Free Quote
          </DialogTitle>
          <DialogDescription className="text-base">
            Get an instant price range for your window cleaning needs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Type Selection */}
          <div className="space-y-2">
            <Label>Service Type</Label>
            <div className="flex gap-4">
              <Button
                variant={variant === 'res' ? 'default' : 'outline'}
                onClick={() => setVariant('res')}
                className="flex-1"
              >
                Residential
              </Button>
              <Button
                variant={variant === 'com' ? 'default' : 'outline'}
                onClick={() => setVariant('com')}
                className="flex-1"
              >
                Commercial
              </Button>
            </div>
          </div>

          {variant === 'res' ? (
            <>
              {/* Residential Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ground-windows">Ground Floor Windows</Label>
                  <Input
                    id="ground-windows"
                    type="number"
                    placeholder="0"
                    value={inputs.windows?.ground || ''}
                    onChange={(e) => handleWindowCountChange('ground', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="second-windows">Second Floor Windows</Label>
                  <Input
                    id="second-windows"
                    type="number"
                    placeholder="0"
                    value={inputs.windows?.second || ''}
                    onChange={(e) => handleWindowCountChange('second', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="third-windows">Third Floor Windows</Label>
                  <Input
                    id="third-windows"
                    type="number"
                    placeholder="0"
                    value={inputs.windows?.third || ''}
                    onChange={(e) => handleWindowCountChange('third', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Add-on Services</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={inputs.addOns?.screens || false}
                        onChange={(e) => handleInputChange('addOns', {
                          ...inputs.addOns,
                          screens: e.target.checked
                        })}
                      />
                      <span>Screen Cleaning</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={inputs.addOns?.tracks_sills || false}
                        onChange={(e) => handleInputChange('addOns', {
                          ...inputs.addOns,
                          tracks_sills: e.target.checked
                        })}
                      />
                      <span>Tracks & Sills</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={inputs.addOns?.hard_water || false}
                        onChange={(e) => handleInputChange('addOns', {
                          ...inputs.addOns,
                          hard_water: e.target.checked
                        })}
                      />
                      <span>Hard Water Stain Removal</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skylights">Number of Skylights</Label>
                  <Input
                    id="skylights"
                    type="number"
                    placeholder="0"
                    value={inputs.addOns?.skylight || ''}
                    onChange={(e) => handleInputChange('addOns', {
                      ...inputs.addOns,
                      skylight: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Commercial Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panels">Number of Panels</Label>
                  <Input
                    id="panels"
                    type="number"
                    placeholder="0"
                    value={inputs.panels || ''}
                    onChange={(e) => handleInputChange('panels', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height Tier</Label>
                  <Select
                    value={inputs.height_tier || ''}
                    onValueChange={(value) => handleInputChange('height_tier', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select height tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ground">Ground Level</SelectItem>
                      <SelectItem value="low">Low (1-2 stories)</SelectItem>
                      <SelectItem value="medium">Medium (3-5 stories)</SelectItem>
                      <SelectItem value="high">High (6+ stories)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={variant === 'res' ? inputs.frequency || '' : inputs.frequency_com || ''}
                onValueChange={(value) => handleInputChange(
                  variant === 'res' ? 'frequency' : 'frequency_com', 
                  value
                )}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {variant === 'res' ? (
                    <>
                      <SelectItem value="one_time">One Time</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="biannual">Bi-Annual</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi_weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travel-miles">Travel Distance (miles)</Label>
              <Input
                id="travel-miles"
                type="number"
                placeholder="0"
                value={inputs.travel_miles || ''}
                onChange={(e) => handleInputChange('travel_miles', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {variant === 'res' && (
            <div className="space-y-2">
              <Label>Access Difficulty</Label>
              <Select
                value={inputs.access || 'normal'}
                onValueChange={(value) => handleInputChange('access', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select access difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Access</SelectItem>
                  <SelectItem value="hard">Difficult Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleCalculate} 
            disabled={isCalculating}
            className="w-full"
            size="lg"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Price Range'}
          </Button>

          {result && (
            <div className="space-y-6">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Estimated Price Range</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ${result.priceMin} - ${result.priceMax}
                    </div>
                    <p className="text-sm text-green-700">
                      This is an estimated range. Fill out the form below for an exact quote.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <QuoteRequestForm 
                variant={variant}
                inputs={inputs}
                pricing={result}
                onSuccess={() => {
                  setResult(null)
                  setInputs({})
                  setOpen(false)
                }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
