'use client'

import { Bell, Search, User, LogOut, Menu, X, Settings } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'

interface NavbarProps {
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

export function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const { user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleSignOut = async () => {
    try {
      logout()
      window.location.href = '/auth/signin'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Search and Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari kursus, siswa, atau konten..."
                className="w-full h-9 pl-10 pr-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="h-7 w-7 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-white leading-none">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || user?.username || 'User'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user?.role || 'Student'}
                </div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl border border-gray-200 shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || user?.username || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.username ? `${user.username}@example.com` : 'user@example.com'}
                  </p>
                </div>
                <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  Profil
                </button>
                <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3">
                  <Settings className="w-4 h-4 text-gray-400" />
                  Pengaturan
                </button>
                <hr className="my-2 border-gray-100" />
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
