'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Search, User, LogOut, Sun, Moon, Settings, HelpCircle, ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'
import { useAuth } from '@/contexts/auth-context'

interface HeaderProps {
  className?: string
  onMenuClick?: () => void
  onSidebarToggle?: () => void
  isSidebarOpen?: boolean
}

export function Header({ className, onMenuClick, onSidebarToggle, isSidebarOpen = true }: HeaderProps) {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      logout()
      router.push('/auth/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={cn(
      "w-full h-full bg-white flex items-center justify-between transition-colors duration-200",
      className
    )}>
      <div className="flex items-center justify-between w-full">
        {/* Left Side - Menu Toggle & Search */}
        <div className="flex items-center flex-1">
          {/* Desktop Sidebar Toggle */}
          {onSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="hidden lg:flex mr-3 hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 group"
            >
              <Menu className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''} group-hover:scale-110`} />
            </Button>
          )}
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden mr-2 hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 group"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Button>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-200" />
              <input
                type="text"
                placeholder="Search courses, students, or anything..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-400 focus:bg-white focus:shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 group"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 group-hover:text-yellow-600 group-hover:rotate-45 transition-all duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
            )}
          </Button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 relative group"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all duration-200">3</span>
            </Button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 backdrop-blur-sm">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-200">
                    <p className="text-sm font-medium text-gray-900">New course available</p>
                    <p className="text-xs text-gray-600">React Advanced Patterns • 2h ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-200">
                    <p className="text-sm font-medium text-gray-900">Assignment due soon</p>
                    <p className="text-xs text-gray-600">UI/UX Project • Tomorrow</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                    <p className="text-sm font-medium text-gray-900">Certificate earned</p>
                    <p className="text-xs text-gray-600">JavaScript Fundamentals • 3d ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name || user?.username || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.role === 'ADMIN' ? 'Admin' : user?.role === 'TUTOR' ? 'Instructor' : 'Student'}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {(user?.name || user?.username || 'U').charAt(0).toUpperCase()}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${
                  showUserMenu ? 'rotate-180' : ''
                }`} />
            </Button>
            
            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 backdrop-blur-sm">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || user?.username || 'User'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user?.username || 'user@example.com'}
                  </p>
                </div>
                  
                <div className="py-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors duration-200">
                    <User className="w-4 h-4 text-gray-600" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors duration-200">
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors duration-200">
                    <HelpCircle className="w-4 h-4 text-gray-600" />
                    <span>Help & Support</span>
                  </button>
                </div>
                  
                <div className="border-t border-gray-200 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
