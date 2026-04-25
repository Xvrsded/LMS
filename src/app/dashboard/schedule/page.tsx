'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Video, MapPin, Users, ChevronLeft, ChevronRight, Plus, Filter, Bell } from 'lucide-react'

const scheduleData = [
  {
    id: '1',
    title: 'Live Session: React Hooks Deep Dive',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    date: '2024-03-15',
    time: '10:00',
    duration: 90,
    type: 'live',
    platform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/123456789',
    description: 'Deep dive into React Hooks including useState, useEffect, useContext and custom hooks.',
    attendees: 45,
    maxAttendees: 50,
    isBooked: true,
    reminder: true
  },
  {
    id: '2',
    title: 'Assignment Due: UI/UX Project',
    courseTitle: 'UI/UX Design Masterclass',
    instructor: 'Jane Smith',
    date: '2024-03-16',
    time: '23:59',
    duration: 0,
    type: 'assignment',
    platform: null,
    meetingUrl: null,
    description: 'Submit your final UI/UX design project with wireframes and mockups.',
    attendees: 0,
    maxAttendees: 0,
    isBooked: false,
    reminder: false
  },
  {
    id: '3',
    title: 'Workshop: Digital Marketing Strategy',
    courseTitle: 'Digital Marketing Fundamentals',
    instructor: 'Bob Johnson',
    date: '2024-03-17',
    time: '14:00',
    duration: 120,
    type: 'workshop',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    description: 'Hands-on workshop on creating effective digital marketing strategies.',
    attendees: 28,
    maxAttendees: 30,
    isBooked: true,
    reminder: true
  },
  {
    id: '4',
    title: 'Quiz: JavaScript Fundamentals',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    date: '2024-03-18',
    time: '09:00',
    duration: 60,
    type: 'quiz',
    platform: null,
    meetingUrl: null,
    description: 'Test your knowledge of JavaScript fundamentals including variables, functions, and arrays.',
    attendees: 0,
    maxAttendees: 0,
    isBooked: false,
    reminder: false
  }
]

function ScheduleContent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'list'>('week')
  const [filterType, setFilterType] = useState('all')

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'live': return 'bg-red-100 text-red-800'
      case 'workshop': return 'bg-blue-100 text-blue-800'
      case 'assignment': return 'bg-yellow-100 text-yellow-800'
      case 'quiz': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live': return <Video className="w-4 h-4" />
      case 'workshop': return <Users className="w-4 h-4" />
      case 'assignment': return <Calendar className="w-4 h-4" />
      case 'quiz': return <Calendar className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const filteredSchedule = scheduleData.filter(item => {
    if (filterType === 'all') return true
    return item.type === filterType
  })

  const handleBookSession = (sessionId: string) => {
    alert(`Booking session ${sessionId}...`)
  }

  const handleSetReminder = (sessionId: string) => {
    alert(`Setting reminder for session ${sessionId}...`)
  }

  const handleJoinMeeting = (meetingUrl: string) => {
    window.open(meetingUrl, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">My Schedule</h1>
          <p className="text-secondary-600 mt-2">Manage your classes, assignments, and events</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
          <Button>
            <Bell className="w-4 h-4 mr-2" />
            Sync Calendar
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
                <p className="text-sm text-blue-600 mt-1">Events scheduled</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">8</p>
                <p className="text-sm text-green-600 mt-1">Activities</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
                <p className="text-sm text-yellow-600 mt-1">Due soon</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">4</p>
                <p className="text-sm text-purple-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Video className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week View
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month View
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="all">All Types</option>
                <option value="live">Live Sessions</option>
                <option value="workshop">Workshops</option>
                <option value="assignment">Assignments</option>
                <option value="quiz">Quizzes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule List */}
      {viewMode === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSchedule.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{item.courseTitle} • {item.instructor}</p>
                        <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(new Date(item.date))}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(item.time)}</span>
                          </div>
                          {item.duration > 0 && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration} minutes</span>
                            </div>
                          )}
                          {item.platform && (
                            <div className="flex items-center space-x-1">
                              <Video className="w-4 h-4" />
                              <span>{item.platform}</span>
                            </div>
                          )}
                          {item.maxAttendees > 0 && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{item.attendees}/{item.maxAttendees} attendees</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {item.type === 'live' || item.type === 'workshop' ? (
                        <>
                          {item.isBooked ? (
                            <Button
                              onClick={() => handleJoinMeeting(item.meetingUrl!)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join Meeting
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleBookSession(item.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Book Session
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button>
                          View Details
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetReminder(item.id)}
                        className={item.reminder ? 'text-blue-600 border-blue-600' : ''}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        {item.reminder ? 'Reminder Set' : 'Set Reminder'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <Card>
          <CardHeader>
            <CardTitle>Week View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-center font-medium text-gray-700 mb-3">{day}</div>
                  <div className="text-center text-sm text-gray-500 mb-3">Mar {11 + index}</div>
                  <div className="space-y-2">
                    {filteredSchedule
                      .filter(item => new Date(item.date).getDay() === (index + 1) % 7)
                      .map(item => (
                        <div
                          key={item.id}
                          className={`p-2 rounded-lg text-xs ${getTypeColor(item.type)}`}
                        >
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-xs opacity-75">{formatTime(item.time)}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function SchedulePage() {
  return (
    <DashboardLayout>
      <ScheduleContent />
    </DashboardLayout>
  )
}
