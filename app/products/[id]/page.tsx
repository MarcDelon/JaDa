"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Heart, Share2 } from "lucide-react"

// Mock product data
const products: Record<string, any> = {
  "1": {
    id: "1",
    name: "Blazer Oversize Noir",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.5,
    reviews: 128,
    description: "Blazer oversize en laine premium. Parfait pour créer des looks sophistiqués et modernes.",
    images: ["/black-oversized-blazer-fashion.jpg", "/black-blazer-back-view.jpg", "/black-blazer-detail-buttons.jpg"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Noir", "Gris", "Beige"],
    details: [
      "Composition: 80% Laine, 20% Polyamide",
      "Doublure: 100% Coton",
      "Entretien: Nettoyage à sec",
      "Pays d'origine: Portugal",
    ],
    inStock: true,
  },
  "2": {
    id: "2",
    name: "Jean Skinny Bleu",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.3,
    reviews: 95,
    description: "Jean skinny taille haute en denim stretch confortable et durable.",
    images: ["/blue-skinny-jeans-womens.jpg", "/blue-skinny-jeans-back.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Bleu Clair", "Bleu Foncé", "Noir"],
    details: ["Composition: 98% Coton, 2% Élasthanne", "Entretien: Lavage en machine 30°C", "Pays d'origine: Turquie"],
    inStock: true,
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id] || products["1"]
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    console.log("Added to cart:", { product: product.name, size: selectedSize, color: selectedColor, quantity })
    alert(`${product.name} ajouté au panier!`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Accueil
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/collections/women" className="text-muted-foreground hover:text-foreground">
            Femme
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-secondary aspect-square overflow-hidden group">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-sm font-bold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 border-2 overflow-hidden transition ${
                    selectedImage === idx ? "border-foreground" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "text-lg" : "text-lg opacity-30"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-foreground">{product.price}€</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">{product.originalPrice}€</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Livraison gratuite à partir de 50€</p>
            </div>

            {/* Description */}
            <p className="text-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Couleur: {selectedColor}</label>
              <div className="flex gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 transition ${
                      selectedColor === color
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Taille: {selectedSize || "Sélectionnez"}</label>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 font-medium transition ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-3">Quantité</label>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-secondary transition"
                >
                  −
                </button>
                <span className="px-6 py-2 font-medium border-l border-r border-border">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-secondary transition">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full py-4 bg-foreground text-background font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!selectedSize ? "Sélectionnez une taille" : "Ajouter au panier"}
            </button>

            {/* Wishlist & Share */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex-1 py-3 border border-border hover:bg-secondary transition flex items-center justify-center gap-2"
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                Favoris
              </button>
              <button className="flex-1 py-3 border border-border hover:bg-secondary transition flex items-center justify-center gap-2">
                <Share2 size={20} />
                Partager
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6">
              <h3 className="font-bold mb-3">Caractéristiques</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {product.details.map((detail: string, idx: number) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
