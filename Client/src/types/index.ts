export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  studentId?: string
  phoneNumber?: string
  role: 'Student' | 'Event Organizer' | 'Admin' | 'Faculty'
  college: {
    name: string
    code: string
  }
  department: string
  academicYear: string
  interests: string[]
  profilePicture?: string
  isEmailVerified: boolean
  notificationPreferences: {
    email: boolean
    push: boolean
    sms: boolean
    eventReminders: boolean
    eventUpdates: boolean
    newEvents: boolean
  }
  registeredEvents: Event[]
  attendedEvents: Array<{
    event: Event
    attendedAt: string
  }>
  createdAt: string
  lastLogin?: string
}

export interface Event {
  id: string
  title: string
  description: string
  shortDescription?: string
  date: string
  time: string
  endDate?: string
  endTime?: string
  isMultiDay: boolean
  location: string
  venue?: {
    name: string
    address: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  category: string
  subCategory?: string
  tags: string[]
  organizer: User
  coOrganizers: User[]
  maxParticipants?: number
  registeredUsers: User[]
  registeredCount: number
  waitlistUsers: User[]
  registrationDeadline: string
  registrationStartDate: string
  requirements: string[]
  prerequisites: string[]
  contactInfo: {
    email?: string
    phone?: string
    alternateContact?: string
  }
  eventImages: Array<{
    url: string
    caption?: string
    isPrimary: boolean
  }>
  eventDocuments: Array<{
    name: string
    url: string
    type: string
  }>
  isActive: boolean
  isPublic: boolean
  isFree: boolean
  registrationFee: {
    amount: number
    currency: string
  }
  paymentRequired: boolean
  approvalStatus: 'Pending' | 'Approved' | 'Rejected'
  approvedBy?: User
  approvedAt?: string
  rejectionReason?: string
  featured: boolean
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  targetAudience: {
    departments: string[]
    academicYears: string[]
    colleges: string[]
    interests: string[]
  }
  eventStats: {
    views: number
    shares: number
    likes: number
  }
  feedback: Array<{
    user: User
    rating: number
    comment: string
    createdAt: string
  }>
  averageRating: number
  reminders: Array<{
    type: string
    message: string
    scheduledFor: string
    sent: boolean
  }>
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  recipient: User
  sender: User
  title: string
  message: string
  type: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  event?: Event
  isRead: boolean
  readAt?: string
  actionUrl?: string
  actionText?: string
  metadata: Record<string, any>
  scheduledFor: string
  sentAt?: string
  deliveryStatus: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced'
  deliveryMethod: 'in_app' | 'email' | 'sms' | 'push'
  retryCount: number
  maxRetries: number
  expiresAt: string
  isArchived: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface College {
  id: string
  name: string
  code: string
  description?: string
  type: 'Government' | 'Private' | 'Deemed' | 'Autonomous' | 'Central' | 'State'
  category: 'Engineering' | 'Medical' | 'Arts' | 'Science' | 'Commerce' | 'Law' | 'Management' | 'Pharmacy' | 'Agriculture' | 'Other'
  address: {
    street: string
    city: string
    state: string
    pincode: string
    country: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  contactInfo: {
    phone?: string
    email?: string
    website?: string
  }
  establishedYear?: number
  accreditation: {
    naac: {
      grade?: string
      validUntil?: string
    }
    nba: {
      accredited: boolean
      validUntil?: string
    }
    other: Array<{
      name: string
      grade: string
      validUntil: string
    }>
  }
  departments: Array<{
    name: string
    code: string
    head?: User
    establishedYear?: number
    description?: string
    programs: Array<{
      name: string
      duration: string
      level: 'UG' | 'PG' | 'PhD' | 'Diploma' | 'Certificate'
    }>
  }>
  facilities: Array<{
    name: string
    description?: string
    capacity?: number
    isAvailable: boolean
  }>
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  images: Array<{
    url: string
    caption?: string
    isPrimary: boolean
  }>
  isActive: boolean
  isVerified: boolean
  verifiedBy?: User
  verifiedAt?: string
  adminUsers: Array<{
    user: User
    role: 'Super Admin' | 'Admin' | 'Moderator'
    assignedAt: string
  }>
  settings: {
    allowEventCreation: boolean
    requireEventApproval: boolean
    allowStudentRegistration: boolean
    maxEventsPerUser: number
    notificationSettings: {
      newEventNotification: boolean
      eventUpdateNotification: boolean
      systemMaintenanceNotification: boolean
    }
  }
  statistics: {
    totalStudents: number
    totalFaculty: number
    totalEvents: number
    activeEvents: number
  }
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    tokens: {
      accessToken: string
      refreshToken: string
      expiresIn: string
    }
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  meta?: {
    pagination?: {
      currentPage: number
      totalPages: number
      totalItems: number
      itemsPerPage: number
      hasNext: boolean
      hasPrev: boolean
      nextPage?: number
      prevPage?: number
    }
  }
  errors?: Array<{
    field: string
    message: string
    value: any
  }>
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface EventFilters extends PaginationParams {
  category?: string
  location?: string
  date?: string
  tags?: string
  q?: string
}

export interface UserFilters extends PaginationParams {
  role?: string
  college?: string
  department?: string
  academicYear?: string
  isActive?: boolean
  isEmailVerified?: boolean
  q?: string
}

export interface NotificationFilters extends PaginationParams {
  type?: string
  priority?: string
  isRead?: boolean
  q?: string
}

export interface CollegeFilters extends PaginationParams {
  type?: string
  category?: string
  state?: string
  city?: string
  isVerified?: boolean
  isActive?: boolean
  q?: string
}
