'use client'

import { Plus, Search, Layers, BookOpen, Video, FileText, Image, Save, Eye } from 'lucide-react'

export default function TutorBuilder() {
  return (
    <div className="space-y-6">
      {/* Page Actions - Header removed since handled by TutorNavbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600">Create and structure your course content</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Save className="w-4 h-4" />
            Save Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Course description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>Data Science</option>
                  <option>Design</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Structure */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Structure</h2>
            
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Module 1: Introduction</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">3 lessons</p>
              </div>
              
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Module 2: Core Concepts</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">5 lessons</p>
              </div>
              
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200">
                <Plus className="w-4 h-4 text-gray-600 mx-auto" />
                <span className="text-sm text-gray-600 mt-1">Add Module</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Editor */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Video className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <FileText className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Image className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Course</h3>
              <p className="text-gray-600 mb-4">Add lessons, quizzes, and resources to create engaging content</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                Add First Lesson
              </button>
            </div>
          </div>

          {/* Lesson Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lesson Templates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <Video className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Video Lesson</h3>
                <p className="text-sm text-gray-600">Upload or embed video content</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <FileText className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Text Lesson</h3>
                <p className="text-sm text-gray-600">Create written content with rich formatting</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <Layers className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Interactive</h3>
                <p className="text-sm text-gray-600">Add quizzes and interactive elements</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <Image className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Resources</h3>
                <p className="text-sm text-gray-600">Upload files and downloadable content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
