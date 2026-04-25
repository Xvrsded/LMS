'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Search, Filter, ThumbsUp, MessageCircle, Share2, Bookmark, Plus, Clock, Eye, User, TrendingUp, Pin } from 'lucide-react'

const discussionsData = [
  {
    id: '1',
    title: 'Best practices for React Hooks in large applications',
    content: 'I\'ve been working on a large React application and I\'m wondering about the best practices for using React Hooks. Should I use custom hooks for everything? What about performance optimization?',
    author: 'John Doe',
    authorAvatar: '/api/placeholder/40/40',
    courseTitle: 'Complete Web Development Bootcamp',
    category: 'React Hooks',
    tags: ['react', 'hooks', 'performance'],
    createdAt: '2024-03-14T10:30:00',
    replies: 23,
    views: 156,
    likes: 45,
    isPinned: true,
    isLocked: false,
    isBookmarked: true,
    hasAnswer: true,
    lastReply: '2024-03-14T15:45:00',
    lastReplyAuthor: 'Jane Smith'
  },
  {
    id: '2',
    title: 'How to create responsive layouts with CSS Grid?',
    content: 'I\'m struggling with creating responsive layouts using CSS Grid. Can someone explain the best approach for mobile-first design?',
    author: 'Alice Brown',
    authorAvatar: '/api/placeholder/40/40',
    courseTitle: 'Complete Web Development Bootcamp',
    category: 'CSS',
    tags: ['css', 'grid', 'responsive'],
    createdAt: '2024-03-14T09:15:00',
    replies: 18,
    views: 234,
    likes: 32,
    isPinned: false,
    isLocked: false,
    isBookmarked: false,
    hasAnswer: true,
    lastReply: '2024-03-14T14:20:00',
    lastReplyAuthor: 'Bob Johnson'
  },
  {
    id: '3',
    title: 'JavaScript async/await vs Promises - when to use which?',
    content: 'I understand both async/await and Promises, but I\'m not sure when to use one over the other. What are the pros and cons of each approach?',
    author: 'Charlie Wilson',
    authorAvatar: '/api/placeholder/40/40',
    courseTitle: 'Complete Web Development Bootcamp',
    category: 'JavaScript',
    tags: ['javascript', 'async', 'promises'],
    createdAt: '2024-03-13T16:45:00',
    replies: 31,
    views: 412,
    likes: 67,
    isPinned: false,
    isLocked: false,
    isBookmarked: true,
    hasAnswer: true,
    lastReply: '2024-03-14T11:30:00',
    lastReplyAuthor: 'David Lee'
  },
  {
    id: '4',
    title: 'UI/UX Design principles for mobile apps',
    content: 'What are the key differences between designing for web vs mobile? Are there specific guidelines I should follow for mobile app design?',
    author: 'Emma Davis',
    authorAvatar: '/api/placeholder/40/40',
    courseTitle: 'UI/UX Design Masterclass',
    category: 'Mobile Design',
    tags: ['ui', 'ux', 'mobile', 'design'],
    createdAt: '2024-03-13T14:20:00',
    replies: 15,
    views: 189,
    likes: 28,
    isPinned: false,
    isLocked: false,
    isBookmarked: false,
    hasAnswer: false,
    lastReply: '2024-03-14T09:15:00',
    lastReplyAuthor: 'Frank Miller'
  }
]

const categories = [
  { name: 'All Categories', count: 156 },
  { name: 'React Hooks', count: 23 },
  { name: 'CSS', count: 18 },
  { name: 'JavaScript', count: 31 },
  { name: 'Mobile Design', count: 15 },
  { name: 'General', count: 69 }
]

function DiscussionsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('latest')
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'bookmarked'>('all')

  const filteredDiscussions = discussionsData.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All Categories' || discussion.category === selectedCategory
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'my' && discussion.author === 'John Doe') ||
                     (activeTab === 'bookmarked' && discussion.isBookmarked)
    return matchesSearch && matchesCategory && matchesTab
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const handleLike = (discussionId: string) => {
    alert(`Liking discussion ${discussionId}...`)
  }

  const handleBookmark = (discussionId: string) => {
    alert(`Bookmarking discussion ${discussionId}...`)
  }

  const handleShare = (discussionId: string) => {
    alert(`Sharing discussion ${discussionId}...`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Discussion Forum</h1>
          <p className="text-secondary-600 mt-2">Connect with fellow learners and share knowledge</p>
        </div>
        <Button className="bg-primary-800 hover:bg-primary-900">
          <Plus className="w-4 h-4 mr-2" />
          New Discussion
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Discussions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">156</p>
                <p className="text-sm text-green-600 mt-1">+12 this week</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Discussions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">8</p>
                <p className="text-sm text-blue-600 mt-1">2 active</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <User className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookmarked</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
                <p className="text-sm text-purple-600 mt-1">Following</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Bookmark className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contributions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">45</p>
                <p className="text-sm text-orange-600 mt-1">Helpful answers</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['react', 'javascript', 'css', 'html', 'nodejs', 'python', 'design', 'mobile'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs and Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {[
                    { id: 'all', label: 'All Discussions', count: discussionsData.length },
                    { id: 'my', label: 'My Discussions', count: 1 },
                    { id: 'bookmarked', label: 'Bookmarked', count: 2 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="unanswered">Unanswered</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discussions List */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Author Avatar */}
                      <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                      
                      {/* Discussion Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && (
                            <Pin className="w-4 h-4 text-red-500" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.hasAnswer && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                              Answered
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{discussion.content}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="font-medium text-gray-700">{discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.courseTitle}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(discussion.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{discussion.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Last reply by {discussion.lastReplyAuthor}</span>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {discussion.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(discussion.id)}
                        className="flex items-center space-x-1"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(discussion.id)}
                        className={discussion.isBookmarked ? 'text-blue-600' : ''}
                      >
                        <Bookmark className={`w-4 h-4 ${discussion.isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(discussion.id)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDiscussions.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                <p className="text-gray-500 mb-4">Start a new discussion or try different filters</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DiscussionsPage() {
  return (
    <DashboardLayout>
      <DiscussionsContent />
    </DashboardLayout>
  )
}
