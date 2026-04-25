'use client'


export default function SimpleDashboard() {
  return (
    
      <div className="space-y-6">
        {/* Simple Test Header */}
        <div className="bg-white p-6 rounded-xl shadow-brown border border-secondary-200">
          <h1 className="text-2xl font-bold text-primary-900">Simple Dashboard Test</h1>
          <p className="text-secondary-600 mt-2">This is a simple test to verify layout structure.</p>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-brown border border-secondary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Test Card 1</h3>
            <p className="text-secondary-600">This is a test card to verify styling.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-brown border border-secondary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Test Card 2</h3>
            <p className="text-secondary-600">This is a test card to verify styling.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-brown border border-secondary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Test Card 3</h3>
            <p className="text-secondary-600">This is a test card to verify styling.</p>
          </div>
        </div>

        {/* Test Section */}
        <div className="bg-white p-6 rounded-xl shadow-brown border border-secondary-200">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">Layout Test Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
              <h4 className="font-medium text-primary-900 mb-2">Left Section</h4>
              <p className="text-primary-700 text-sm">Testing left section layout.</p>
            </div>
            <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
              <h4 className="font-medium text-primary-900 mb-2">Right Section</h4>
              <p className="text-primary-700 text-sm">Testing right section layout.</p>
            </div>
          </div>
        </div>
      </div>
    
  )
}
