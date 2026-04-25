'use client'

import { Bell, Check, X, Clock, Users, MessageSquare, Award, BookOpen } from 'lucide-react'

export default function TutorNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'student_enrollment',
      title: 'New student enrolled',
      message: 'Sarah Johnson enrolled in Advanced React Development',
      time: '5 minutes ago',
      read: false,
      icon: Users
    },
    {
      id: 2,
      type: 'discussion_reply',
      title: 'New discussion reply',
      message: 'Michael Chen replied to your post about React Hooks',
      time: '1 hour ago',
      read: false,
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'quiz_completed',
      title: 'Quiz completed',
      message: '15 students completed JavaScript Basics Quiz',
      time: '3 hours ago',
      read: true,
      icon: Award
    },
    {
      id: 4,
      type: 'course_review',
      title: 'New course review',
      message: 'Emily Davis left a 5-star review for UI/UX Design Principles',
      time: '1 day ago',
      read: true,
      icon: BookOpen
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Actions - Header removed since handled by TutorNavbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600">Stay updated with your course activities and student interactions</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Check className="w-4 h-4" />
            Mark All Read
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <X className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-6 hover:bg-gray-50 transition-colors duration-150 ${
                !notification.read ? 'bg-blue-50 border-l-4 border-blue-600' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <notification.icon className={`w-5 h-5 ${
                      !notification.read ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
