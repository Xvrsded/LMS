'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Play, Clock, CheckCircle, Circle, Award, TrendingUp, Calendar, BarChart3, Download } from 'lucide-react'

const myCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    thumbnail: '/api/placeholder/300/200',
    progress: 75,
    totalLessons: 45,
    completedLessons: 34,
    totalHours: 24,
    spentHours: 18,
    lastAccessed: '2 hours ago',
    nextLesson: 'Building REST APIs with Node.js',
    nextLessonDuration: '45 min',
    isCompleted: false,
    certificateEarned: false,
    enrolledDate: '2024-01-15',
    category: 'Programming',
    rating: 4.8
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Jane Smith',
    thumbnail: '/api/placeholder/300/200',
    progress: 100,
    totalLessons: 32,
    completedLessons: 32,
    totalHours: 16,
    spentHours: 16,
    lastAccessed: '1 week ago',
    nextLesson: null,
    nextLessonDuration: null,
    isCompleted: true,
    certificateEarned: true,
    enrolledDate: '2024-01-20',
    category: 'Design',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Digital Marketing Fundamentals',
    instructor: 'Bob Johnson',
    thumbnail: '/api/placeholder/300/200',
    progress: 25,
    totalLessons: 24,
    completedLessons: 6,
    totalHours: 12,
    spentHours: 3,
    lastAccessed: '3 days ago',
    nextLesson: 'Social Media Marketing Strategies',
    nextLessonDuration: '30 min',
    isCompleted: false,
    certificateEarned: false,
    enrolledDate: '2024-02-01',
    category: 'Marketing',
    rating: 4.5
  }
]

const learningStats = {
  totalCourses: 3,
  completedCourses: 1,
  inProgressCourses: 2,
  totalLearningHours: 37,
  totalLessons: 101,
  completedLessons: 72,
  averageProgress: 67,
  streakDays: 15,
  weeklyHours: 12
}

function LearningContent() {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all')

  const filteredCourses = myCourses.filter(course => {
    if (activeTab === 'in-progress') return !course.isCompleted
    if (activeTab === 'completed') return course.isCompleted
    return true
  })

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}j ${mins}m` : `${mins}m`
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">My Learning</h1>
          <p className="text-secondary-600 mt-2">Track your progress and continue your learning journey</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-accent-100 text-accent-800 px-3 py-2 rounded-lg">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">15 day streak!</span>
          </div>
        </div>
      </div>

      {/* Learning Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{learningStats.totalCourses}</p>
                <p className="text-sm text-gray-500 mt-1">{learningStats.completedCourses} completed</p>
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
                <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{learningStats.totalLearningHours}</p>
                <p className="text-sm text-green-600 mt-1">{learningStats.weeklyHours} this week</p>
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
                <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{learningStats.completedLessons}</p>
                <p className="text-sm text-gray-500 mt-1">of {learningStats.totalLessons} total</p>
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
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{learningStats.averageProgress}%</p>
                <p className="text-sm text-green-600 mt-1">+5% this week</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Activity This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day}</div>
                <div className="h-20 bg-gray-100 rounded-lg flex items-end justify-center p-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-300"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.floor(Math.random() * 3 + 1)}h
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Learning Hours</span>
            </div>
            <div className="text-gray-500">
              Total: {learningStats.weeklyHours} hours this week
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <div className="flex items-center space-x-2">
              {[
                { id: 'all', label: 'All Courses', count: myCourses.length },
                { id: 'in-progress', label: 'In Progress', count: myCourses.filter(c => !c.isCompleted).length },
                { id: 'completed', label: 'Completed', count: myCourses.filter(c => c.isCompleted).length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-800 text-white'
                      : 'bg-primary-100 text-secondary-700 hover:bg-primary-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-6">
                  {/* Course Thumbnail */}
                  <div className="w-32 h-24 bg-gray-200 rounded-lg shrink-0"></div>
                  
                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{course.category}</span>
                          <span>•</span>
                          <span>Enrolled {course.enrolledDate}</span>
                          <span>•</span>
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                      </div>
                      
                      {course.isCompleted && (
                        <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                        <span>{course.spentHours}h of {course.totalHours}h total</span>
                      </div>
                    </div>
                    
                    {/* Next Lesson */}
                    {!course.isCompleted && course.nextLesson && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-900">Next Lesson</p>
                            <p className="text-sm text-blue-700">{course.nextLesson}</p>
                          </div>
                          <div className="flex items-center space-x-1 text-blue-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{course.nextLessonDuration}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {course.isCompleted ? (
                        <>
                          <Button variant="outline" className="flex items-center space-x-2">
                            <Award className="w-4 h-4" />
                            <span>View Certificate</span>
                          </Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4" />
                            <span>Continue Learning</span>
                          </Button>
                          <Button variant="outline">
                            View Course Details
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LearningPage() {
  return (
    
      <LearningContent />
    
  )
}
