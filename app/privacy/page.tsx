"use client"

import Navigation from "@/components/navigation"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-12">Politique de Confidentialité</h1>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              JaDa s'engage à protéger votre confidentialité. Cette politique explique comment nous collectons,
              utilisons et protégeons vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Données Collectées</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous collectons les informations suivantes: nom, adresse e-mail, adresse postale, numéro de téléphone et
              historique d'achats.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Utilisation des Données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données sont utilisées pour traiter vos commandes, vous envoyer des mises à jour et améliorer nos
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Protection des Données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous utilisons un chiffrement SSL pour protéger vos données lors de la transmission et nous stockons vos
              données de manière sécurisée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Vos Droits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Contactez-nous à
              privacy@jada.fr pour exercer ces droits.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
