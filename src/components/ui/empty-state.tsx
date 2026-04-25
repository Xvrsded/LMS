import { Button } from './button'
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  MessageSquare, 
  BarChart3, 
  FileText,
  Plus,
  Search,
  RefreshCw
} from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {action && (
          <Button onClick={action.onClick} className="bg-blue-600 hover:bg-blue-700">
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}

interface EmptyCoursesProps {
  onCreateCourse?: () => void
}

export function EmptyCourses({ onCreateCourse }: EmptyCoursesProps) {
  return (
    <EmptyState
      icon={<BookOpen className="w-16 h-16 text-gray-300" />}
      title="No courses yet"
      description="Get started by creating your first course and sharing your knowledge with students."
      action={onCreateCourse && {
        label: 'Create Your First Course',
        onClick: onCreateCourse
      }}
    />
  )
}

interface EmptyStudentsProps {
  onInviteStudents?: () => void
}

export function EmptyStudents({ onInviteStudents }: EmptyStudentsProps) {
  return (
    <EmptyState
      icon={<Users className="w-16 h-16 text-gray-300" />}
      title="No students enrolled"
      description="Your courses haven't been discovered by students yet. Try promoting your courses or inviting students directly."
      action={onInviteStudents && {
        label: 'Invite Students',
        onClick: onInviteStudents
      }}
    />
  )
}

interface EmptyEarningsProps {
  onCreateCourse?: () => void
}

export function EmptyEarnings({ onCreateCourse }: EmptyEarningsProps) {
  return (
    <EmptyState
      icon={<DollarSign className="w-16 h-16 text-gray-300" />}
      title="No earnings yet"
      description="Start earning by creating and selling courses. Your first payment will appear here once students enroll."
      action={onCreateCourse && {
        label: 'Create a Course',
        onClick: onCreateCourse
      }}
    />
  )
}

interface EmptyDiscussionsProps {
  onCreateDiscussion?: () => void
}

export function EmptyDiscussions({ onCreateDiscussion }: EmptyDiscussionsProps) {
  return (
    <EmptyState
      icon={<MessageSquare className="w-16 h-16 text-gray-300" />}
      title="No discussions yet"
      description="Start engaging with your students by creating discussion topics or answering their questions."
      action={onCreateDiscussion && {
        label: 'Start a Discussion',
        onClick: onCreateDiscussion
      }}
    />
  )
}

interface EmptyAnalyticsProps {
  onRefresh?: () => void
}

export function EmptyAnalytics({ onRefresh }: EmptyAnalyticsProps) {
  return (
    <EmptyState
      icon={<BarChart3 className="w-16 h-16 text-gray-300" />}
      title="No analytics data"
      description="Analytics will appear here once you have students and course activity. Start teaching to see insights."
      secondaryAction={onRefresh && {
        label: 'Refresh Data',
        onClick: onRefresh
      }}
    />
  )
}

interface EmptySearchProps {
  query: string
  onClearSearch?: () => void
}

export function EmptySearch({ query, onClearSearch }: EmptySearchProps) {
  return (
    <EmptyState
      icon={<Search className="w-16 h-16 text-gray-300" />}
      title={`No results for "${query}"`}
      description="Try adjusting your search terms or browse through all available content."
      secondaryAction={onClearSearch && {
        label: 'Clear Search',
        onClick: onClearSearch
      }}
    />
  )
}

interface EmptyStateCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function EmptyStateCard({ icon, title, description, className = '' }: EmptyStateCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center ${className}`}>
      {icon}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

interface EmptyTableProps {
  title: string
  description: string
  cols?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyTable({ title, description, cols = 4, action }: EmptyTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
        {action && (
          <Button onClick={action.onClick} className="bg-blue-600 hover:bg-blue-700">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
