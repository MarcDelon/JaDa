"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.collections': 'Collections',
    'nav.women': 'Femme',
    'nav.children': 'Enfant',
    'nav.sale': 'Soldes',
    'nav.newArrivals': 'Nouveautés',
    'nav.clothing': 'Vêtements',
    'nav.shoes': 'Chaussures',
    'nav.accessories': 'Accessoires',
    'nav.kids': 'Enfant (2-14 ans)',
    'nav.baby': 'Bébé (0-36 mois)',
    'nav.teens': 'Ado (12-18 ans)',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.account': 'Mon compte',
    'nav.cart': 'Panier',
    'nav.wishlist': 'Favoris',
    'nav.login': 'Se connecter',
    'nav.logout': 'Se déconnecter',
    
    // Common
    'common.currency': 'FCFA',
    'common.loading': 'Chargement...',
    'common.addToCart': 'Ajouter au panier',
    'common.addToWishlist': 'Ajouter aux favoris',
    'common.viewDetails': 'Voir les détails',
    'common.continueShopping': 'Continuer vos achats',
    'common.checkout': 'Passer commande',
    'common.total': 'Total',
    'common.subtotal': 'Sous-total',
    'common.quantity': 'Quantité',
    'common.price': 'Prix',
    'common.remove': 'Retirer',
    
    // Home
    'home.hero.title': 'Nouvelle Collection',
    'home.hero.subtitle': 'Découvrez les dernières tendances',
    'home.featured': 'Produits en vedette',
    'home.newArrivals': 'Nouveautés',
    
    // Account
    'account.title': 'Mon compte',
    'account.profile': 'Profil',
    'account.orders': 'Mes commandes',
    'account.addresses': 'Mes adresses',
    'account.settings': 'Paramètres',
    'account.noOrders': "Vous n'avez pas encore passé de commande",
    'account.noAddresses': "Vous n'avez pas encore d'adresse enregistrée",
    'account.orderNumber': 'Commande n°',
    'account.status': 'Statut',
    'account.delivered': 'Livré',
    'account.processing': 'En préparation',
    'account.pending': 'En attente',
    
    // Auth
    'auth.login': 'Se connecter',
    'auth.register': "S'inscrire",
    'auth.email': 'Adresse e-mail',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.firstName': 'Prénom',
    'auth.lastName': 'Nom',
    'auth.forgotPassword': 'Mot de passe oublié ?',
    'auth.noAccount': "Pas encore de compte ?",
    'auth.hasAccount': 'Vous avez déjà un compte ?',
    'auth.loginWithGoogle': 'Se connecter avec Google',
    
    // Cart
    'cart.title': 'Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.itemsCount': 'articles',
    
    // Wishlist
    'wishlist.title': 'Mes favoris',
    'wishlist.empty': 'Votre liste de favoris est vide',
    
    // Products
    'products.noProducts': 'Aucun produit disponible',
    'products.newArrivals': 'Nouveautés',
    'products.onSale': 'En solde',
    
    // Hero
    'hero.slide1.title': 'Novembre Soldes',
    'hero.slide1.subtitle': 'Découvrez notre collection exclusive',
    'hero.slide2.title': 'Nouvelles Tendances',
    'hero.slide2.subtitle': 'Les meilleures pièces de la saison',
    'hero.slide3.title': 'Collection Enfant',
    'hero.slide3.subtitle': 'Style et confort pour les plus jeunes',
    
    // Sections
    'sections.featured': 'Produits en vedette',
    'sections.newArrivals': 'Nouveautés',
    'sections.viewAll': 'Voir tout',
    
    // Newsletter
    'newsletter.title': 'Restez informé',
    'newsletter.subtitle': 'Inscrivez-vous à notre newsletter pour recevoir les dernières tendances et nos offres exclusives',
    'newsletter.email': 'Votre adresse e-mail',
    'newsletter.subscribe': "S'inscrire",
    'newsletter.success': 'Merci ! Vérifiez votre boîte mail.',
    
    // Footer
    'footer.shop': 'Boutique',
    'footer.about': 'À propos',
    'footer.contact': 'Contact',
    'footer.help': 'Aide',
    'footer.shipping': 'Livraison',
    'footer.returns': 'Retours',
    'footer.faq': 'FAQ',
    'footer.terms': "Conditions d'utilisation",
    'footer.privacy': 'Politique de confidentialité',
    'footer.follow': 'Suivez-nous',
    'footer.copyright': '© 2024 JaDa. Tous droits réservés.',
    
    // Arrivals
    'arrivals.item1.title': 'Nouvelle Collection Automne',
    'arrivals.item1.description': 'Les pièces incontournables de la saison',
    'arrivals.item2.title': 'Accessoires Essentiels',
    'arrivals.item2.description': 'Complétez votre look avec style',
    'arrivals.trending': 'TENDANCE',
    'arrivals.accessories': 'ACCESSOIRES',
    'arrivals.discover': 'Découvrir',
    
    // Collections Pages
    'collections.women.title': 'Collection Femme',
    'collections.women.description': 'Élégance et style pour toutes les occasions',
    'collections.children.title': 'Collection Enfant',
    'collections.children.description': 'Mode confortable et tendance pour les enfants',
    'collections.sale.title': 'Soldes',
    'collections.sale.description': 'Profitez de nos meilleures offres',
    'collections.sortBy': 'Trier par',
    'collections.newest': 'Plus récent',
    'collections.priceAsc': 'Prix croissant',
    'collections.priceDesc': 'Prix décroissant',
    'collections.filters': 'Filtres',
    'collections.showFilters': 'Afficher les filtres',
    'collections.hideFilters': 'Masquer les filtres',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.collections': 'Collections',
    'nav.women': 'Women',
    'nav.children': 'Children',
    'nav.sale': 'Sale',
    'nav.newArrivals': 'New Arrivals',
    'nav.clothing': 'Clothing',
    'nav.shoes': 'Shoes',
    'nav.accessories': 'Accessories',
    'nav.kids': 'Kids (2-14 years)',
    'nav.baby': 'Baby (0-36 months)',
    'nav.teens': 'Teens (12-18 years)',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.account': 'My Account',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Wishlist',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Common
    'common.currency': 'FCFA',
    'common.loading': 'Loading...',
    'common.addToCart': 'Add to Cart',
    'common.addToWishlist': 'Add to Wishlist',
    'common.viewDetails': 'View Details',
    'common.continueShopping': 'Continue Shopping',
    'common.checkout': 'Checkout',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.quantity': 'Quantity',
    'common.price': 'Price',
    'common.remove': 'Remove',
    
    // Home
    'home.hero.title': 'New Collection',
    'home.hero.subtitle': 'Discover the latest trends',
    'home.featured': 'Featured Products',
    'home.newArrivals': 'New Arrivals',
    
    // Account
    'account.title': 'My Account',
    'account.profile': 'Profile',
    'account.orders': 'My Orders',
    'account.addresses': 'My Addresses',
    'account.settings': 'Settings',
    'account.noOrders': 'You have no orders yet',
    'account.noAddresses': 'You have no saved addresses yet',
    'account.orderNumber': 'Order #',
    'account.status': 'Status',
    'account.delivered': 'Delivered',
    'account.processing': 'Processing',
    'account.pending': 'Pending',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.loginWithGoogle': 'Login with Google',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.itemsCount': 'items',
    
    // Wishlist
    'wishlist.title': 'My Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    
    // Products
    'products.noProducts': 'No products available',
    'products.newArrivals': 'New Arrivals',
    'products.onSale': 'On Sale',
    
    // Hero
    'hero.slide1.title': 'November Sale',
    'hero.slide1.subtitle': 'Discover our exclusive collection',
    'hero.slide2.title': 'New Trends',
    'hero.slide2.subtitle': 'The best pieces of the season',
    'hero.slide3.title': 'Kids Collection',
    'hero.slide3.subtitle': 'Style and comfort for the little ones',
    
    // Sections
    'sections.featured': 'Featured Products',
    'sections.newArrivals': 'New Arrivals',
    'sections.viewAll': 'View All',
    
    // Newsletter
    'newsletter.title': 'Stay Informed',
    'newsletter.subtitle': 'Subscribe to our newsletter to receive the latest trends and our exclusive offers',
    'newsletter.email': 'Your email address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'Thank you! Check your mailbox.',
    
    // Footer
    'footer.shop': 'Shop',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.help': 'Help',
    'footer.shipping': 'Shipping',
    'footer.returns': 'Returns',
    'footer.faq': 'FAQ',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.follow': 'Follow Us',
    'footer.copyright': '© 2024 JaDa. All rights reserved.',
    
    // Arrivals
    'arrivals.item1.title': 'New Autumn Collection',
    'arrivals.item1.description': 'The must-have pieces of the season',
    'arrivals.item2.title': 'Essential Accessories',
    'arrivals.item2.description': 'Complete your look with style',
    'arrivals.trending': 'TRENDING',
    'arrivals.accessories': 'ACCESSORIES',
    'arrivals.discover': 'Discover',
    
    // Collections Pages
    'collections.women.title': "Women's Collection",
    'collections.women.description': 'Elegance and style for all occasions',
    'collections.children.title': "Children's Collection",
    'collections.children.description': 'Comfortable and trendy fashion for kids',
    'collections.sale.title': 'Sale',
    'collections.sale.description': 'Enjoy our best offers',
    'collections.sortBy': 'Sort by',
    'collections.newest': 'Newest',
    'collections.priceAsc': 'Price: Low to High',
    'collections.priceDesc': 'Price: High to Low',
    'collections.filters': 'Filters',
    'collections.showFilters': 'Show Filters',
    'collections.hideFilters': 'Hide Filters',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
