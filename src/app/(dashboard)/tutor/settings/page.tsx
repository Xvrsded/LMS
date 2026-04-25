'use client'

import { User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react'

export default function TutorSettings() {
  return (
    <div className="space-y-6">
      {/* Page Description - Header removed since handled by TutorNavbar */}
      <div>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg border-l-4 border-blue-600">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Security</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
              <Palette className="w-5 h-5" />
              <span className="font-medium">Appearance</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
              <Globe className="w-5 h-5" />
              <span className="font-medium">Language</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help & Support</span>
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">JD</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Change Photo
                  </button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Experienced software developer and educator passionate about teaching modern web technologies."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Teaching Preferences */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Teaching Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                <input
                  type="text"
                  defaultValue="React, JavaScript, UI/UX Design"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Separate multiple specializations with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Beginner (0-2 years)</option>
                  <option selected>Intermediate (2-5 years)</option>
                  <option>Expert (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <input
                  type="text"
                  defaultValue="English, Spanish"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Languages you can teach in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
