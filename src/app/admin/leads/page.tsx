import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Search, Eye, Calendar, MessageSquare } from 'lucide-react'

export default function LeadsPage() {
  // This would normally fetch real data from the database
  const leads = [
    {
      id: '1',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567'
      },
      type: 'Residential',
      status: 'new',
      priceRange: '$120 - $180',
      createdAt: '2024-01-15',
      source: 'Website Quote'
    },
    {
      id: '2',
      customer: {
        name: 'ABC Company',
        email: 'contact@abc.com',
        phone: '(555) 987-6543'
      },
      type: 'Commercial',
      status: 'contacted',
      priceRange: '$450 - $650',
      createdAt: '2024-01-14',
      source: 'Website Quote'
    },
    {
      id: '3',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '(555) 456-7890'
      },
      type: 'Residential',
      status: 'scheduled',
      priceRange: '$95 - $140',
      createdAt: '2024-01-13',
      source: 'Phone Call'
    },
    {
      id: '4',
      customer: {
        name: 'Mike Rodriguez',
        email: 'mike@example.com',
        phone: '(555) 321-0987'
      },
      type: 'Commercial',
      status: 'converted',
      priceRange: '$320 - $480',
      createdAt: '2024-01-12',
      source: 'Website Quote'
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'default',
      contacted: 'secondary',
      scheduled: 'outline',
      converted: 'default',
      lost: 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads & Quotes</h1>
        <p className="text-gray-600">Manage your leads and quote requests</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            {leads.length} total leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.customer.name}</p>
                      <p className="text-sm text-gray-600">{lead.customer.email}</p>
                      <p className="text-sm text-gray-600">{lead.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(lead.status)}
                  </TableCell>
                  <TableCell className="font-medium">{lead.priceRange}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
