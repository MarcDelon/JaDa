"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Trash2, Plus, Minus } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { formatPrice } from "@/lib/currency"
import { useLanguage } from "@/lib/language-context"

export default function CartPage() {
  const { t } = useLanguage()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    setLoading(true)
    
    // Récupérer le panier depuis localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    if (cart.length === 0) {
      setCartItems([])
      setLoading(false)
      return
    }

    // Extraire les IDs des produits
    const productIds = cart.map((item: any) => parseInt(item.id))

    // Charger les détails des produits depuis Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds)

    if (error) {
      console.error('Erreur lors du chargement du panier:', error)
      setCartItems([])
    } else {
      // Fusionner les données du panier avec les détails des produits
      const formattedItems = cart.map((cartItem: any) => {
        const product = data.find(p => p.id === parseInt(cartItem.id))
        if (product) {
          return {
            id: cartItem.id,
            name: product.name,
            price: product.price,
            size: cartItem.size || 'M',
            color: cartItem.color || 'Standard',
            quantity: cartItem.quantity,
            image: product.image_url || product.image || `/placeholder-product-${product.id}.jpg`
          }
        }
        return cartItem
      })
      setCartItems(formattedItems)
    }
    
    setLoading(false)
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id)
    } else {
      const updatedItems = cartItems.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
      setCartItems(updatedItems)
      
      // Mettre à jour localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const updatedCart = cart.map((item: any) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  const handleRemoveItem = (id: string) => {
    // Supprimer du state
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    
    // Supprimer du localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = cart.filter((item: any) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 30000 ? 0 : 5000 // Livraison gratuite à partir de 30000 FCFA
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Mon Panier</h1>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Chargement de votre panier...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl font-medium mb-6">Votre panier est vide</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-foreground text-background font-bold hover:opacity-90 transition"
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 border border-border hover:border-foreground transition">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-32 h-32 object-cover" />

                  <div className="flex-1 space-y-2">
                    <Link href={`/products/${item.id}`} className="font-bold hover:text-accent transition">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.color} • Taille {item.size}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4 border border-border w-fit">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-secondary transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-secondary transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right space-y-4">
                    <div className="font-bold text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive/80 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <div className="border border-border p-6 space-y-4">
                <h2 className="text-xl font-bold">Résumé de la commande</h2>

                <div className="space-y-2 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span>{t('common.subtotal')}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>{t('common.total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {shipping === 0 && (
                  <p className="text-xs text-muted-foreground bg-secondary p-2">✓ Livraison gratuite à partir de 30000 FCFA</p>
                )}

                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-foreground text-background font-bold text-center hover:opacity-90 transition"
                >
                  Passer la commande
                </Link>

                <Link
                  href="/"
                  className="block w-full py-3 border border-border text-center font-medium hover:bg-secondary transition"
                >
                  Continuer vos achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
