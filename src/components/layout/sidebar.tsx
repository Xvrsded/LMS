'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  BarChart3, 
  Award,
  GraduationCap,
  Calendar,
  MessageSquare,
  Target,
  BookMarked,
  HelpCircle,
  Settings,
  Menu,
  X,
  LogOut,
  FileText,
  FileSpreadsheet
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/dashboard/reports', icon: FileSpreadsheet },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const tutorNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Earnings', href: '/dashboard/earnings', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const studentNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Browse Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'My Learning', href: '/dashboard/learning', icon: GraduationCap },
  { name: 'My Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Discussions', href: '/dashboard/discussions', icon: MessageSquare },
  { name: 'Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: BookMarked },
  { name: 'Reports', href: '/dashboard/reports', icon: FileSpreadsheet },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  userRole?: string
  className?: string
}

export function Sidebar({ userRole = 'STUDENT', className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const getNavItems = () => {
    switch (userRole) {
      case 'ADMIN':
        return navigation
      case 'TUTOR':
        return tutorNavigation
      case 'STUDENT':
        return studentNavigation
      default:
        return studentNavigation
    }
  }

  const navItems = getNavItems()

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <aside className={cn(
      "w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 flex flex-col shadow-lg transition-all duration-300 z-50 -translate-x-full lg:translate-x-0",
      collapsed ? "w-20" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {collapsed ? (
            <Menu className="w-5 h-5 text-gray-600" />
          ) : (
            <X className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200",
                isActive && "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
        {!collapsed && (
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {userRole} • Online
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Logout Button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
