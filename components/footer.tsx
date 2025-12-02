import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-wider mb-4">JaDa</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Mode épurée et tendance pour toute la famille. Découvrez notre sélection de pièces incontournables.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/collections/women" className="hover:text-background/80 transition">Femme</Link></li>
              <li><Link href="/collections/kids" className="hover:text-background/80 transition">Enfant</Link></li>
              <li><Link href="/collections/baby" className="hover:text-background/80 transition">Bambinerie</Link></li>
              <li><Link href="/collections/sale" className="hover:text-background/80 transition">Soldes</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Aide</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-background/80 transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-background/80 transition">Livraison</Link></li>
              <li><Link href="/returns" className="hover:text-background/80 transition">Retours</Link></li>
              <li><Link href="/contact" className="hover:text-background/80 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-background/80 transition">
                <Phone size={16} />
                +33 1 23 45 67 89
              </a>
              <a href="mailto:hello@jada.com" className="flex items-center gap-2 hover:text-background/80 transition">
                <Mail size={16} />
                hello@jada.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-background/70">
          <p>&copy; 2025 JaDa. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-background transition">Confidentialité</Link>
            <Link href="/terms" className="hover:text-background transition">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
