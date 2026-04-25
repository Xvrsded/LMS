'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, Trophy, Flame, Calendar, Clock, TrendingUp, Plus, CheckCircle, Circle, Star, Award, BookOpen } from 'lucide-react'

const goalsData = [
  {
    id: '1',
    title: 'Complete React Hooks Module',
    description: 'Finish all lessons and quizzes in the React Hooks module',
    category: 'Course Completion',
    targetDate: '2024-03-20',
    progress: 75,
    totalTasks: 12,
    completedTasks: 9,
    priority: 'high',
    status: 'in-progress',
    xpReward: 150,
    badgeReward: 'React Expert',
    milestones: [
      { name: 'Complete useState lessons', completed: true },
      { name: 'Complete useEffect lessons', completed: true },
      { name: 'Complete custom hooks', completed: false },
      { name: 'Pass final quiz', completed: false }
    ]
  },
  {
    id: '2',
    title: '30-Day Learning Streak',
    description: 'Login and study for at least 30 minutes every day for 30 days',
    category: 'Learning Habit',
    targetDate: '2024-04-15',
    progress: 60,
    totalTasks: 30,
    completedTasks: 18,
    priority: 'medium',
    status: 'in-progress',
    xpReward: 200,
    badgeReward: 'Dedicated Learner',
    milestones: [
      { name: '7 days streak', completed: true },
      { name: '14 days streak', completed: true },
      { name: '21 days streak', completed: false },
      { name: '30 days streak', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Complete 5 Courses',
    description: 'Successfully complete 5 different courses with certificates',
    category: 'Achievement',
    targetDate: '2024-06-01',
    progress: 40,
    totalTasks: 5,
    completedTasks: 2,
    priority: 'low',
    status: 'in-progress',
    xpReward: 500,
    badgeReward: 'Course Master',
    milestones: [
      { name: 'Complete first course', completed: true },
      { name: 'Complete second course', completed: true },
      { name: 'Complete third course', completed: false },
      { name: 'Complete fourth course', completed: false },
      { name: 'Complete fifth course', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Help 10 Fellow Students',
    description: 'Answer questions and help at least 10 students in discussion forums',
    category: 'Community',
    targetDate: '2024-03-31',
    progress: 30,
    totalTasks: 10,
    completedTasks: 3,
    priority: 'medium',
    status: 'in-progress',
    xpReward: 100,
    badgeReward: 'Community Helper',
    milestones: [
      { name: 'Help 3 students', completed: true },
      { name: 'Help 5 students', completed: false },
      { name: 'Help 8 students', completed: false },
      { name: 'Help 10 students', completed: false }
    ]
  }
]

const achievements = [
  { id: '1', name: 'Fast Learner', description: 'Complete first course', icon: Trophy, earned: true, earnedDate: '2024-02-15' },
  { id: '2', name: 'Week Warrior', description: '7 day learning streak', icon: Flame, earned: true, earnedDate: '2024-02-22' },
  { id: '3', name: 'Discussion Master', description: '50 helpful answers', icon: Star, earned: false, progress: 45 },
  { id: '4', name: 'Course Collector', description: 'Complete 10 courses', icon: BookOpen, earned: false, progress: 2 },
  { id: '5', name: 'Perfect Score', description: 'Get 100% on 5 quizzes', icon: Award, earned: false, progress: 2 }
]

function GoalsContent() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredGoals = goalsData.filter(goal => {
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'active' && goal.status === 'in-progress') ||
                     (activeTab === 'completed' && goal.status === 'completed')
    return matchesTab
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'not-started': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString))
  }

  const handleCompleteTask = (goalId: string, taskIndex: number) => {
    alert(`Completing task ${taskIndex + 1} for goal ${goalId}...`)
  }

  const handleCreateGoal = () => {
    alert('Opening goal creation dialog...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Goals</h1>
          <p className="text-gray-600 mt-2">Set and track your learning objectives</p>
        </div>
        <Button onClick={handleCreateGoal} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">4</p>
                <p className="text-sm text-blue-600 mt-1">2 high priority</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
                <p className="text-sm text-green-600 mt-1">This month</p>
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
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">18</p>
                <p className="text-sm text-orange-600 mt-1">days 🔥</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <Flame className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total XP</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">2,450</p>
                <p className="text-sm text-purple-600 mt-1">Level 8</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Trophy className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`text-center p-4 rounded-xl border-2 transition-all ${
                    achievement.earned
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                  {achievement.earned ? (
                    <p className="text-xs text-yellow-600 font-medium">
                      Earned {formatDate(achievement.earnedDate!)}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{achievement.progress}%</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Goals Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {[
                { id: 'active', label: 'Active Goals', count: goalsData.filter(g => g.status === 'in-progress').length },
                { id: 'completed', label: 'Completed', count: goalsData.filter(g => g.status === 'completed').length },
                { id: 'all', label: 'All Goals', count: goalsData.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
            {filteredGoals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{goal.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {formatDate(goal.targetDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>{goal.xpReward} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{goal.badgeReward}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{goal.progress}%</div>
                    <div className="text-sm text-gray-500">
                      {goal.completedTasks}/{goal.totalTasks} tasks
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${getStatusColor(goal.status)}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Milestones</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {goal.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <button
                          onClick={() => handleCompleteTask(goal.id, index)}
                          className="shrink-0"
                        >
                          {milestone.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                          )}
                        </button>
                        <span className={`text-sm ${milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
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

export default function GoalsPage() {
  return (
    
      <GoalsContent />
    
  )
}
