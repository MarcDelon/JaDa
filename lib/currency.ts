// Fonction pour formater les prix en FCFA (Franc CFA)
export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR')} FCFA`
}

// Conversion Euro vers FCFA (1 EUR ≈ 656 FCFA)
export function euroToFCFA(euroPrice: number): number {
  return Math.round(euroPrice * 656)
}

// Pour afficher les prix
export function displayPrice(price: number): string {
  return formatPrice(price)
}
