import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: 'Femme',
    image: '/womens-fashion-elegant-clothing.jpg',
    href: '/collections/women',
  },
  {
    id: 2,
    name: 'Enfant & Jeune Adulte',
    image: '/kids-teenage-fashion.jpg',
    href: '/collections/kids',
  },
  {
    id: 3,
    name: 'Bambinerie',
    image: '/baby-clothes-soft-colors.jpg',
    href: '/collections/baby',
  },
]

export default function Categories() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-12 text-center">
          Explorez nos Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden aspect-square"
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
