# 🛍️ JaDa - E-Commerce Fashion Site

**Site e-commerce de mode moderne, bilingue et responsive**

[![Responsive](https://img.shields.io/badge/Responsive-✓-green)]()
[![Bilingual](https://img.shields.io/badge/Languages-FR%2FEN-blue)]()
[![Currency](https://img.shields.io/badge/Currency-FCFA-orange)]()
[![GitHub](https://img.shields.io/badge/Repo-MarcDelon%2FJaDa-black)](https://github.com/MarcDelon/JaDa)

---

## 🌟 CARACTÉRISTIQUES

### ✅ **100% Bilingue** 🇫🇷 🇬🇧
- Français / English
- 115+ clés de traduction
- Changement instantané
- Préférence sauvegardée
- Aucune chaîne en dur

### ✅ **Monnaie FCFA** 🇸🇳
- Adapté au marché sénégalais
- Format: 15 000 FCFA
- 0 euros sur tout le site
- Filtres de prix: 0 - 130 000 FCFA
- Calculs automatiques

### ✅ **100% Responsive** 📱💻
- Mobile-first design
- Filtres adaptatifs
- Navigation mobile optimale
- Grilles responsive
- Touch-friendly

### ✅ **Fonctionnalités Complètes**
- 🛒 Panier dynamique
- ❤️ Liste de souhaits
- 👤 Authentification (Supabase)
- 🔍 Filtres avancés (prix, couleur, type)
- 📦 Collections multiples
- 🎨 Design moderne et épuré

---

## 🚀 DÉMARRAGE RAPIDE

### **Installation:**
```bash
git clone https://github.com/MarcDelon/JaDa.git
cd JaDa
npm install
```

### **Configuration:**
Créer `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_supabase
```

### **Développement:**
```bash
npm run dev
```
Ouvrir http://localhost:3000

### **Build Production:**
```bash
npm run build
npm start
```

---

## 📂 STRUCTURE DU PROJET

```
JaDa/
├── app/
│   ├── collections/
│   │   ├── femme/
│   │   │   ├── page.tsx          # Collection principale femme
│   │   │   ├── shoes/page.tsx    # Chaussures (filtres FCFA)
│   │   │   ├── clothing/page.tsx # Vêtements (filtres FCFA)
│   │   │   └── accessories/      # Accessoires (filtres FCFA)
│   │   ├── enfant/page.tsx       # Collection enfant
│   │   └── sale/page.tsx         # Soldes
│   ├── cart/page.tsx             # Panier (FCFA)
│   ├── account/page.tsx          # Compte utilisateur
│   ├── auth/
│   │   ├── login/page.tsx        # Connexion (traduit)
│   │   └── register/page.tsx     # Inscription
│   └── page.tsx                  # Accueil
├── components/
│   ├── navigation.tsx            # Nav bilingue + mobile
│   ├── hero.tsx                  # Carousel traduit
│   ├── featured-products.tsx    # Produits vedette
│   ├── new-arrivals.tsx         # Nouveautés
│   ├── footer.tsx               # Footer traduit
│   └── newsletter-section.tsx   # Newsletter traduite
├── lib/
│   ├── language-context.tsx     # Système traduction (115+ clés)
│   ├── currency.ts              # Formatage FCFA
│   └── supabaseClient.ts        # Client Supabase
└── public/
    └── [images]
```

---

## 🌍 SYSTÈME DE TRADUCTION

### **Usage:**
```typescript
'use client'
import { useLanguage } from '@/lib/language-context'

export default function MaPage() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>  {/* ACCUEIL / HOME */}
      <p>{formatPrice(15000)}</p> {/* 15 000 FCFA */}
    </div>
  )
}
```

### **Clés disponibles:**
```typescript
// Navigation
'nav.home', 'nav.women', 'nav.children', 'nav.sale'

// Collections
'collections.newest', 'collections.priceAsc', 'collections.priceDesc'
'collections.filters', 'collections.itemsAvailable'

// Filtres
'filters.color', 'filters.type', 'filters.price', 'filters.noMatch'

// Produits
'products.noProducts', 'products.addToCart'

// Auth
'auth.login', 'auth.register', 'auth.email', 'auth.password'

// Common
'common.loading', 'common.currency' (FCFA)
```

---

## 💰 SYSTÈME FCFA

### **Formatage:**
```typescript
import { formatPrice } from '@/lib/currency'

// Affiche: "15 000 FCFA"
formatPrice(15000)

// Affiche: "1 500 FCFA"  
formatPrice(1500)
```

### **Conversion:**
- 1 EUR ≈ 656 FCFA
- Filtres prix: 0 - 130 000 FCFA
- Livraison gratuite: 30 000 FCFA
- Frais livraison: 5 000 FCFA

---

## 📱 RESPONSIVE

### **Breakpoints:**
```css
sm: 640px   /* Tablets */
md: 768px   /* Desktop */
lg: 1024px  /* Large */
xl: 1280px  /* XL */
```

### **Mobile (< 768px):**
- ✅ Navigation hamburger
- ✅ Filtres avec toggle
- ✅ Grilles 2 colonnes
- ✅ Footer 1 colonne

### **Desktop (≥ 768px):**
- ✅ Navigation horizontale
- ✅ Filtres sidebar
- ✅ Grilles 3-4 colonnes
- ✅ Footer 4 colonnes

---

## 🗄️ BASE DE DONNÉES

### **Tables Supabase:**

```sql
-- Produits
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  sale_price NUMERIC,
  category TEXT,
  type TEXT,
  color TEXT,
  sizes JSONB,
  image_url TEXT,
  is_new BOOLEAN DEFAULT false,
  discount TEXT
);

-- Utilisateurs (Supabase Auth)
-- Profils, adresses, commandes...
```

---

## 🎨 DESIGN

### **Palette:**
- **Primary:** Noir/Blanc (minimaliste)
- **Accent:** Rouge (#ef4444)
- **Background:** #ffffff
- **Foreground:** #000000
- **Muted:** #6b7280

### **Typographie:**
- **Font:** System fonts (SF Pro, Segoe UI)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, font-light

### **Composants:**
- Tailwind CSS
- Shadcn/ui components
- Lucide icons
- CSS Grid/Flexbox

---

## 📊 PAGES

### **Pages Publiques:**
- ✅ `/` - Accueil
- ✅ `/collections/femme` - Collection femme
- ✅ `/collections/femme/shoes` - Chaussures
- ✅ `/collections/femme/clothing` - Vêtements
- ✅ `/collections/femme/accessories` - Accessoires
- ✅ `/collections/enfant` - Collection enfant
- ✅ `/collections/sale` - Soldes
- ✅ `/cart` - Panier
- ✅ `/auth/login` - Connexion

### **Pages Protégées:**
- ✅ `/account` - Mon compte
- ✅ `/wishlist` - Liste de souhaits

---

## 🔧 TECHNOLOGIES

### **Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

### **Backend:**
- Supabase (Auth + Database)
- PostgreSQL

### **Outils:**
- Git + GitHub
- Vercel (Déploiement)
- npm/pnpm

---

## 🚀 DÉPLOIEMENT

### **Vercel (Recommandé):**

1. **Connecter GitHub:**
   - https://vercel.com/new
   - Importer: `MarcDelon/JaDa`

2. **Variables d'environnement:**
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. **Déployer:**
   - Push sur `master` → Déploiement auto
   - Build command: `npm run build`
   - Output: `.next`

### **Custom Server:**
```bash
npm run build
npm start
# Serveur sur port 3000
```

---

## 📈 STATISTIQUES

### **Code:**
- 15+ pages
- 12 composants principaux
- 115+ clés de traduction
- 2 langues complètes
- 100% responsive

### **Fonctionnalités:**
- ✅ Multi-langues
- ✅ Monnaie locale
- ✅ Filtres avancés
- ✅ Panier/Wishlist
- ✅ Auth Supabase
- ✅ Responsive complet

---

## 🎯 UTILISATION

### **Changer de Langue:**
1. Cliquez sur l'icône Globe (🌍) en haut à droite
2. Sélectionnez FR ou EN
3. Toute l'interface change instantanément

### **Filtrer les Produits:**
1. Visitez une page collection (ex: Chaussures)
2. **Mobile:** Cliquez sur "Filtres"
3. **Desktop:** Sidebar toujours visible
4. Filtrez par prix, couleur, type

### **Ajouter au Panier:**
1. Cliquez sur un produit
2. Bouton "Ajouter au panier"
3. Voir le panier: icône en haut à droite

---

## 🐛 DÉPANNAGE

### **Problème: Supabase connection error**
```bash
# Vérifier .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### **Problème: Build errors**
```bash
# Nettoyer et rebuilder
rm -rf .next node_modules
npm install
npm run build
```

### **Problème: Traductions manquantes**
```typescript
// Ajouter dans lib/language-context.tsx
fr: {
  'ma.cle': 'Mon texte',
},
en: {
  'ma.cle': 'My text',
}
```

---

## 📝 COMMITS IMPORTANTS

```bash
✅ 77f79a9 - Mobile responsive filters
✅ 8bba78f - Translate login page
✅ 0609dab - Children and Sale pages
✅ ca7a40a - Price filters EUR → FCFA
✅ 1ff53fa - Footer + Newsletter + Arrivals
✅ 228cf21 - Hero + Featured Products
```

---

## 🤝 CONTRIBUTION

### **Pour Contribuer:**
1. Fork le projet
2. Créer une branche: `git checkout -b feature/ma-feature`
3. Commit: `git commit -m "Add: ma feature"`
4. Push: `git push origin feature/ma-feature`
5. Pull Request

---

## 📧 CONTACT

**Site:** JaDa Fashion  
**GitHub:** [@MarcDelon](https://github.com/MarcDelon)  
**Repo:** [JaDa](https://github.com/MarcDelon/JaDa)  
**Email:** hello@jada.sn  
**Téléphone:** +221 12 345 67 89

---

## 📄 LICENSE

MIT License - Voir fichier LICENSE

---

## 🎉 REMERCIEMENTS

Merci d'utiliser JaDa!

**Stack:**
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

## 📚 DOCUMENTATION

### **Fichiers de doc:**
- `TRADUCTION-100-COMPLETE.md` - Guide traductions
- `RESPONSIVE-MOBILE-OK.md` - Guide responsive
- `CHANGEMENTS-FCFA-LANGUES.md` - Conversions FCFA
- `TEST-RAPIDE.md` - Guide de test

### **Liens utiles:**
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

**Date:** 2025-12-02  
**Version:** 4.0  
**Statut:** ✅ Production Ready

**🚀 Prêt pour le déploiement!**
