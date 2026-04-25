'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookMarked, Search, Filter, Clock, Play, ExternalLink, Trash2, Folder, Plus, BookmarkIcon, Video, FileText, MessageSquare } from 'lucide-react'

const bookmarksData = [
  {
    id: '1',
    title: 'React Hooks Deep Dive - useState and useEffect',
    type: 'lesson',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    url: '/courses/1/modules/2/lessons/5',
    thumbnail: '/api/placeholder/200/120',
    description: 'Comprehensive guide to React Hooks with practical examples',
    duration: '45 min',
    bookmarkedAt: '2024-03-14T10:30:00',
    category: 'React',
    tags: ['react', 'hooks', 'javascript'],
    progress: 75,
    isCompleted: false,
    folder: 'Web Development'
  },
  {
    id: '2',
    title: 'UI/UX Design Principles Discussion',
    type: 'discussion',
    courseTitle: 'UI/UX Design Masterclass',
    instructor: 'Jane Smith',
    url: '/discussions/123',
    thumbnail: '/api/placeholder/200/120',
    description: 'Great discussion about modern UI/UX principles and best practices',
    duration: null,
    bookmarkedAt: '2024-03-13T15:45:00',
    category: 'Design',
    tags: ['ui', 'ux', 'design', 'principles'],
    progress: null,
    isCompleted: false,
    folder: 'Design Resources'
  },
  {
    id: '3',
    title: 'JavaScript Promises and Async/Await',
    type: 'lesson',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    url: '/courses/1/modules/3/lessons/8',
    thumbnail: '/api/placeholder/200/120',
    description: 'Understanding asynchronous JavaScript with Promises and async/await',
    duration: '60 min',
    bookmarkedAt: '2024-03-12T09:15:00',
    category: 'JavaScript',
    tags: ['javascript', 'async', 'promises'],
    progress: 100,
    isCompleted: true,
    folder: 'Web Development'
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy Guide',
    type: 'resource',
    courseTitle: 'Digital Marketing Fundamentals',
    instructor: 'Bob Johnson',
    url: '/resources/marketing-strategy',
    thumbnail: '/api/placeholder/200/120',
    description: 'Comprehensive guide to digital marketing strategies and tactics',
    duration: null,
    bookmarkedAt: '2024-03-11T14:20:00',
    category: 'Marketing',
    tags: ['marketing', 'strategy', 'digital'],
    progress: null,
    isCompleted: false,
    folder: 'Marketing'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox - When to Use Which',
    type: 'article',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'External Resource',
    url: '/articles/css-grid-vs-flexbox',
    thumbnail: '/api/placeholder/200/120',
    description: 'Detailed comparison between CSS Grid and Flexbox with use cases',
    duration: '15 min read',
    bookmarkedAt: '2024-03-10T11:30:00',
    category: 'CSS',
    tags: ['css', 'grid', 'flexbox', 'layout'],
    progress: null,
    isCompleted: false,
    folder: 'Web Development'
  }
]

const folders = [
  { name: 'All Bookmarks', count: bookmarksData.length, color: 'bg-gray-100' },
  { name: 'Web Development', count: 3, color: 'bg-blue-100' },
  { name: 'Design Resources', count: 1, color: 'bg-green-100' },
  { name: 'Marketing', count: 1, color: 'bg-purple-100' }
]

function BookmarksContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('All Bookmarks')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const filteredBookmarks = bookmarksData.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFolder = selectedFolder === 'All Bookmarks' || bookmark.folder === selectedFolder
    const matchesType = selectedType === 'all' || bookmark.type === selectedType
    return matchesSearch && matchesFolder && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <Play className="w-4 h-4" />
      case 'discussion': return <MessageSquare className="w-4 h-4" />
      case 'resource': return <FileText className="w-4 h-4" />
      case 'article': return <FileText className="w-4 h-4" />
      default: return <BookmarkIcon className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-800'
      case 'discussion': return 'bg-green-100 text-green-800'
      case 'resource': return 'bg-purple-100 text-purple-800'
      case 'article': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const handleRemoveBookmark = (bookmarkId: string) => {
    alert(`Removing bookmark ${bookmarkId}...`)
  }

  const handleOpenBookmark = (url: string) => {
    alert(`Opening bookmark: ${url}`)
  }

  const handleCreateFolder = () => {
    alert('Opening create folder dialog...')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">My Bookmarks</h1>
          <p className="text-secondary-600 mt-2">Save and organize your favorite learning resources</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleCreateFolder}>
            <Plus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BookMarked className="w-4 h-4 mr-2" />
            Import Bookmarks
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookmarks</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{bookmarksData.length}</p>
                <p className="text-sm text-blue-600 mt-1">+3 this week</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <BookMarked className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Folders</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">4</p>
                <p className="text-sm text-green-600 mt-1">Organized</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Folder className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lessons</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
                <p className="text-sm text-purple-600 mt-1">Bookmarked</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Play className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resources</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
                <p className="text-sm text-orange-600 mt-1">Saved</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Folders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedFolder === folder.name
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4" />
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{folder.count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Bookmarked React Hooks lesson</span>
                  <span className="text-gray-400">2h ago</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Created Design folder</span>
                  <span className="text-gray-400">1d ago</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Bookmarked marketing guide</span>
                  <span className="text-gray-400">3d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters and Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search bookmarks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="all">All Types</option>
                    <option value="lesson">Lessons</option>
                    <option value="discussion">Discussions</option>
                    <option value="resource">Resources</option>
                    <option value="article">Articles</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="course">By Course</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookmarks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 rounded-t-xl"></div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(bookmark.type)}`}>
                      {getTypeIcon(bookmark.type)}
                      <span>{bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}</span>
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {bookmark.progress !== null && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="w-full bg-white/90 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${bookmark.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${bookmark.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
                    {bookmark.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{bookmark.courseTitle}</p>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{bookmark.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{bookmark.duration || 'No duration'}</span>
                    </div>
                    <span>Bookmarked {formatTimeAgo(bookmark.bookmarkedAt)}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {bookmark.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleOpenBookmark(bookmark.url)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                    {bookmark.type === 'lesson' && !bookmark.isCompleted && (
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBookmarks.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
                <p className="text-gray-500 mb-4">Start bookmarking your favorite lessons and resources</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookmarksPage() {
  return (
    <DashboardLayout>
      <BookmarksContent />
    </DashboardLayout>
  )
}
