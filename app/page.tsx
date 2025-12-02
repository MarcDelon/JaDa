'use client'

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import FeaturedProducts from '@/components/featured-products'
import NewArrivals from '@/components/new-arrivals'
import NewsletterSection from '@/components/newsletter-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <NewArrivals />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
