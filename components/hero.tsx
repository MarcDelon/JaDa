'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function Hero() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  
  const slides = [
    {
      id: 1,
      titleKey: 'hero.slide1.title',
      subtitleKey: 'hero.slide1.subtitle',
      image: '/fashion-woman-autumn-collection.jpg',
    },
    {
      id: 2,
      titleKey: 'hero.slide2.title',
      subtitleKey: 'hero.slide2.subtitle',
      image: '/modern-fashion-minimal-style.jpg',
    },
    {
      id: 3,
      titleKey: 'hero.slide3.title',
      subtitleKey: 'hero.slide3.subtitle',
      image: '/kids-fashion-colorful-clothes.jpg',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative h-96 md:h-screen overflow-hidden bg-secondary">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image || "/placeholder.svg"}
            alt={t(slide.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4 text-balance">
                {t(slide.titleKey)}
              </h1>
              <p className="text-lg md:text-xl font-light">
                {t(slide.subtitleKey)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white transition"
      >
        <ChevronLeft size={24} className="text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white transition"
      >
        <ChevronRight size={24} className="text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition ${
              idx === current ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
