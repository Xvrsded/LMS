'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, Users, Award, BarChart3, Play, CheckCircle, ArrowRight, Star, TrendingUp, Clock, Globe, Zap, Shield } from 'lucide-react'

export default function Home() {
  const [hoveredRole, setHoveredRole] = useState('')

  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      features: ['Manajemen Pengguna', 'Pengawasan Kursus', 'Analisis Pembayaran', 'Konfigurasi Sistem'],
      description: 'Kontrol penuh atas ekosistem pembelajaran dengan alat administratif yang powerful'
    },
    {
      id: 'tutor',
      title: 'Pengajar',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      features: ['Pembuatan Kursus', 'Upload Video', 'Pelacakan Siswa', 'Manajemen Kuis'],
      description: 'Buat konten yang menarik dan pantau kemajuan siswa dengan alat yang intuitif'
    },
    {
      id: 'student',
      title: 'Siswa',
      icon: Award,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      features: ['Pembelajaran Kursus', 'Kuis Interaktif', 'Pelacakan Kemajuan', 'Sertifikasi'],
      description: 'Akses pendidikan berkualitas dan dapatkan sertifikat setelah menyelesaikan kursus'
    }
  ]

  const stats = [
    { icon: Users, label: 'Siswa Aktif', value: '10.000+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Kursus Tersedia', value: '500+', color: 'text-purple-600' },
    { icon: Award, label: 'Sertifikat Diterbitkan', value: '8.500+', color: 'text-green-600' },
    { icon: Star, label: 'Tingkat Kepuasan', value: '98%', color: 'text-yellow-600' }
  ]

  const features = [
    { icon: Globe, title: 'Akses Global', desc: 'Belajar dari mana saja di dunia dengan platform cloud-based kami' },
    { icon: Zap, title: 'Super Cepat', desc: 'Performa yang dioptimalkan untuk pengalaman belajar yang seamless' },
    { icon: Shield, title: 'Platform Aman', desc: 'Keamanan kelas enterprise untuk data dan privasi Anda' },
    { icon: Clock, title: 'Tersedia 24/7', desc: 'Akses kursus Anda kapan saja, di mana saja tanpa gangguan' }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Platform LMS</span>
            </div>
            <Link 
              href="/auth/signin"
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 group"
            >
              Mulai Sekarang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Dipercaya oleh 10.000+ Siswa di Seluruh Indonesia
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ubah Perjalanan
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                {' '}Belajar Anda
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Rasakan masa depan pendidikan dengan sistem manajemen pembelajaran komprehensif kami. 
              Dirancang untuk administrator, pengajar, dan siswa yang unggul.
            </p>
            
            <div className="flex justify-center items-center">
              <Link 
                href="/auth/signin"
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 group text-lg shadow-lg hover:shadow-xl"
              >
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pilih Peran Anda
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilih peran Anda untuk mengalami fitur yang disesuaikan dengan kebutuhan spesifik Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole('')}
                className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${hoveredRole === role.id ? 'ring-2 ring-indigo-500' : ''}`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${role.bgColor} rounded-bl-2xl opacity-50`}></div>
                
                <div className={`w-16 h-16 ${role.iconBg} rounded-xl flex items-center justify-center mb-6 relative z-10`}>
                  <role.icon className={`w-8 h-8 text-${role.id === 'admin' ? 'blue' : role.id === 'tutor' ? 'purple' : 'green'}-600`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/auth/signin"
                  className={`w-full bg-linear-to-r ${role.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2`}
                >
                  Akses sebagai {role.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Platform Kami?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rasakan fitur canggih yang dirancang untuk meningkatkan perjalanan belajar Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-100 transition-colors duration-200">
                  <feature.icon className="w-8 h-8 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">
                Siap Mengubah Pengalaman Belajar Anda?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Bergabunglah dengan ribuan siswa dan pendidik yang sudah merasakan manfaat platform kami
              </p>
              <Link 
                href="/auth/signin"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2 text-lg shadow-xl"
              >
                Mulai Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Platform LMS</span>
          </div>
          <p className="text-gray-400 mb-2">Memberdayakan Pendidikan di Seluruh Indonesia</p>
          <p className="text-gray-500 text-sm">© 2024 LMS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
