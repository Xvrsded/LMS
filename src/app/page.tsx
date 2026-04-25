import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learning Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Platform pembelajaran online modern untuk Admin, Tutor, dan Student
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/auth/signin"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow"
            >
              Masuk ke Dashboard
            </Link>
            
            <div className="text-sm text-gray-500">
              Server berjalan di localhost:3000
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin</h3>
              <p className="text-gray-600 text-sm">
                Kelola users, courses, payments, dan analytics
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tutor</h3>
              <p className="text-gray-600 text-sm">
                Buat course, upload video, dan tracking progress
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Student</h3>
              <p className="text-gray-600 text-sm">
                Belajar course, ikuti quiz, dan dapatkan sertifikat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
