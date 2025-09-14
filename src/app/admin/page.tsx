import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock
} from 'lucide-react'

export default function AdminDashboard() {
  // This would normally fetch real data from the database
  const stats = {
    totalLeads: 24,
    newLeads: 8,
    scheduledEstimates: 12,
    activeJobs: 6,
    pendingInvoices: 3,
    monthlyRevenue: 12500
  }

  const recentLeads = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      type: 'Residential',
      status: 'new',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'ABC Company',
      email: 'contact@abc.com',
      type: 'Commercial',
      status: 'contacted',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      type: 'Residential',
      status: 'scheduled',
      createdAt: '2024-01-13'
    }
  ]

  const upcomingAppointments = [
    {
      id: '1',
      customer: 'Mike Rodriguez',
      type: 'Estimate',
      date: '2024-01-16',
      time: '10:00 AM'
    },
    {
      id: '2',
      customer: 'Jennifer Chen',
      type: 'Job',
      date: '2024-01-16',
      time: '2:00 PM'
    },
    {
      id: '3',
      customer: 'David Wilson',
      type: 'Estimate',
      date: '2024-01-17',
      time: '9:00 AM'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newLeads} new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Estimates</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledEstimates}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest quote requests and inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                    <p className="text-xs text-gray-500">{lead.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={
                        lead.status === 'new' ? 'default' :
                        lead.status === 'contacted' ? 'secondary' :
                        'outline'
                      }
                    >
                      {lead.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{lead.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Today and tomorrow&apos;s schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{appointment.customer}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
