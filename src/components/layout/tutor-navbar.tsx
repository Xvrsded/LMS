'use client'

import { Bell, Search, Plus, User, LogOut, Menu, X, Home, BookOpen, Users, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

interface TutorNavbarProps {
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

export function TutorNavbar({ onToggleSidebar, isSidebarOpen }: TutorNavbarProps) {
  const { user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const pathname = usePathname()

  // Dynamic page title based on current route
  const getPageTitle = () => {
    const pathSegments = pathname.split('/')
    const currentPage = pathSegments[pathSegments.length - 1]
    
    const titles: Record<string, string> = {
      'tutor': 'Dashboard',
      'courses': 'My Courses',
      'builder': 'Course Builder',
      'lessons': 'Lessons',
      'quiz': 'Quiz & Assignment',
      'students': 'Students',
      'analytics': 'Analytics',
      'discussion': 'Discussion',
      'notifications': 'Notifications',
      'settings': 'Settings'
    }
    
    return titles[currentPage] || 'Dashboard'
  }

  const getPageIcon = () => {
    const pathSegments = pathname.split('/')
    const currentPage = pathSegments[pathSegments.length - 1]
    
    const icons: Record<string, React.ReactNode> = {
      'tutor': <Home className="w-5 h-5" />,
      'courses': <BookOpen className="w-5 h-5" />,
      'builder': <BookOpen className="w-5 h-5" />,
      'lessons': <BookOpen className="w-5 h-5" />,
      'quiz': <BookOpen className="w-5 h-5" />,
      'students': <Users className="w-5 h-5" />,
      'analytics': <BarChart3 className="w-5 h-5" />,
      'discussion': <BookOpen className="w-5 h-5" />,
      'notifications': <Bell className="w-5 h-5" />,
      'settings': <BookOpen className="w-5 h-5" />
    }
    
    return icons[currentPage] || <Home className="w-5 h-5" />
  }

  const handleSignOut = async () => {
    try {
      logout()
      window.location.href = '/auth/signin'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Mock notifications data
  const notifications = [
    { id: 1, text: 'New student enrolled in React course', time: '2 min ago', read: false },
    { id: 2, text: 'Course review submitted', time: '1 hour ago', read: false },
    { id: 3, text: 'Quiz completed by 5 students', time: '3 hours ago', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="h-16 sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* LEFT SECTION - Dynamic Page Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3">
          <div className="text-blue-600">
            {getPageIcon()}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
            <p className="text-xs text-gray-500">Tutor Dashboard</p>
          </div>
        </div>
      </div>

      {/* CENTER SECTION - Global Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, students, or content..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* RIGHT SECTION - Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
          <Plus className="w-4 h-4" />
          Create
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <p className="text-sm text-gray-900">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0) || user?.username?.charAt(0) || 'T'}
              </span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || user?.username || 'Tutor'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || 'Tutor'}
              </p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Settings
              </button>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
