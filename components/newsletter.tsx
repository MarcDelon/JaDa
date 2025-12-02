'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-y border-border">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-4">
          Restez à jour
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Inscrivez-vous à notre newsletter pour recevoir les nouveautés et les promotions exclusives.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-accent text-accent-foreground font-semibold hover:opacity-90 transition"
          >
            {subscribed ? '✓ Inscrit' : 'S\'inscrire'}
          </button>
        </form>
      </div>
    </section>
  )
}
