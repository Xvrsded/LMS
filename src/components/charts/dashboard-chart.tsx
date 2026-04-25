'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const lineChartData = [
  { name: 'Mon', enrollment: 120, completion: 78 },
  { name: 'Tue', enrollment: 132, completion: 82 },
  { name: 'Wed', enrollment: 125, completion: 80 },
  { name: 'Thu', enrollment: 145, completion: 85 },
  { name: 'Fri', enrollment: 160, completion: 88 },
  { name: 'Sat', enrollment: 140, completion: 83 },
  { name: 'Sun', enrollment: 130, completion: 81 },
]

const barChartData = [
  { name: 'JavaScript', students: 89, completion: 85 },
  { name: 'React', students: 76, completion: 78 },
  { name: 'TypeScript', students: 65, completion: 72 },
  { name: 'Node.js', students: 54, completion: 68 },
  { name: 'CSS', students: 92, completion: 90 },
]

interface DashboardChartProps {
  userRole?: string
}

export function DashboardChart({ userRole = 'STUDENT' }: DashboardChartProps) {
  const getChartTitle = () => {
    switch (userRole) {
      case 'ADMIN':
        return 'Weekly Overview'
      case 'TUTOR':
        return 'Teaching Performance'
      case 'STUDENT':
        return 'Learning Progress'
      default:
        return 'Activity Overview'
    }
  }

  const getBarChartTitle = () => {
    switch (userRole) {
      case 'ADMIN':
        return 'Course Performance'
      case 'TUTOR':
        return 'Course Completion Rates'
      case 'STUDENT':
        return 'Course Progress'
      default:
        return 'Performance Overview'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{getChartTitle()}</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              7D
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              30D
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              1Y
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineChartData}>
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
              dataKey="enrollment" 
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

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{getBarChartTitle()}</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            View All
          </button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barChartData}>
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
              dataKey="students" 
              fill="#3b82f6" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="completion" 
              fill="#10b981" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
