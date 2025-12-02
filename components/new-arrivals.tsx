'use client'

import { useEffect, useState } from 'react'

const arrivals = [
  {
    id: 1,
    title: 'Nouvelle Collection Automne',
    description: 'Les pièces incontournables de la saison',
    image: '/fashion-autumn-collection-designer.jpg',
    badge: 'TENDANCE',
  },
  {
    id: 2,
    title: 'Accessoires Essentiels',
    description: 'Complétez votre look avec style',
    image: '/fashion-accessories-bags-shoes.jpg',
    badge: 'ACCESSOIRES',
  },
]

export default function NewArrivals() {
  const [inView, setInView] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(prev => [...new Set([...prev, parseInt(entry.target.id)])])
        }
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('[data-arrival]').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">
          Dernières Arrivées
        </h2>

        <div className="space-y-12">
          {arrivals.map((arrival, idx) => (
            <div 
              key={arrival.id}
              id={arrival.id.toString()}
              data-arrival
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center transition-all duration-1000 ${
                inView.includes(arrival.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex-1 relative overflow-hidden aspect-video">
                <img
                  src={arrival.image || "/placeholder.svg"}
                  alt={arrival.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6 bg-foreground text-background px-4 py-2 font-bold text-sm tracking-widest">
                  {arrival.badge}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  {arrival.title}
                </h3>
                <p className="text-lg text-muted-foreground font-light mb-6">
                  {arrival.description}
                </p>
                <button className="px-6 py-3 bg-foreground text-background font-semibold hover:opacity-80 transition">
                  Découvrir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
