'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/tables/data-table'
import { StudentDetailModal } from '@/components/modals/student-detail-modal'
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Calendar,
  Clock,
  Award,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  Star,
  Target,
  BarChart3,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react'

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    avatar: '/api/placeholder/40/40',
    enrolledCourses: 5,
    activeCourses: 3,
    completedCourses: 2,
    totalSpent: 'Rp 2.500.000',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    status: 'active',
    progress: 68,
    subscription: 'Premium',
    avgRating: 4.8
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+62 813-2345-6789',
    location: 'Surabaya, Indonesia',
    avatar: '/api/placeholder/40/40',
    enrolledCourses: 8,
    activeCourses: 4,
    completedCourses: 4,
    totalSpent: 'Rp 4.200.000',
    joinDate: '2023-11-20',
    lastActive: '1 day ago',
    status: 'active',
    progress: 75,
    subscription: 'Premium',
    avgRating: 4.9
  },
  {
    id: 3,
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+62 814-3456-7890',
    location: 'Bandung, Indonesia',
    avatar: '/api/placeholder/40/40',
    enrolledCourses: 3,
    activeCourses: 2,
    completedCourses: 1,
    totalSpent: 'Rp 1.800.000',
    joinDate: '2024-02-10',
    lastActive: '3 hours ago',
    status: 'active',
    progress: 45,
    subscription: 'Basic',
    avgRating: 4.6
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+62 815-2345-6789',
    location: 'Yogyakarta, Indonesia',
    avatar: '/api/placeholder/40/40',
    enrolledCourses: 6,
    activeCourses: 1,
    completedCourses: 5,
    totalSpent: 'Rp 3.600.000',
    joinDate: '2023-09-15',
    lastActive: '1 week ago',
    status: 'inactive',
    progress: 92,
    subscription: 'Premium',
    avgRating: 4.7
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+62 816-3456-7890',
    location: 'Medan, Indonesia',
    avatar: '/api/placeholder/40/40',
    enrolledCourses: 4,
    activeCourses: 2,
    completedCourses: 2,
    totalSpent: 'Rp 2.100.000',
    joinDate: '2024-01-25',
    lastActive: '5 hours ago',
    status: 'active',
    progress: 55,
    subscription: 'Basic',
    avgRating: 4.5
  }
]

// Mock activity data
const recentActivities = [
  { id: 1, studentName: 'Sarah Johnson', action: 'Completed lesson', course: 'React Advanced', time: '10 minutes ago', type: 'complete' },
  { id: 2, studentName: 'Michael Chen', action: 'Enrolled in', course: 'TypeScript Mastery', time: '1 hour ago', type: 'enroll' },
  { id: 3, studentName: 'Lisa Anderson', action: 'Started quiz', course: 'JavaScript Basics', time: '2 hours ago', type: 'quiz' },
  { id: 4, studentName: 'Emma Wilson', action: 'Submitted assignment', course: 'CSS Fundamentals', time: '3 hours ago', type: 'assignment' },
  { id: 5, studentName: 'David Kim', action: 'Watched video', course: 'Node.js Backend', time: '5 hours ago', type: 'video' }
]

function StudentsContent() {
  const { data: session } = useSession()
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate statistics
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === 'active').length
  const newStudentsThisMonth = 2
  const totalRevenue = students.reduce((sum, s) => sum + parseInt(s.totalSpent.replace(/[^\d]/g, '')), 0)

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'Active Students',
      value: activeStudents.toLocaleString(),
      change: '+8%',
      icon: UserCheck,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'New This Month',
      value: newStudentsThisMonth.toLocaleString(),
      change: '+3',
      icon: UserPlus,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: `Rp ${(totalRevenue / 1000000).toFixed(1)}M`,
      change: '+25%',
      icon: TrendingUp,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      changeColor: 'text-green-600'
    }
  ]

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Handle student detail view
  const handleViewStudent = (student: any) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const handleCloseModal = () => {
    setShowStudentModal(false)
    setSelectedStudent(null)
  }

  // Table columns
  const tableColumns = [
    { 
      key: 'name', 
      label: 'Student',
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {value.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'enrolledCourses', 
      label: 'Courses',
      render: (value: number, row: any) => (
        <div className="text-center">
          <p className="font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{row.activeCourses} active</p>
        </div>
      )
    },
    { 
      key: 'progress', 
      label: 'Progress',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-25">
            <div 
              className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const statusConfig = {
          active: 'bg-green-100 text-green-800',
          inactive: 'bg-gray-100 text-gray-800',
          pending: 'bg-yellow-100 text-yellow-800'
        }
        return (
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig[value as keyof typeof statusConfig]}`}>
            {value === 'active' ? '🟢 Active' : value === 'inactive' ? '⚪ Inactive' : '🟡 Pending'}
          </span>
        )
      }
    },
    { 
      key: 'lastActive', 
      label: 'Last Active',
      render: (value: string) => (
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'totalSpent', 
      label: 'Revenue',
      render: (value: string) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    }
  ]

  // Enhanced table columns with actions
  const enhancedTableColumns = [
    ...tableColumns,
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewStudent(row)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
          </button>
          <button
            className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 group"
            title="Send Message"
          >
            <Mail className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-2">Monitor and manage your students' learning journey</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Add Student</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
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

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 w-full sm:w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <DataTable 
        data={filteredStudents}
        columns={enhancedTableColumns}
        title="Student List"
        searchable={false}
        pagination={true}
        actions={false}
      />

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'complete' ? 'bg-green-100 text-green-600' :
                  activity.type === 'enroll' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'assignment' ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {activity.type === 'complete' ? <Award className="w-4 h-4" /> :
                   activity.type === 'enroll' ? <BookOpen className="w-4 h-4" /> :
                   activity.type === 'quiz' ? <Target className="w-4 h-4" /> :
                   activity.type === 'assignment' ? <BarChart3 className="w-4 h-4" /> :
                   <Activity className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {activity.studentName} <span className="font-normal text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-600">{activity.course}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={showStudentModal}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default function StudentsPage() {
  return (
    <DashboardLayout>
      <StudentsContent />
    </DashboardLayout>
  )
}
