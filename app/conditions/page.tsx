"use client"

import Navigation from "@/components/navigation"

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold mb-12">Conditions Générales d'Utilisation</h1>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptation des Conditions</h2>
            <p className="text-muted-foreground leading-relaxed">
              En accédant et en utilisant le site web de JaDa, vous acceptez d'être lié par ces conditions générales
              d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Utilisation du Site</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous vous engagez à utiliser ce site uniquement à des fins légales et de manière à ne pas violer les
              droits d'autrui ou à restreindre son utilisation et son accès.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Propriété Intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tout le contenu présent sur ce site, y compris les textes, les images et les vidéos, est la propriété de
              JaDa ou de ses fournisseurs de contenu respectifs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitation de Responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed">
              JaDa ne sera pas responsable de tous les dommages indirects, accidentels ou consécutifs résultant de votre
              utilisation du site ou du contenu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              JaDa se réserve le droit de modifier ces conditions à tout moment. Les changements entreront en vigueur
              dès qu'ils seront publiés sur ce site.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
