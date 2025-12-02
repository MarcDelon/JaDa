'use client'

import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-wider mb-4">JaDa</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              {t('hero.slide1.subtitle')}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">{t('nav.collections')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/collections/femme" className="hover:text-background/80 transition">{t('nav.women')}</Link></li>
              <li><Link href="/collections/enfant" className="hover:text-background/80 transition">{t('nav.children')}</Link></li>
              <li><Link href="/collections/sale" className="hover:text-background/80 transition">{t('nav.sale')}</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">{t('footer.help')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-background/80 transition">{t('footer.faq')}</Link></li>
              <li><Link href="/shipping" className="hover:text-background/80 transition">{t('footer.shipping')}</Link></li>
              <li><Link href="/returns" className="hover:text-background/80 transition">{t('footer.returns')}</Link></li>
              <li><Link href="/contact" className="hover:text-background/80 transition">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+221123456789" className="flex items-center gap-2 hover:text-background/80 transition">
                <Phone size={16} />
                +221 12 345 67 89
              </a>
              <a href="mailto:hello@jada.sn" className="flex items-center gap-2 hover:text-background/80 transition">
                <Mail size={16} />
                hello@jada.sn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-background/70">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-background transition">{t('footer.privacy')}</Link>
            <Link href="/conditions" className="hover:text-background transition">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
