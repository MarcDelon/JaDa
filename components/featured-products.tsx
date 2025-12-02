'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { formatPrice } from '@/lib/currency'
import { useLanguage } from '@/lib/language-context'

interface FeaturedProductsProps {
  category?: string
}

export default function FeaturedProducts({ category = 'Collection Printemps-Été' }: FeaturedProductsProps) {
  const { t } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [liked, setLiked] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les produits depuis Supabase
  useEffect(() => {
    fetchProducts()
    // Charger les favoris depuis localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setLiked(wishlistIds)
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(8)

    if (error) {
      console.error('Erreur lors du chargement des produits:', error)
      console.error('Détails erreur:', JSON.stringify(error, null, 2))
      setProducts([])
    } else {
      // Transformer les données pour correspondre au format attendu
      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        priceFormatted: formatPrice(product.price),
        image_url: product.image_url || `/placeholder-product-${product.id}.jpg`,
        category: product.category || 'Femme',
        is_new: product.is_new
      }))
      setProducts(formattedProducts)
    }
    setLoading(false)
  }

  const toggleLike = (id: number) => {
    const newLiked = liked.includes(id) 
      ? liked.filter(x => x !== id) 
      : [...liked, id]
    
    setLiked(newLiked)
    
    // Sauvegarder dans localStorage
    localStorage.setItem('wishlist', JSON.stringify(newLiked))
  }

  const handleAddToCart = (id: number, name: string, price: number, image: string) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    const existingItem = cart.find((item: any) => item.id === id.toString())
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: id.toString(),
        name,
        price,
        image,
        quantity: 1,
        size: 'M',
        color: 'Standard'
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(t('common.addToCart'))
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {category}
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Découvrez les nouvelles pièces essentielles pour une garde-robe moderne
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Chargement des produits...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold mb-2">Aucun produit disponible</p>
            <p className="text-muted-foreground">
              {category === 'T-shirts' 
                ? 'Aucun t-shirt disponible pour le moment' 
                : `Aucun produit disponible dans cette catégorie pour le moment`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
            <div key={product.id} className="group">
              <div 
                className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product.is_new && (
                  <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-xs font-semibold tracking-wider">
                    NOUVEAU
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-4">
                  {hoveredId === product.id && (
                    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <button 
                        onClick={() => toggleLike(product.id)}
                        className={`p-3 transition-all ${
                          liked.includes(product.id)
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-white text-foreground hover:bg-gray-100'
                        }`}
                      >
                        <Heart size={18} fill={liked.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-3 bg-white text-foreground hover:bg-gray-100 transition">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(product.id, product.name, product.price, product.image_url)
                        }}
                        className="px-6 py-3 bg-foreground text-background font-semibold text-sm hover:opacity-80 transition"
                      >
                        Ajouter
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-semibold text-foreground">{product.priceFormatted}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {products.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-4 border-2 border-foreground text-foreground font-semibold text-lg hover:bg-foreground hover:text-background transition-colors duration-300">
              Voir toute la collection
            </button>
          </div>
        )}
      </div>
    </section>
  )
}