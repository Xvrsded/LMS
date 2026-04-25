'use client'

import { useSession } from 'next-auth/react'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const userRole = session?.user?.role || 'STUDENT'

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed positioning with proper margin for main content */}
      <Sidebar userRole={userRole} />
      
      {/* Main Content with proper margin to avoid sidebar overlap */}
      <div className="flex-1 ml-0 lg:ml-64 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Page Content with consistent spacing */}
        <main className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
