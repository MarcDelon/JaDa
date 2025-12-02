'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { language } = useLanguage()

  if (!isVisible) return null

  const promoText = language === 'fr' 
    ? 'LIVRAISON GRATUITE À PARTIR DE 30 000 FCFA • RETOURS GRATUITS'
    : 'FREE SHIPPING FROM 30,000 FCFA • FREE RETURNS'

  return (
    <div className="bg-accent text-accent-foreground py-3 px-4 flex items-center justify-between gap-4">
      <div className="flex-1 text-center">
        <p className="text-sm md:text-base font-semibold">
          {promoText}
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 p-1 hover:opacity-80 transition"
      >
        <X size={18} />
      </button>
    </div>
  )
}
