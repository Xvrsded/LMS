'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { LoadingCard, LoadingTable } from '@/components/ui/loading'
import { EmptyDiscussions, EmptySearch } from '@/components/ui/empty-state'
import { 
  MessageSquare, 
  Reply, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle,
  AlertCircle,
  User,
  BookOpen,
  Send,
  MoreVertical
} from 'lucide-react'

interface Discussion {
  id: string
  student: string
  course: string
  question: string
  timestamp: string
  status: 'answered' | 'pending' | 'urgent'
  replies: number
  lastReply?: string
}

const discussions: Discussion[] = [
  {
    id: '1',
    student: 'John Doe',
    course: 'JavaScript Fundamentals',
    question: 'I\'m having trouble understanding closures in JavaScript. Can you explain it with a practical example?',
    timestamp: '2 hours ago',
    status: 'pending',
    replies: 2,
    lastReply: '30 minutes ago'
  },
  {
    id: '2',
    student: 'Jane Smith',
    course: 'React Advanced Patterns',
    question: 'How do I properly implement React Context with TypeScript? Getting type errors.',
    timestamp: '5 hours ago',
    status: 'answered',
    replies: 4,
    lastReply: '1 hour ago'
  },
  {
    id: '3',
    student: 'Mike Johnson',
    course: 'TypeScript Basics',
    question: 'Urgent: My project build is failing due to TypeScript errors. Need help ASAP!',
    timestamp: '1 hour ago',
    status: 'urgent',
    replies: 1,
    lastReply: '45 minutes ago'
  },
  {
    id: '4',
    student: 'Sarah Wilson',
    course: 'Node.js Backend',
    question: 'What\'s the best way to handle authentication in a Node.js API?',
    timestamp: '1 day ago',
    status: 'answered',
    replies: 6,
    lastReply: '3 hours ago'
  },
  {
    id: '5',
    student: 'Tom Brown',
    course: 'CSS Mastery',
    question: 'How can I create responsive layouts without using media queries?',
    timestamp: '2 days ago',
    status: 'pending',
    replies: 0
  }
]

function DiscussionContent() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'answered' | 'urgent'>('all')
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <LoadingCard title="Discussion" lines={2} />
        
        {/* Loading Discussions List */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <LoadingCard key={i} lines={4} />
            ))}
          </div>
          
          {/* Loading Discussion Detail */}
          <div className="xl:col-span-1">
            <LoadingCard lines={6} />
          </div>
        </div>
      </div>
    )
  }

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          discussion.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          discussion.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || discussion.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Check if there are no discussions
  const hasNoDiscussions = discussions.length === 0
  const hasSearchResults = filteredDiscussions.length === 0 && searchTerm
  
  if (hasNoDiscussions) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discussion</h1>
              <p className="text-gray-600 mt-1">Manage student questions and course discussions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['all', 'pending', 'answered', 'urgent'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter as any)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                      statusFilter === filter
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>
        </div>
        
        {/* Empty Discussions State */}
        <EmptyDiscussions onCreateDiscussion={() => console.log('Create discussion')} />
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      answered: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status as keyof typeof statusConfig]}`}>
        {status}
      </span>
    )
  }

  const handleReply = () => {
    if (replyText.trim() && selectedDiscussion) {
      // Handle reply logic here
      console.log('Reply sent:', replyText)
      setReplyText('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Discussion</h1>
            <p className="text-gray-600 mt-1">Manage student questions and course discussions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['all', 'pending', 'answered', 'urgent'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                    statusFilter === filter
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Discussions List */}
        <div className="xl:col-span-2 space-y-4">
          {hasSearchResults ? (
            <EmptySearch 
              query={searchTerm} 
              onClearSearch={() => setSearchTerm('')} 
            />
          ) : (
            filteredDiscussions.map((discussion) => (
              <div 
                key={discussion.id}
                onClick={() => setSelectedDiscussion(discussion)}
                className={`bg-white p-4 rounded-2xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden ${
                  selectedDiscussion?.id === discussion.id 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 via-purple-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="group-hover:scale-110 transition-transform duration-200">
                        {getStatusIcon(discussion.status)}
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{discussion.student}</span>
                      <div className="group-hover:scale-105 transition-transform duration-200">
                        {getStatusBadge(discussion.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">{discussion.timestamp}</span>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 group-hover:bg-blue-100">
                        <MoreVertical className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-700 transition-colors duration-200">{discussion.course}</p>
                    <p className="text-gray-900 line-clamp-2 group-hover:text-gray-800 transition-colors duration-200">{discussion.question}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                        <Reply className="w-3 h-3 group-hover:text-blue-600 transition-colors duration-200" />
                        <span className="group-hover:text-gray-700 transition-colors duration-200">{discussion.replies} replies</span>
                      </div>
                      {discussion.lastReply && (
                        <span className="group-hover:text-gray-700 transition-colors duration-200">Last reply {discussion.lastReply}</span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDiscussion(discussion)
                      }}
                      className="hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 group-hover:scale-105"
                    >
                      View Thread
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Discussion Detail */}
        <div className="xl:col-span-1">
          {selectedDiscussion ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(selectedDiscussion.status)}
                  <span className="font-medium text-gray-900">{selectedDiscussion.student}</span>
                  {getStatusBadge(selectedDiscussion.status)}
                </div>
                <p className="text-sm text-gray-600">{selectedDiscussion.course}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedDiscussion.timestamp}</p>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Question</h4>
                <p className="text-gray-700 text-sm mb-4">{selectedDiscussion.question}</p>
                
                {/* Sample Replies */}
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">You</span>
                      <span className="text-xs text-gray-500">30 minutes ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Great question! Let me explain closures with a practical example...
                    </p>
                  </div>
                  
                  {selectedDiscussion.replies > 1 && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">JD</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{selectedDiscussion.student}</span>
                        <span className="text-xs text-gray-500">15 minutes ago</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Thanks! That makes much more sense now.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Reply Input */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className="px-3"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Discussion</h3>
              <p className="text-sm text-gray-600">
                Choose a discussion from the list to view details and reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Discussion() {
  return (
    
      <DiscussionContent />
    
  )
}
