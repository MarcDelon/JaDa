"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function KidsPage() {
  const [kidsClothes, setKidsClothes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState<number[]>([])

  useEffect(() => {
    fetchKidsProducts()
  }, [])

  const fetchKidsProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Enfant')

    if (error) {
      console.error('Erreur lors du chargement des produits enfants:', error)
      setKidsClothes([])
    } else {
      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: `${product.price.toFixed(2).replace('.', ',')} €`,
        image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`
      }))
      setKidsClothes(formattedProducts)
    }
    setLoading(false)
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Enfant (2-14 ans)</h1>
          <p className="text-muted-foreground text-lg">Vêtements pour les enfants</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Chargement des produits enfants...</p>
          </div>
        ) : kidsClothes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold mb-2">Aucun produit disponible</p>
            <p className="text-muted-foreground">Aucun produit enfant (2-14 ans) disponible pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {kidsClothes.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleLike(product.id)
                  }}
                  className={`absolute top-4 right-4 p-2 transition ${
                    liked.includes(product.id)
                      ? "bg-accent text-accent-foreground"
                      : "bg-white/90 text-foreground hover:bg-white"
                  }`}
                >
                  <Heart size={18} fill={liked.includes(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <h3 className="text-sm font-medium text-foreground line-clamp-2">{product.name}</h3>
              <p className="text-sm font-semibold text-foreground mt-2">{product.price}</p>
            </Link>
          ))}
        </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
