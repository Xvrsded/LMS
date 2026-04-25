'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 max-w-sm",
      getBgColor(),
      isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
      {getIcon()}
      <p className="text-sm font-medium text-gray-900">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose?.(), 300)
        }}
        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

let toastCount = 0

export const toast = {
  success: (message: string) => {
    const id = ++toastCount
    const container = document.getElementById('toast-container')
    if (container) {
      const toastElement = document.createElement('div')
      toastElement.id = `toast-${id}`
      container.appendChild(toastElement)
      
      // This would need to be implemented with a proper state management system
      console.log('Success:', message)
    }
  },
  error: (message: string) => {
    console.log('Error:', message)
  },
  info: (message: string) => {
    console.log('Info:', message)
  }
}
