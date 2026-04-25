'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function DashboardRedirect() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on user role
      switch (user.role) {
        case 'ADMIN':
          router.push('/dashboard/admin')
          break
        case 'TUTOR':
          router.push('/dashboard/tutor')
          break
        case 'STUDENT':
          router.push('/dashboard/student')
          break
        default:
          router.push('/dashboard/student')
      }
    }
  }, [user, isLoading, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return null
}
