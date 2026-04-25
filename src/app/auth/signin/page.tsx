'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Eye, EyeOff, BookOpen, Users, Award, Lock, Mail, User, ArrowRight, CheckCircle } from 'lucide-react'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        login(data.user)
        router.push('/dashboard')
      } else {
        setError(data.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    { icon: BookOpen, title: 'Konten Pembelajaran Kaya', desc: 'Akses kursus dan materi yang komprehensif' },
    { icon: Users, title: 'Pengajar Ahli', desc: 'Belajar dari tutor yang berkualitas dan berpengalaman' },
    { icon: Award, title: 'Sertifikasi', desc: 'Dapatkan sertifikat setelah menyelesaikan kursus' },
  ]

  const demoAccounts = [
    { role: 'Admin', username: 'admin', password: '123', color: 'bg-purple-500' },
    { role: 'Pengajar', username: 'tutor', password: '123', color: 'bg-blue-500' },
    { role: 'Siswa', username: 'siswa', password: '123', color: 'bg-green-500' },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Platform LMS</h1>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Selamat Datang Kembali di Keunggulan Pembelajaran</h2>
              <p className="text-xl text-white/90 mb-8">Lanjutkan perjalanan pendidikan Anda dengan sistem manajemen pembelajaran komprehensif kami.</p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/80">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Dipercaya oleh 10.000+ siswa dan pendidik</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Platform LMS</h1>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk</h2>
                <p className="text-gray-600">Masukkan kredensial Anda untuk mengakses akun Anda</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
                  <Lock className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Error Autentikasi</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username atau Email
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'username' ? 'scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 transition-colors ${focusedField === 'username' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField('')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan username atau email Anda"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kata Sandi
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan kata sandi Anda"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                  </label>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Lupa kata sandi?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Masuk...
                    </>
                  ) : (
                    <>
                      Masuk
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Akun Demo</p>
                  <p className="text-xs text-gray-500">Klik akun mana pun untuk mengisi kredensial otomatis</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {demoAccounts.map((account, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setUsername(account.username)
                        setPassword(account.password)
                      }}
                      className={`p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md group`}
                    >
                      <div className={`w-8 h-8 ${account.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{account.role}</p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-700">{account.username}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>© 2024 Platform LMS. Semua hak dilindungi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
