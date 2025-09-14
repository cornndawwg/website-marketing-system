'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Receipt, 
  Save, 
  Plus, 
  Trash2, 
  Calculator,
  MapPin,
  Percent
} from 'lucide-react'

interface TaxRate {
  id: string
  name: string
  rate: number
  type: 'percentage' | 'fixed'
  jurisdiction: string
  description?: string
  active: boolean
}

export function TaxConfiguration() {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    {
      id: '1',
      name: 'Georgia State Tax',
      rate: 4.0,
      type: 'percentage',
      jurisdiction: 'GA',
      description: 'Georgia state sales tax',
      active: true
    },
    {
      id: '2',
      name: 'Walton County Tax',
      rate: 1.0,
      type: 'percentage',
      jurisdiction: 'Walton County, GA',
      description: 'Local county tax',
      active: true
    }
  ])

  const [newTaxRate, setNewTaxRate] = useState<Partial<TaxRate>>({
    name: '',
    rate: 0,
    type: 'percentage',
    jurisdiction: '',
    description: '',
    active: true
  })

  const [isAdding, setIsAdding] = useState(false)

  const handleAddTaxRate = () => {
    if (!newTaxRate.name || !newTaxRate.jurisdiction) {
      alert('Please fill in required fields')
      return
    }

    const taxRate: TaxRate = {
      id: Date.now().toString(),
      name: newTaxRate.name,
      rate: newTaxRate.rate || 0,
      type: newTaxRate.type || 'percentage',
      jurisdiction: newTaxRate.jurisdiction,
      description: newTaxRate.description,
      active: newTaxRate.active ?? true
    }

    setTaxRates(prev => [...prev, taxRate])
    setNewTaxRate({
      name: '',
      rate: 0,
      type: 'percentage',
      jurisdiction: '',
      description: '',
      active: true
    })
    setIsAdding(false)
  }

  const handleDeleteTaxRate = (id: string) => {
    setTaxRates(prev => prev.filter(rate => rate.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setTaxRates(prev => prev.map(rate => 
      rate.id === id ? { ...rate, active: !rate.active } : rate
    ))
  }

  const calculateTotalTax = (amount: number) => {
    const activeRates = taxRates.filter(rate => rate.active)
    let totalTax = 0
    
    activeRates.forEach(rate => {
      if (rate.type === 'percentage') {
        totalTax += (amount * rate.rate) / 100
      } else {
        totalTax += rate.rate
      }
    })
    
    return totalTax
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tax Configuration</h2>
        <p className="text-gray-600">Configure tax rates for your invoices and payments</p>
      </div>

      {/* Tax Rates List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Tax Rates
          </CardTitle>
          <CardDescription>
            Manage tax rates that will be applied to your invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxRates.map((rate) => (
              <div key={rate.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{rate.name}</h4>
                    <Badge variant={rate.active ? 'default' : 'secondary'}>
                      {rate.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      <span>{rate.rate}{rate.type === 'percentage' ? '%' : ' (fixed)'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{rate.jurisdiction}</span>
                    </div>
                    {rate.description && (
                      <div className="md:col-span-1">
                        <span>{rate.description}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={rate.active}
                    onCheckedChange={() => handleToggleActive(rate.id)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTaxRate(rate.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {isAdding && (
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <h4 className="font-semibold mb-4">Add New Tax Rate</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax-name">Tax Name *</Label>
                    <Input
                      id="tax-name"
                      value={newTaxRate.name}
                      onChange={(e) => setNewTaxRate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., State Tax"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-jurisdiction">Jurisdiction *</Label>
                    <Input
                      id="tax-jurisdiction"
                      value={newTaxRate.jurisdiction}
                      onChange={(e) => setNewTaxRate(prev => ({ ...prev, jurisdiction: e.target.value }))}
                      placeholder="e.g., Georgia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Rate</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      step="0.01"
                      value={newTaxRate.rate}
                      onChange={(e) => setNewTaxRate(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-type">Type</Label>
                    <Select
                      value={newTaxRate.type}
                      onValueChange={(value) => setNewTaxRate(prev => ({ ...prev, type: value as 'percentage' | 'fixed' }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="tax-description">Description</Label>
                    <Input
                      id="tax-description"
                      value={newTaxRate.description}
                      onChange={(e) => setNewTaxRate(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Optional description"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddTaxRate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tax Rate
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {!isAdding && (
              <Button variant="outline" onClick={() => setIsAdding(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Tax Rate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tax Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tax Calculator
          </CardTitle>
          <CardDescription>
            Preview how taxes will be calculated on your invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="test-amount">Test Amount</Label>
                <Input
                  id="test-amount"
                  type="number"
                  step="0.01"
                  placeholder="100.00"
                  onChange={(e) => {
                    const amount = parseFloat(e.target.value) || 0
                    const totalTax = calculateTotalTax(amount)
                    const totalWithTax = amount + totalTax
                    
                    // Update display (in a real app, you'd use state)
                    const taxDisplay = document.getElementById('tax-display')
                    const totalDisplay = document.getElementById('total-display')
                    if (taxDisplay) taxDisplay.textContent = `$${totalTax.toFixed(2)}`
                    if (totalDisplay) totalDisplay.textContent = `$${totalWithTax.toFixed(2)}`
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Breakdown</Label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span id="subtotal-display">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span id="tax-display">$0.00</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1 mt-1">
                    <span>Total:</span>
                    <span id="total-display">$0.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Active Tax Rates:</h4>
              <div className="space-y-1">
                {taxRates.filter(rate => rate.active).map((rate) => (
                  <div key={rate.id} className="flex justify-between text-sm">
                    <span>{rate.name} ({rate.jurisdiction})</span>
                    <span>{rate.rate}{rate.type === 'percentage' ? '%' : ' (fixed)'}</span>
                  </div>
                ))}
                {taxRates.filter(rate => rate.active).length === 0 && (
                  <p className="text-sm text-gray-600">No active tax rates</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
          <CardDescription>
            Configure how taxes are handled in your invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Automatic Tax Calculation</h4>
                <p className="text-sm text-gray-600">Automatically calculate taxes on all invoices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Tax Inclusive Pricing</h4>
                <p className="text-sm text-gray-600">Include taxes in quoted prices</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Tax Exempt Customers</h4>
                <p className="text-sm text-gray-600">Allow tax exemption for certain customers</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
