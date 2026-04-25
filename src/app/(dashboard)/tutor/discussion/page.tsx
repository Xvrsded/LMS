'use client'

import { Search, MessageSquare, Clock, Users, Reply, Pin } from 'lucide-react'

export default function TutorDiscussion() {
  const discussions = [
    {
      id: 1,
      title: 'Help with useState hook in React',
      course: 'Advanced React Development',
      author: 'Sarah Johnson',
      replies: 12,
      views: 45,
      lastActivity: '2 hours ago',
      isPinned: true,
      status: 'answered'
    },
    {
      id: 2,
      title: 'Understanding JavaScript closures',
      course: 'JavaScript Fundamentals',
      author: 'Michael Chen',
      replies: 8,
      views: 32,
      lastActivity: '5 hours ago',
      isPinned: false,
      status: 'open'
    },
    {
      id: 3,
      title: 'Best practices for responsive design',
      course: 'UI/UX Design Principles',
      author: 'Emily Davis',
      replies: 15,
      views: 67,
      lastActivity: '1 day ago',
      isPinned: false,
      status: 'answered'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Actions - Header removed since handled by TutorNavbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-gray-600">Engage with students and answer their questions</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Discussions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Replies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Reply className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Courses</option>
          <option>Advanced React Development</option>
          <option>JavaScript Fundamentals</option>
          <option>UI/UX Design Principles</option>
        </select>
      </div>

      {/* Discussions List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {discussion.isPinned && (
                      <Pin className="w-4 h-4 text-blue-600" />
                    )}
                    <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                      {discussion.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      discussion.status === 'answered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {discussion.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {discussion.course} • by {discussion.author}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Reply className="w-4 h-4" />
                      <span>{discussion.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{discussion.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <button className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
