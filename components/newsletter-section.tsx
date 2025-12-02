'use client'

import { useState } from 'react'

export default function NewsletterSection() {
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
          Restez Informé
        </h2>
        <p className="text-lg font-light mb-8 text-background/90">
          Inscrivez-vous à notre newsletter pour recevoir les dernières tendances et nos offres exclusives directement dans votre boîte mail.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-accent-foreground font-semibold hover:opacity-90 transition whitespace-nowrap"
          >
            S'inscrire
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-accent animate-in fade-in slide-in-from-top duration-500">
            Merci ! Vérifiez votre boîte mail.
          </p>
        )}
      </div>
    </section>
  )
}
