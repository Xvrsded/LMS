'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Users, DollarSign, Star, Play } from 'lucide-react'

const mockCourses = [
  { 
    id: '1', 
    title: 'Complete Web Development Bootcamp', 
    instructor: 'John Doe', 
    category: 'Programming',
    price: 750000,
    students: 1234,
    rating: 4.8,
    status: 'Published',
    thumbnail: '/api/placeholder/300/200',
    modules: 12,
    duration: '24 hours'
  },
  { 
    id: '2', 
    title: 'UI/UX Design Masterclass', 
    instructor: 'Jane Smith', 
    category: 'Design',
    price: 500000,
    students: 892,
    rating: 4.6,
    status: 'Published',
    thumbnail: '/api/placeholder/300/200',
    modules: 8,
    duration: '16 hours'
  },
  { 
    id: '3', 
    title: 'Digital Marketing Fundamentals', 
    instructor: 'Bob Johnson', 
    category: 'Marketing',
    price: 400000,
    students: 567,
    rating: 4.5,
    status: 'Draft',
    thumbnail: '/api/placeholder/300/200',
    modules: 6,
    duration: '12 hours'
  },
  { 
    id: '4', 
    title: 'Data Science with Python', 
    instructor: 'Alice Brown', 
    category: 'Data Science',
    price: 900000,
    students: 2341,
    rating: 4.9,
    status: 'Published',
    thumbnail: '/api/placeholder/300/200',
    modules: 15,
    duration: '30 hours'
  },
]

function CoursesContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory
    const matchesStatus = selectedStatus === 'ALL' || course.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Courses Management</h1>
          <p className="text-secondary-600 mt-2">Manage all courses in the system</p>
        </div>
        <Button className="bg-primary-800 hover:bg-primary-900">
          Create New Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">45</p>
                <p className="text-sm text-green-600 mt-1">+8% this month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">38</p>
                <p className="text-sm text-green-600 mt-1">+5 this month</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Play className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">5,034</p>
                <p className="text-sm text-blue-600 mt-1">+234 this month</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">Rp 45.2M</p>
                <p className="text-sm text-green-600 mt-1">+18% this month</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Courses</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="ALL">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="ALL">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-t-xl"></div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(course.status)}`}>
                        {course.status}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{course.modules} modules</span>
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(course.price)}</span>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{course.students}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className={`px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Instructor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                          <div>
                            <p className="font-medium text-gray-900">{course.title}</p>
                            <p className="text-sm text-gray-500">{course.modules} modules • {course.duration}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{course.instructor}</td>
                      <td className="py-3 px-4 text-gray-900">{course.category}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{course.students}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(course.price)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CoursesPage() {
  return (
    
      <CoursesContent />
    
  )
}
