import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingCardProps {
  title?: string
  lines?: number
  className?: string
}

export function LoadingCard({ title, lines = 3, className = '' }: LoadingCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 ${className}`}>
      {title && (
        <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`bg-gray-200 rounded-lg animate-pulse ${
              i === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

interface LoadingTableProps {
  rows?: number
  columns?: number
  className?: string
}

export function LoadingTable({ rows = 5, columns = 4, className = '' }: LoadingTableProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="h-6 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface LoadingChartProps {
  height?: number
  className?: string
}

export function LoadingChart({ height = 300, className = '' }: LoadingChartProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="h-6 bg-gray-200 rounded-lg w-32 mb-6 animate-pulse"></div>
      <div 
        className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <LoadingSpinner size="lg" className="text-gray-400" />
      </div>
    </div>
  )
}

interface FullPageLoadingProps {
  message?: string
}

export function FullPageLoading({ message = 'Loading...' }: FullPageLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}
