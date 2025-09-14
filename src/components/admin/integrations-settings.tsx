'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Save, 
  TestTube, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Settings,
  Receipt
} from 'lucide-react'
import { TaxConfiguration } from './tax-configuration'

interface IntegrationSettings {
  email: {
    enabled: boolean
    provider: 'gmail' | 'outlook' | 'resend' | 'custom'
    host: string
    port: number
    secure: boolean
    user: string
    password: string
    from: string
  }
  googleCalendar: {
    enabled: boolean
    clientId: string
    clientSecret: string
    calendarId: string
    accessToken?: string
    refreshToken?: string
  }
  stripe: {
    enabled: boolean
    publishableKey: string
    secretKey: string
    webhookSecret: string
    accountId: string
  }
  chat: {
    enabled: boolean
    provider: 'chatwoot' | 'twilio' | 'custom'
    accessToken: string
    accountId: string
    phoneNumber?: string
  }
}

export function IntegrationsSettings() {
  const [settings, setSettings] = useState<IntegrationSettings>({
    email: {
      enabled: true,
      provider: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      user: '',
      password: '',
      from: 'noreply@morelandwindowcleaning.com'
    },
    googleCalendar: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      calendarId: '',
      accessToken: '',
      refreshToken: ''
    },
    stripe: {
      enabled: false,
      publishableKey: '',
      secretKey: '',
      webhookSecret: '',
      accountId: ''
    },
    chat: {
      enabled: false,
      provider: 'chatwoot',
      accessToken: '',
      accountId: '',
      phoneNumber: ''
    }
  })

  const [isSaving, setIsSaving] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({})

  const handleSave = async (integration: keyof IntegrationSettings) => {
    setIsSaving(true)
    try {
      // In a real implementation, this would save to the database
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTestResults(prev => ({
        ...prev,
        [integration]: { success: true, message: `${integration} configuration saved successfully!` }
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [integration]: { success: false, message: `Failed to save ${integration} configuration` }
      }))
    } finally {
      setIsSaving(false)
    }
  }

  const handleTest = async (integration: keyof IntegrationSettings) => {
    setTestResults(prev => ({
      ...prev,
      [integration]: { success: false, message: 'Testing connection...' }
    }))

    try {
      // In a real implementation, this would test the integration
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTestResults(prev => ({
        ...prev,
        [integration]: { success: true, message: `${integration} connection test successful!` }
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [integration]: { success: false, message: `${integration} connection test failed` }
      }))
    }
  }

  const handleInputChange = (integration: keyof IntegrationSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        [field]: value
      }
    }))
  }

  const getStatusBadge = (integration: keyof IntegrationSettings) => {
    const isEnabled = settings[integration].enabled
    const hasConfig = Object.values(settings[integration]).some(value => 
      typeof value === 'string' && value.length > 0
    )
    
    if (!isEnabled) return <Badge variant="secondary">Disabled</Badge>
    if (hasConfig) return <Badge variant="default">Configured</Badge>
    return <Badge variant="outline">Not Configured</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Integration Settings</h2>
        <p className="text-gray-600">Configure third-party integrations for your business</p>
      </div>

      <Tabs defaultValue="email" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="stripe" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Stripe
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Tax
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </div>
                {getStatusBadge('email')}
              </CardTitle>
              <CardDescription>
                Configure SMTP settings for sending emails and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="email-enabled"
                  checked={settings.email.enabled}
                  onChange={(e) => handleInputChange('email', 'enabled', e.target.checked)}
                />
                <Label htmlFor="email-enabled">Enable email notifications</Label>
              </div>

              <div className="space-y-2">
                <Label>Email Provider</Label>
                <Select
                  value={settings.email.provider}
                  onValueChange={(value) => {
                    handleInputChange('email', 'provider', value)
                    // Update default settings based on provider
                    if (value === 'gmail') {
                      handleInputChange('email', 'host', 'smtp.gmail.com')
                      handleInputChange('email', 'port', 587)
                      handleInputChange('email', 'secure', false)
                    } else if (value === 'outlook') {
                      handleInputChange('email', 'host', 'smtp-mail.outlook.com')
                      handleInputChange('email', 'port', 587)
                      handleInputChange('email', 'secure', false)
                    } else if (value === 'resend') {
                      handleInputChange('email', 'host', 'smtp.resend.com')
                      handleInputChange('email', 'port', 587)
                      handleInputChange('email', 'secure', false)
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="outlook">Outlook/Hotmail</SelectItem>
                    <SelectItem value="resend">Resend</SelectItem>
                    <SelectItem value="custom">Custom SMTP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-host">SMTP Host</Label>
                  <Input
                    id="email-host"
                    value={settings.email.host}
                    onChange={(e) => handleInputChange('email', 'host', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-port">Port</Label>
                  <Input
                    id="email-port"
                    type="number"
                    value={settings.email.port}
                    onChange={(e) => handleInputChange('email', 'port', parseInt(e.target.value))}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Security</Label>
                <Select
                  value={settings.email.secure ? 'true' : 'false'}
                  onValueChange={(value) => handleInputChange('email', 'secure', value === 'true')}
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
                  <Label htmlFor="email-user">Username/Email</Label>
                  <Input
                    id="email-user"
                    type="email"
                    value={settings.email.user}
                    onChange={(e) => handleInputChange('email', 'user', e.target.value)}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-password">Password/App Password</Label>
                  <Input
                    id="email-password"
                    type="password"
                    value={settings.email.password}
                    onChange={(e) => handleInputChange('email', 'password', e.target.value)}
                    placeholder="Your app password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-from">From Email Address</Label>
                <Input
                  id="email-from"
                  type="email"
                  value={settings.email.from}
                  onChange={(e) => handleInputChange('email', 'from', e.target.value)}
                  placeholder="noreply@yourcompany.com"
                />
              </div>

              {testResults.email && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  testResults.email.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {testResults.email.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span>{testResults.email.message}</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => handleSave('email')} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </Button>
                <Button variant="outline" onClick={() => handleTest('email')}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Google Calendar Settings */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Google Calendar Integration
                </div>
                {getStatusBadge('googleCalendar')}
              </CardTitle>
              <CardDescription>
                Connect your Google Calendar to sync appointments and events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="calendar-enabled"
                  checked={settings.googleCalendar.enabled}
                  onChange={(e) => handleInputChange('googleCalendar', 'enabled', e.target.checked)}
                />
                <Label htmlFor="calendar-enabled">Enable Google Calendar sync</Label>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Go to <a href="https://console.developers.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                  <li>2. Create a new project or select existing one</li>
                  <li>3. Enable Google Calendar API</li>
                  <li>4. Create OAuth 2.0 credentials</li>
                  <li>5. Add authorized redirect URI: {process.env.NEXTAUTH_URL}/api/auth/callback/google</li>
                  <li>6. Copy Client ID and Client Secret below</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calendar-client-id">Google Client ID</Label>
                  <Input
                    id="calendar-client-id"
                    value={settings.googleCalendar.clientId}
                    onChange={(e) => handleInputChange('googleCalendar', 'clientId', e.target.value)}
                    placeholder="your-client-id.googleusercontent.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calendar-client-secret">Google Client Secret</Label>
                  <Input
                    id="calendar-client-secret"
                    type="password"
                    value={settings.googleCalendar.clientSecret}
                    onChange={(e) => handleInputChange('googleCalendar', 'clientSecret', e.target.value)}
                    placeholder="Your client secret"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calendar-id">Calendar ID</Label>
                <Input
                  id="calendar-id"
                  value={settings.googleCalendar.calendarId}
                  onChange={(e) => handleInputChange('googleCalendar', 'calendarId', e.target.value)}
                  placeholder="primary or your-calendar-id@gmail.com"
                />
                <p className="text-sm text-gray-600">
                  Use "primary" for your main calendar, or the full email address for a specific calendar
                </p>
              </div>

              {settings.googleCalendar.clientId && settings.googleCalendar.clientSecret && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <Button asChild className="w-full">
                    <a 
                      href={`https://accounts.google.com/oauth/authorize?client_id=${settings.googleCalendar.clientId}&redirect_uri=${process.env.NEXTAUTH_URL}/api/auth/callback/google&scope=https://www.googleapis.com/auth/calendar&response_type=code`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect Google Calendar
                    </a>
                  </Button>
                </div>
              )}

              {testResults.googleCalendar && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  testResults.googleCalendar.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {testResults.googleCalendar.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span>{testResults.googleCalendar.message}</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => handleSave('googleCalendar')} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Calendar Settings
                </Button>
                <Button variant="outline" onClick={() => handleTest('googleCalendar')}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stripe Settings */}
        <TabsContent value="stripe" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Stripe Payment Processing
                </div>
                {getStatusBadge('stripe')}
              </CardTitle>
              <CardDescription>
                Configure Stripe for payment processing and invoicing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="stripe-enabled"
                  checked={settings.stripe.enabled}
                  onChange={(e) => handleInputChange('stripe', 'enabled', e.target.checked)}
                />
                <Label htmlFor="stripe-enabled">Enable Stripe payments</Label>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Create a <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="underline">Stripe account</a></li>
                  <li>2. Get your API keys from the Dashboard</li>
                  <li>3. Set up webhook endpoint: {process.env.NEXTAUTH_URL}/api/webhooks/stripe</li>
                  <li>4. Copy your keys below</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable">Publishable Key</Label>
                  <Input
                    id="stripe-publishable"
                    value={settings.stripe.publishableKey}
                    onChange={(e) => handleInputChange('stripe', 'publishableKey', e.target.value)}
                    placeholder="pk_test_..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Secret Key</Label>
                  <Input
                    id="stripe-secret"
                    type="password"
                    value={settings.stripe.secretKey}
                    onChange={(e) => handleInputChange('stripe', 'secretKey', e.target.value)}
                    placeholder="sk_test_..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                  <Input
                    id="stripe-webhook"
                    type="password"
                    value={settings.stripe.webhookSecret}
                    onChange={(e) => handleInputChange('stripe', 'webhookSecret', e.target.value)}
                    placeholder="whsec_..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-account">Account ID</Label>
                  <Input
                    id="stripe-account"
                    value={settings.stripe.accountId}
                    onChange={(e) => handleInputChange('stripe', 'accountId', e.target.value)}
                    placeholder="acct_..."
                  />
                </div>
              </div>

              {testResults.stripe && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  testResults.stripe.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {testResults.stripe.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span>{testResults.stripe.message}</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => handleSave('stripe')} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Stripe Settings
                </Button>
                <Button variant="outline" onClick={() => handleTest('stripe')}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Configuration */}
        <TabsContent value="tax" className="space-y-6">
          <TaxConfiguration />
        </TabsContent>

        {/* Chat Settings */}
        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat Integration
                </div>
                {getStatusBadge('chat')}
              </CardTitle>
              <CardDescription>
                Configure live chat and SMS communication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="chat-enabled"
                  checked={settings.chat.enabled}
                  onChange={(e) => handleInputChange('chat', 'enabled', e.target.checked)}
                />
                <Label htmlFor="chat-enabled">Enable chat integration</Label>
              </div>

              <div className="space-y-2">
                <Label>Chat Provider</Label>
                <Select
                  value={settings.chat.provider}
                  onValueChange={(value) => handleInputChange('chat', 'provider', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chatwoot">Chatwoot</SelectItem>
                    <SelectItem value="twilio">Twilio SMS</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chat-token">Access Token</Label>
                  <Input
                    id="chat-token"
                    type="password"
                    value={settings.chat.accessToken}
                    onChange={(e) => handleInputChange('chat', 'accessToken', e.target.value)}
                    placeholder="Your access token"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chat-account">Account ID</Label>
                  <Input
                    id="chat-account"
                    value={settings.chat.accountId}
                    onChange={(e) => handleInputChange('chat', 'accountId', e.target.value)}
                    placeholder="Your account ID"
                  />
                </div>
              </div>

              {settings.chat.provider === 'twilio' && (
                <div className="space-y-2">
                  <Label htmlFor="chat-phone">Phone Number</Label>
                  <Input
                    id="chat-phone"
                    value={settings.chat.phoneNumber || ''}
                    onChange={(e) => handleInputChange('chat', 'phoneNumber', e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
              )}

              {testResults.chat && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  testResults.chat.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {testResults.chat.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span>{testResults.chat.message}</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => handleSave('chat')} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Chat Settings
                </Button>
                <Button variant="outline" onClick={() => handleTest('chat')}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
