"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { LogOut, Settings, Package, Heart, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useLanguage } from "@/lib/language-context"
import { formatPrice } from "@/lib/currency"

export default function AccountPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    setLoading(true)
    
    // Vérifier si l'utilisateur est connecté
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      // Pas connecté, rediriger vers la page de connexion
      router.push('/auth/login')
      return
    }

    setUser(user)

    // Charger le profil utilisateur
    await loadProfile(user.id)
    
    // Charger les commandes
    await loadOrders(user.id)
    
    // Charger les adresses
    await loadAddresses(user.id)
    
    // Compter les favoris
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlistCount(wishlist.length)
    
    setLoading(false)
  }

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  const loadOrders = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setOrders(data)
    }
  }

  const loadAddresses = async (userId: string) => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)

    if (!error && data) {
      setAddresses(data)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Chargement de votre compte...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="border border-border p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Connecté en tant que</p>
                <p className="font-bold">
                  {profile?.first_name || user.email?.split('@')[0]} {profile?.last_name || ''}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-2 border-t border-border pt-4">
                <Link
                  href="/account"
                  className="flex items-center gap-3 p-3 bg-secondary rounded hover:opacity-80 transition"
                >
                  <Settings size={20} />
                  <span>Mes informations</span>
                </Link>
                <Link href="#orders" className="flex items-center gap-3 p-3 rounded hover:bg-secondary transition">
                  <Package size={20} />
                  <span>Mes commandes</span>
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded hover:bg-secondary transition">
                  <Heart size={20} />
                  <span>Mes favoris</span>
                </Link>
                <Link href="#addresses" className="flex items-center gap-3 p-3 rounded hover:bg-secondary transition">
                  <MapPin size={20} />
                  <span>Mes adresses</span>
                </Link>
              </nav>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 border border-border hover:bg-secondary transition"
              >
                <LogOut size={20} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* My Orders */}
            <div id="orders" className="border border-border p-6">
              <h2 className="text-2xl font-bold mb-6">Mes commandes</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Vous n'avez pas encore passé de commande</p>
                  <Link href="/" className="inline-block px-6 py-3 bg-foreground text-background font-bold hover:opacity-90 transition">
                    Découvrir nos produits
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border hover:bg-secondary transition"
                    >
                      <div>
                        <p className="font-bold">#{order.order_number || order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(order.total_amount)}</p>
                        <p className={`text-sm ${order.status === "delivered" ? "text-green-600" : "text-orange-600"}`}>
                          {order.status === "delivered" ? t('account.delivered') : order.status === "processing" ? t('account.processing') : t('account.pending')}
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-border hover:bg-secondary transition">Détails</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border p-6 text-center">
                <p className="text-4xl font-bold">{orders.length}</p>
                <p className="text-muted-foreground">Commandes</p>
              </div>
              <div className="border border-border p-6 text-center">
                <p className="text-4xl font-bold">{wishlistCount}</p>
                <p className="text-muted-foreground">Articles en favoris</p>
              </div>
            </div>

            {/* My Addresses */}
            <div id="addresses" className="border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Mes adresses</h2>
                <button className="px-4 py-2 border border-border hover:bg-secondary transition text-sm font-medium">
                  Ajouter une adresse
                </button>
              </div>
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Vous n'avez pas encore d'adresse enregistrée</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold">{address.label || 'Adresse'}</p>
                          <p className="text-sm text-muted-foreground">{address.street}</p>
                          <p className="text-sm text-muted-foreground">{address.postal_code} {address.city}</p>
                          <p className="text-sm text-muted-foreground">{address.country}</p>
                        </div>
                        {address.is_default && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">Par défaut</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-accent hover:underline">Modifier</button>
                        <span className="text-muted-foreground">•</span>
                        <button className="text-sm text-destructive hover:underline">Supprimer</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
