'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp,
  Clock,
  Star,
  Target,
  Download,
  MessageSquare,
  FileText
} from 'lucide-react'

interface StudentDetailModalProps {
  student: any
  isOpen: boolean
  onClose: () => void
}

export function StudentDetailModal({ student, isOpen, onClose }: StudentDetailModalProps) {
  if (!isOpen || !student) return null

  const mockCourses = [
    { name: 'React Advanced Patterns', progress: 85, status: 'active', lastAccessed: '2 hours ago' },
    { name: 'TypeScript Mastery', progress: 60, status: 'active', lastAccessed: '1 day ago' },
    { name: 'JavaScript Fundamentals', progress: 100, status: 'completed', completedDate: '2 weeks ago' },
    { name: 'CSS Fundamentals', progress: 45, status: 'active', lastAccessed: '3 days ago' },
    { name: 'Node.js Backend', progress: 30, status: 'paused', lastAccessed: '1 week ago' }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      paused: 'bg-yellow-100 text-yellow-800'
    }
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {student.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-600">{student.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Student Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{student.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{student.location}</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Learning Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Courses</span>
                    <span className="font-semibold">{student.enrolledCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Courses</span>
                    <span className="font-semibold text-green-600">{student.activeCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-semibold text-blue-600">{student.completedCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Progress</span>
                    <span className="font-semibold">{student.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="font-semibold text-green-600">{student.totalSpent}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </Button>
              </div>
            </div>

            {/* Right Column - Courses */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enrolled Courses</h3>
                <p className="text-gray-600">Track student's progress across all courses</p>
              </div>

              <div className="space-y-4">
                {mockCourses.map((course, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.name}</h4>
                          <p className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {course.status === 'completed' && (
                      <div className="mt-3 flex items-center space-x-2 text-sm text-green-600">
                        <Award className="w-4 h-4" />
                        <span>Completed on {course.completedDate}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
