'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Clock, 
  Target, 
  Award,
  PlayCircle,
  Calendar,
  TrendingUp,
  BarChart3
} from 'lucide-react'

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  thumbnail: string
  nextLesson: string
  totalLessons: number
  completedLessons: number
}

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificates: 0
  })
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load real data from API
    const loadStudentData = async () => {
      try {
        // This would be replaced with actual API calls
        const mockStats = {
          enrolledCourses: 5,
          completedCourses: 2,
          totalHours: 48,
          certificates: 2
        }
        
        const mockCourses = [
          {
            id: 1,
            title: 'Advanced React Development',
            instructor: 'John Doe',
            progress: 75,
            thumbnail: '/course1.jpg',
            nextLesson: 'React Hooks Deep Dive',
            totalLessons: 24,
            completedLessons: 18
          },
          {
            id: 2,
            title: 'JavaScript Fundamentals',
            instructor: 'Jane Smith',
            progress: 100,
            thumbnail: '/course2.jpg',
            nextLesson: 'Course Completed',
            totalLessons: 32,
            completedLessons: 32
          },
          {
            id: 3,
            title: 'UI/UX Design Principles',
            instructor: 'Bob Johnson',
            progress: 45,
            thumbnail: '/course3.jpg',
            nextLesson: 'Color Theory',
            totalLessons: 18,
            completedLessons: 8
          }
        ]
        
        setStats(mockStats)
        setEnrolledCourses(mockCourses)
      } catch (error) {
        console.error('Failed to load student data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStudentData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your learning progress and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.enrolledCourses}</p>
              <p className="text-xs text-blue-600 mt-2">Active learning</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.completedCourses}</p>
              <p className="text-xs text-green-600 mt-2">Great progress!</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Hours</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalHours}</p>
              <p className="text-xs text-purple-600 mt-2">This month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Certificates</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.certificates}</p>
              <p className="text-xs text-orange-600 mt-2">Earned</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {enrolledCourses.slice(0, 3).map((course: any) => (
              <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <PlayCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Schedule */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Learning Schedule</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View Calendar
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { day: 'Monday', time: '10:00 AM', course: 'React Hooks', duration: '45 min' },
              { day: 'Wednesday', time: '2:00 PM', course: 'JavaScript Arrays', duration: '60 min' },
              { day: 'Friday', time: '4:00 PM', course: 'UI Design Basics', duration: '30 min' },
            ].map((schedule, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{schedule.course}</p>
                  <p className="text-xs text-gray-600">{schedule.day} • {schedule.time} • {schedule.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'First Course Completed', description: 'Completed JavaScript Fundamentals', icon: Award, color: 'bg-yellow-100 text-yellow-600' },
            { title: '7-Day Streak', description: 'Learning for 7 consecutive days', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
            { title: 'Quiz Master', description: 'Scored 95% on React quiz', icon: BarChart3, color: 'bg-blue-100 text-blue-600' },
          ].map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className={`p-3 rounded-lg ${achievement.color}`}>
                <achievement.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{achievement.title}</h3>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
