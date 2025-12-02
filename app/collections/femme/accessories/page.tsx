"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useLanguage } from "@/lib/language-context"
import { formatPrice } from "@/lib/currency"

export default function AccessoriesPage() {
  const { t } = useLanguage()
  const [accessoriesProducts, setAccessoriesProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 130000])

  useEffect(() => {
    fetchAccessories()
  }, [])

  const fetchAccessories = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Femme')

    if (error) {
      console.error('Erreur lors du chargement des accessoires:', error)
      setAccessoriesProducts([])
    } else {
      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`,
        category: product.type || 'Accessoire',
        color: product.color || 'Non spécifié'
      }))
      setAccessoriesProducts(formattedProducts)
    }
    setLoading(false)
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const filteredProducts = useMemo(() => {
    return accessoriesProducts.filter((product) => {
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color)
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return colorMatch && categoryMatch && priceMatch
    })
  }, [selectedColors, selectedCategories, priceRange])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price)
    if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [filteredProducts, sortBy])

  const colors = Array.from(new Set(accessoriesProducts.map((p) => p.color)))
  const categories = Array.from(new Set(accessoriesProducts.map((p) => p.category)))

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/collections/femme" className="hover:text-foreground transition">
            Femme
          </Link>
          <span>/</span>
          <span className="text-foreground">Accessoires</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase mb-4">Trier par</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="newest">{t('collections.newest')}</option>
                  <option value="price-low">{t('collections.priceAsc')}</option>
                  <option value="price-high">{t('collections.priceDesc')}</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase mb-4">{t('filters.color')}</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="w-4 h-4 border border-border"
                      />
                      <span className="text-sm text-foreground">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase mb-4">{t('filters.type')}</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 border border-border"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase mb-4">{t('filters.price')}</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="130000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-foreground">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('collections.accessories.title')}</h1>
              <p className="text-muted-foreground text-lg">{sortedProducts.length} {t('collections.itemsAvailable')}</p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
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
                    <p className="text-sm font-semibold text-foreground mt-2">{formatPrice(product.price)}</p>
                  </Link>
                ))}
              </div>
            ) : accessoriesProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold mb-2">Aucun accessoire disponible</p>
                <p className="text-muted-foreground">Aucun accessoire femme disponible pour le moment</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Aucun produit ne correspond à vos critères</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
