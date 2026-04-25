'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  Award,
  PlayCircle,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react'

export default function TutorDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+2 this month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">248</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+18 this week</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">87%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hours Taught</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">+12 this week</span>
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* CHART + QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="h-64 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Analytics Chart</p>
              <p className="text-sm text-gray-500 mt-2">Student engagement trending up</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Create Course</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200">
              <PlayCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Add Lesson</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Create Quiz</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-200">
              <Users className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">View Students</span>
            </button>
          </div>
        </div>
      </div>

      {/* RECENT COURSES */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Courses</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Advanced React Development', students: 45, progress: 78, status: 'active' },
              { name: 'JavaScript Fundamentals', students: 62, progress: 92, status: 'active' },
              { name: 'UI/UX Design Principles', students: 38, progress: 65, status: 'draft' },
            ].map((course, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 text-sm">{course.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{course.students} students enrolled</p>
                <div>
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
            ))}
          </div>
        </div>
      </div>

      {/* STUDENTS ACTIVITY */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Student Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            { student: 'Sarah Johnson', action: 'Completed React Hooks lesson', time: '2 minutes ago', course: 'Advanced React' },
            { student: 'Mike Chen', action: 'Submitted JavaScript quiz', time: '15 minutes ago', course: 'JavaScript Fundamentals' },
            { student: 'Emily Davis', action: 'Started UI/UX Design course', time: '1 hour ago', course: 'UI/UX Principles' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.student}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.course} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
