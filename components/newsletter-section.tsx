'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'

export default function NewsletterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-lg font-light mb-8 text-background/90">
          {t('newsletter.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder={t('newsletter.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-accent-foreground font-semibold hover:opacity-90 transition whitespace-nowrap"
          >
            {t('newsletter.subscribe')}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-accent animate-in fade-in slide-in-from-top duration-500">
            {t('newsletter.success')}
          </p>
        )}
      </div>
    </section>
  )
}
