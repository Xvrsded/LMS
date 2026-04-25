'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers,
  Video,
  Clipboard,
  Users,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut
} from 'lucide-react'

interface SidebarItemProps {
  icon: any
  label: string
  href: string
  isActive: boolean
  onClick?: () => void
}

function SidebarItem({ icon: Icon, label, href, isActive, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden group",
        isActive 
          ? "bg-blue-600 text-white shadow-sm" 
          : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 shrink-0 transition-colors duration-200",
        isActive ? "text-white" : "text-gray-600 group-hover:text-blue-600"
      )} />
      <span className={cn(
        "text-sm font-medium transition-colors duration-200",
        isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"
      )}>
        {label}
      </span>
      
      {/* Subtle hover effect for non-active items */}
      {!isActive && (
        <div className="absolute inset-0 bg-linear-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      )}
    </Link>
  )
}

interface TutorSidebarProps {
  onCloseMobile?: () => void
  className?: string
}

export function TutorSidebar({ onCloseMobile, className }: TutorSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const navigation = [
    { name: 'Dashboard', href: '/tutor', icon: LayoutDashboard },
    { name: 'My Courses', href: '/tutor/courses', icon: BookOpen },
    { name: 'Course Builder', href: '/tutor/builder', icon: Layers },
    { name: 'Lessons', href: '/tutor/lessons', icon: Video },
    { name: 'Quiz & Assignment', href: '/tutor/quiz', icon: Clipboard },
    { name: 'Students', href: '/tutor/students', icon: Users },
    { name: 'Analytics', href: '/tutor/analytics', icon: BarChart3 },
    { name: 'Discussion', href: '/tutor/discussion', icon: MessageSquare },
    { name: 'Notifications', href: '/tutor/notifications', icon: Bell },
    { name: 'Settings', href: '/tutor/settings', icon: Settings },
  ]

  const handleSignOut = async () => {
    try {
      logout()
      router.push('/auth/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className={cn(
      "w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50",
      className
    )}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Tutor Panel</h1>
            <p className="text-xs text-gray-500">Learning Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/tutor' && pathname.startsWith(item.href))
          
          return (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              label={item.name}
              href={item.href}
              isActive={isActive}
              onClick={() => onCloseMobile?.()}
            />
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.name?.charAt(0) || user?.username?.charAt(0) || 'T'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {user?.name || user?.username || 'Tutor'}
            </p>
            <p className="text-xs text-gray-500">Tutor • Online</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
