'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardChart } from '@/components/charts/dashboard-chart'
import { DataTable } from '@/components/tables/data-table'
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  Target,
  PlayCircle,
  FileText,
  Calendar,
  ArrowRight,
  Settings
} from 'lucide-react'

function DashboardContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const userRole = session?.user?.role || 'STUDENT'
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const getStatsByRole = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-100', iconColor: 'text-blue-600', changeColor: 'text-green-600' },
          { title: 'Total Courses', value: '45', change: '+8%', icon: BookOpen, color: 'bg-green-100', iconColor: 'text-green-600', changeColor: 'text-green-600' },
          { title: 'Revenue', value: 'Rp 35M', change: '+25%', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600', changeColor: 'text-green-600' },
          { title: 'Completion Rate', value: '72%', change: '+5%', icon: Target, color: 'bg-orange-100', iconColor: 'text-orange-600', changeColor: 'text-green-600' }
        ]
      case 'TUTOR':
        return [
          { title: 'My Courses', value: '12', change: '+2', icon: BookOpen, color: 'bg-blue-100', iconColor: 'text-blue-600', changeColor: 'text-green-600' },
          { title: 'Total Students', value: '234', change: '+18', icon: Users, color: 'bg-green-100', iconColor: 'text-green-600', changeColor: 'text-green-600' },
          { title: 'Avg. Rating', value: '4.8', change: '+0.2', icon: Award, color: 'bg-purple-100', iconColor: 'text-purple-600', changeColor: 'text-green-600' },
          { title: 'Hours Taught', value: '156', change: '+12', icon: Clock, color: 'bg-orange-100', iconColor: 'text-orange-600', changeColor: 'text-green-600' }
        ]
      case 'STUDENT':
        return [
          { title: 'Courses Enrolled', value: '8', change: '+2', icon: BookOpen, color: 'bg-blue-100', iconColor: 'text-blue-600', changeColor: 'text-green-600' },
          { title: 'Completed', value: '3', change: '+1', icon: Award, color: 'bg-green-100', iconColor: 'text-green-600', changeColor: 'text-green-600' },
          { title: 'Learning Streak', value: '7 days', change: '🔥', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600', changeColor: 'text-orange-600' },
          { title: 'Certificates', value: '3', change: '+1', icon: Award, color: 'bg-orange-100', iconColor: 'text-orange-600', changeColor: 'text-green-600' }
        ]
      default:
        return []
    }
  }

  const stats = getStatsByRole()

  // Quick Action Handlers
  const handleBrowseCourses = async () => {
    setLoadingAction('courses')
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    router.push('/dashboard/courses')
  }

  const handleViewProgress = async () => {
    setLoadingAction('progress')
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Navigate to learning progress page based on user role
    if (userRole === 'STUDENT') {
      router.push('/dashboard/learning')
    } else if (userRole === 'TUTOR') {
      router.push('/dashboard/analytics')
    } else {
      router.push('/dashboard/analytics')
    }
  }

  const handleSettings = async () => {
    setLoadingAction('settings')
    await new Promise(resolve => setTimeout(resolve, 300))
    router.push('/dashboard/settings')
  }

  // Sample data for the table
  const tableData = [
    { id: 1, name: 'JavaScript Fundamentals', students: 89, status: 'active', progress: '78%' },
    { id: 2, name: 'React Advanced Patterns', students: 76, status: 'active', progress: '82%' },
    { id: 3, name: 'TypeScript Basics', students: 65, status: 'pending', progress: '45%' },
    { id: 4, name: 'Node.js Backend', students: 54, status: 'active', progress: '68%' },
    { id: 5, name: 'CSS Mastery', students: 92, status: 'completed', progress: '100%' },
  ]

  const tableColumns = [
    { key: 'name', label: 'Course Name' },
    { key: 'students', label: 'Students' },
    { key: 'status', label: 'Status', render: (value: string) => {
      const statusConfig = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-blue-100 text-blue-800',
      }
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[value as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}`}>
          {value}
        </span>
      )
    }},
    { key: 'progress', label: 'Progress' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Here's your learning dashboard for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-sm font-medium mt-2 ${stat.changeColor}`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} ml-4`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <DashboardChart userRole={userRole} />

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500">Fast access to important features</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={handleBrowseCourses}
            disabled={loadingAction === 'courses'}
            className="h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {loadingAction === 'courses' ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            )}
            {loadingAction === 'courses' ? 'Loading...' : 'Browse Courses'}
          </Button>
          <Button 
            onClick={handleViewProgress}
            disabled={loadingAction === 'progress'}
            variant="outline" 
            className="h-12 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {loadingAction === 'progress' ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            )}
            {loadingAction === 'progress' ? 'Loading...' : 'View Progress'}
          </Button>
          <Button 
            onClick={handleSettings}
            disabled={loadingAction === 'settings'}
            variant="outline" 
            className="h-12 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {loadingAction === 'settings' ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            )}
            {loadingAction === 'settings' ? 'Loading...' : 'Settings'}
          </Button>
        </div>
        
        {/* Quick Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">All systems operational</span>
            </div>
            <span className="text-gray-500">
              {userRole === 'STUDENT' ? 'Student' : userRole === 'TUTOR' ? 'Instructor' : 'Admin'} Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { title: 'Course completed', description: 'JavaScript Basics', time: '2 hours ago', icon: BookOpen, iconColor: 'text-green-600' },
            { title: 'New achievement', description: '7-day learning streak', time: '5 hours ago', icon: Award, iconColor: 'text-yellow-600' },
            { title: 'Quiz passed', description: 'React Fundamentals - 95%', time: '1 day ago', icon: Target, iconColor: 'text-blue-600' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg bg-white ${activity.iconColor}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        data={tableData}
        columns={tableColumns}
        title="Recent Courses"
        searchable={true}
        pagination={true}
        actions={true}
      />
    </div>
  )
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
