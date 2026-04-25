'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Download, Share2, Calendar, CheckCircle, Clock, ExternalLink, Filter, Search } from 'lucide-react'

const certificates = [
  {
    id: '1',
    courseTitle: 'UI/UX Design Masterclass',
    instructor: 'Jane Smith',
    issueDate: '2024-02-15',
    certificateId: 'LMS-UX-2024-0156',
    completionDate: '2024-02-14',
    score: 92,
    totalHours: 16,
    thumbnail: '/api/placeholder/400/250',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
    status: 'issued',
    shareableLink: 'https://certificate.lms.com/verify/LMS-UX-2024-0156',
    canDownload: true,
    canShare: true
  },
  {
    id: '2',
    courseTitle: 'Digital Marketing Fundamentals',
    instructor: 'Bob Johnson',
    issueDate: '2024-03-01',
    certificateId: 'LMS-DM-2024-0234',
    completionDate: '2024-02-28',
    score: 88,
    totalHours: 12,
    thumbnail: '/api/placeholder/400/250',
    skills: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Analytics'],
    status: 'issued',
    shareableLink: 'https://certificate.lms.com/verify/LMS-DM-2024-0234',
    canDownload: true,
    canShare: true
  }
]

const inProgressCertificates = [
  {
    id: '3',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    currentProgress: 75,
    estimatedCompletion: '2024-03-15',
    certificateId: 'LMS-WD-2024-PENDING',
    thumbnail: '/api/placeholder/400/250',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    status: 'in-progress'
  }
]

function CertificatesContent() {
  const [activeTab, setActiveTab] = useState<'issued' | 'in-progress'>('issued')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCertificates = certificates.filter(cert => 
    cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString))
  }

  const handleDownload = (certificateId: string) => {
    // Simulate download
    alert(`Downloading certificate ${certificateId}...`)
  }

  const handleShare = (shareableLink: string) => {
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink)
    alert('Certificate link copied to clipboard!')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">My Certificates</h1>
          <p className="text-secondary-600 mt-2">View and share your achievement certificates</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-accent-100 text-accent-800 px-3 py-2 rounded-lg font-medium">
            <Award className="w-5 h-5 inline mr-2" />
            {certificates.length} Certificates Earned
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{certificates.length}</p>
                <p className="text-sm text-green-600 mt-1">+2 this month</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{inProgressCertificates.length}</p>
                <p className="text-sm text-blue-600 mt-1">Almost there!</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">90%</p>
                <p className="text-sm text-green-600 mt-1">Excellent!</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skills Verified</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">15</p>
                <p className="text-sm text-orange-600 mt-1">Across all courses</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('issued')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'issued'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Issued Certificates ({certificates.length})
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'in-progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                In Progress ({inProgressCertificates.length})
              </button>
            </div>
            
            {activeTab === 'issued' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'issued' ? (
            <div className="space-y-6">
              {filteredCertificates.map((certificate) => (
                <div key={certificate.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-6">
                    {/* Certificate Preview */}
                    <div className="w-48 h-36 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white shrink-0">
                      <div className="text-center">
                        <Award className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-xs font-semibold">Certificate</p>
                        <p className="text-xs">of Completion</p>
                      </div>
                    </div>
                    
                    {/* Certificate Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{certificate.courseTitle}</h3>
                          <p className="text-sm text-gray-600">Instructor: {certificate.instructor}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Issued {formatDate(certificate.issueDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>Completed {formatDate(certificate.completionDate)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{certificate.score}%</div>
                          <div className="text-sm text-gray-500">Final Score</div>
                        </div>
                      </div>
                      
                      {/* Certificate ID */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                            <p className="font-mono text-sm font-medium">{certificate.certificateId}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Verify
                          </Button>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills Verified</p>
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <Button 
                          onClick={() => handleDownload(certificate.certificateId)}
                          className="flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleShare(certificate.shareableLink)}
                          className="flex items-center space-x-2"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </Button>
                        <Button variant="outline">
                          View Full Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCertificates.length === 0 && (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
                  <p className="text-gray-500">Start completing courses to earn your first certificate!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {inProgressCertificates.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-48 h-36 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-12 h-12 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.courseTitle}</h3>
                      <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress to Certificate</span>
                          <span className="font-medium">{course.currentProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.currentProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-900">Estimated Completion</p>
                            <p className="text-sm text-blue-700">{formatDate(course.estimatedCompletion)}</p>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Continue Learning
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills to be Verified</p>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CertificatesPage() {
  return (
    
      <CertificatesContent />
    
  )
}
