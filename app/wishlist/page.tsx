"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    setLoading(true)
    
    // Récupérer les IDs des favoris depuis localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (wishlistIds.length === 0) {
      setItems([])
      setLoading(false)
      return
    }

    // Charger les produits depuis Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', wishlistIds)

    if (error) {
      console.error('Erreur lors du chargement des favoris:', error)
      setItems([])
    } else {
      const formattedItems = data.map(product => ({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.original_price || product.price,
        image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`,
        inStock: product.stock ? product.stock > 0 : true
      }))
      setItems(formattedItems)
    }
    
    setLoading(false)
  }

  const handleRemoveItem = (id: string) => {
    // Supprimer du state
    setItems(items.filter((item) => item.id !== id))
    
    // Supprimer du localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]')
    const updatedIds = wishlistIds.filter((itemId: number) => itemId !== parseInt(id))
    localStorage.setItem('wishlist', JSON.stringify(updatedIds))
  }

  const handleAddToCart = (id: string) => {
    // Ajouter au panier (localStorage)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const product = items.find(item => item.id === id)
    
    if (product) {
      const existingItem = cart.find((item: any) => item.id === id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({ ...product, quantity: 1, size: 'M', color: 'Standard' })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      alert("Produit ajouté au panier!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Mes Favoris</h1>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Chargement de vos favoris...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto mb-6 text-muted-foreground" />
            <p className="text-2xl font-medium mb-6">Aucun article en favoris</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-foreground text-background font-bold hover:opacity-90 transition"
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="border border-border overflow-hidden hover:shadow-lg transition">
                <div className="relative bg-secondary aspect-square overflow-hidden group">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.originalPrice > item.price && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-sm font-bold">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold">Rupture de stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <p className="font-bold hover:text-accent transition cursor-pointer">{item.name}</p>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="font-bold text-lg">{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}€</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-muted-foreground line-through">{typeof item.originalPrice === 'number' ? item.originalPrice.toFixed(2) : item.originalPrice}€</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      disabled={!item.inStock}
                      className="flex-1 py-2 bg-foreground text-background font-bold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Ajouter
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="py-2 px-3 border border-border hover:bg-secondary transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
