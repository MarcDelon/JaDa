"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useLanguage } from "@/lib/language-context"
import { formatPrice } from "@/lib/currency"

export default function AllSalePage() {
  const { t } = useLanguage()
  const [allSaleProducts, setAllSaleProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("discount")
  const [liked, setLiked] = useState<number[]>([])

  useEffect(() => {
    fetchAllSaleProducts()
  }, [])

  const fetchAllSaleProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('Erreur lors du chargement des soldes:', error)
      setAllSaleProducts([])
    } else {
      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        originalPrice: product.sale_price ? product.price : null,
        image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`,
        discount: product.discount || '-0%'
      }))
      setAllSaleProducts(formattedProducts)
    }
    setLoading(false)
  }

  const sorted = [...allSaleProducts].sort((a, b) => {
    if (sortBy === "discount") return 0
    if (sortBy === "price-asc") return Number.parseFloat(a.price) - Number.parseFloat(b.price)
    if (sortBy === "price-desc") return Number.parseFloat(b.price) - Number.parseFloat(a.price)
    return 0
  })

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">{t('collections.sale.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('collections.sale.description')}</p>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{sorted.length} {t('collections.itemsAvailable')}</div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="discount">{t('collections.newest')}</option>
            <option value="price-asc">{t('collections.priceAsc')}</option>
            <option value="price-desc">{t('collections.priceDesc')}</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold mb-2">{t('products.noProducts')}</p>
            <p className="text-muted-foreground">{t('products.noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sorted.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold">
                  {product.discount}
                </div>
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
              <p className="text-sm font-semibold text-foreground mt-2">
                {formatPrice(product.price)}
                {product.originalPrice && (
                  <span className="ml-2 line-through text-muted-foreground text-xs">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </p>
            </Link>
          ))}
        </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
