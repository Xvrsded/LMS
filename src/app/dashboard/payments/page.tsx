'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Search, Filter, Download, Receipt, CheckCircle, Clock, AlertCircle, Calendar, TrendingUp } from 'lucide-react'

const paymentHistory = [
  {
    id: '1',
    courseTitle: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    amount: 750000,
    status: 'SUCCESS',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TRX-2024-0156',
    paymentDate: '2024-01-15',
    enrollmentDate: '2024-01-15',
    thumbnail: '/api/placeholder/100/100',
    category: 'Programming',
    invoiceUrl: '/api/invoice/TRX-2024-0156',
    canRefund: false
  },
  {
    id: '2',
    courseTitle: 'UI/UX Design Masterclass',
    instructor: 'Jane Smith',
    amount: 500000,
    status: 'SUCCESS',
    paymentMethod: 'E-Wallet',
    transactionId: 'TRX-2024-0157',
    paymentDate: '2024-01-20',
    enrollmentDate: '2024-01-20',
    thumbnail: '/api/placeholder/100/100',
    category: 'Design',
    invoiceUrl: '/api/invoice/TRX-2024-0157',
    canRefund: false
  },
  {
    id: '3',
    courseTitle: 'Digital Marketing Fundamentals',
    instructor: 'Bob Johnson',
    amount: 400000,
    status: 'PENDING',
    paymentMethod: 'Credit Card',
    transactionId: 'TRX-2024-0158',
    paymentDate: null,
    enrollmentDate: '2024-02-01',
    thumbnail: '/api/placeholder/100/100',
    category: 'Marketing',
    invoiceUrl: null,
    canRefund: false
  }
]

const paymentStats = {
  totalSpent: 1650000,
  successfulPayments: 2,
  pendingPayments: 1,
  totalCourses: 3,
  averageSpent: 550000,
  thisMonthSpent: 750000,
  lastMonthSpent: 500000
}

function PaymentsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedMethod, setSelectedMethod] = useState('ALL')

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesSearch = payment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payment.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'ALL' || payment.status === selectedStatus
    const matchesMethod = selectedMethod === 'ALL' || payment.paymentMethod === selectedMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle className="w-4 h-4" />
      case 'PENDING': return <Clock className="w-4 h-4" />
      case 'FAILED': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleDownloadInvoice = (transactionId: string) => {
    alert(`Downloading invoice for ${transactionId}...`)
  }

  const handlePayNow = (paymentId: string) => {
    alert(`Redirecting to payment for ${paymentId}...`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Payment History</h1>
          <p className="text-secondary-600 mt-2">Track your course payments and manage transactions</p>
        </div>
        <Button className="bg-primary-800 hover:bg-primary-900">
          <CreditCard className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(paymentStats.totalSpent)}</p>
                <p className="text-sm text-green-600 mt-1">+{formatCurrency(paymentStats.thisMonthSpent - paymentStats.lastMonthSpent)} this month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{paymentStats.successfulPayments}</p>
                <p className="text-sm text-gray-500 mt-1">Transactions</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{paymentStats.pendingPayments}</p>
                <p className="text-sm text-yellow-600 mt-1">Awaiting payment</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. per Course</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(paymentStats.averageSpent)}</p>
                <p className="text-sm text-gray-500 mt-1">{paymentStats.totalCourses} courses</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Spending Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
              <div key={month} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{month}</div>
                <div className="h-24 bg-gray-100 rounded-lg flex items-end justify-center p-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-300"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {formatCurrency(Math.floor(Math.random() * 1000000 + 200000))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="ALL">All Status</option>
                <option value="SUCCESS">Successful</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
              </select>
              
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="ALL">All Methods</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Course Thumbnail */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
                    
                    {/* Payment Details */}
                    <div>
                      <h3 className="font-semibold text-gray-900">{payment.courseTitle}</h3>
                      <p className="text-sm text-gray-600">by {payment.instructor}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{payment.category}</span>
                        <span>•</span>
                        <span>Transaction ID: {payment.transactionId}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Info */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(payment.amount)}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      {getStatusIcon(payment.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {payment.paymentMethod}
                    </div>
                  </div>
                </div>
                
                {/* Dates and Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Enrolled: {formatDate(payment.enrollmentDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-4 h-4" />
                      <span>Paid: {formatDate(payment.paymentDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {payment.status === 'SUCCESS' && payment.invoiceUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(payment.transactionId)}
                      >
                        <Receipt className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    )}
                    
                    {payment.status === 'PENDING' && (
                      <Button 
                        size="sm"
                        onClick={() => handlePayNow(payment.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Your payment history will appear here once you make a purchase.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <PaymentsContent />
    </DashboardLayout>
  )
}
