'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Reply, 
  Phone, 
  Mail,
  Clock,
  User
} from 'lucide-react'

interface Message {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  direction: 'in' | 'out'
  medium: 'web' | 'sms' | 'email' | 'phone'
  subject?: string
  body: string
  status: 'new' | 'read' | 'replied' | 'resolved'
  createdAt: Date
  isUrgent?: boolean
}

export function MessageInbox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerPhone: '(555) 123-4567',
      direction: 'in',
      medium: 'web',
      subject: 'Quote Request',
      body: 'Hi, I\'m interested in getting a quote for window cleaning for my home. I have about 20 windows on two floors.',
      status: 'new',
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isUrgent: false
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      direction: 'in',
      medium: 'email',
      subject: 'Appointment Question',
      body: 'I have an appointment scheduled for tomorrow but need to reschedule. Can we move it to next week?',
      status: 'read',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isUrgent: true
    },
    {
      id: '3',
      customerName: 'Mike Rodriguez',
      customerEmail: 'mike@example.com',
      direction: 'out',
      medium: 'email',
      subject: 'Re: Quote Request',
      body: 'Thank you for your interest! I\'ve sent you a detailed quote via email. Please let me know if you have any questions.',
      status: 'replied',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      isUrgent: false
    }
  ])

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [mediumFilter, setMediumFilter] = useState('all')

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.body.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    const matchesMedium = mediumFilter === 'all' || message.medium === mediumFilter
    
    return matchesSearch && matchesStatus && matchesMedium
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'default',
      read: 'secondary',
      replied: 'outline',
      resolved: 'default'
    } as const

    const colors = {
      new: 'bg-red-100 text-red-800',
      read: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    }

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    )
  }

  const getMediumIcon = (medium: string) => {
    switch (medium) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'phone':
        return <Phone className="h-4 w-4" />
      case 'sms':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const handleReply = (message: Message) => {
    setSelectedMessage(message)
    setReplyText('')
  }

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return

    const reply: Message = {
      id: Date.now().toString(),
      customerName: 'You',
      customerEmail: 'admin@company.com',
      direction: 'out',
      medium: selectedMessage.medium,
      subject: `Re: ${selectedMessage.subject || 'Message'}`,
      body: replyText,
      status: 'replied',
      createdAt: new Date()
    }

    setMessages(prev => [reply, ...prev])
    
    // Update original message status
    setMessages(prev => prev.map(msg => 
      msg.id === selectedMessage.id 
        ? { ...msg, status: 'replied' as const }
        : msg
    ))

    setReplyText('')
    setSelectedMessage(null)
  }

  const cannedResponses = [
    'Thank you for your message. We\'ll get back to you within 24 hours.',
    'Your quote request has been received. We\'ll contact you soon to schedule an estimate.',
    'We\'ve received your reschedule request. We\'ll call you to confirm the new time.',
    'Thank you for choosing our services. We look forward to serving you!'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Message Inbox</h2>
        <p className="text-gray-600">Manage customer communications across all channels</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={mediumFilter} onValueChange={setMediumFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="web">Web Chat</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Messages ({filteredMessages.length})</CardTitle>
              <CardDescription>
                Customer communications from all channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      message.status === 'new' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{message.customerName}</span>
                          {message.isUrgent && (
                            <Badge variant="destructive" className="text-xs">Urgent</Badge>
                          )}
                          {getStatusBadge(message.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {message.subject && <strong>{message.subject}</strong>}
                          {message.subject && ' - '}
                          {message.body.length > 100 
                            ? `${message.body.substring(0, 100)}...` 
                            : message.body
                          }
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            {getMediumIcon(message.medium)}
                            <span className="capitalize">{message.medium}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{message.createdAt.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReply(message)
                        }}
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Details and Reply */}
        <div>
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Message Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">{selectedMessage.customerName}</h4>
                  <p className="text-sm text-gray-600">{selectedMessage.customerEmail}</p>
                  {selectedMessage.customerPhone && (
                    <p className="text-sm text-gray-600">{selectedMessage.customerPhone}</p>
                  )}
                </div>

                {selectedMessage.subject && (
                  <div>
                    <h5 className="font-medium">Subject</h5>
                    <p className="text-sm text-gray-600">{selectedMessage.subject}</p>
                  </div>
                )}

                <div>
                  <h5 className="font-medium">Message</h5>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedMessage.body}</p>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">Quick Replies</h5>
                  <div className="space-y-2">
                    {cannedResponses.map((response, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-2"
                        onClick={() => setReplyText(response)}
                      >
                        <span className="text-xs">{response}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">Reply</h5>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows={4}
                  />
                  <Button 
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="w-full mt-2"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a message to view details and reply</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
