"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order placed:", { formData, shippingMethod, paymentMethod })
    alert("Commande confirmée! Numéro de commande: #12345")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="border border-border p-6">
              <h2 className="text-xl font-bold mb-6">Adresse de livraison</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="col-span-1 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="col-span-1 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4"
              />

              <input
                type="text"
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Code postal"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="col-span-1 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="col-span-2 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="border border-border p-6">
              <h2 className="text-xl font-bold mb-6">Méthode de livraison</h2>

              <div className="space-y-4">
                {[
                  { id: "standard", label: "Livraison Standard", desc: "5-7 jours ouvrables", price: "9.99€" },
                  { id: "express", label: "Livraison Express", desc: "2-3 jours ouvrables", price: "19.99€" },
                  { id: "overnight", label: "Livraison Demain", desc: "En 24h", price: "29.99€" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 border border-border cursor-pointer hover:bg-secondary transition"
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={option.id}
                      checked={shippingMethod === option.id}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                    <span className="font-bold">{option.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-border p-6">
              <h2 className="text-xl font-bold mb-6">Méthode de paiement</h2>

              <div className="space-y-4">
                {[
                  { id: "card", label: "Carte Bancaire" },
                  { id: "paypal", label: "PayPal" },
                  { id: "apple", label: "Apple Pay" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 border border-border cursor-pointer hover:bg-secondary transition"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={paymentMethod === option.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-4 font-medium">{option.label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Numéro de carte"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-foreground text-background font-bold text-lg hover:opacity-90 transition"
            >
              Confirmer la commande
            </button>
          </form>

          {/* Order Summary */}
          <div className="h-fit">
            <div className="border border-border p-6 space-y-6">
              <h2 className="text-xl font-bold">Résumé</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Produits</span>
                  <span>239.97€</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>9.99€</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total TTC</span>
                  <span>249.96€</span>
                </div>
              </div>

              <div className="bg-secondary p-4 text-sm">
                <p className="font-medium mb-2">Sécurisé par</p>
                <p className="text-muted-foreground">Chiffrement SSL 256-bit</p>
              </div>

              <Link href="/cart" className="block text-center text-accent hover:underline text-sm">
                Retour au panier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
