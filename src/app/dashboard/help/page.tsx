'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, Search, MessageSquare, Phone, Mail, BookOpen, Video, FileText, ExternalLink, Clock, CheckCircle, AlertCircle, Plus, Send } from 'lucide-react'

const helpCategories = [
  {
    id: '1',
    name: 'Getting Started',
    icon: BookOpen,
    description: 'Learn the basics of using our LMS platform',
    articles: 15,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    name: 'Courses & Learning',
    icon: Video,
    description: 'Everything about courses, lessons, and learning',
    articles: 23,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '3',
    name: 'Account & Billing',
    icon: FileText,
    description: 'Manage your account and payment information',
    articles: 18,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: '4',
    name: 'Technical Support',
    icon: MessageSquare,
    description: 'Troubleshooting and technical assistance',
    articles: 12,
    color: 'bg-orange-100 text-orange-600'
  }
]

const popularArticles = [
  {
    id: '1',
    title: 'How to enroll in a course',
    category: 'Getting Started',
    views: 1234,
    helpful: 89,
    lastUpdated: '2024-03-10'
  },
  {
    id: '2',
    title: 'Downloading course certificates',
    category: 'Courses & Learning',
    views: 987,
    helpful: 92,
    lastUpdated: '2024-03-12'
  },
  {
    id: '3',
    title: 'Payment methods and billing',
    category: 'Account & Billing',
    views: 756,
    helpful: 78,
    lastUpdated: '2024-03-08'
  },
  {
    id: '4',
    title: 'Troubleshooting video playback issues',
    category: 'Technical Support',
    views: 623,
    helpful: 85,
    lastUpdated: '2024-03-14'
  }
]

const supportTickets = [
  {
    id: '1',
    subject: 'Cannot access course materials',
    category: 'Technical Issue',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-14T10:30:00',
    lastReply: '2024-03-14T14:20:00',
    messages: 3,
    assignedTo: 'Support Team'
  },
  {
    id: '2',
    subject: 'Refund request for unused course',
    category: 'Billing',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-03-13T15:45:00',
    lastReply: '2024-03-14T09:15:00',
    messages: 5,
    assignedTo: 'John Doe'
  },
  {
    id: '3',
    subject: 'Question about course prerequisites',
    category: 'General Inquiry',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-10T11:20:00',
    lastReply: '2024-03-11T16:30:00',
    messages: 2,
    assignedTo: 'Jane Smith'
  }
]

const faqData = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link.'
  },
  {
    question: 'Can I download courses for offline viewing?',
    answer: 'Currently, courses are only available for streaming online. However, you can download course materials like PDFs and resources for offline use.'
  },
  {
    question: 'How long do I have access to purchased courses?',
    answer: 'Once you purchase a course, you have lifetime access to all course materials, including any future updates.'
  },
  {
    question: 'Are certificates recognized by employers?',
    answer: 'Our certificates are widely recognized in the industry. However, acceptance may vary by employer, so we recommend checking with your specific organization.'
  }
]

function HelpContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'help' | 'tickets' | 'faq'>('help')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
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

  const handleCreateTicket = () => {
    alert('Opening ticket creation form...')
  }

  const handleContactSupport = (method: string) => {
    alert(`Contacting support via ${method}...`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Help & Support</h1>
          <p className="text-secondary-600 mt-2">Get help with your learning journey</p>
        </div>
        <Button onClick={handleCreateTicket} className="bg-primary-800 hover:bg-primary-900">
          <Plus className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Knowledge Base</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">68</p>
                <p className="text-sm text-blue-600 mt-1">Articles</p>
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
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">1</p>
                <p className="text-sm text-red-600 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl text-red-600">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">2h</p>
                <p className="text-sm text-green-600 mt-1">Average</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">94%</p>
                <p className="text-sm text-purple-600 mt-1">Rate</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            {[
              { id: 'help', label: 'Help Center' },
              { id: 'tickets', label: 'My Tickets' },
              { id: 'faq', label: 'FAQ' }
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
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Center Tab */}
      {activeTab === 'help' && (
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{category.articles} articles</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Popular Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.views} views</span>
                        <span>•</span>
                        <span>{article.helpful}% helpful</span>
                        <span>•</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <Card>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Live Chat</h4>
                  <p className="text-sm text-gray-600 mb-3">Chat with our support team</p>
                  <Button variant="outline" onClick={() => handleContactSupport('chat')}>
                    Start Chat
                  </Button>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600 mb-3">support@lms.com</p>
                  <Button variant="outline" onClick={() => handleContactSupport('email')}>
                    Send Email
                  </Button>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Phone Support</h4>
                  <p className="text-sm text-gray-600 mb-3">+62 21 1234 5678</p>
                  <Button variant="outline" onClick={() => handleContactSupport('phone')}>
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* My Tickets Tab */}
      {activeTab === 'tickets' && (
        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{ticket.category}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>Created {formatTimeAgo(ticket.createdAt)}</span>
                        <span>•</span>
                        <span>Last reply {formatTimeAgo(ticket.lastReply)}</span>
                        <span>•</span>
                        <span>{ticket.messages} messages</span>
                        <span>•</span>
                        <span>Assigned to {ticket.assignedTo}</span>
                      </div>
                    </div>
                    <Button variant="outline">
                      View Ticket
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <div className={`w-5 h-5 transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function HelpPage() {
  return (
    <DashboardLayout>
      <HelpContent />
    </DashboardLayout>
  )
}
