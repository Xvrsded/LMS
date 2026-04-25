'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, BookOpen, Users, Clock, TrendingUp, Edit, Trash2, Eye } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  price: number
  status: 'draft' | 'published' | 'archived'
  thumbnail?: string
  createdAt: string
  updatedAt: string
  tutor: {
    id: string
    name: string
    username: string
    email: string
  }
  _count: {
    enrollments: number
    lessons: number
    quizzes: number
  }
}

export default function TutorCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCourse = async (courseData: Partial<Course>) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })

      if (response.ok) {
        const newCourse = await response.json()
        setCourses([newCourse, ...courses])
        setShowCreateModal(false)
      }
    } catch (error) {
      console.error('Failed to create course:', error)
    }
  }

  const handleUpdateCourse = async (id: string, courseData: Partial<Course>) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })

      if (response.ok) {
        const updatedCourse = await response.json()
        setCourses(courses.map(course => 
          course.id === id ? updatedCourse : course
        ))
        setEditingCourse(null)
      }
    } catch (error) {
      console.error('Failed to update course:', error)
    }
  }

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete course:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Actions - Header removed since handled by TutorNavbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600">Manage and create your educational content</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Create New Course
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.filter(course => {
          const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               course.description.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesStatus = statusFilter === 'all' || course.status === statusFilter
          return matchesSearch && matchesStatus
        }).map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  course.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : course.status === 'draft'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {course.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{course._count.enrollments} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{course._count.lessons} lessons</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium text-gray-900">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium text-gray-900">${course.price}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingCourse(course)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Manage Course
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Course Modal */}
      {(showCreateModal || editingCourse) && (
        <CourseModal
          course={editingCourse}
          onClose={() => {
            setShowCreateModal(false)
            setEditingCourse(null)
          }}
          onSave={editingCourse ? 
            (data) => handleUpdateCourse(editingCourse.id, data) : 
            handleCreateCourse
          }
        />
      )}
    </div>
  )
}

// Course Modal Component
function CourseModal({ 
  course, 
  onClose, 
  onSave 
}: { 
  course: Course | null
  onClose: () => void
  onSave: (data: Partial<Course>) => void 
}) {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || 'Web Development',
    level: course?.level || 'Beginner',
    price: course?.price || 0,
    status: course?.status || 'draft'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {course ? 'Edit Course' : 'Create New Course'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>Data Science</option>
              <option>Design</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {course && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {course ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
