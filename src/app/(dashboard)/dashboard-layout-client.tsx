'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Navbar } from '@/components/layout/navbar'
import { useAuth } from '@/contexts/auth-context'
import { ErrorBoundary } from '@/components/error-boundary'

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user } = useAuth()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* SINGLE SIDEBAR - Fixed on desktop, overlay on mobile */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 
        w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        shadow-xl
      `}>
        <Sidebar 
          userRole={user?.role || 'STUDENT'} 
          onCloseMobile={closeSidebar}
        />
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SINGLE MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* SINGLE HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center px-6 sticky top-0 z-40">
          <Navbar 
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </header>

        {/* PAGE CONTENT ONLY */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    </ErrorBoundary>
  )
}
