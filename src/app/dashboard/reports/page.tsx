'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/tables/data-table'
import { DashboardChart } from '@/components/charts/dashboard-chart'
import { 
  FileSpreadsheet,
  Download,
  Calendar,
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  Filter,
  Search,
  FileText,
  Eye,
  Mail,
  Printer,
  Share2,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

// Mock data for reports
const mockReports = [
  {
    id: 1,
    name: 'Monthly Revenue Report',
    type: 'Financial',
    period: 'October 2024',
    status: 'completed',
    generatedDate: '2024-10-31',
    fileSize: '2.4 MB',
    downloads: 45,
    description: 'Comprehensive monthly revenue analysis including course sales, subscriptions, and payment methods'
  },
  {
    id: 2,
    name: 'Student Progress Report',
    type: 'Academic',
    period: 'Q4 2024',
    status: 'completed',
    generatedDate: '2024-10-30',
    fileSize: '3.1 MB',
    downloads: 32,
    description: 'Detailed student learning progress across all courses with completion rates and performance metrics'
  },
  {
    id: 3,
    name: 'Course Performance Report',
    type: 'Analytics',
    period: 'October 2024',
    status: 'processing',
    generatedDate: '2024-10-31',
    fileSize: '1.8 MB',
    downloads: 0,
    description: 'Individual course performance analysis including enrollment trends and student feedback'
  },
  {
    id: 4,
    name: 'Instructor Performance Report',
    type: 'HR',
    period: 'Q4 2024',
    status: 'scheduled',
    generatedDate: '-',
    fileSize: '-',
    downloads: 0,
    description: 'Instructor evaluation report including student ratings and course completion rates'
  },
  {
    id: 5,
    name: 'Engagement Metrics Report',
    type: 'Analytics',
    period: 'October 2024',
    status: 'completed',
    generatedDate: '2024-10-29',
    fileSize: '1.2 MB',
    downloads: 28,
    description: 'User engagement analysis including login frequency, course interaction, and platform usage'
  }
]

const reportMetrics = [
  {
    title: 'Total Reports',
    value: '156',
    change: '+12%',
    icon: FileSpreadsheet,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    changeColor: 'text-green-600'
  },
  {
    title: 'This Month',
    value: '24',
    change: '+8%',
    icon: Calendar,
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    changeColor: 'text-green-600'
  },
  {
    title: 'Downloads',
    value: '1,234',
    change: '+25%',
    icon: Download,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    changeColor: 'text-green-600'
  },
  {
    title: 'Scheduled',
    value: '8',
    change: '+3',
    icon: Clock,
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
    changeColor: 'text-green-600'
  }
]

function ReportsContent() {
  const { user } = useAuth()
  const userRole = user?.role || 'STUDENT'
  const [reports, setReports] = useState(mockReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Quick action handlers
  const handleGenerateReport = async (reportType: string) => {
    setLoadingAction(`generate-${reportType}`)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newReport = {
        id: reports.length + 1,
        name: `${reportType} Report - ${new Date().toLocaleDateString()}`,
        type: reportType === 'Student' ? 'Academic' : 
              reportType === 'Financial' ? 'Financial' : 
              reportType === 'Course' ? 'Analytics' : 'Analytics',
        period: new Date().toLocaleDateString(),
        status: 'processing',
        generatedDate: new Date().toISOString().split('T')[0],
        fileSize: 'Processing...',
        downloads: 0,
        description: `Automatically generated ${reportType.toLowerCase()} report with comprehensive analytics and insights`
      }
      
      setReports([newReport, ...reports])
      showNotification(`${reportType} report generation started!`, 'success')
      
      // Simulate completion after 3 seconds
      setTimeout(() => {
        setReports(prev => prev.map(r => 
          r.id === newReport.id 
            ? { ...r, status: 'completed', fileSize: '2.1 MB' }
            : r
        ))
        showNotification(`${reportType} report completed successfully!`, 'success')
      }, 3000)
      
    } catch (error) {
      showNotification('Failed to generate report', 'error')
    } finally {
      setLoadingAction(null)
    }
  }

  const handleScheduleReport = () => {
    setShowScheduleModal(true)
  }

  const handleDownloadReport = async (reportId: number) => {
    setLoadingAction(`download-${reportId}`)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setReports(prev => prev.map(r => 
        r.id === reportId 
          ? { ...r, downloads: r.downloads + 1 }
          : r
      ))
      showNotification('Report downloaded successfully!', 'success')
    } catch (error) {
      showNotification('Failed to download report', 'error')
    } finally {
      setLoadingAction(null)
    }
  }

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || report.type === filterType
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  // Table columns
  const tableColumns = [
    { 
      key: 'name', 
      label: 'Report Name',
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 max-w-xs truncate">{row.description}</p>
        </div>
      )
    },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => {
        const typeConfig = {
          Financial: 'bg-green-100 text-green-800',
          Academic: 'bg-blue-100 text-blue-800',
          Analytics: 'bg-purple-100 text-purple-800',
          HR: 'bg-orange-100 text-orange-800'
        }
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeConfig[value as keyof typeof typeConfig]}`}>
            {value}
          </span>
        )
      }
    },
    { 
      key: 'period', 
      label: 'Period',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{value}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => {
        const statusConfig = {
          completed: 'bg-green-100 text-green-800',
          processing: 'bg-yellow-100 text-yellow-800',
          scheduled: 'bg-blue-100 text-blue-800',
          failed: 'bg-red-100 text-red-800'
        }
        const statusIcon = {
          completed: <CheckCircle className="w-3 h-3" />,
          processing: <Clock className="w-3 h-3" />,
          scheduled: <Calendar className="w-3 h-3" />,
          failed: <AlertCircle className="w-3 h-3" />
        }
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${statusConfig[value as keyof typeof statusConfig]}`}>
            {statusIcon[value as keyof typeof statusIcon]}
            <span>{value}</span>
          </span>
        )
      }
    },
    { 
      key: 'generatedDate', 
      label: 'Generated',
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value}</span>
      )
    },
    { 
      key: 'downloads', 
      label: 'Downloads',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Download className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    }
  ]

  // Enhanced columns with actions
  const enhancedTableColumns = [
    ...tableColumns,
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-2">
          {row.status === 'completed' && (
            <>
              <button
                onClick={() => handleDownloadReport(row.id)}
                disabled={loadingAction === `download-${row.id}`}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download Report"
              >
                {loadingAction === `download-${row.id}` ? (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Download className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
              <button
                className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 group"
                title="View Report"
              >
                <Eye className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform duration-200" />
              </button>
              <button
                className="p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200 group"
                title="Share Report"
              >
                <Share2 className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </>
          )}
          {row.status === 'processing' && (
            <div className="flex items-center space-x-2 text-yellow-600">
              <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs">Processing...</span>
            </div>
          )}
          {row.status === 'scheduled' && (
            <button
              className="p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200 group"
              title="Edit Schedule"
            >
              <Calendar className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
            </button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 max-w-sm ${
          notification.type === 'success' ? 'bg-green-50 border-green-200' :
          notification.type === 'error' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
           notification.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-600" /> :
           <AlertCircle className="w-5 h-5 text-blue-600" />}
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Generate, manage, and analyze comprehensive reports</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleScheduleReport}
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Report</span>
            </Button>
            <Button 
              onClick={() => handleGenerateReport('General')}
              disabled={loadingAction?.startsWith('generate-')}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 flex items-center space-x-2"
            >
              {loadingAction?.startsWith('generate-') ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FileSpreadsheet className="w-4 h-4" />
              )}
              <span>{loadingAction?.startsWith('generate-') ? 'Generating...' : 'Generate Report'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                <p className={`text-sm font-medium mt-2 ${metric.changeColor}`}>{metric.change}</p>
              </div>
              <div className={`p-3 rounded-xl ${metric.color} ml-4`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Report Generation Trend</h3>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="w-16 h-16 text-gray-300" />
            <span className="ml-4">Chart visualization will appear here</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Report Types Distribution</h3>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <PieChart className="w-16 h-16 text-gray-300" />
            <span className="ml-4">Pie chart will appear here</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 w-full sm:w-64"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="all">All Types</option>
              <option value="Financial">Financial</option>
              <option value="Academic">Academic</option>
              <option value="Analytics">Analytics</option>
              <option value="HR">HR</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="scheduled">Scheduled</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </Button>
        </div>
      </div>

      {/* Reports Table */}
      <DataTable 
        data={filteredReports}
        columns={enhancedTableColumns}
        title="Report Library"
        searchable={false}
        pagination={true}
        actions={false}
      />

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleGenerateReport('Student')}
            disabled={loadingAction === 'generate-Student'}
            className="h-12 flex items-center justify-center space-x-2 group"
          >
            {loadingAction === 'generate-Student' ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span>{loadingAction === 'generate-Student' ? 'Generating...' : 'Student Report'}</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleGenerateReport('Financial')}
            disabled={loadingAction === 'generate-Financial'}
            className="h-12 flex items-center justify-center space-x-2 group"
          >
            {loadingAction === 'generate-Financial' ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <DollarSign className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span>{loadingAction === 'generate-Financial' ? 'Generating...' : 'Financial Report'}</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleGenerateReport('Course')}
            disabled={loadingAction === 'generate-Course'}
            className="h-12 flex items-center justify-center space-x-2 group"
          >
            {loadingAction === 'generate-Course' ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span>{loadingAction === 'generate-Course' ? 'Generating...' : 'Course Report'}</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleGenerateReport('Activity')}
            disabled={loadingAction === 'generate-Activity'}
            className="h-12 flex items-center justify-center space-x-2 group"
          >
            {loadingAction === 'generate-Activity' ? (
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Activity className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span>{loadingAction === 'generate-Activity' ? 'Generating...' : 'Activity Report'}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ReportsPage() {
  return (
    
      <ReportsContent />
    
  )
}
