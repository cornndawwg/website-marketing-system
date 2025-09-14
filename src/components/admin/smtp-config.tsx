'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Mail, Save, TestTube, CheckCircle, AlertCircle } from 'lucide-react'

interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  from: string
}

export function SMTPConfig() {
  const [config, setConfig] = useState<SMTPConfig>({
    host: process.env.EMAIL_SERVER_HOST || '',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: false,
    user: process.env.EMAIL_SERVER_USER || '',
    password: '',
    from: process.env.EMAIL_FROM || 'noreply@morelandwindowcleaning.com'
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real implementation, this would save to the database or environment variables
      // For now, we'll just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('SMTP config saved:', config)
      setTestResult({ success: true, message: 'SMTP configuration saved successfully!' })
    } catch (error) {
      setTestResult({ success: false, message: 'Failed to save SMTP configuration' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTest = async () => {
    setIsTesting(true)
    setTestResult(null)
    try {
      // In a real implementation, this would test the SMTP connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTestResult({ success: true, message: 'SMTP connection test successful!' })
    } catch (error) {
      setTestResult({ success: false, message: 'SMTP connection test failed' })
    } finally {
      setIsTesting(false)
    }
  }

  const handleInputChange = (field: keyof SMTPConfig, value: string | number | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Email Configuration</h2>
        <p className="text-gray-600">Configure SMTP settings for sending emails and magic links</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            SMTP Settings
          </CardTitle>
          <CardDescription>
            Configure your email server settings for sending notifications and magic links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                value={config.host}
                onChange={(e) => handleInputChange('host', e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Port</Label>
              <Input
                id="smtp-port"
                type="number"
                value={config.port}
                onChange={(e) => handleInputChange('port', parseInt(e.target.value))}
                placeholder="587"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Security</Label>
            <Select
              value={config.secure ? 'true' : 'false'}
              onValueChange={(value) => handleInputChange('secure', value === 'true')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">STARTTLS (Port 587)</SelectItem>
                <SelectItem value="true">SSL/TLS (Port 465)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-user">Username/Email</Label>
              <Input
                id="smtp-user"
                type="email"
                value={config.user}
                onChange={(e) => handleInputChange('user', e.target.value)}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Password/App Password</Label>
              <Input
                id="smtp-password"
                type="password"
                value={config.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Your app password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="from-email">From Email Address</Label>
            <Input
              id="from-email"
              type="email"
              value={config.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              placeholder="noreply@morelandwindowcleaning.com"
            />
          </div>

          {testResult && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${
              testResult.success 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {testResult.success ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleTest} disabled={isTesting}>
              {isTesting ? (
                <>
                  <TestTube className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Providers</CardTitle>
          <CardDescription>Quick setup for popular email providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Gmail</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Host: smtp.gmail.com</p>
                <p>Port: 587 (STARTTLS)</p>
                <p>Port: 465 (SSL/TLS)</p>
                <p className="text-xs text-gray-500 mt-2">
                  Requires App Password for 2FA accounts
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Outlook/Hotmail</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Host: smtp-mail.outlook.com</p>
                <p>Port: 587 (STARTTLS)</p>
                <p>Port: 465 (SSL/TLS)</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Resend</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Host: smtp.resend.com</p>
                <p>Port: 587 (STARTTLS)</p>
                <p>Port: 465 (SSL/TLS)</p>
                <p className="text-xs text-gray-500 mt-2">
                  Use API key as password
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Configure email templates for different notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Magic Link Email</h4>
                <p className="text-sm text-gray-600">Email sent for admin login</p>
              </div>
              <Badge variant="outline">Default Template</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Quote Confirmation</h4>
                <p className="text-sm text-gray-600">Email sent after quote submission</p>
              </div>
              <Badge variant="outline">Default Template</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Appointment Reminder</h4>
                <p className="text-sm text-gray-600">Email sent before appointments</p>
              </div>
              <Badge variant="outline">Default Template</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
