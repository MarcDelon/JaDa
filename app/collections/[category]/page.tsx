'use client'

import { useState, useEffect, use } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Heart } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [liked, setLiked] = useState<number[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('Erreur lors du chargement des produits:', error)
      setAllProducts([])
    } else {
      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: `${product.price.toFixed(2).replace('.', ',')} €`,
        image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`,
        category: product.category || 'Produit',
        color: product.color || 'Non spécifié',
        size: product.size || 'M',
        isNew: product.is_new || false
      }))
      setAllProducts(formattedProducts)
    }
    setLoading(false)
  }

  let filtered = allProducts
  if (selectedFilters.length > 0) {
    filtered = allProducts.filter(p => selectedFilters.some(f => p.color === f || p.size === f))
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price)
    if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price)
    return 0
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
            Collection {resolvedParams.category}
          </h1>
          <p className="text-muted-foreground text-lg">
            {loading ? 'Chargement...' : `${sorted.length} articles`}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Couleur</h3>
                <div className="space-y-3">
                  {['Noir', 'Blanc', 'Gris', 'Bleu', 'Beige', 'Kaki'].map(color => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(color)}
                        onChange={() => toggleFilter(color)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Taille</h3>
                <div className="space-y-3">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(size)}
                        onChange={() => toggleFilter(size)}
                        className="w-4 h-4"
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
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="mb-8 flex justify-between items-center">
              <div className="hidden sm:block text-sm text-muted-foreground">
                Affichage de {sorted.length} articles
              </div>
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

            {/* Products */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Chargement des produits...</p>
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold mb-2">Aucun produit disponible</p>
                <p className="text-muted-foreground">Aucun produit disponible pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {sorted.map((product) => (
                <div key={product.id} className="group">
                  <div
                    className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4 cursor-pointer"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
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
                      onClick={() => toggleLike(product.id)}
                      className={`absolute top-4 right-4 p-2 transition ${
                        liked.includes(product.id)
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-white/90 text-foreground hover:bg-white'
                      }`}
                    >
                      <Heart size={18} fill={liked.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <h3 className="text-sm font-medium text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-foreground mt-2">{product.price}</p>
                </div>
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
