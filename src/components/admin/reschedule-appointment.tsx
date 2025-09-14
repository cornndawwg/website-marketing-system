'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, MapPin, User, Save, Send } from 'lucide-react'

interface Appointment {
  id: string
  customerName: string
  customerEmail: string
  type: 'estimate' | 'job'
  currentDate: string
  currentTime: string
  address: string
  notes?: string
  gcEventId?: string
}

interface RescheduleAppointmentProps {
  appointment: Appointment
  onSave: (appointmentId: string, newDate: string, newTime: string, notes?: string) => Promise<void>
  onSendConfirmation: (appointmentId: string) => Promise<void>
}

export function RescheduleAppointment({ appointment, onSave, onSendConfirmation }: RescheduleAppointmentProps) {
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [notes, setNotes] = useState(appointment.notes || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSave = async () => {
    if (!newDate || !newTime) {
      alert('Please select a new date and time')
      return
    }

    setIsSaving(true)
    try {
      await onSave(appointment.id, newDate, newTime, notes)
      alert('Appointment rescheduled successfully!')
    } catch (error) {
      alert('Failed to reschedule appointment')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendConfirmation = async () => {
    setIsSending(true)
    try {
      await onSendConfirmation(appointment.id)
      alert('Confirmation email sent!')
    } catch (error) {
      alert('Failed to send confirmation email')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Reschedule Appointment
        </CardTitle>
        <CardDescription>
          Update the appointment details and notify the customer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Appointment Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            Current Appointment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Customer:</strong> {appointment.customerName}</p>
              <p><strong>Email:</strong> {appointment.customerEmail}</p>
              <p><strong>Type:</strong> {appointment.type === 'estimate' ? 'Estimate' : 'Job'}</p>
            </div>
            <div>
              <p><strong>Current Date:</strong> {appointment.currentDate}</p>
              <p><strong>Current Time:</strong> {appointment.currentTime}</p>
              <p><strong>Address:</strong> {appointment.address}</p>
            </div>
          </div>
        </div>

        {/* New Appointment Details */}
        <div className="space-y-4">
          <h4 className="font-semibold">New Appointment Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-date">New Date</Label>
              <Input
                id="new-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-time">New Time</Label>
              <Input
                id="new-time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about the reschedule..."
              rows={3}
            />
          </div>
        </div>

        {/* Quick Time Slots */}
        <div className="space-y-2">
          <Label>Quick Time Selection</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
              <Button
                key={time}
                variant="outline"
                size="sm"
                onClick={() => setNewTime(time)}
                className={newTime === time ? 'bg-blue-100 border-blue-300' : ''}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t">
          <Button 
            onClick={handleSave} 
            disabled={isSaving || !newDate || !newTime}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Save className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSendConfirmation}
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Send className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Confirmation
              </>
            )}
          </Button>
        </div>

        {/* Reschedule Reasons */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Common Reschedule Reasons</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto p-2"
              onClick={() => setNotes(prev => prev + (prev ? '\n' : '') + 'Customer requested reschedule - weather concerns')}
            >
              Weather concerns
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto p-2"
              onClick={() => setNotes(prev => prev + (prev ? '\n' : '') + 'Customer requested reschedule - scheduling conflict')}
            >
              Scheduling conflict
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto p-2"
              onClick={() => setNotes(prev => prev + (prev ? '\n' : '') + 'Customer requested reschedule - access issues')}
            >
              Access issues
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto p-2"
              onClick={() => setNotes(prev => prev + (prev ? '\n' : '') + 'Customer requested reschedule - personal reasons')}
            >
              Personal reasons
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
