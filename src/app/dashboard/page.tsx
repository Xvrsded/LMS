'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingCard, LoadingTable, LoadingChart } from '@/components/ui/loading'
import { EmptyCourses, EmptyStudents } from '@/components/ui/empty-state'
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
  Settings,
  BarChart3,
  MessageSquare,
  User,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react'

function DashboardContent() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const router = useRouter()
  const userRole = user?.role || 'STUDENT'

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Welcome Header */}
        <LoadingCard title="Selamat Datang" lines={2} />
        
        {/* Loading Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} lines={3} />
          ))}
        </div>
        
        {/* Loading Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <LoadingChart />
          <LoadingChart />
        </div>
        
        {/* Loading Courses/Students */}
        {userRole === 'TUTOR' ? (
          <>
            <LoadingCard title="My Courses" />
            <LoadingTable rows={3} columns={4} />
          </>
        ) : (
          <>
            <LoadingCard title="My Courses" />
            <LoadingTable rows={3} columns={4} />
          </>
        )}
      </div>
    )
  }

  const getStatsByRole = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          { title: 'Total Pengguna', value: '1.234', change: '+12%', icon: Users, color: 'bg-blue-100', iconColor: 'text-blue-600', changeColor: 'text-green-600' },
          { title: 'Total Kursus', value: '45', change: '+8%', icon: BookOpen, color: 'bg-green-100', iconColor: 'text-green-600', changeColor: 'text-green-600' },
          { title: 'Pendapatan', value: 'Rp 35Jt', change: '+25%', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600', changeColor: 'text-green-600' },
          { title: 'Tingkat Penyelesaian', value: '72%', change: '+5%', icon: Target, color: 'bg-orange-100', iconColor: 'text-orange-600', changeColor: 'text-green-600' }
        ]
      case 'TUTOR':
        return [
          { title: 'Total Kursus', value: '12', change: '+2', icon: BookOpen, color: 'bg-blue-100', iconColor: 'text-blue-600', changeColor: 'text-green-600' },
          { title: 'Total Siswa', value: '234', change: '+18', icon: Users, color: 'bg-green-100', iconColor: 'text-green-600', changeColor: 'text-green-600' },
          { title: 'Tingkat Penyelesaian', value: '78%', change: '+5%', icon: Target, color: 'bg-purple-100', iconColor: 'text-purple-600', changeColor: 'text-green-600' },
          { title: 'Rating Rata-rata', value: '4.8', change: '+0.2', icon: Award, color: 'bg-orange-100', iconColor: 'text-orange-600', changeColor: 'text-green-600' }
        ]
      case 'STUDENT':
        return [
          { title: 'Kursus Diikuti', value: '8', change: '+2', icon: BookOpen, color: 'bg-blue-100', iconColor: 'text-blue-600', changeColor: 'text-green-600' },
          { title: 'Selesai', value: '3', change: '+1', icon: Award, color: 'bg-green-100', iconColor: 'text-green-600', changeColor: 'text-green-600' },
          { title: 'Streak Belajar', value: '7 hari', change: '🔥', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600', changeColor: 'text-orange-600' },
          { title: 'Sertifikat', value: '3', change: '+1', icon: Award, color: 'bg-orange-100', iconColor: 'text-orange-600', changeColor: 'text-green-600' }
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

  // Sample course data for tutor
  const courseData = [
    { id: 1, title: 'JavaScript Fundamentals', students: 120, rating: 4.8, status: 'published', thumbnail: '/js-course.jpg' },
    { id: 2, title: 'React Advanced Patterns', students: 89, rating: 4.9, status: 'published', thumbnail: '/react-course.jpg' },
    { id: 3, title: 'TypeScript Basics', students: 65, rating: 4.7, status: 'draft', thumbnail: '/ts-course.jpg' },
    { id: 4, title: 'Node.js Backend Development', students: 54, rating: 4.6, status: 'published', thumbnail: '/node-course.jpg' },
    { id: 5, title: 'CSS Mastery', students: 92, rating: 4.8, status: 'published', thumbnail: '/css-course.jpg' },
    { id: 6, title: 'Vue.js Complete Guide', students: 38, rating: 4.5, status: 'draft', thumbnail: '/vue-course.jpg' },
  ]

  // Sample student data for tutor
  const studentData = [
    { id: 1, name: 'John Doe', course: 'JavaScript Fundamentals', progress: 78, lastActivity: '2 hours ago', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', course: 'React Advanced Patterns', progress: 92, lastActivity: '1 day ago', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', course: 'TypeScript Basics', progress: 45, lastActivity: '3 days ago', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Wilson', course: 'Node.js Backend Development', progress: 68, lastActivity: '5 hours ago', email: 'sarah@example.com' },
    { id: 5, name: 'Tom Brown', course: 'CSS Mastery', progress: 100, lastActivity: '1 week ago', email: 'tom@example.com' },
  ]

  // Sample quiz data for tutor
  const quizData = [
    { id: 1, title: 'JavaScript Basics Quiz', course: 'JavaScript Fundamentals', submissions: 45, avgScore: 85, difficulty: 'Easy', status: 'active' },
    { id: 2, title: 'React Hooks Assessment', course: 'React Advanced Patterns', submissions: 32, avgScore: 72, difficulty: 'Medium', status: 'active' },
    { id: 3, title: 'TypeScript Types Test', course: 'TypeScript Basics', submissions: 28, avgScore: 68, difficulty: 'Hard', status: 'review' },
  ]

  // Sample student questions data
  const studentQuestions = [
    { id: 1, student: 'John Doe', course: 'JavaScript Fundamentals', question: 'How do closures work in JavaScript?', timestamp: '2 hours ago', answered: false },
    { id: 2, student: 'Jane Smith', course: 'React Advanced Patterns', question: 'When should I use useMemo vs useCallback?', timestamp: '5 hours ago', answered: true },
    { id: 3, student: 'Mike Johnson', course: 'TypeScript Basics', question: 'What is the difference between interface and type?', timestamp: '1 day ago', answered: false },
  ]

  // Sample insights data
  const insights = [
    { id: 1, type: 'warning', message: 'Lesson 3 memiliki drop-off tinggi (45% students stop here)', action: 'Review lesson content' },
    { id: 2, type: 'success', message: 'Course A paling aktif minggu ini (89% completion rate)', action: 'Create advanced content' },
    { id: 3, type: 'alert', message: 'Quiz terlalu sulit untuk 60% siswa (avg score 52%)', action: 'Adjust difficulty level' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.name || user?.username || 'User'}! 👋
          </h1>
          <p className="text-gray-700 text-lg">
            {userRole === 'TUTOR' ? 'Kelola kursus Anda dan pantau kemajuan siswa' : 'Ini adalah dashboard pembelajaran Anda untuk hari ini.'}
          </p>
        </div>
      </div>

      {/* Quick Actions - Tutor Only */}
      {userRole === 'TUTOR' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => router.push('/dashboard/course-builder')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto flex flex-col items-center gap-2 group"
              disabled={loadingAction === 'create-course'}
            >
              <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Buat Kursus</span>
            </Button>
            <Button 
              onClick={() => router.push('/dashboard/analytics')}
              className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto flex flex-col items-center gap-2 group"
              disabled={loadingAction === 'analytics'}
            >
              <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Lihat Analitik</span>
            </Button>
            <Button 
              onClick={() => router.push('/dashboard/discussions')}
              className="bg-orange-600 hover:bg-orange-700 text-white p-4 h-auto flex flex-col items-center gap-2 group"
              disabled={loadingAction === 'discussions'}
            >
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Diskusi</span>
            </Button>
            <Button 
              onClick={() => router.push('/dashboard/analytics')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 h-auto flex flex-col items-center gap-2 group"
              disabled={loadingAction === 'analytics'}
            >
              <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Performa</span>
            </Button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transform transition-all duration-300 ease-out cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide group-hover:text-gray-800 transition-colors duration-200">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors duration-200">{stat.value}</p>
                <div className="flex items-center mt-3">
                  <span className={`text-sm font-bold ${stat.changeColor} group-hover:scale-105 inline-block transition-transform duration-200`}>{stat.change}</span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color} ml-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out shadow-sm`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor} group-hover:animate-bounce`}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Tutor Only */}
      {userRole === 'TUTOR' && (
        <DashboardChart userRole={userRole} />
      )}

      {/* Main Content Grid - Tutor Only */}
      {userRole === 'TUTOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Courses Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">My Courses</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage your courses and track performance</p>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard/courses')}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-md"
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {courseData.slice(0, 4).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{course.title}</p>
                      <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {course.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Students Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-linear-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Students Activity</h3>
                  <p className="text-sm text-gray-600 mt-1">Latest student interactions and progress</p>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard/students')}
                  className="bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-md"
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {studentData.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{student.progress}%</span>
                    </div>
                    <p className="text-xs text-gray-500">{student.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Second Row - Tutor Only */}
      {userRole === 'TUTOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quiz Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quiz Status</h3>
                  <p className="text-sm text-gray-600 mt-1">Track quiz performance</p>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard/analytics')}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all duration-200"
                >
                  Manage
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {quizData.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      quiz.difficulty === 'Easy' ? 'bg-green-100' : 
                      quiz.difficulty === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        quiz.difficulty === 'Easy' ? 'text-green-600' : 
                        quiz.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{quiz.title}</p>
                      <p className="text-sm text-gray-600">{quiz.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{quiz.avgScore}% avg</p>
                    <p className="text-xs text-gray-500">{quiz.submissions} submissions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Questions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Student Questions</h3>
                  <p className="text-sm text-gray-600 mt-1">Q&A from your students</p>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard/discussions')}
                  className="bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition-all duration-200"
                >
                  Reply All
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {studentQuestions.map((question) => (
                <div key={question.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{question.student}</p>
                      {!question.answered && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Unanswered</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{question.question}</p>
                    <p className="text-xs text-gray-500 mt-2">{question.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Panel - Tutor Only */}
      {userRole === 'TUTOR' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Teaching Insights</h3>
                <p className="text-sm text-gray-600 mt-1">Smart analytics for your teaching performance</p>
              </div>
              <Button 
                onClick={() => router.push('/dashboard/analytics')}
                className="bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all duration-200"
              >
                View Details
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight) => (
                <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  insight.type === 'success' ? 'bg-green-50 border-green-400' :
                  'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      insight.type === 'warning' ? 'bg-yellow-100' :
                      insight.type === 'success' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      {insight.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      {insight.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {insight.type === 'alert' && <AlertCircle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{insight.message}</p>
                      <p className="text-xs text-gray-600 mt-1">{insight.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Table - Remove for cleaner tutor dashboard */}
      {/* {userRole !== 'TUTOR' && (
        <DataTable 
          data={tableData}
          columns={tableColumns}
          title="Recent Courses"
          searchable={true}
          pagination={true}
          actions={true}
        />
      )} */}
    </div>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}
