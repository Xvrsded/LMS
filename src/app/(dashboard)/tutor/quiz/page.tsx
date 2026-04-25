'use client'

import { Plus, Search, Filter, Clipboard, Clock, Users, CheckCircle, Edit, Trash2 } from 'lucide-react'

export default function TutorQuiz() {
  const quizzes = [
    {
      id: 1,
      title: 'React Hooks Assessment',
      course: 'Advanced React Development',
      questions: 15,
      duration: '30 min',
      students: 45,
      completed: 38,
      avgScore: 85,
      status: 'published',
      createdAt: '1 week ago'
    },
    {
      id: 2,
      title: 'JavaScript Basics Quiz',
      course: 'JavaScript Fundamentals',
      questions: 20,
      duration: '45 min',
      students: 62,
      completed: 54,
      avgScore: 78,
      status: 'published',
      createdAt: '2 weeks ago'
    },
    {
      id: 3,
      title: 'UI Design Principles Test',
      course: 'UI/UX Design Principles',
      questions: 10,
      duration: '20 min',
      students: 38,
      completed: 0,
      avgScore: 0,
      status: 'draft',
      createdAt: '3 days ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Actions - Header removed since handled by TutorNavbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600">Create quizzes and assignments to assess student understanding</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          Create Quiz
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="h-32 bg-linear-to-br from-green-500 to-teal-600 flex items-center justify-center relative">
              <Clipboard className="w-10 h-10 text-white" />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  quiz.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {quiz.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{quiz.course}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clipboard className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{quiz.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{quiz.duration}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{quiz.completed}/{quiz.students} completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Avg: {quiz.avgScore}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">Created {quiz.createdAt}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  View Results
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
