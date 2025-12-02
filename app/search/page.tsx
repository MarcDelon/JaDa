"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Search, Filter, X } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  category: string
  color: string
  size: string
  rating: number
  image: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Blazer Oversize Noir",
    price: 89.99,
    originalPrice: 119.99,
    category: "Vêtements",
    color: "Noir",
    size: "M",
    rating: 4.5,
    image: "/black-oversized-blazer-fashion.jpg",
  },
  {
    id: "2",
    name: "Jean Skinny Bleu",
    price: 59.99,
    originalPrice: 79.99,
    category: "Vêtements",
    color: "Bleu",
    size: "S",
    rating: 4.3,
    image: "/blue-skinny-jeans-womens.jpg",
  },
  {
    id: "3",
    name: "T-shirt Basique Blanc",
    price: 29.99,
    originalPrice: 39.99,
    category: "Vêtements",
    color: "Blanc",
    size: "XS",
    rating: 4.7,
    image: "/white-basic-tshirt-cotton.jpg",
  },
  {
    id: "4",
    name: "Robe Midi Beige",
    price: 79.99,
    originalPrice: 109.99,
    category: "Vêtements",
    color: "Beige",
    size: "M",
    rating: 4.4,
    image: "/beige-midi-dress-elegant.jpg",
  },
  {
    id: "5",
    name: "Pantalon Cargo Kaki",
    price: 69.99,
    originalPrice: 99.99,
    category: "Vêtements",
    color: "Kaki",
    size: "L",
    rating: 4.2,
    image: "/khaki-cargo-pants-military.jpg",
  },
  {
    id: "6",
    name: "Chemise Rayée",
    price: 49.99,
    originalPrice: 69.99,
    category: "Vêtements",
    color: "Rayé",
    size: "M",
    rating: 4.6,
    image: "/striped-shirt-blouse.jpg",
  },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const [searchQuery, setSearchQuery] = useState(searchParams.q || "")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const results = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

      return matchesSearch && matchesPrice && matchesColor && matchesCategory
    })

    // Sort results
    if (sortBy === "price-low") {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(results)
  }, [searchQuery, sortBy, priceRange, selectedColors, selectedCategories])

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const colors = Array.from(new Set(products.map((p) => p.color)))
  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Rechercher</h1>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des produits..."
              className="w-full pl-12 pr-4 py-3 text-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {filteredProducts.length} résultat{filteredProducts.length !== 1 ? "s" : ""} trouvé
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-1`}>
            <div className="border border-border p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between lg:hidden">
                <h3 className="font-bold">Filtres</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-bold mb-3">Trier par</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-low">Prix: bas vers haut</option>
                  <option value="price-high">Prix: haut vers bas</option>
                  <option value="rating">Note</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold mb-3">Prix</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold mb-3">Catégorie</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-bold mb-3">Couleur</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorChange(color)}
                        className="w-4 h-4"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedColors.length > 0 || selectedCategories.length > 0 || priceRange[1] < 200) && (
                <button
                  onClick={() => {
                    setSelectedColors([])
                    setSelectedCategories([])
                    setPriceRange([0, 200])
                  }}
                  className="w-full py-2 border border-border hover:bg-secondary transition text-sm font-medium"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border hover:bg-secondary transition mb-4"
          >
            <Filter size={20} />
            Filtres
          </button>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-2xl font-medium text-muted-foreground">Aucun produit trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="border border-border overflow-hidden hover:shadow-lg transition cursor-pointer">
                      <div className="relative bg-secondary aspect-square overflow-hidden group">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-sm font-bold">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <p className="font-bold hover:text-accent transition">{product.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="flex text-accent">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(product.rating) ? "" : "opacity-30"}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.rating})</span>
                          </div>
                        </div>

                        <div className="flex items-baseline space-x-2">
                          <span className="font-bold text-lg">{product.price}€</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">{product.originalPrice}€</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
