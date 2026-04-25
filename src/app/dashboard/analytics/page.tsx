'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, DollarSign, BookOpen, Activity, Calendar } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 12000000, users: 450 },
  { month: 'Feb', revenue: 15000000, users: 520 },
  { month: 'Mar', revenue: 18000000, users: 680 },
  { month: 'Apr', revenue: 22000000, users: 820 },
  { month: 'May', revenue: 28000000, users: 950 },
  { month: 'Jun', revenue: 35000000, users: 1100 },
]

const courseCategories = [
  { name: 'Programming', value: 35, color: '#3B82F6' },
  { name: 'Design', value: 25, color: '#8B5CF6' },
  { name: 'Marketing', value: 20, color: '#E89F6F' },
  { name: 'Data Science', value: 20, color: '#DC8549' },
]

const userGrowth = [
  { date: '2024-01', students: 450, tutors: 25, total: 475 },
  { date: '2024-02', students: 520, tutors: 28, total: 548 },
  { date: '2024-03', students: 680, tutors: 32, total: 712 },
  { date: '2024-04', students: 820, tutors: 35, total: 855 },
  { date: '2024-05', students: 950, tutors: 40, total: 990 },
  { date: '2024-06', students: 1100, tutors: 45, total: 1145 },
]

const topCourses = [
  { title: 'Complete Web Development', students: 1234, revenue: 9255000, completion: 78 },
  { title: 'UI/UX Design Masterclass', students: 892, revenue: 4460000, completion: 82 },
  { title: 'Data Science with Python', students: 2341, revenue: 21069000, completion: 71 },
  { title: 'Digital Marketing', students: 567, revenue: 2268000, completion: 65 },
  { title: 'Mobile App Development', students: 445, revenue: 3337500, completion: 69 },
]

function AnalyticsContent() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Analytics Dashboard</h1>
          <p className="text-secondary-600 mt-2">Track your LMS performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Revenue</p>
                <p className="text-2xl font-bold text-primary-900 mt-2">Rp 35M</p>
                <p className="text-sm text-accent-600 mt-1">+25% from last month</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-xl text-accent-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Users</p>
                <p className="text-2xl font-bold text-primary-900 mt-2">1,145</p>
                <p className="text-sm text-accent-600 mt-1">+15% from last month</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl text-primary-800">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Courses</p>
                <p className="text-2xl font-bold text-primary-900 mt-2">45</p>
                <p className="text-sm text-accent-600 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-secondary-100 rounded-xl text-secondary-600">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Completion Rate</p>
                <p className="text-2xl font-bold text-primary-900 mt-2">72%</p>
                <p className="text-sm text-accent-600 mt-1">+5% from last month</p>
              </div>
              <div className="p-3 bg-coffee-100 rounded-xl text-coffee-600">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardHeader>
            <CardTitle className="text-primary-900">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE3DC" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardHeader>
            <CardTitle className="text-primary-900">Course Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardHeader>
            <CardTitle className="text-primary-900">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE3DC" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#3B82F6" name="Students" />
                <Bar dataKey="tutors" fill="#8B5CF6" name="Tutors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-secondary-200 bg-white shadow-brown">
          <CardHeader>
            <CardTitle className="text-primary-900">Revenue vs Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE3DC" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis yAxisId="left" stroke="#6B7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#E89F6F" strokeWidth={2} name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Courses Table */}
      <Card className="border border-secondary-200 bg-white shadow-brown">
        <CardHeader>
          <CardTitle className="text-primary-900">Top Performing Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 bg-primary-50">
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Course Title</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((course, index) => (
                  <tr key={index} className="border-b border-secondary-100 hover:bg-primary-50 transition-colors duration-200">
                    <td className="py-3 px-4 font-medium text-primary-900">{course.title}</td>
                    <td className="py-3 px-4 text-primary-900">{formatNumber(course.students)}</td>
                    <td className="py-3 px-4 font-medium text-primary-900">{formatCurrency(course.revenue)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary-800 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-secondary-600">{course.completion}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <AnalyticsContent />
    </DashboardLayout>
  )
}
