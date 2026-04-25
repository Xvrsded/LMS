'use client'

import * as React from 'react'
import { ThemeProvider as ThemeProviderWrapper } from '@/contexts/theme-context'

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProviderWrapper>
      {children}
    </ThemeProviderWrapper>
  )
}
