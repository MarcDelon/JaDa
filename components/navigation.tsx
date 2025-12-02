"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User, Heart, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const categories = {
    femme: [
      { labelKey: "nav.newArrivals", href: "/collections/femme/new" },
      { labelKey: "nav.clothing", href: "/collections/femme/clothing" },
      { labelKey: "nav.shoes", href: "/collections/femme/shoes" },
      { labelKey: "nav.accessories", href: "/collections/femme/accessories" },
      { labelKey: "nav.sale", href: "/collections/femme/sale" },
    ],
    enfant: [
      { labelKey: "nav.kids", href: "/collections/enfant/kids" },
      { labelKey: "nav.baby", href: "/collections/enfant/baby" },
      { labelKey: "nav.teens", href: "/collections/enfant/teens" },
    ],
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-3xl font-bold tracking-widest text-foreground uppercase">JaDa</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition py-4">
              {t('nav.home').toUpperCase()}
            </Link>

            {/* Femme Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("femme")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-medium text-foreground hover:text-accent transition py-4">{t('nav.women').toUpperCase()}</button>
              {activeDropdown === "femme" && (
                <div className="absolute left-0 mt-0 w-48 bg-background border border-border shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  {categories.femme.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-foreground hover:bg-secondary transition"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Enfant Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("enfant")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-medium text-foreground hover:text-accent transition py-4">{t('nav.children').toUpperCase()}</button>
              {activeDropdown === "enfant" && (
                <div className="absolute left-0 mt-0 w-48 bg-background border border-border shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  {categories.enfant.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-foreground hover:bg-secondary transition"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sale */}
            <Link href="/collections/sale" className="text-sm font-bold text-accent hover:opacity-80 transition py-4">
              {t('nav.sale').toUpperCase()}
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="p-2 hover:bg-secondary transition flex items-center gap-1"
              >
                <Globe size={18} className="text-foreground" />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-background border border-border shadow-lg z-50">
                  <button
                    onClick={() => {
                      setLanguage('fr')
                      setLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition ${
                      language === 'fr' ? 'bg-secondary font-bold' : ''
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition ${
                      language === 'en' ? 'bg-secondary font-bold' : ''
                    }`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            <button className="p-2 hover:bg-secondary transition hidden sm:block">
              <Search size={20} className="text-foreground" />
            </button>
            <Link href="/wishlist" className="p-2 hover:bg-secondary transition hidden sm:block relative">
              <Heart size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground font-bold">
                0
              </span>
            </Link>
            <Link href="/account" className="p-2 hover:bg-secondary transition hidden sm:block">
              <User size={20} className="text-foreground" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-secondary transition relative">
              <ShoppingBag size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground font-bold">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-secondary transition">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border space-y-2">
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-foreground hover:text-accent">
              {t('nav.home').toUpperCase()}
            </Link>
            <Link
              href="/collections/femme"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:text-accent"
            >
              {t('nav.women').toUpperCase()}
            </Link>
            <Link
              href="/collections/enfant"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:text-accent"
            >
              {t('nav.children').toUpperCase()}
            </Link>
            <Link href="/collections/sale" className="block px-4 py-2 text-sm font-bold text-accent">
              {t('nav.sale').toUpperCase()}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
