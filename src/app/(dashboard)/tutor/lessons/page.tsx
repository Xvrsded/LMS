'use client'

import { Plus, Search, Filter, Video, Clock, Users, Play, Edit, Trash2 } from 'lucide-react'

export default function TutorLessons() {
  const lessons = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      course: 'Advanced React Development',
      duration: '45 min',
      students: 45,
      status: 'published',
      views: 128,
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'State Management with Context',
      course: 'Advanced React Development',
      duration: '38 min',
      students: 45,
      status: 'published',
      views: 98,
      createdAt: '1 week ago'
    },
    {
      id: 3,
      title: 'JavaScript Arrays and Objects',
      course: 'JavaScript Fundamentals',
      duration: '52 min',
      students: 62,
      status: 'draft',
      views: 0,
      createdAt: '3 days ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Actions - Header removed since handled by TutorNavbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600">Create and manage your video lessons and course content</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          Create New Lesson
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="h-40 bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center relative">
              <Video className="w-12 h-12 text-white" />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  lesson.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {lesson.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{lesson.course}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{lesson.students} students</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{lesson.views} views</span>
                </div>
                <span className="text-xs text-gray-500">{lesson.createdAt}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Edit Lesson
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
