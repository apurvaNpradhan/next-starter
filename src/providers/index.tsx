import type { ReactNode } from 'react'
import { ThemeProvider } from './theme'
import { ErrorBoundary } from 'react-error-boundary'
import { MainErrorFallback } from '@/components/errors/main'

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      {' '}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  )
}
