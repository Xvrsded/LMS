'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { Button } from '@/components/ui/button'
import { LoadingCard, LoadingChart } from '@/components/ui/loading'
import { EmptyAnalytics } from '@/components/ui/empty-state'
import { TrendingUp, Users, Clock, Target, Download, Calendar } from 'lucide-react'

const completionData = [
  { name: 'JavaScript', completed: 78, total: 120 },
  { name: 'React', completed: 65, total: 89 },
  { name: 'TypeScript', completed: 42, total: 65 },
  { name: 'Node.js', completed: 38, total: 54 },
  { name: 'CSS', completed: 85, total: 92 },
]

const engagementData = [
  { name: 'Mon', engagement: 85, completion: 72 },
  { name: 'Tue', engagement: 92, completion: 78 },
  { name: 'Wed', engagement: 78, completion: 65 },
  { name: 'Thu', engagement: 88, completion: 82 },
  { name: 'Fri', engagement: 95, completion: 88 },
  { name: 'Sat', engagement: 72, completion: 68 },
  { name: 'Sun', engagement: 68, completion: 62 },
]

const dropoffData = [
  { name: 'Module 1', value: 5, color: '#10b981' },
  { name: 'Module 2', value: 12, color: '#3b82f6' },
  { name: 'Module 3', value: 18, color: '#f59e0b' },
  { name: 'Module 4', value: 25, color: '#ef4444' },
  { name: 'Module 5', value: 40, color: '#8b5cf6' },
]

function AnalyticsContent() {
  const { user } = useAuth()
  const [timeFilter, setTimeFilter] = useState('30d')
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <LoadingCard title="Analytics" lines={2} />
        
        {/* Loading Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} lines={3} />
          ))}
        </div>
        
        {/* Loading Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <LoadingChart />
          <LoadingChart />
        </div>
        
        {/* Loading Drop-off Insights */}
        <LoadingChart />
        
        {/* Loading Recommendations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <LoadingCard key={i} lines={3} />
          ))}
        </div>
      </div>
    )
  }

  // Check if there's no data
  const hasNoData = completionData.length === 0 && engagementData.length === 0
  
  if (hasNoData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your course performance and student engagement</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['7d', '30d', '1y'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                      timeFilter === filter
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        {/* Empty Analytics State */}
        <EmptyAnalytics onRefresh={() => window.location.reload()} />
      </div>
    )
  }

  const analyticsCards = [
    {
      title: 'Completion Rate',
      value: '72%',
      change: '+5%',
      icon: Target,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'Engagement Score',
      value: '85%',
      change: '+8%',
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'Avg. Completion Time',
      value: '4.2 hrs',
      change: '-0.5 hrs',
      icon: Clock,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      changeColor: 'text-green-600'
    },
    {
      title: 'Drop-off Rate',
      value: '18%',
      change: '-3%',
      icon: TrendingUp,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      changeColor: 'text-green-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track your course performance and student engagement</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['7d', '30d', '1y'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    timeFilter === filter
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {analyticsCards.map((card, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 hover:-translate-y-2 transform transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-transparent via-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-200">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1 group-hover:text-gray-900 transition-colors duration-200">{card.value}</p>
                <p className={`text-sm font-medium mt-2 ${card.changeColor} group-hover:scale-105 inline-block transition-transform duration-200`}>{card.change}</p>
              </div>
              <div className={`p-3 rounded-xl ${card.color} ml-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out shadow-md group-hover:shadow-lg`}>
                <card.icon className={`w-6 h-6 ${card.iconColor} group-hover:animate-bounce transition-all duration-300`}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Completion Rate by Course */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Completion Rate by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="completed" 
                fill="#3b82f6" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement vs Completion */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement vs Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drop-off Insights */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Drop-off Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dropoffData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dropoffData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Common Drop-off Points</h4>
            {dropoffData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommendations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: 'Improve Module 4',
              description: 'High drop-off rate detected. Consider adding more examples.',
              priority: 'high',
              action: 'Review Module'
            },
            {
              title: 'Update JavaScript Course',
              description: 'Low completion rate. Content may need refresh.',
              priority: 'medium',
              action: 'Update Content'
            },
            {
              title: 'Add Quizzes',
              description: 'Increase engagement in React course with interactive elements.',
              priority: 'low',
              action: 'Add Quizzes'
            }
          ].map((rec, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                {rec.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    
      <AnalyticsContent />
    
  )
}
