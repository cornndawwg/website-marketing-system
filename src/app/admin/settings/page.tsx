import { IntegrationsSettings } from '@/components/admin/integrations-settings'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your application settings and integrations</p>
      </div>

      <IntegrationsSettings />
    </div>
  )
}
