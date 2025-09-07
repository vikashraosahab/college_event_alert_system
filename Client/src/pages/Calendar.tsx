import React, { useState, useEffect } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views, type View } from 'react-big-calendar'
import moment from 'moment'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Calendar as CalendarIcon, List, Grid } from 'lucide-react'
import { formatDate, formatTime } from '../lib/utils'
import api from '../lib/api'
import type { Event } from '../types'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<View>(Views.MONTH)
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/events?limit=100')
      setEvents(response.data.data.events)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(`${event.date}T${event.time}`),
    end: event.endDate && event.endTime 
      ? new Date(`${event.endDate}T${event.endTime}`)
      : new Date(`${event.date}T${event.time}`),
    resource: event,
  }))

  const eventStyleGetter = (event: any) => {
    const eventData = event.resource as Event
    let backgroundColor = '#3b82f6' // Default blue
    
    switch (eventData.category) {
      case 'Academic':
        backgroundColor = '#10b981' // Green
        break
      case 'Cultural':
        backgroundColor = '#f59e0b' // Yellow
        break
      case 'Sports':
        backgroundColor = '#ef4444' // Red
        break
      case 'Technical':
        backgroundColor = '#8b5cf6' // Purple
        break
      case 'Workshop':
        backgroundColor = '#06b6d4' // Cyan
        break
      default:
        backgroundColor = '#3b82f6' // Blue
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    }
  }

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event.resource)
  }

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            View events in calendar format
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant={view === Views.MONTH ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(Views.MONTH)}
          >
            <Grid className="h-4 w-4 mr-2" />
            Month
          </Button>
          <Button
            variant={view === Views.WEEK ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(Views.WEEK)}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Week
          </Button>
          <Button
            variant={view === Views.DAY ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(Views.DAY)}
          >
            <List className="h-4 w-4 mr-2" />
            Day
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px]">
                <BigCalendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  view={view}
                  date={date}
                  onNavigate={handleNavigate}
                  onView={handleViewChange}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventStyleGetter}
                  style={{ height: '100%' }}
                  popup
                  showMultiDayTimes
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvent ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedEvent.category}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formatDate(selectedEvent.date)} at {formatTime(selectedEvent.time)}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedEvent.registeredCount} registered
                      {selectedEvent.maxParticipants && ` / ${selectedEvent.maxParticipants}`}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full">
                    View Full Details
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an event to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Event Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'Academic', color: 'bg-green-500' },
                  { name: 'Cultural', color: 'bg-yellow-500' },
                  { name: 'Sports', color: 'bg-red-500' },
                  { name: 'Technical', color: 'bg-purple-500' },
                  { name: 'Workshop', color: 'bg-cyan-500' },
                  { name: 'Other', color: 'bg-blue-500' },
                ].map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${category.color}`}></div>
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar
