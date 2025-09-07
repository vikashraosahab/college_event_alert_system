import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Calendar, MapPin, Users, Clock, Search, Plus, Star } from 'lucide-react'
import { formatDate, formatTime, truncateText } from '../lib/utils'
import api from '../lib/api'
import type { Event } from '../types'

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    'Academic', 'Cultural', 'Sports', 'Technical', 'Workshop',
    'Seminar', 'Conference', 'Competition', 'Festival', 'Social',
    'Career', 'Health', 'Environmental', 'Community Service', 'Other'
  ]

  useEffect(() => {
    fetchEvents()
  }, [searchTerm, selectedCategory, currentPage])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...(searchTerm && { q: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
      })

      const response = await api.get(`/events?${params}`)
      setEvents(response.data.data.events)
      setTotalPages(response.data.data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (eventId: string) => {
    try {
      await api.post(`/events/${eventId}/register`)
      // Refresh events to update registration status
      fetchEvents()
    } catch (error) {
      console.error('Error registering for event:', error)
    }
  }

  const handleUnregister = async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}/register`)
      // Refresh events to update registration status
      fetchEvents()
    } catch (error) {
      console.error('Error unregistering from event:', error)
    }
  }

  const isRegistered = (event: Event) => {
    return event.registeredUsers.some(user => user.id === 'current-user-id') // You'll need to get current user ID
  }

  const isRegistrationOpen = (event: Event) => {
    const now = new Date()
    const registrationDeadline = new Date(event.registrationDeadline)
    return now <= registrationDeadline && event.isActive
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
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-2">
            Discover and register for upcoming events
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            {event.eventImages.length > 0 && (
              <div className="aspect-video bg-muted">
                <img
                  src={event.eventImages[0].url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {truncateText(event.description, 100)}
                  </CardDescription>
                </div>
                {event.featured && (
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(event.date)} at {formatTime(event.time)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {event.registeredCount} registered
                  {event.maxParticipants && ` / ${event.maxParticipants}`}
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {event.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {isRegistrationOpen(event) ? 'Open' : 'Closed'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {/* Navigate to event details */}}
                  >
                    View Details
                  </Button>
                  {isRegistrationOpen(event) && (
                    <Button
                      size="sm"
                      className="flex-1"
                      variant={isRegistered(event) ? "destructive" : "default"}
                      onClick={() => 
                        isRegistered(event) 
                          ? handleUnregister(event.id)
                          : handleRegister(event.id)
                      }
                    >
                      {isRegistered(event) ? 'Unregister' : 'Register'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}

export default Events
