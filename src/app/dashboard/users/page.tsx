'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Search, Filter, MoreHorizontal, Edit, Trash2, Shield } from 'lucide-react'

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'STUDENT', status: 'Active', enrolled: 5, completed: 3 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'TUTOR', status: 'Active', courses: 12, students: 234 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'STUDENT', status: 'Active', enrolled: 8, completed: 6 },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'ADMIN', status: 'Active', permissions: 'Full' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'STUDENT', status: 'Inactive', enrolled: 3, completed: 1 },
]

function UsersContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('ALL')

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'ALL' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-blue-100 text-blue-800'
      case 'TUTOR': return 'bg-purple-100 text-purple-800'
      case 'STUDENT': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-2">Manage all users in the system</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 bg-white shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
                <p className="text-sm text-purple-600 mt-1">+12% this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl text-blue-800">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">892</p>
                <p className="text-sm text-purple-600 mt-1">+8% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl text-purple-800">
                <Shield className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">45</p>
                <p className="text-sm text-orange-600 mt-1">This week</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl text-green-800">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">87%</p>
                <p className="text-sm text-purple-600 mt-1">+3% this month</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl text-orange-800">
                <Shield className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border border-secondary-200 bg-white shadow-brown">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary-900">All Users</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white"
                />
              </div>
              
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white"
              >
                <option value="ALL">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="TUTOR">Tutor</option>
                <option value="STUDENT">Student</option>
              </select>
              
              <Button variant="outline" size="sm" className="border-secondary-300 text-primary-800 hover:bg-primary-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 bg-primary-50">
                  <th className="text-left py-3 px-4 font-medium text-primary-800">User</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Activity</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-primary-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-secondary-100 hover:bg-primary-50 transition-colors duration-200">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-primary-900">{user.name}</p>
                        <p className="text-sm text-secondary-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-secondary-700">
                        {user.role === 'STUDENT' && (
                          <div>
                            <p>Enrolled: {user.enrolled}</p>
                            <p>Completed: {user.completed}</p>
                          </div>
                        )}
                        {user.role === 'TUTOR' && (
                          <div>
                            <p>Courses: {user.courses}</p>
                            <p>Students: {user.students}</p>
                          </div>
                        )}
                        {user.role === 'ADMIN' && (
                          <p>Permissions: {user.permissions}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-secondary-500">
                      2 days ago
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
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

export default function UsersPage() {
  return (
    
      <UsersContent />
    
  )
}
