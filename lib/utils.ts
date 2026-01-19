export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const sectionIds = {
  hero: 'hero',
  problem: 'problema',
  solution: 'solucion',
  useCases: 'casos-de-uso',
  comparison: 'comparacion',
  impact: 'impacto',
  roadmap: 'roadmap',
  funding: 'financiamiento',
  faq: 'faq',
  contact: 'contacto',
  b2b: 'empresas',
} as const

export type SectionId = typeof sectionIds[keyof typeof sectionIds]
