"use client"

import Navigation from "@/components/navigation"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-12">À Propos de JaDa</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-3xl font-bold mb-4">Notre Histoire</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              JaDa a été fondée en 2020 avec la vision de rendre la mode accessible, durable et inclusive. Nous croyons
              que chacun mérite de se sentir bien dans sa peau et que la mode devrait être un moyen d'expression
              personnel sans barrières.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Offrir des vêtements de qualité supérieure à des prix justes, tout en respectant l'environnement et les
              droits des travailleurs. Nous sélectionnons nos fournisseurs avec soin et nous nous engageons dans une
              mode éthique et responsable.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <ul className="space-y-3 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>Qualité:</strong> Des matériaux premium et une confection soignée
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>Durabilité:</strong> Impact environnemental réduit
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>Inclusivité:</strong> Mode pour tous les corps et tous les styles
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>Transparence:</strong> Communication honnête sur nos pratiques
                </span>
              </li>
            </ul>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-3xl font-bold mb-4">Besoin d'Aide?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              N'hésitez pas à nous contacter pour toute question ou suggestion.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground font-bold hover:opacity-90 transition"
            >
              Nous Contacter
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
