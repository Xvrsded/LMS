'use client'

import { TrendingUp, Users, BookOpen, Clock, Award, Target } from 'lucide-react'

export default function TutorAnalytics() {
  return (
    <div className="space-y-6">
      {/* Page Description - Header removed since handled by TutorNavbar */}
      <div>
        <p className="text-gray-600">Track your teaching performance and student engagement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$8,450</p>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">248</p>
              <p className="text-xs text-green-600 mt-2">+8% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Course Completion</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">78%</p>
              <p className="text-xs text-green-600 mt-2">+5% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.8</p>
              <p className="text-xs text-gray-600 mt-2">No change</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue chart will be displayed here</p>
          </div>
        </div>

        {/* Student Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Progress</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Progress chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Top Performing Courses */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h2>
        <div className="space-y-4">
          {[
            { name: 'Advanced React Development', students: 45, completion: 78, revenue: '$2,250' },
            { name: 'JavaScript Fundamentals', students: 62, completion: 92, revenue: '$3,100' },
            { name: 'UI/UX Design Principles', students: 38, completion: 65, revenue: '$1,900' },
          ].map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.students} students</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="font-medium text-gray-900">{course.completion}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="font-medium text-gray-900">{course.revenue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
