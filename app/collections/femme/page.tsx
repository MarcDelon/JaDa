"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Heart, Filter } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function FemmeCollectionPage() {
  const [womenProducts, setWomenProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [liked, setLiked] = useState<number[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    fetchWomenProducts()
  }, [])

  const fetchWomenProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Femme')

    if (error) {
      console.error('Erreur lors du chargement des produits femme:', error)
      setWomenProducts([])
    } else {
      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: `${product.price.toFixed(2).replace('.', ',')} €`,
        image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`,
        category: product.category,
        color: product.color || 'Non spécifié',
        size: product.size || 'M',
        isNew: product.is_new || false
      }))
      setWomenProducts(formattedProducts)
    }
    setLoading(false)
  }

  let filtered = womenProducts
  if (selectedFilters.length > 0) {
    filtered = womenProducts.filter((p) => selectedFilters.some((f) => p.color === f || p.size === f))
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return Number.parseFloat(a.price) - Number.parseFloat(b.price)
    if (sortBy === "price-desc") return Number.parseFloat(b.price) - Number.parseFloat(a.price)
    return 0
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Femme</h1>
          <p className="text-muted-foreground text-lg">Découvrez nos dernières collections pour femmes</p>
        </div>

        {/* Subcategories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <Link
            href="/collections/femme/new"
            className="p-4 border border-border hover:bg-secondary transition text-center font-medium"
          >
            Nouveautés
          </Link>
          <Link
            href="/collections/femme/clothing"
            className="p-4 border border-border hover:bg-secondary transition text-center font-medium"
          >
            Vêtements
          </Link>
          <Link
            href="/collections/femme/shoes"
            className="p-4 border border-border hover:bg-secondary transition text-center font-medium"
          >
            Chaussures
          </Link>
          <Link
            href="/collections/femme/accessories"
            className="p-4 border border-border hover:bg-secondary transition text-center font-medium"
          >
            Accessoires
          </Link>
          <Link
            href="/collections/femme/sale"
            className="p-4 border border-accent bg-accent text-accent-foreground hover:opacity-90 transition text-center font-bold"
          >
            Soldes
          </Link>
        </div>

        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 mb-4 text-sm font-medium"
          >
            <Filter size={18} />
            Filtres
          </button>

          {/* Sidebar Filters */}
          <aside className={`w-64 ${showMobileFilters ? "block" : "hidden"} md:block`}>
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Couleur</h3>
                <div className="space-y-3">
                  {["Noir", "Blanc", "Gris", "Bleu", "Beige", "Camel", "Multicolore"].map((color) => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer hover:text-accent transition">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(color)}
                        onChange={() => toggleFilter(color)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Taille</h3>
                <div className="space-y-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer hover:text-accent transition">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(size)}
                        onChange={() => toggleFilter(size)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedFilters.length > 0 && (
                <button
                  onClick={() => setSelectedFilters([])}
                  className="w-full py-2 border border-border hover:bg-secondary transition text-sm font-medium"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
              <div className="text-sm text-muted-foreground">{sorted.length} articles</div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="newest">Nouveautés</option>
                <option value="price-asc">Prix: bas à haut</option>
                <option value="price-desc">Prix: haut à bas</option>
              </select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Chargement des produits...</p>
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold mb-2">Aucun produit disponible</p>
                <p className="text-muted-foreground">Aucun produit femme disponible pour le moment</p>
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

                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-xs font-semibold">
                        NOUVEAU
                      </div>
                    )}

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
        </div>
      </div>

      <Footer />
    </main>
  )
}
