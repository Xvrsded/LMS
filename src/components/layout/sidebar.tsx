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
  FileSpreadsheet,
  Layers,
  Video,
  Clipboard,
  Bell
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Kursus', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Siswa', href: '/dashboard/students', icon: Users },
  { name: 'Pembayaran', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Analitik', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Laporan', href: '/dashboard/reports', icon: FileSpreadsheet },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
]

const tutorNavigation = [
  { name: 'Dashboard', href: '/tutor', icon: LayoutDashboard },
  { name: 'Kursus Saya', href: '/tutor/courses', icon: BookOpen },
  { name: 'Pembuat Kursus', href: '/tutor/builder', icon: Layers },
  { name: 'Pelajaran', href: '/tutor/lessons', icon: Video },
  { name: 'Kuis & Tugas', href: '/tutor/quiz', icon: Clipboard },
  { name: 'Siswa', href: '/tutor/students', icon: Users },
  { name: 'Analitik', href: '/tutor/analytics', icon: BarChart3 },
  { name: 'Diskusi', href: '/tutor/discussion', icon: MessageSquare },
  { name: 'Notifikasi', href: '/tutor/notifications', icon: Bell },
  { name: 'Pengaturan', href: '/tutor/settings', icon: Settings },
]

const studentNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Jelajahi Kursus', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Pembelajaran Saya', href: '/dashboard/learning', icon: GraduationCap },
  { name: 'Jadwal Saya', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Diskusi', href: '/dashboard/discussions', icon: MessageSquare },
  { name: 'Tujuan', href: '/dashboard/goals', icon: Target },
  { name: 'Penanda', href: '/dashboard/bookmarks', icon: BookMarked },
  { name: 'Laporan', href: '/dashboard/reports', icon: FileSpreadsheet },
  { name: 'Pembayaran', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Bantuan & Dukungan', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  userRole: string
  onCloseMobile?: () => void
  isCollapsed?: boolean
  className?: string
}

export function Sidebar({ userRole = 'STUDENT', onCloseMobile, isCollapsed = false, className }: SidebarProps) {
  const pathname = usePathname()
  const collapsed = isCollapsed

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

  return (
    <aside className={cn(
      "w-full h-full bg-white flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-full",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">LMS</span>
              <p className="text-xs text-gray-500">Platform Pembelajaran</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mx-auto">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onCloseMobile?.()}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden group",
                isActive 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
                  : "hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-10"></div>
              )}
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors duration-200 relative z-10",
                isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"
              )} />
              {!collapsed && (
                <span className={cn(
                  "font-medium transition-colors duration-200 relative z-10",
                  isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"
                )}>{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">Butuh Bantuan?</p>
            <p className="text-xs text-gray-600">Cek dokumentasi kami</p>
          </div>
        </div>
      )}
    </aside>
  )
}
