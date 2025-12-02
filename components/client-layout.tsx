'use client'

import { LanguageProvider } from '@/lib/language-context'
import PromoBanner from '@/components/promo-banner'
import { Analytics } from '@vercel/analytics/next'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PromoBanner />
      {children}
      <Analytics />
    </LanguageProvider>
  )
}
