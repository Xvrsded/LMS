'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { LoadingCard, LoadingChart, LoadingTable } from '@/components/ui/loading'
import { EmptyEarnings } from '@/components/ui/empty-state'
import { 
  TrendingUp, 
  DollarSign, 
  Download, 
  Calendar, 
  Filter,
  CreditCard,
  Users,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react'

const earningsData = [
  { month: 'Jan', earnings: 4500000, students: 45 },
  { month: 'Feb', earnings: 5200000, students: 52 },
  { month: 'Mar', earnings: 4800000, students: 48 },
  { month: 'Apr', earnings: 5800000, students: 58 },
  { month: 'May', earnings: 6500000, students: 65 },
  { month: 'Jun', earnings: 7200000, students: 72 },
]

const courseEarnings = [
  { name: 'JavaScript Fundamentals', earnings: 12500000, students: 120 },
  { name: 'React Advanced Patterns', earnings: 8900000, students: 89 },
  { name: 'TypeScript Basics', earnings: 6500000, students: 65 },
  { name: 'Node.js Backend', earnings: 5400000, students: 54 },
  { name: 'CSS Mastery', earnings: 9200000, students: 92 },
]

const transactions = [
  { 
    id: 'TRX001', 
    student: 'John Doe', 
    course: 'JavaScript Fundamentals', 
    amount: 299000, 
    date: '2024-06-15', 
    status: 'completed',
    method: 'Credit Card'
  },
  { 
    id: 'TRX002', 
    student: 'Jane Smith', 
    course: 'React Advanced Patterns', 
    amount: 399000, 
    date: '2024-06-14', 
    status: 'completed',
    method: 'Transfer'
  },
  { 
    id: 'TRX003', 
    student: 'Mike Johnson', 
    course: 'TypeScript Basics', 
    amount: 249000, 
    date: '2024-06-14', 
    status: 'pending',
    method: 'E-Wallet'
  },
  { 
    id: 'TRX004', 
    student: 'Sarah Wilson', 
    course: 'Node.js Backend', 
    amount: 349000, 
    date: '2024-06-13', 
    status: 'completed',
    method: 'Credit Card'
  },
  { 
    id: 'TRX005', 
    student: 'Tom Brown', 
    course: 'CSS Mastery', 
    amount: 199000, 
    date: '2024-06-13', 
    status: 'completed',
    method: 'Transfer'
  },
]

function EarningsContent() {
  const { user } = useAuth()
  const [timeFilter, setTimeFilter] = useState('30d')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <LoadingCard title="Earnings" lines={2} />
        
        {/* Loading Earnings Cards */}
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
        
        {/* Loading Transactions */}
        <LoadingTable rows={5} columns={7} />
        
        {/* Loading Payout Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <LoadingCard key={i} lines={3} />
          ))}
        </div>
      </div>
    )
  }

  // Check if there's no data
  const hasNoData = earningsData.length === 0 && transactions.length === 0
  
  if (hasNoData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
              <p className="text-gray-600 mt-1">Track your revenue and transaction history</p>
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
        
        {/* Empty Earnings State */}
        <EmptyEarnings onCreateCourse={() => window.location.href = '/dashboard/course-builder'} />
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const earningsCards = [
    {
      title: 'Total Earnings',
      value: 'Rp 8.5M',
      change: '+25%',
      icon: DollarSign,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      changeColor: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'This Month',
      value: 'Rp 2.8M',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      changeColor: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Avg. per Course',
      value: 'Rp 1.7M',
      change: '+8%',
      icon: BookOpen,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      changeColor: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Active Students',
      value: '234',
      change: '+18',
      icon: Users,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      changeColor: 'text-green-600',
      trend: 'up'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">Track your revenue and transaction history</p>
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
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {earningsCards.map((card, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-green-200 hover:-translate-y-2 transform transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-green-50/30 via-emerald-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-200">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1 group-hover:text-gray-900 transition-colors duration-200">{card.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {card.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600 group-hover:text-green-700 group-hover:scale-110 transition-all duration-200" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600 group-hover:text-red-700 group-hover:scale-110 transition-all duration-200" />
                  )}
                  <span className={`text-sm font-medium group-hover:scale-105 inline-block transition-transform duration-200 ${
                    card.trend === 'up' ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'
                  }`}>
                    {card.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${card.color} ml-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out shadow-md group-hover:shadow-lg`}>
                <card.icon className={`w-6 h-6 ${card.iconColor} group-hover:animate-pulse transition-all duration-300`}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Earnings Over Time */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => {
                  if (typeof value === 'number') {
                    return [formatCurrency(value), 'Earnings']
                  }
                  return [value, 'Earnings']
                }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings by Course */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => {
                  if (typeof value === 'number') {
                    return [formatCurrency(value), 'Earnings']
                  }
                  return [value, 'Earnings']
                }}
              />
              <Bar 
                dataKey="earnings" 
                fill="#10b981" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200">
              View All Transactions
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Transaction ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Student</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Course</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Method</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 text-gray-900">{transaction.student}</td>
                  <td className="px-6 py-4 text-gray-900">{transaction.course}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4 text-gray-600">{transaction.method}</td>
                  <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payout Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Available for Withdrawal</span>
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(6500000)}</p>
            <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
              Withdraw Now
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending Clearance</span>
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(2000000)}</p>
            <p className="text-xs text-gray-500 mt-2">Clears in 5 days</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Withdrawn</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(45000000)}</p>
            <p className="text-xs text-gray-500 mt-2">All time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Earnings() {
  return (
    
      <EarningsContent />
    
  )
}
